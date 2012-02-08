/*
 *
 *	Star in a Box. Developed by Jon Yardley - October 2011
 *  Refactoring by Stuart Lowe - February 2012
 *
 */
$(document).ready(function () {

	/*@cc_on
	// Fix for IE's inability to handle arguments to setTimeout/setInterval
	// From http://webreflection.blogspot.com/2007/06/simple-settimeout-setinterval-extra.html
	(function(f){
		window.setTimeout =f(window.setTimeout);
		window.setInterval =f(window.setInterval);
	})(function(f){return function(c,t){var a=[].slice.call(arguments,2);return f(function(){c.apply(this,a)},t)}});
	@*/
	// Page PreLoader
	QueryLoader.selectorPreload = "body";
	QueryLoader.init();
	
	function StarInABox(inp){
		this.canopen = true;
		this.open = false;
		this.inputopen = false;
		this.animateopen = false;
		// The stages indices must match indices used in the data
		this.stages = ["Deeply or fully convective low mass MS star","Main Sequence star","Hertzsprung Gap","First Giant Branch","Core Helium Burning","First Asymptotic Giant Branch","Second Asymptotic Giant Branch","Main Sequence Naked Helium star","Hertzsprung Gap Naked Helium star","Giant Branch Naked Helium star","Helium White Dwarf","Carbon/Oxygen White Dwarf","Oxygen/Neon White Dwarf","Neutron Star","Black Hole","Massless Supernova"];
		this.allstages = {
			"m0.2" : [ {"type":0, "lum":-2.2399, "t":639800, "radius":0.27, "temp":2942, "RGB":"#ffb765"}, {"type":2, "lum":-2.0034, "t":914000, "radius":0.36, "temp":2942, "RGB":"#ffb765"}, {"type":3, "lum":-2.2407, "t":962100, "radius":0.21, "temp":3463, "RGB":"#ffc885"}, {"type":10, "lum":1.9434, "t":1080000, "radius":0.02, "temp":56701, "RGB":"#9eb5ff"} ],
			"m0.65" : [{"type":0, "lum":-0.3403, "t":57610, "radius":0.97, "temp":4849, "RGB":"#ffe5c6"}, {"type":2, "lum":-0.0538, "t":60970, "radius":1.45, "temp":4664, "RGB":"#ffe2bf"}, {"type":3, "lum":0.3772, "t":61970, "radius":2.39, "temp":4664, "RGB":"#ffe2bf"}, {"type":10, "lum":2.3074, "t":62750, "radius":0.02, "temp":56701, "RGB":"#9eb5ff"} ],
			"m1" : [{"type":1, "lum":0.4503, "t":8992.81, "radius":1.69, "temp":5722, "RGB":"#fff1e5"}, {"type":2, "lum":0.5034, "t":9485.59, "radius":2.29, "temp":5164, "RGB":"#ffe9d2"}, {"type":3, "lum":0.5118, "t":9562.25, "radius":2.4, "temp":5052, "RGB":"#ffe8ce"}, {"type":4, "lum":1.7386, "t":10171.4, "radius":10.3, "temp":4948, "RGB":"#ffe6ca"}, {"type":5, "lum":2.1813, "t":10297.2, "radius":22.19, "temp":4322, "RGB":"#ffdbb0"}, {"type":6, "lum":3.6019, "t":10301.8, "radius":203.47, "temp":3234, "RGB":"#ffc178"}, {"type":11, "lum":1.4459, "t":10302.4, "radius":0.01, "temp":56701, "RGB":"#9eb5ff"}],
			"m2" : [{"type":1, "lum":1.5476, "t":1163.03, "radius":3.71, "temp":7218, "RGB":"#f3f2ff"}, {"type":2, "lum":1.3056, "t":1173.58, "radius":5.84, "temp":5052, "RGB":"#ffe8ce"}, {"type":3, "lum":2.3845, "t":1196.46, "radius":27.54, "temp":4322, "RGB":"#ffdbb0"}, {"type":4, "lum":2.1597, "t":1486.68, "radius":19.85, "temp":4489, "RGB":"#ffdfb8"}, {"type":5, "lum":3.6681, "t":1494.07, "radius":204.31, "temp":3463, "RGB":"#ffc885"}, {"type":6, "lum":1.6415, "t":1495.78, "radius":0.01, "temp":56701, "RGB":"#9eb5ff"}, {"type":11, "lum":-5.3886, "t":12000, "radius":0.01, "temp":2150, "RGB":"#ff9523"}],
			"m4" : [{"type":1, "lum":2.7699, "t":178.906, "radius":5.94, "temp":11677, "RGB":"#c4d2ff"}, {"type":2, "lum":2.5541, "t":180.102, "radius":28.35, "temp":4755, "RGB":"#ffe3c3"}, {"type":3, "lum":3.1815, "t":180.774, "radius":76.17, "temp":4159, "RGB":"#ffd8a9"}, {"type":4, "lum":2.9481, "t":212.88, "radius":51.27, "temp":4405, "RGB":"#ffddb4"}, {"type":5, "lum":4.1509, "t":214.706, "radius":353.02, "temp":3463, "RGB":"#ffc885"}, {"type":6, "lum":1.7754, "t":215.382, "radius":0.01, "temp":56701, "RGB":"#9eb5ff"}, {"type":11, "lum":-5.3245, "t":12000, "radius":0.01, "temp":2942, "RGB":"#ffb765"}],
			"m6" : [{"type":1, "lum":3.3591, "t":65.964, "radius":7.48, "temp":13674, "RGB":"#bbccff"}, {"type":2, "lum":3.2303, "t":68.6218, "radius":69.98, "temp":4489, "RGB":"#ffdfb8"}, {"type":3, "lum":3.7432, "t":68.7287, "radius":161.66, "temp":3892, "RGB":"#ffd29c"}, {"type":4, "lum":3.6142, "t":77.6749, "radius":121.23, "temp":4241, "RGB":"#ffdaad"}, {"type":5, "lum":4.3733, "t":78.2085, "radius":444.02, "temp":3463, "RGB":"#ffc885"}, {"type":6, "lum":1.8974, "t":78.7627, "radius":0.01, "temp":56701, "RGB":"#9eb5ff"}, {"type":11, "lum":-5.2134, "t":12000, "radius":0.01, "temp":3640, "RGB":"#ffcc8f"}],
			"m10" : [{"type":1, "lum":4.2272, "t":24.4625, "radius":9.34, "temp":22695, "RGB":"#aabfff"}, {"type":2, "lum":3.9663, "t":24.5267, "radius":191.38, "temp":4076, "RGB":"#ffd6a5"}, {"type":3, "lum":4.3855, "t":24.5362, "radius":386.1, "temp":3640, "RGB":"#ffcc8f"}, {"type":4, "lum":4.3817, "t":27.3394, "radius":340.41, "temp":3892, "RGB":"#ffd29c"}, {"type":5, "lum":4.8097, "t":27.4616, "radius":748, "temp":3463, "RGB":"#ffc885"}, {"type":13, "lum":4.8124, "t":27.4621, "radius":0, "temp":3463, "RGB":"#ffc885"}],
			"m20" : [{"type":1, "lum":5.0480, "t":8.8203, "radius":15.56, "temp":22695, "RGB":"#aabfff"}, {"type":2, "lum":5.0859, "t":8.8357, "radius":249.52, "temp":6967, "RGB":"#f8f6ff"}, {"type":4, "lum":5.1739, "t":9.8196, "radius":1222.08, "temp":3234, "RGB":"#ffc178"}, {"type":5, "lum":5.2799, "t":9.8441, "radius":1508.69, "temp":3234, "RGB":"#ffc178"}, {"type":13, "lum":5.2805, "t":9.8442, "radius":0, "temp":3234, "RGB":"#ffc178"}],
			"m30" : [{"type":1, "lum":5.4128, "t":5.9496, "radius":22.18, "temp":22695, "RGB":"#aabfff"}, {"type":2, "lum":5.4158, "t":5.9582, "radius":1142.88, "temp":3892, "RGB":"#ffd29c"}, {"type":4, "lum":5.3705, "t":6.4737, "radius":1.2, "temp":56701, "RGB":"#9eb5ff"}, {"type":7, "lum":5.2557, "t":6.629, "radius":0.89, "temp":56701, "RGB":"#9eb5ff"}, {"type":8, "lum":5.4248, "t":6.6577, "radius":1.04, "temp":56701, "RGB":"#9eb5ff"}, {"type":14, "lum":5.4248, "t":6.6577, "radius":0, "temp":56701, "RGB":"#9eb5ff"}],
			"m40" : [{"type":1, "lum":5.6288, "t":4.8716, "radius":29.01, "temp":22695, "RGB":"#aabfff"}, {"type":2, "lum":5.6187, "t":4.878, "radius":1433.51, "temp":3892, "RGB":"#ffd29c"}, {"type":4, "lum":5.5568, "t":5.1816, "radius":1.41, "temp":56701, "RGB":"#9eb5ff"}, {"type":7, "lum":5.3259, "t":5.448, "radius":0.95, "temp":56701, "RGB":"#9eb5ff"}, {"type":8, "lum":5.4786, "t":5.4732, "radius":1.06, "temp":56701, "RGB":"#9eb5ff"}, {"type":14, "lum":5.4841, "t":5.474, "radius":0, "temp":56701, "RGB":"#9eb5ff"}]
		}
		// Main Objects
		this.stageLife = [];
		this.stageIndex = [];
		this.jsonChartData;
		this.timestep = 0;
		this.animating = false;
		this.reduction = 4;	// A slower framerate for the size/thermometer animations


		// array for animation data points...
		this.eAnimPoints = [];

		this.massVM = [0.2, 0.65, 1, 2, 4, 6, 10, 20, 30, 40];

		//GET URL if one is passed
		this.fullurl = parent.document.URL;
		this.urlquery = Array;
		this.urlquery = this.fullurl.substring(this.fullurl.indexOf('?')+1, this.fullurl.length).split('=');
		this.initStarMass = (this.urlquery.length == 0 || this.urlquery[0] != 's') ? 1 : getNearestNumber(this.massVM, parseInt(this.urlquery[1]));

		this.setupUI();

		// get default stages (1 solar mass)
		this.getStages(this.initStarMass);
		

		/**
		 *	Set Chart variables
		 **/
		this.data = [];
		this.placeholder = $("#placeholder");
		this.chart = {
			offset : [],
			width: 600,
			height: 480,
			options: {
				grid: { color: "rgba(0,0,0,0.2)" },
				xaxis: {
					invert: true,
					min: 3, // 3
					max: 5.8 // 6.4
				},
				yaxis: {
					min: -6.5, //-11
					max: 6.5 //8
				}
			},
			holder: []
		}
		this.chart.holder = Raphael("placeholder", this.chart.width, this.chart.height),
		this.updateChart();

		this.sizeComparison = {
			// Raphael Script for star comparison
			paper: Raphael("rCanvas", 280, 390)
		}
		//draw sun
		this.sizeComparison.sun = this.sizeComparison.paper.circle(25, 200, 5);
		this.sizeComparison.sun.attr("fill", "#fff3ea");
		this.sizeComparison.sunLabel = this.sizeComparison.paper.text(25, 220, "Sun");
		this.sizeComparison.sunLabel.attr("fill", "#fff3ea");
		//draw comparison star
		this.sizeComparison.star = this.sizeComparison.paper.circle(50, 200, 5);
		this.sizeComparison.star.attr("fill", "#fff3ea");
		this.sizeComparison.starOffset;

	}

	StarInABox.prototype.findMassIndex = function(mass){
		for(var i = 0; i < this.massVM.length; i++){
			if(mass == this.massVM[i]){
				return i;
			}
		}
	}

	StarInABox.prototype.setupUI = function(){

		// Define if we can open the box or not
		$('#welcome').bind('mouseover',{box:this},function(e){ e.data.box.canopen = false; }).bind('mouseout',{box:this},function(e){ e.data.box.canopen = true; });

		$("#box-lid,#box-top").click({box:this},function(e){
			if(e.data.box.canopen) e.data.box.toggleLid();
		});
		
		$('a#animateEvolve').click({box:this},function(e){
			e.preventDefault();
			if($(this).text() == 'Start'){
				e.data.box.toggleAnimatePanel();
				if(e.data.box.inputopen) e.data.box.toggleInputPanel();
			}
		});
		
		//make nav divs clickable
		$("#nav .item").click(function(e){
			e.preventDefault();
			if($(this).hasClass("active")){
				//if already active
			}else{
				$("#nav .item").removeClass("active");	
				$(this).addClass("active");
				var sliderID = ($(this).attr("class").split(" "))[1];
				$("#slide").removeAttr("class");
				$("#slide").addClass("nav-"+sliderID);
			}
			
		});
	
		$("#right .info").click(function(){
			var clickedI = $(this);
			var clickedC = $(clickedI).siblings(".caption");
			if($(clickedI).hasClass("active")){
				$(clickedI).removeClass("active");
				$(clickedC).stop().animate({top:(0 - $(clickedC).outerHeight())},300);
			}else{
				$(clickedI).addClass("active");
				$(clickedC).stop().animate({top:0},300);
			}
		});
		
		$("#right .caption").each(function(){
			var mTop = $(this).outerHeight();
			$(this).css("top",(0 - mTop));
		});
		
		$('#lid-open a').click({box:this},function(e){ e.data.box.toggleLid(); });
	
		// add gradient to buttons after loading as it breaks the pre-loader!
		$("a#animateEvolve, a#animateEvolveReset").css("background","-webkit-gradient(linear, left top, left bottom, from(#ddd), to(#6b6b6b))");
		$("a#animateEvolve, a#animateEvolveReset").css("background","-moz-linear-gradient(top, #ddd, #6b6b6b)");

		// help & about
		$('#about').click({box:this},function(e){
			$('#welcome').removeClass('help').removeClass('summary').addClass('about');
			if(e.data.box.open) e.data.box.toggleLid();
			$('#welcome #about-content').css({opacity: 0}).animate({opacity: 1},500);
		});
		
		$('#help').click({box:this},function(e){
			$('#welcome').removeClass('about').removeClass('summary').addClass('help');
			if(e.data.box.open) e.data.box.toggleLid();
			$('#welcome #help-content').css({opacity: 0}).animate({opacity: 1},500);
		});
	
		// open/close input panel
		$("#input .tab-top").click({box:this},function(e){ e.data.box.toggleInputPanel(); });
		
		// open/close animate panel
		$("#animate .tab-bottom").click({box:this},function(e){ e.data.box.toggleAnimatePanel(); });



		//thermometer
		this.thermo = Raphael("thermometer", 280, 390);
		//333px is bottom of thermometer...
		this.thermoTemp = this.thermo.rect(123, 31, 10, 300);
		this.thermoTemp.attr("fill", "#CC0000");
		this.thermoTemp.attr("stroke", "");
		this.thermoImage = this.thermo.image("images/thermometer.png", 90, -12, 80, 400);
		var txtprops = {'text-anchor': 'start','fill': '#fff'};
		//labels
		var l1 = this.thermo.text(150, 28, "60,000 (K)").attr(txtprops);
		var l2 = this.thermo.text(150, 88, "48,000 (K)").attr(txtprops);
		var l3 = this.thermo.text(150, 148, "36,000 (K)").attr(txtprops);
		var l4 = this.thermo.text(150, 208, "24,000 (K)").attr(txtprops);
		var l5 = this.thermo.text(150, 268, "12,000 (K)").attr(txtprops);
		var l6 = this.thermo.text(150, 328, "0 (K)").attr(txtprops);
		ll = this.thermo.text(50, 200, "Temperature (Kelvin)").attr(txtprops);
		ll.rotate(-90);


		/**
		 *
		 *	EQ for Luminosity
		 *
		 **/

		this.rLum = Raphael("rlum", 280, 390);

		this.eqBg1 = this.rLum.image("images/eq-bg.png", 40, 20, 57, 354);
		this.eqBg2 = this.rLum.image("images/eq-bg.png", 105, 20, 57, 354);

		//add LEDs
		this.eq1 = [];
		this.eq2 = [];
		this.xLed = 22;
		this.eqCurrentLevel = 0;
		this.numBars = 0;
		this.totalBars = 20;
		this.initEqUp = '';
		this.initEqDown = '';

		for (var i = this.totalBars; i > 0; --i) {
			this.eq1[i] = this.rLum.image("images/eq-led.png", 40, this.xLed, 57, 29);
			this.eq2[i] = this.rLum.image("images/eq-led.png", 105, this.xLed, 57, 29);
			this.eq1[i].attr("opacity", "0.3");
			this.eq2[i].attr("opacity", "0.3");
			this.xLed = this.xLed + 17;
		}

		this.eq1[1].attr("opacity", "1");
		this.eq1[2].attr("opacity", "1");
		this.eq1[3].attr("opacity", "1");
		this.eq1[4].attr("opacity", "1");
		this.eq1[5].attr("opacity", "1");

		var le1 = this.rLum.text(170, 30, "1,000,000").attr(txtprops);
		var le2 = this.rLum.text(170, 115, "10,000").attr(txtprops);
		var le3 = this.rLum.text(170, 202, "100").attr(txtprops);
		var le4 = this.rLum.text(170, 285, "1").attr(txtprops);
		var le5 = this.rLum.text(170, 370, "0.001").attr(txtprops);
		ll = this.rLum.text(-34, 220, "Brightness (Luminosities)").attr(txtprops);
		ll.rotate(-90);

		this.createMassSlider();
		

		// animate evolution over selected stages
		$("#evolve").change({box:this},function evolveStar(e) {
			var el = e.data.box.getData();
			e.data.box.sizeComparison.star.attr("fill", el.RGB);
			e.data.box.sizeComparison.star.attr("stroke", "#000");
			e.data.box.setcomparisonStarSize(el.radius);
		});

		this.eAnim = '';

		$("a#animateEvolve").click({box:this},function (e) {
			var box = e.data.box;
			if(box.animating){
				clearInterval(box.eAnim);
				$("a#animateEvolve").text('Start');
				$("a#animateEvolveReset").css('display', '');
				box.animating = false;
			}else{
				box.animating = true;
				$("a#animateEvolveReset").css('display', 'none');
				if(box.timestep == box.eAnimPoints.length) $("a#animateEvolveReset").trigger('click');

				//animate through stages...
				$("a#animateEvolve").text('Pause');
				var duration = $("#evolveSpeed option:selected").attr("value");
				box.eAnim = setInterval(function () {
					if (box.timestep == box.eAnimPoints.length) {
						$("a#animateEvolve").text('Start');
						clearInterval(box.eAnim);
						$("a#animateEvolveReset").css('display', '');
						$("a#animateEvolveReset").css('display', 'n');
						box.timestep = box.stageIndex[box.sStart];
						box.animating = false;
					} else {
						el = box.getData();
						if(typeof el=="object"){
							if(box.timestep % box.reduction == 0 && box.timestep < box.data.data.length) {
								box.sizeComparison.star.animate({
									scale: [el.radius, el.radius, box.sizeComparison.starOffset],
									fill: el.RGB
								}, (duration*box.reduction));
								box.setThermometer(el.temp, (duration * box.reduction));
								if (box.eqCurrentLevel != Math.round(el.lum / 0.3) + 1) box.eqLevel(el.lum, true);
								box.updateCurrentStage();
							}
							box.el.time.text("Time: " + el.t + " Myrs");
							// In the case of 0 luminosity the y-value is returned as negative.
							// Don't change anything if that is the case.
							if(box.eAnimPoints[box.timestep][1] >= 0) {
								box.chart.star.animate({
									//path:box.getStarShape(box.eAnimPoints[box.iMod][0],box.eAnimPoints[box.iMod][1])
									cx: (box.eAnimPoints[box.timestep][0]),
									cy: (box.eAnimPoints[box.timestep][1])
								}, duration);
							}
						}
						box.timestep++;
					}
				}, duration);
			}
			return false;
		});

		$("a#animateEvolveReset").click({box:this},function(e){
			e.preventDefault();
			e.data.box.reset();
			return false;
		});


		//summary script
		//show summary
		$('#summary').click({box:this},function (e) {
			$('#welcome').removeClass('about').removeClass('help').addClass('summary');
			if(e.data.box.open) e.data.box.toggleLid();
			e.data.box.displaySummary();
		});

		this.el = {
			"time": $("#tevTime"),
		}

	}
	StarInABox.prototype.setThermometer = function(temp,duration){
		s = Math.min(temp / 60000,1.05);
		if(typeof duration=="number" && duration > 0) this.thermoTemp.animate({ scale: [1, s, 0, 343] }, duration);
		else this.thermoTemp.scale(1, s, 0, 343);
	}
	StarInABox.prototype.slideTo = function(p){
		//console.log('createMassSlider:change',p)
		var sMass = this.massVM[p];
		this.loadingStar();
		clearInterval(this.eAnim);
		//on change get stages for the mass of star!
		$('#stages .ui-slider').remove();
		this.getStages(sMass);
		this.loadChartData(sMass);
		this.stageLife = Array();
		this.stageIndex = Array();
		$("a#animateEvolve").text('Start');
		$("a#animateEvolveReset").css('display', '');
		this.el.time.text("Time: 0 Myrs");
		$('a#animationEvolveReset').trigger('click');
		this.reset();
	}

	StarInABox.prototype.createMassSlider = function(){
		//Add Mass Slider and set defaults
		var that = this;
		$("#mass-slider").slider({
			value: this.findMassIndex(this.initStarMass),
			min: 0,
			max: this.massVM.length - 1,
			step: 1,
			change: function (event, ui) { that.slideTo(ui.value); }
		});

		//add ticks
		$("#mass-slider").append('<div class="ticks"></div>');
		var i;
		var msLength = 700;
		var tickSpace = msLength / (this.massVM.length - 1);
		for (var i = 0; i < this.massVM.length; i++) {
			$("#mass-slider .ticks").append("<p class='tick'>" + this.massVM[i] + "</p>");
			$(".ticks p.tick:last").css('left', (i * tickSpace) - 20);
		}
	}
	StarInABox.prototype.toggleLid = function(){
		if(this.open){
			$("#box-lid").animate({"left": "0px"},1000,function(){
				//move #content to top
				$("#container").removeClass("open").addClass("closed");
				$("#box-lid").removeClass("open");
				$("#lid-open a").html('&lsaquo; Open the lid')
			});
			this.open = false;
		}else{
			//move content underneath lid then animate shut.
			$("#container").removeClass("closed").addClass("open");
			$("#box-lid").animate({"left": "-"+($('#box-lid').outerWidth()-30)+"px"},1000).addClass("open");
			$("#lid-open a").html('&rsaquo; Close the lid')
			this.open = true;
		}
	}
	StarInABox.prototype.toggleInputPanel = function(duration){
		if(typeof duration!="number") duration = 300;
		if(this.inputopen) $("#input").animate({"bottom": "-122px"}, duration).removeClass("open");
		else $("#input").animate({"bottom": "0px"}, duration).addClass("open");
		this.inputopen = !this.inputopen;
	}
	// toggle panels
	StarInABox.prototype.toggleAnimatePanel = function(duration){
		if(typeof duration!="number") duration = 300;
		if(this.animateopen) $("#animate").animate({"top": "-60px"}, duration);
		else $("#animate").animate({"top": "0px"}, duration);
		this.animateopen = !this.animateopen;
	}
		// get stages for current mass function

	StarInABox.prototype.getStages = function(mass){
		if(!this.allstages["m"+mass]) return;
		data = this.allstages["m"+mass];
		var sOptions = '';
		for (var i = 0; i < data.length; i++) {
			sOptions += '<option lum="' + data[i].lum + '" radius="' + data[i].radius + '" tev="' + data[i].t + '" temp="' + data[i].temp + '" rgb="' + data[i].RGB + '" label="' + data[i].type + '"value="' + this.stages[data[i].type] + '">' + this.stages[data[i].type] + '</option>';
		}
		$("select#first-stage").html(sOptions);
		$("select#last-stage").html(sOptions);
		$('#first-stage option:first').attr('selected', 'selected');
		$('#last-stage option:last').attr('selected', 'selected');
		this.setThermometer($("#first-stage option:selected").attr("temp"));
		this.eqLevel($("#first-stage option:selected").attr("lum"));


		//Load Stages Slider...
		var that = this;
		$('select.stages').selectToUISlider({
			labels: 16,
			sliderOptions: {
				change: function (event, ui) {
					clearInterval(that.eAnim);
					that.updateEvolve();
					that.resetStage()
					$("a#animateEvolve").text('Start');
					$("a#animateEvolveReset").css('display', '');
					$('a#animationEvolveReset').trigger('click');
				}
			}
		}).hide();
		this.loadChartData(mass);

	}
	StarInABox.prototype.eqLevel = function(num, anim) {
		var zero = 4;
		var units = 0.4;
		var bars = 20;

		if (num != null) {
			num = this.log10(num);
			this.numBars = num / units;
			this.numBars = Math.round(this.numBars) + zero;

			if (anim == true) this.eqChange();
			else {
				if(this.numBars >= 0) this.eqCurrentLevel = this.numBars;
				for (var i = 1; i <= this.totalBars; i++) {
					if(i <= this.numBars) this.eq2[i].attr('opacity', 1);
					else this.eq2[i].attr('opacity', 0.3);
				}
			}
		}
	}
	StarInABox.prototype.eqChange = function() {
		if(!this.eqCurrentLevel) this.eqCurrentLevel = 0;
		if(this.numBars > this.eqCurrentLevel){
			// eq2 is indexed from 1
			if(this.eqCurrentLevel >= 0){
				this.eq2[this.eqCurrentLevel+1].animate({ opacity: 1 }, 300);
				this.eqCurrentLevel++;
			}
		}
		if (this.numBars < this.eqCurrentLevel){
			// eq2 is indexed from 1
			if(this.eqCurrentLevel >= 0){
				this.eq2[this.eqCurrentLevel+1].animate({ opacity: 0.3 }, 300);
				this.eqCurrentLevel--;
			}
		}
		if(this.numBars != this.eqCurrentLevel && this.eqCurrentLevel >= 0) window.setTimeout(function(box){ box.eqChange(); },100,this);
	}

	StarInABox.prototype.reset = function(){
		clearInterval(this.eAnim);
		this.resetStage();
		$("a#animateEvolve").text('Start');
		this.updateCurrentStage();
	}
	StarInABox.prototype.resetStage = function(i){
		if(i){
			if(i < 1 || i > this.stageIndex.length) return;
		}else i = this.stageIndex[this.sStart];
		this.timestep = i;
		var first = this.getData();

		this.el.time.text("Time: " + first.t + " Myrs");
		this.sStarReset();
		this.setComparisonStar(this.stageIndex[i]);
		this.eqLevel(first.lum);
		this.setThermometer(first.temp);
		this.chart.star.attr("cx", (this.eAnimPoints[this.timestep][0]));
		this.chart.star.attr("cy", (this.eAnimPoints[this.timestep][1]));
	}
	StarInABox.prototype.assessStages = function() {
		this.sStart = 1;
		this.sEnd = 11;
		var that = this;
		$('#stages :selected').each(function (i) {
			v = parseInt($(this).attr('label'));
			if (i==0) that.sStart = v;
			else that.sEnd = v;
		});
		var ii = 0;
		var n = 0;
		var type = new Array(0, this.sStart);
		this.stageIndex[0] = 1;
		for (var i = 0; i < this.data.data.length; i++) {
			var eType = this.data.data[i].type;
			if (eType >= this.sStart && eType <= this.sEnd) {
				change = false;
				if (eType != type[1]) {
					type[1] = eType;
					type[0]++;
					ii = 0;
					change = true;
				}
				if(change) {
					if(!this.stageIndex[type[0]]) this.stageIndex[type[0]] = n;
					n = i;
				}
				if(!this.stageLife[type[0]]) this.stageLife[type[0]] = new Array();
				this.stageLife[type[0]][ii] = [this.data.data[i].type, this.stages[this.data.data[i].type], this.data.data[i].t];
				ii++;
			}
		}
	}
	
	/**
	 *
	 *	Generate Pie Chart for selected mass and range of lifecycle stages.
	 *
	 */
	StarInABox.prototype.createPie = function(){

		this.pieData = [];
		this.pieLegend = [];
		for (i = 0; i < this.stageLife.length; i++) {
			if(this.stageLife[i]){
				var sStart = this.stageLife[i][0][2];
				var sEnd = this.stageLife[i][(this.stageLife[i].length) - 1][2];
				var sValue = sEnd - sStart;
				var sLegend = this.stageLife[i][0][1];
				this.pieLegend.push(sLegend);
				this.pieData.push(sValue);
			}
		}
		//raphael script for pie chart...
		if ($("#rPie #pie").children().size() > 0) {
			$("#rPie #pie").children().remove();
		}

		this.rPie = Raphael("rPie");
		this.rPie.g.txtattr.font = "12px 'Fontin Sans', Fontin-Sans, sans-serif";

		this.pie = this.rPie.g.piechart(140, 130, 100, this.pieData, {
			legend: this.pieLegend,
			legendpos: "south",
			legendcolor: "#FFF"
		});
		this.pie.hover(function () {
			this.sector.stop();
			this.sector.scale(1.1, 1.1, this.cx, this.cy);
			if (this.label) {
				this.label[0].stop();
				this.label[0].scale(1.5);
				this.label[1].attr({ "font-weight": 800 });
			}
		}, function () {
			this.sector.animate({ scale: [1, 1, this.cx, this.cy] }, 500, "bounce");
			if (this.label) {
				this.label[0].animate({ scale: 1 }, 500, "bounce");
				this.label[1].attr({ "font-weight": 400 });
			}
		});
	}
	StarInABox.prototype.loadChartData = function(mass) {
		var dataurl = "db/star_"+mass+"_solar_mass.json";

		$.ajax({
			url: dataurl,
			method: 'POST',
			dataType: 'json',
			context: this,
			error: function(blah){
				console.log('Arghh!');
			},
			success: function(data){
				//console.log('getEvolver ',data)
				this.data = data;
				this.rebuildCharts();
			}
		});
	}
	StarInABox.prototype.rebuildCharts = function() {
		this.assessStages();
		this.setComparisonStar(0);
		this.createPie();
		this.updateCurrentStage();
		this.doneLoadingStar();
		this.updateChart();
	}
	
	StarInABox.prototype.setComparisonStar = function(i) {
		if(!i) i = 0;
		if(i > this.data.data.length) return;
		var d = this.getData(i);
		if(typeof d=="object"){
			this.setcomparisonStarSize(d.radius);
			this.setcomparisonStarColour(d.RGB);
		}
	}
	StarInABox.prototype.setcomparisonStarSize = function(sm) {
		//var size = sm * 9.1;
		this.sizeComparison.starOffset = 45;
		this.sizeComparison.star.scale(sm, sm, this.sizeComparison.starOffset);
	}
	StarInABox.prototype.setcomparisonStarColour = function(value) {
		this.sizeComparison.star.attr("fill", value);
	}
	StarInABox.prototype.sStarReset = function() {
		this.sizeComparison.star.remove();
		this.sizeComparison.star = this.sizeComparison.paper.circle(50, 200, 5);
	}
	StarInABox.prototype.log10 = function(v) {
		return Math.log(v)/2.302585092994046;
	}
	StarInABox.prototype.getPixPos = function(x,y){
		x = this.log10(x);
		y = this.log10(y);
		xr = this.chart.options.xaxis.max-this.chart.options.xaxis.min;
		yr = this.chart.options.yaxis.max-this.chart.options.yaxis.min;
		newx = this.chart.offset.left + this.chart.offset.width*(Math.abs(this.chart.options.xaxis.max-x)/xr);
		if(y < this.chart.options.yaxis.min) return [newx,-1];
		else return [newx,480-(this.chart.offset.bottom + this.chart.offset.height*((y-this.chart.options.yaxis.min)/yr))];
	}
	StarInABox.prototype.getChartOffset = function(){
		this.chart.offset.top = 1;
		this.chart.offset.left = 20;//62;
		this.chart.offset.right = 1;
		this.chart.offset.bottom = 20;//18;
		this.chart.offset.width = this.chart.width-this.chart.offset.right-this.chart.offset.left;
		this.chart.offset.height = this.chart.height-this.chart.offset.bottom-this.chart.offset.top;
	}
	StarInABox.prototype.updateChart = function() {
		this.getChartOffset();
		if(!this.chart.mainSequence){
			c = Math.pow(10,-23.2);
			m = Math.pow(10,6.1);
			p1 = this.getPixPos(3000,m*3000+c);
			p2 = this.getPixPos(70000,m*70000+c);
			mid = this.getPixPos(10000,m*10000+c);
			this.chart.mainSequence = this.chart.holder.path("M"+p1[0]+","+p1[1]+"L"+p2[0]+","+p2[1]).attr({
				stroke : "rgba(255, 0, 0, 0.5)",
				"stroke-width": 30,
				"stroke-linecap" : "round"
			});
			this.chart.mainSequenceLabel = this.chart.holder.text(mid[0],mid[1],"Main Sequence").attr({ fill: "white",'font-size': '14px','text-anchor':'middle' }).rotate(Raphael.angle(p1[0],p1[1],p2[0],p2[1]));
		}
		//if(!this.chart.border) this.chart.border = this.chart.holder.rect(0,0,this.chart.width,this.chart.height).attr({stroke:'rgba(0,0,0,0.2)'});
		if(!this.chart.axes) this.chart.axes = this.chart.holder.rect(this.chart.offset.left,this.chart.offset.top,this.chart.offset.width,this.chart.offset.height).attr({stroke:'rgba(0,0,0,0.5)','stroke-width':2});
		if(!this.chart.yLabel) this.chart.yLabel = this.chart.holder.text(this.chart.offset.left - 10, this.chart.offset.top+(this.chart.offset.height/2), "Brightness (L0)").attr({"rotation": "270", fill: "black",'font-size': '12px' });
		if(!this.chart.yaxis){
			this.chart.yaxis = this.chart.holder.set();
/*			for (var i = Math.ceil(this.chart.options.yaxis.min); i <= Math.floor(this.chart.options.yaxis.max); i++) {
				p1 = this.getPixPos(this.chart.options.xaxis.max,i);
				p2 = this.getPixPos(this.chart.options.xaxis.min,i);
				this.chart.yaxis.push(this.chart.holder.path("M"+p1[0]+","+p1[1]+"L"+p2[0]+","+p2[1]).attr({ stroke: this.chart.options.grid.color,'stroke-width':0.5}));
				this.chart.yaxis.push(this.chart.holder.text(p1[0]+5,p1[1],addCommas(Math.pow(10, i))).attr({
					'text-anchor': 'start',
					'fill': "rgba(0, 0, 0, 0.5)",
					'font-size': '11px'
				}));
			}*/
		}
		if(!this.chart.xLabel) this.chart.xLabel = this.chart.holder.text(this.chart.offset.left+this.chart.offset.width/2, this.chart.height-this.chart.offset.bottom + 10, "Temperature (K)").attr({ fill: "black",'font-size': '12px' });
		if(!this.chart.xaxis){
			this.chart.xaxis = this.chart.holder.set();
			/*
			for (var i = Math.ceil(this.chart.options.xaxis.min); i <= Math.floor(this.chart.options.xaxis.max); i++) {
				p1 = this.getPixPos(i,this.chart.options.yaxis.min);
				p2 = this.getPixPos(i,this.chart.options.yaxis.max);
				this.chart.xaxis.push(this.chart.holder.path("M"+p1[0]+","+p1[1]+"L"+p2[0]+","+p2[1]).attr({ stroke: this.chart.options.grid.color,'stroke-width':0.5}));
				this.chart.xaxis.push(this.chart.holder.text(p1[0],p1[1]-10,addCommas(Math.pow(10, i))).attr({
					'text-anchor': (i == Math.ceil(this.chart.options.xaxis.min)) ? "end" : 'middle',
					'fill': "rgba(0, 0, 0, 0.5)",
					'font-size': '11px'
				}));
			}*/
		}

		if(this.data.data) {
			this.eAnimPoints = [];
			str = "";
			strshadow = "";
			for (var i in this.data.data) {
				var ii = this.getPixPos(this.data.data[i].temp,this.data.data[i].lum);
				if(ii[1] > 0){
					str += (i == 0) ? "M" : "L";
					str += ii[0]+','+ii[1];
					strshadow += (i == 0) ? "M" : "L";
					strshadow += (ii[0]-1)+','+(ii[1]-1);
				}
				this.eAnimPoints.push(ii);
			}
			if(this.starPath) this.starPath.remove();
			if(this.starPathShadow) this.starPathShadow.remove();
			if(strshadow) this.starPathShadow = this.chart.holder.path(strshadow).attr({stroke:'rgba(0,0,0,0.2)','stroke-width':3,'stroke-dasharray':'-'});
			if(str) this.starPath = this.chart.holder.path(str).attr({stroke:'#ffcc00','stroke-width':2,'stroke-dasharray':'-'});

			if(this.chart.star) this.chart.star.remove();
			s = this.stageIndex[this.sStart];
			this.chart.star = this.chart.holder.circle((this.eAnimPoints[s][0]), (this.eAnimPoints[s][1]), 5).attr("fill", "#000000");

			//print Solar Mass Value onto Graph!
			if(this.massLabel) this.massLabel.remove();
			this.massLabel = this.chart.holder.text((this.chart.offset.left + 8), (this.chart.offset.top + 22), this.data.mass).attr({
				'text-anchor': 'start',
				'fill': '#000',
				'font-size': '40px',
				'font-weight': 'bold'
			});
			var mlBB = this.massLabel.getBBox();
			if(this.massLabel1) this.massLabel1.remove();
			this.massLabel1 = this.chart.holder.text((mlBB.x + mlBB.width + 2), (this.chart.offset.top + 32), "Solar Mass" + ((this.data.mass != 1) ? 'es' : '')).attr({
				'text-anchor': 'start',
				'fill': '#000',
				'font-size': '12px'
			});
		}
	};
	StarInABox.prototype.getStarShape = function(x,y,r,n){
		if(!n) n = 4;	// number of points
		if(!r) r = 8;
		r2 = r*0.3;
		p = "M"+x.toFixed(1)+" "+(y).toFixed(1)+"M"+x.toFixed(1)+" "+(y+r).toFixed(1)+"";
		var da = 2*Math.PI/n;
		var ang = 0;
		for(var i = 0; i <= n ; i++){
			x1 = x + Math.cos(ang+da/2)*r2;
			y1 = y + Math.sin(ang+da/2)*r2;
			x2 = x + Math.cos(ang+da)*r;
			y2 = y + Math.sin(ang+da)*r;
			p += "L"+(x1).toFixed(2)+" "+(y1).toFixed(2)+"L"+(x2).toFixed(2)+" "+(y2).toFixed(2);
			ang += da;
		}
		p += "Z";
		return p;
	}
	StarInABox.prototype.updateEvolve = function() {
		this.assessStages();
		this.timestep = this.stageIndex[this.sStart];
		this.createPie();
		this.updateCurrentStage();
	}
	StarInABox.prototype.loadingStar = function() {
		$('#loader').removeClass('done').addClass('loading').width($(window).width()).height($(window).height()).html('<div id="loading">Your star is being prepared.</p><p>Please wait...</p>');
	}
	StarInABox.prototype.doneLoadingStar = function() {
		$('#loader').html('').removeClass('loading').addClass('done');
		this.updateSummary();
	}
	StarInABox.prototype.getData = function(i) {
		if(!i) i = this.timestep;
		return this.data.data[i];
	}
	StarInABox.prototype.updateCurrentStage = function() {
		el = this.getData();
		if(typeof el=="object") $('#current-stage').html('<strong>Stage:</strong> ' + this.stages[el.type]);
	}
	StarInABox.prototype.updateSummary = function() {
		$('#welcome #summary-content').html(this.generateSummary());
	}
	StarInABox.prototype.displaySummary = function() {
		$('#welcome').removeClass('help').removeClass('about').addClass('summary');
		$('#welcome #summary-content').css({opacity: 0}).animate({opacity: 1},500);
	}
	StarInABox.prototype.generateSummary = function() {
		var sOutput = "<h1>Summary</h1>";
		sOutput += "<p>This is a summary of the star that is currently selected.</p>"
		sOutput += '<p><span class="label">Mass: </span><span class="result">' + this.data.mass + ' Solar mass'+((this.data.mass==1) ? '':'es')+'</span></p>';
		sOutput += '<div id="summary-table"><table border="1"><tr>';
		sOutput += '<th>Stage</th>';
		sOutput += '<th>Radius (R<sub>Sun</sub>)</th>';
		sOutput += '<th>Luminosity (L<sub>Sun</sub>)</th>';
		sOutput += '<th>Temperature (K)</th>';
		sOutput += '<th>Duration (Myr)</th>';
		sOutput += '</tr>';

		var j = 0;
		for (var i in this.stageLife) {
			var sStart = this.stageLife[i][0][2];
			var sEnd = this.stageLife[i][(this.stageLife[i].length) - 1][2];
			var sValue = sEnd - sStart;
			j += this.stageLife[i].length
			el = this.getData(j-1);
			if(typeof el=="object"){
				sOutput += '<tr>';
				sOutput += '<td>' + this.stages[el.type] + '</td>'; //Stage Name
				sOutput += '<td>' + roundNumber(el.radius, 2) + '</td>';
				sOutput += '<td>' + roundNumber(el.lum, 2) + '</td>';
				sOutput += '<td>' + roundNumber(el.temp, 2) + '</td>';
				sOutput += '<td>' + roundNumber(sValue, 2) + '</td>';
				sOutput += '</tr>';
			}
		}
		sOutput += '</table></div>';
		sOutput += '<div id="downloads">Download data as: <a href="db/csv.php?s='+this.data.mass+'">CSV</a></div>';
		return sOutput;
	}

	function roundNumber(num, dec) {
		var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
		return result;
	}
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
	function getNearestNumber(a, n){
		var closest = null;
    	for(i = 0; i < a.length; i++){
    		if(closest == null || Math.abs(a[i] - n) < Math.abs(closest - n)){
    			closest = a[i];
    		}
    	}
    	return closest;
	}

	box = new StarInABox();

}); //ready.function