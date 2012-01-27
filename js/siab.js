/**
 *
 *	Star in a Box. Developed by Jon Yardley.
 *
 *
 **/
//Main function
$(document).ready(function () {
	$(function () {
		
		//Main Objects
		var fDone = 0;

		var stageLife = [];

		var jsonChartData;
		var jsonEvolve;

		var starSummary;
		var generatedSummary = false;

		var chartOffset;
		var animStar;

		var currentMass;
		var currentStage;

		//Drag and Drop Variables
		var eaStarDrag = [];

		//Create array of datapoints for main sequence line...
		var MSTemp = new Array();
		var MS = new Array();
		var msC = -23.2;
		var msM = 6.1;

		//summary readout object
		var starSummary = Object();

		for (var i = 3.2; i < 5.2; i = i + 0.2) {
			MSTemp.push([i, ((msM * i) + msC)]);
		}

		MS["data"] = MSTemp;
		MS["label"] = "Main Sequence";
		MS["lines"] = {
			show: true,
			lineWidth: 20
		};
		MS["color"] = "rgba(255, 0, 0, 0.5)";
		MS["shadowSize"] = 0;

		//array for animation data points...
		eAnimPoints = [];
		var eaStar = [];


		/**
		 *	Add on load elements
		 **/

		var massVM = [0.2, 0.65, 1, 2, 4, 6, 10, 20, 30, 40];

		//GET URL if one is passed
		var fullurl = parent.document.URL;
		var urlquery = Array;
		urlquery = fullurl.substring(fullurl.indexOf('?')+1, fullurl.length).split('=');
		var initStarMass;
		
		if(urlquery.length == 0 || urlquery[0] != 's'){
			initStarMass = 1;
		}else{
			initStarMass = getNearestNumber(massVM, parseInt(urlquery[1]));
		}
		
		function getNearestNumber(a, n){
			var closest = null;
    	for(i = 0; i < a.length; i++){
    		if(closest == null || Math.abs(a[i] - n) < Math.abs(closest - n)){
    			closest = a[i];
    		}
    	}
    	return closest;
		}
		
		function findMassIndex(mass){
			for(var i = 0; i < massVM.length; i++){
				if(mass == massVM[i]){
					return i;
				}
			}
		}

		//Add Mass Slider and set defaults
		$("#mass-slider").slider({
			value: findMassIndex(initStarMass),
			min: 0,
			max: massVM.length - 1,
			step: 1,
			change: function (event, ui) {
				var sMass = massVM[ui.value];
				generatedSummary = false;
				loadingStar();
				clearInterval(eAnim);
				
				//on change get stages for the mass of star!
				$('#stages .ui-slider').remove();
				getStages(sMass);
				loadChartData(sMass);
				stageLife = Array();
				$("a#animateEvolve").text('Start');
				$("a#animateEvolveReset").css('display', '');
				$("#tevTime").text("Time: " + 0 + " Myrs");
				$('a#animationEvolveReset').trigger('click');
				siabReset();

			}
		});

		//add ticks
		$("#mass-slider").append('<div class="ticks"></div>');
		var i;
		var msLength = 700;
		var tickSpace = 700 / (massVM.length - 1);
		for (var i = 0; i < massVM.length; i++) {
			var ts = (i * tickSpace) - 20;
			$("#mass-slider .ticks").append("<p class='tick'>" + massVM[i] + "</p>");
			$(".ticks p.tick:last").css('left', ts);
		}



		// get stages for current mass function

		function getStages(mass) {
			var url = "db/data.json.php?d=stages&m=" + mass;
			$.getJSON(url, function (data) {
				var sOptions = '';
				for (var i = 0; i < data.length; i++) {
					sOptions += '<option lum="' + data[i].optionLum + '" radius="' + data[i].optionRadius + '" tev="' + data[i].optionTev + '" temp="' + data[i].optionTemp + '" rgb="' + data[i].optionRGB + '" label="' + data[i].optionValue + '"value="' + data[i].optionDisplay + '">' + data[i].optionDisplay + '</option>';
				}
				$("select#first-stage").html(sOptions);
				$("select#last-stage").html(sOptions);
				$('#first-stage option:first').attr('selected', 'selected');
				$('#last-stage option:last').attr('selected', 'selected');
				thermoTemp.scale(1, calcTerm($("#first-stage option:selected").attr("temp")), 0, 343);
				eqLevel($("#first-stage option:selected").attr("lum"));

				//Load Stages Slider...
				$('select.stages').selectToUISlider({
					labels: 16,
					sliderOptions: {
						change: function (event, ui) {

							clearInterval(eAnim);
							var cStarColour = $("#first-stage option:selected").attr("rgb");
							updateEvolve($("#first-stage option:selected").attr("label"), $("#last-stage option:selected").attr("label"));
							var tev = $("#first-stage option:selected").attr("tev");
							$("#tevTime").text("Time: " + tev + " Myrs");
							loadChartData(mass);
							thermoTemp.scale(1, calcTerm($("#first-stage option:selected").attr("temp")), 0, 343);
							eqLevel($("#first-stage option:selected").attr("lum"));
							sStarReset();
							setcStarSize($("#evolve option:first").text());
							setcStarColour(cStarColour);
							$("a#animateEvolve").text('Start');
							$("a#animateEvolveReset").css('display', '');
							$("#tevTime").text("Time: " + 0 + " Myrs");
							$('a#animationEvolveReset').trigger('click');

						}
					}
				}).hide();

				getEvolve(mass);
				loadChartData(mass);

			});

		}



		//get evolve values

		function getEvolve(mass) {
			var stage = '';
			var sStart = ''
			var sEnd = '';
			$('#stages :selected').each(function () {
				if (stage == '') {
					stage = $(this).attr('label');
					sStart = stage;
				} else {
					sEnd = $(this).attr('label');
					stage = stage + "," + sEnd;

				}
			});

			var url = "db/data.json.php?d=evolve&m=" + mass + "&s=" + stage;

			$.getJSON(url, function (data) {
				jsonEvolve = data;
				var sOptions = '';
				for (var i = 0; i < data.length; i++) {
					sOptions += '<option typeDesc="' + data[i].typeDesc + '" lum="' + data[i].optionLum + '" rgb="' + data[i].optionRGB + '" tev="' + data[i].optionTev + '" label="' + data[i].optionRadius + '"value="' + data[i].optionTemp + '">' + data[i].optionRadius + '</option>';
				}
				$("#evolve").html(sOptions);
				$('#evolve option:first').attr('selected', 'selected');
				getPie(sStart, sEnd);
				setcStarSize($("#evolve option:first").attr('text'));
				setcStarColour($("#first-stage option:selected").attr("rgb"));
				doneLoadingStar();
				updateCurrentStage();
				if (!generatedSummary) {
					generateSummary();
					generatedSummary = true;
				}

			});
		}

		/**
		 *
		 *	Generate Pie Chart for selected mass and range of lifecycle stages.
		 *
		 */

		function getPie(eStart, eEnd) {

			var pieData = [];
			var pieLegend = [];
			//var stageLife = []; //Now Defined Above!
			var stage;
			var type = new Array(0, eStart);
			var ii = 0;
			for (var i = 0; i < jsonEvolve.length; i++) {
				var eType = jsonEvolve[i].type;
				if (eType >= eStart && eType <= eEnd) {
					if (eType != type[1]) {
						type[1] = eType;
						type[0]++;
						ii = 0;
					}
					if (!stageLife[type[0]]) {
						stageLife[type[0]] = new Array();
					}
					stageLife[type[0]][ii] = [jsonEvolve[i].type, jsonEvolve[i].typeDesc, jsonEvolve[i].optionTev];
					ii++;
				}
			}
			for (i = 0; i < stageLife.length; i++) {
				var sStart = stageLife[i][0][2];
				var sEnd = stageLife[i][(stageLife[i].length) - 1][2];
				var sValue = sEnd - sStart;
				var sLegend = stageLife[i][0][1];
				pieLegend.push(sLegend);
				pieData.push(sValue);
			}
			//raphael script for pie chart...
			if ($("#rPie #pie").children().size() > 0) {
				$("#rPie #pie").children().remove();
			}

			var rPie = Raphael("rPie");
			rPie.g.txtattr.font = "12px 'Fontin Sans', Fontin-Sans, sans-serif";

			var pie = rPie.g.piechart(140, 130, 100, pieData, {
				legend: pieLegend,
				legendpos: "south",
				legendcolor: "#FFF"
			});
			pie.hover(function () {
				this.sector.stop();
				this.sector.scale(1.1, 1.1, this.cx, this.cy);
				if (this.label) {
					this.label[0].stop();
					this.label[0].scale(1.5);
					this.label[1].attr({
						"font-weight": 800
					});
				}
			}, function () {
				this.sector.animate({
					scale: [1, 1, this.cx, this.cy]
				}, 500, "bounce");
				if (this.label) {
					this.label[0].animate({
						scale: 1
					}, 500, "bounce");
					this.label[1].attr({
						"font-weight": 400
					});
				}
			});


		} //end getPie()

		//get default stages (1 solar mass)
		//init
		getStages(initStarMass);


		/**
		 *	Set FLOT variables
		 **/

		var options = {
			grid: {
				color: "#222"
			},
			legend: {
				show: true,
				backgroundColor: "rgba(0,0,0,0.4)"
			},
			lines: {
				show: true
			},
			points: {
				show: false
			},
			xaxis: {
				invert: true,
				zoomRange: [0.1, 7],
				panRange: [1.8, 6.6],
				min: 3,
				max: 6.4,
				tickFormatter: (function (val, axis) {
					return (addCommas(Math.round(Math.pow(10, val))));
				}),
				tickSize: 1

			},
			yaxis: {
				tickSize: 1,
				zoomRange: [-17, 17],
				panRange: [-17, 17],
				min: -11,
				max: 8,
				tickFormatter: (function (val, axis) {
					return (addCommas(Math.pow(10, val)));
				})
			},
			zoom: {
				interactive: false
			},
			pan: {
				interactive: false
			},
			hooks: {
				draw: [getFlotVariables]
			}
		};



		function addCommas(nStr) {
			nStr += '';
			x = nStr.split('.');
			x1 = x[0];
			x2 = x.length > 1 ? '.' + x[1] : '';
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + ',' + '$2');
			}
			return x1 + x2;
		}



		var data = [];
		var placeholder = $("#placeholder");

		$.plot(placeholder, data);

		function loadChartData(mass) {

			//get Mass
			//var mass = $("#mass-slider").slider("value");
			var stage = '';

			//get Stage
			$('#stages :selected').each(function () {
				if (stage == '') {
					stage = $(this).attr('label');
				} else {
					stage = stage + "," + $(this).attr('label');
				}
			});

			// find the URL in the link right next to us
			var dataurl = "db/data.json.php?d=star&m=" + mass + "&s=" + stage;

			//Get data from json
			$.ajax({
				url: dataurl,
				method: 'POST',
				dataType: 'json',
				success: onDataReceived
			});



		}




		// then fetch the data with jQuery

		function onDataReceived(series) {

			//clear chart and add data
			d1 = [];
			$.plot(placeholder, d1, options);
			series["points"] = {
				show: false
			};
			series["lines"] = {
				show: true
			};

			var newSeries = Object();
			newSeries.data = series.data;
			currentMass = series.mass;
			d1.push(MS);
			d1.push(newSeries);

			//plot data...
			$.plot(placeholder, d1, options);
			
		}




		//Raphael Script for star comparison
		var paper = Raphael("rCanvas", 280, 390);

		//draw sun
		var sun = paper.circle(25, 200, 5);
		sun.attr("fill", "#fff3ea");
		var sunLabel = paper.text(25, 220, "Sun");
		sunLabel.attr("fill", "#fff3ea");

		//draw comparison star
		var cStar = paper.circle(50, 200, 5);
		cStar.attr("fill", "#fff3ea");

		var cStarOffset;

		function setcStarSize(sm) {
			//var size = sm * 9.1;
			cStarOffset = 45;
			cStar.scale(sm, sm, cStarOffset);
			//doneLoadingStar();
		}

		function setcStarColour(value) {
			cStar.attr("fill", value);
		}

		function sStarReset() {
			cStar.remove();
			cStar = paper.circle(50, 200, 5);
		}

		//animate evolution over selected stages
		$("#evolve").change(function evolveStar() {
			var color = $("#evolve option:selected").attr("rgb");
			var clabel = $("#evolve option:selected").text();

			cStar.attr("fill", color);
			cStar.attr("stroke", "#000");
			setcStarSize(clabel);
		});

		var eAnim = '';
		var iMod = 0;

		$("a#animateEvolve").click(function () {
			if ($("a#animateEvolve").text() == "Start") {
				$("a#animateEvolveReset").css('display', 'none');
				if (iMod == eAnimPoints.length) {
					$("a#animateEvolveReset").trigger('click');
				}
				//animate through stages...
				$("a#animateEvolve").text('Pause');
				var duration = $("#evolveSpeed option:selected").attr("value");
				eAnim = setInterval(function () {
					if (iMod == eAnimPoints.length) {
						$("a#animateEvolve").text('Start');
						clearInterval(eAnim);
						$("a#animateEvolveReset").css('display', 'n');
					} else {
						if ((iMod + 1) % 2 == 0 && ($('#evolve option:selected').index() + 1) != $('#evolve option').length) {
							//var cStarOffset = (100 - (cStar.attr('r') / 2);
							var cScale = $("#evolve option:selected").text();
							var cColour = $("#evolve option:selected").attr("rgb");
							
							cStar.animate({
								scale: [cScale, cScale, cStarOffset],
								fill: cColour
							}, (duration * 2));
							var tev = $("#evolve option:selected").attr("tev");
							$("#tevTime").text("Time: " + tev + " Myrs");
							thermoTemp.animate({
								scale: [1, calcTerm($("#evolve option:selected").attr("value")), 0, 343]
							}, (duration * 2));
							$("#evolve option:selected").removeAttr('selected').next('option').attr('selected', 'selected');
							if (eqCurrentLevel != Math.round($("#evolve option:selected").attr("lum") / 0.3) + 1) {
								eqLevel($("#evolve option:selected").attr("lum"), true);
							}
							updateCurrentStage();
						}
						eaStar.animate({
							cx: (eAnimPoints[iMod][0] + chartOffset.left),
							cy: (eAnimPoints[iMod][1] + chartOffset.top)
						}, duration);
						iMod++;


					}
				}, duration);
			} else {
				if ($("a#animateEvolve").text() == "Pause") {
					clearInterval(eAnim);
					$("a#animateEvolve").text('Start');
					$("a#animateEvolveReset").css('display', '');
				}
			}
			return false;
		});

		$("a#animateEvolveReset").click(function(){
			siabReset();
			return false;
		});
		
		function siabReset(){
			clearInterval(eAnim);
			$("#evolve option:first").attr('selected', 'selected');
			sStarReset();
			setcStarSize($("#evolve option:first").text());
			setcStarColour($("#evolve option:first").attr("rgb"));
			eqLevel($("#evolve option:first").attr("lum"));
			thermoTemp.scale(1, calcTerm($("#evolve option:selected").attr("value")), 0, 343);
			iMod = 0;
			$("#tevTime").text("Time: " + 0 + " Myrs");
			$("a#animateEvolve").text('Start');
			eaStar.attr("cx", (eAnimPoints[iMod][0] + chartOffset.left));
			eaStar.attr("cy", (eAnimPoints[iMod][1] + chartOffset.top));
			updateCurrentStage();
		
		}

		function getFlotVariables(plot, series, datapoints) {

			var tempArray = plot.getData();
			chartOffset = plot.getPlotOffset();

			if (tempArray[1]) {
				eAnimPoints = [];
				for (var i in tempArray[1].data) {
					var ii = [];
					ii[0] = plot.getAxes().xaxis.p2c(tempArray[1].data[i][0]);
					ii[1] = plot.getAxes().yaxis.p2c(tempArray[1].data[i][1]);
					eAnimPoints.push(ii);
				}
				animStar = Raphael("placeholder", 600, 480);
				//print axis labels
				var xLabel = animStar.text(340, 480 - chartOffset.bottom - 10, "Temperature (K)");
				var yLabel = animStar.text(chartOffset.left + 10, 200 - chartOffset.bottom, "Brightness (L0)");
				yLabel.attr("rotation", "90");
				eaStar = animStar.circle((eAnimPoints[0][0] + chartOffset.left), (eAnimPoints[0][1] + chartOffset.top), 5);
				eaStar.attr("fill", "#000000");

				//print Solar Mass Value onto Graph!
				var massLabel = animStar.text((chartOffset.left + 8), (chartOffset.top + 22), currentMass).attr({
					'text-anchor': 'start',
					'fill': '#000',
					'font-size': '40px',
					'font-weight': 'bold'
				});
				var mlBB = massLabel.getBBox();
				var mlES = '';
				if (currentMass != 1) {
					mlES = 'es';
				}
				var massLabel1 = animStar.text((mlBB.x + mlBB.width + 4), (chartOffset.top + 33), "Solar Mass" + mlES).attr({
					'text-anchor': 'start',
					'fill': '#000',
					'font-size': '10px'
				});

				yLabel.attr({
					fill: "white"
				});
				xLabel.attr({
					fill: "white"
				});

			}
		};

		//thermometer
		var thermo = Raphael("thermometer", 280, 390);
		//333px is bottom of thermometer...
		var thermoTemp = thermo.rect(123, 31, 10, 300);
		thermoTemp.attr("fill", "#CC0000");
		thermoTemp.attr("stroke", "");
		var thermoImage = thermo.image("images/thermometer.png", 90, -12, 80, 400);
		//labels
		var l1 = thermo.text(150, 28, "60,000 (K)").attr({
			'text-anchor': 'start',
			'fill': '#fff'
		});
		var l2 = thermo.text(150, 88, "48,000 (K)").attr({
			'text-anchor': 'start',
			'fill': '#fff'
		});
		var l3 = thermo.text(150, 148, "36,000 (K)").attr({
			'text-anchor': 'start',
			'fill': '#fff'
		});
		var l4 = thermo.text(150, 208, "24,000 (K)").attr({
			'text-anchor': 'start',
			'fill': '#fff'
		});
		var l5 = thermo.text(150, 268, "12,000 (K)").attr({
			'text-anchor': 'start',
			'fill': '#fff'
		});
		var l6 = thermo.text(150, 328, "0 (K)").attr({
			'text-anchor': 'start',
			'fill': '#fff'
		});
		var lLabel = thermo.text(50, 200, "Temperature (Kelvin)").attr({
			'text-anchor': 'start',
			'fill': '#fff'
		});
		lLabel.rotate(-90);

		function calcTerm(t) {
			var max = 60000;
			var ratio = t / max;
			return ratio;
		}


		/**
		 *
		 *	EQ for Luminosity
		 *
		 **/

		var rLum = Raphael("rlum", 280, 390);

		var eqBg1 = rLum.image("images/eq-bg.png", 40, 20, 57, 354);
		var eqBg2 = rLum.image("images/eq-bg.png", 105, 20, 57, 354);

		//add LEDs
		var eq1 = [];
		var eq2 = [];
		var xLed = 22;
		var eqCurrentLevel = 0;
		var i = 0;
		var numBars = 0;
		var totalBars = 20;
		var initEqUp = '';
		var initEqDown = '';

		for (var i = totalBars; i > 0; --i) {
			eq1[i] = rLum.image("images/eq-led.png", 40, xLed, 57, 29);
			eq2[i] = rLum.image("images/eq-led.png", 105, xLed, 57, 29);
			eq1[i].attr("opacity", "0.3");
			eq2[i].attr("opacity", "0.3");

			xLed = xLed + 17;
		}

		eq1[1].attr("opacity", "1");
		eq1[2].attr("opacity", "1");
		eq1[3].attr("opacity", "1");
		eq1[4].attr("opacity", "1");
		eq1[5].attr("opacity", "1");

		var le1 = rLum.text(170, 30, "1,000,000").attr({
			'text-anchor': 'start',
			'fill': '#fff'
		});
		var le2 = rLum.text(170, 115, "10,000").attr({
			'text-anchor': 'start',
			'fill': '#fff'
		});
		var le3 = rLum.text(170, 202, "100").attr({
			'text-anchor': 'start',
			'fill': '#fff'
		});
		var le4 = rLum.text(170, 285, "1").attr({
			'text-anchor': 'start',
			'fill': '#fff'
		});
		var le5 = rLum.text(170, 370, "0.001").attr({
			'text-anchor': 'start',
			'fill': '#fff'
		});
		var leLabel = rLum.text(-34, 220, "Brightness (Luminosities)").attr({
			'text-anchor': 'start',
			'fill': '#fff'
		});
		leLabel.rotate(-90);



		function eqLevel(num, anim) {
			var zero = 4;
			var units = 0.4;
			var bars = 20;

			if (num != null) {

				numBars = num / units;
				numBars = Math.round(numBars) + zero;

				if (anim == true) {
					if (numBars > eqCurrentLevel) {
						i = 1;
						eqUp();
					}
					if (numBars < eqCurrentLevel) {
						i = eqCurrentLevel;
						eqDown();
					}
				} else {
					eqCurrentLevel = numBars;
					i = eqCurrentLevel;
					for (var j = 1; j <= totalBars; j++) {
						if (j <= numBars) {
							eq2[j].attr('opacity', 1);
						} else {
							eq2[j].attr('opacity', 0.3);
						}
					}
				}
			}
		}

		function eqUp() {
			if (i <= numBars && i <= totalBars) {
				eq2[i].animate({
					opacity: 1
				}, 300);
				i++;
				setTimeout(eqUp, 100);
			} else {
				eqCurrentLevel = numBars;
			}
		}

		function eqDown() {
			if (i >= numBars && i > 0) {
				eq2[i].animate({
					opacity: 0.3
				}, 300);
				i--;
				setTimeout(eqDown, 100);
			} else {
				eqCurrentLevel = numBars;
			}
		}

		function updateEvolve(eStart, eEnd) {

			var sOptions = '';
			for (var i = 0; i < jsonEvolve.length; i++) {
				var eType = jsonEvolve[i].type;
				if (eType >= eStart && eType <= eEnd) {
					sOptions += '<option typeDesc="' + jsonEvolve[i].typeDesc + '" lum="' + jsonEvolve[i].optionLum + '" rgb="' + jsonEvolve[i].optionRGB + '" tev="' + jsonEvolve[i].optionTev + '" label="' + jsonEvolve[i].optionRadius + '"value="' + jsonEvolve[i].optionTemp + '">' + jsonEvolve[i].optionRadius + '</option>';
				}
			}
			$("#evolve").html(sOptions);
			$('#evolve option:first').attr('selected', 'selected');
			getPie(eStart, eEnd);
			updateCurrentStage();
			//$("#animateEvolveReset").trigger('click');
		}

		function loadingStar() {
			$('#loader').removeClass('done').addClass('loading').width($(window).width()).height($(window).height()).html('<div id="loading">Your star is being prepared.</p><p>Please wait...</p>');

		}

		function doneLoadingStar() {
			$('#loader').html('').removeClass('loading').addClass('done');
		}

		function updateCurrentStage() {
			$('#current-stage').html('<strong>Stage:</strong> ' + $('#evolve option:selected').attr('typeDesc'));
		}

		//summary script
		//show summary
		$('#summary').click(function () {
			$('#welcome').removeClass('about').removeClass('help').addClass('summary');
			if ($("#box-lid").css("left") == "-980px") {
				toggleLid();
			}
			$('#welcome #welcome-content').animate({
				opacity: 0
			}, 500, function () {
				displaySummary();
				$(this).animate({
					opacity: 1
				}, 500);
			});
		});

		function displaySummary() {

			$('#welcome #welcome-content').html(starSummary);
		}

		function generateSummary() {
			var sOutput = "<h1>Summary</h1>";
			sOutput += "<p>This is a summary of the star that is currently selected.</p>"
			sOutput += '<div class="label">Mass: </div><div class="result">' + currentMass + ' Solar Mass(es)</div>';
			sOutput += '<div id="summary-table"><table border="1"><tr>';
			sOutput += '<th>Stage</th>';
			sOutput += '<th>Radius</th>';
			sOutput += '<th>Luminosity</th>';
			sOutput += '<th>Temperature</th>';
			sOutput += '<th>Time</th>';
			sOutput += '</tr>';

			for (var i in stageLife) {
				var sStart = stageLife[i][0][2];
				var sEnd = stageLife[i][(stageLife[i].length) - 1][2];
				var sValue = sEnd - sStart;

				sOutput += '<tr>';
				sOutput += '<td>' + stageLife[i][0][1] + '</td>'; //Stage Name
				sOutput += '<td>' + roundNumber($('#evolve option[typedesc=' + stageLife[i][0][1] + ']:last').attr('label'), 2) + '</td>';
				sOutput += '<td>' + roundNumber($('#evolve option[typedesc=' + stageLife[i][0][1] + ']:last').attr('lum'), 2) + '</td>';
				sOutput += '<td>' + roundNumber($('#evolve option[typedesc=' + stageLife[i][0][1] + ']:last').attr('value'), 2) + '</td>';
				sOutput += '<td>' + roundNumber(sValue, 2) + '</td>';
				sOutput += '</tr>';
			}
			sOutput += '</table></div>';
			sOutput += '<div id="downloads">Download data as: <a href="db/csv.php?s='+currentMass+'">CSV</a></div>';
			starSummary = sOutput;
		}

		function roundNumber(num, dec) {
			var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
			return result;
		}

		function toggleLid() {

			//Open box if closed and visa-versa
			if ($("#box-lid").css("left") == "-10px") {
				//setTimeout(boxIsOpen(),1000);
				$("#box-lid").animate({
					"left": "-980px"
				}, 1000, function () {
					//move #content to top
					$("#content").removeClass("closed").addClass("open");
				});
			} else if ($("#box-lid").css("left") == "-980px") {
				//move content underneath lid then animate shut.
				$("#content").removeClass("open").addClass("closed");
				$("#box-lid").animate({
					"left": "-10px"
				}, 1000);
			}

		}

	}); //function
}); //ready.function