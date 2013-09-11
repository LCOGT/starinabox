/*
 *
 *	Star in a Box. Developed by Jon Yardley - October 2011
 *  Refactoring by Stuart Lowe - February 2012
 *  Updating following school testing - September 2013
 *
 */

// Elements with the class "accessible" are intended for people who don't 
// have Javascript enabled. If we are here they obviously do have Javascript.
document.write('<style type="text/css">.accessible { display: none; } .jsonly { display: block; }</style>');

$(document).ready(function () {

	$("body").queryLoader2();

	/*@cc_on
	// Fix for IE's inability to handle arguments to setTimeout/setInterval
	// From http://webreflection.blogspot.com/2007/06/simple-settimeout-setinterval-extra.html
	(function(f){
		window.setTimeout =f(window.setTimeout);
		window.setInterval =f(window.setInterval);
	})(function(f){return function(c,t){var a=[].slice.call(arguments,2);return f(function(){c.apply(this,a)},t)}});
	@*/
	// Page PreLoader

	function StarInABox(inp){
		this.canopen = true;
		this.open = false;
		this.inputopen = false;
		this.animateopen = false;

		this.massVM = [0.2, 0.65, 1, 2, 4, 6, 10, 20, 30, 40];
		// The stages indices must match indices used in the data
		this.stages = ["Deeply or fully convective low mass MS star","Main Sequence star","Hertzsprung Gap","Red Giant Branch","Core Helium Burning","Asymptotic Giant Branch","Thermally-pulsing Asymptotic Giant Branch","Main Sequence Naked Helium star","Wolf-Rayet star","Giant Branch Wolf-Rayet star","Helium White Dwarf","Carbon/Oxygen White Dwarf","Oxygen/Neon White Dwarf","Neutron Star","Black Hole","Massless Supernova"];
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
		// array for animation data points...
		this.eAnimPoints = [];
		this.timestep = 0;
		this.temperature = 0;
		this.animating = false;
		this.reduction = 5;	// A slower framerate for the size/thermometer animations

		//GET URL if one is passed
		this.fullurl = parent.document.URL;
		this.urlquery = Array;
		this.urlquery = this.fullurl.substring(this.fullurl.indexOf('?')+1, this.fullurl.length).split('=');
		this.initStarMass = (this.urlquery.length == 0 || this.urlquery[0] != 's') ? 1 : getNearestNumber(this.massVM, parseInt(this.urlquery[1]));

		/**
		 *	Set Chart variables
		 **/
		this.data = [];
		this.chart = {
			'offset' : {
				top: 7,
				left : 25,//62;
				right : 0,
				bottom : 46//18
			},
			'width': 600,
			'height': 492,
			'opts': {
				'color': ($('#placeholder').length > 0 ? $('#placeholder').css('color') : "black"),
				'mainsequence' : {
					'color' : "#3366dd",
					'opacity' : 1
				},
				'grid': {
					'color': "rgb(0,0,0)",
					'opacity': 0.25,
					'width': "0.5",
					'sub': {
						'color': "rgb(0,0,0)",
						'opacity': 0.08,
						'width': "0.5"
					},
					'label': {
						'opacity' : 1
					}
				},
				'xaxis': {
					'invert': true,
					'min': 3, // 3
					'max': 5.85, // 6.4
					'label': {
						'opacity': 1
					}
				},
				'yaxis': {
					'min': -6.4, //-11
					'max': 6.5, //8
					'label': {
						'opacity' : 1
					}
				}
			},
			'holder': []
		}

		this.chart.holder = Raphael("placeholder", this.chart.width, this.chart.height),
		this.sizeComparison = {
			// Raphael Script for star comparison
			'paper': Raphael("rCanvas", 280, 390),
			'starX': 50,
			'starY': 200,
			'starR': 5,
			'starOffset': 45
		}
		this.massComparison = { 
			'r': this.sizeComparison.starR,
			'x': 140,
			'y': 250,
			'offset':this.sizeComparison.starOffset
		}
		if ($("#rScales #scales").length > 0) $("#rScales #scales").remove();
		this.rScales = Raphael("rScales");
		//draw sun
		this.sizeComparison.sun = this.sizeComparison.paper.circle(25, 200, 5).attr({"fill":"#fff3ea","stroke-width":"0"});
		this.sizeComparison.sunLabel = this.sizeComparison.paper.text(25, 220, "Sun").attr("fill", "#fff3ea");
		//draw comparison star
		this.sizeComparison.star = this.sizeComparison.paper.circle(this.sizeComparison.starX+this.sizeComparison.starR, this.sizeComparison.starY, this.sizeComparison.starR).attr({"fill":"#fff3ea","stroke-width":"0"});
		this.massComparison.star = this.rScales.circle(this.massComparison.x+this.massComparison.r, this.massComparison.y, this.massComparison.r).attr({"fill":"#fff3ea","stroke-width":"0"});

		this.setupUI();

		// get default stages (1 solar mass)
		this.getStages(this.initStarMass);

		this.updateChart();


	}
	StarInABox.prototype.findMassIndex = function(mass){
		for(var i = 0; i < this.massVM.length; i++){
			if(mass == this.massVM[i]) return i;
		}
		return 0;
	}
	StarInABox.prototype.setupUI = function(){
		// Define if we can open the box or not
		$('#welcome').bind('mouseover',{box:this},function(e){ e.data.box.canopen = false; }).bind('mouseout',{box:this},function(e){ e.data.box.canopen = true; });
		$("#box-lid").click({box:this},function(e){
			if(e.data.box.canopen) e.data.box.toggleLid();
		});
		$(document).bind('keypress',{box:this},function(e){
			if(!e) e=window.event;
			box = e.data.box;
			var code = e.keyCode || e.charCode || e.which || 0;
			var c = String.fromCharCode(code).toLowerCase();
			if(code==32) box.play();
			else if(code == 37 /* left */){ box.animateStep(-1); }
			else if(code == 39 /* right */){ box.animateStep(1); }
			if(c == 'w'){ box.supernovaWarning(); }
			if(c == 's'){ box.supernova(); }
			if(c == 'l'){ box.toggleLid(); }
		});
		
		//make nav divs clickable
		$("#nav .item").click(function(e){
			e.preventDefault();
			if($(this).hasClass("active")){
				//if already active
			}else{
				el = $($(this).attr('href'));
				$("#nav .item").removeClass("active");	
				$(this).addClass("active");
				var sliderID = (el.attr("class").split(" "))[1];
				$("#slide").css({top:-((sliderID-1)*400)+"px"});
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
		if($.browser == "webkit" || $.browser == "safari") $("a#animateEvolve, a#animateEvolveReset").css("background","-webkit-gradient(linear, left top, left bottom, from(#ddd), to(#6b6b6b))");
		if($.browser == "mozilla") $("a#animateEvolve, a#animateEvolveReset").css("background","-moz-linear-gradient(top, #ddd, #6b6b6b)");

		// help
		$('#help').click({box:this},function(e){
			$('#welcome').removeClass('summary').addClass('help');
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
		var ll = this.thermo.text(50, 200, "Temperature (Kelvin)").attr(txtprops);
		ll.rotate(-90);

		// Luminosity meter
		this.rLum = Raphael("rlum", 280, 390);
		//this.eqBg1 = this.rLum.image("images/eq-bg.png", 40, 20, 57, 354);
		this.eqBg2 = this.rLum.image("images/eq-bg.png", 105, 20, 57, 354);
		//add LEDs
		//this.eq1 = [];
		this.eq2 = [];
		this.xLed = 22;
		this.eqCurrentLevel = 0;
		this.numBars = 0;
		this.totalBars = 20;
		this.initEqUp = '';
		this.initEqDown = '';

		for (var i = this.totalBars; i > 0; --i) {
			//this.eq1[i] = this.rLum.image("images/eq-led.png", 40, this.xLed, 57, 29);
			this.eq2[i] = this.rLum.image("images/eq-led.png", 105, this.xLed, 57, 29);
			//this.eq1[i].attr("opacity", "0.3");
			this.eq2[i].attr("opacity", "0.3");
			this.xLed = this.xLed + 17;
		}

		//this.eq1[1].attr("opacity", "1");
		//this.eq1[2].attr("opacity", "1");
		//this.eq1[3].attr("opacity", "1");
		//this.eq1[4].attr("opacity", "1");
		//this.eq1[5].attr("opacity", "1");

		var le1 = this.rLum.text(170, 30, "1,000,000").attr(txtprops);
		var le2 = this.rLum.text(170, 115, "10,000").attr(txtprops);
		var le3 = this.rLum.text(170, 202, "100").attr(txtprops);
		var le4 = this.rLum.text(170, 285, "1").attr(txtprops);
		var le5 = this.rLum.text(170, 370, "0.001").attr(txtprops);
		ll = this.rLum.text(20, 220, "Brightness (Solar luminosities)").attr(txtprops);
		ll.rotate(-90);

		this.createMassSlider();
		

		// animate evolution over selected stages
		$("#evolve").change({box:this},function evolveStar(e) {
			var el = e.data.box.getData(e.data.box.timestep);
			e.data.box.sizeComparison.star.attr("fill", el.RGB);
			e.data.box.setcomparisonStarSize(el.radius);
		});

		this.eAnim = '';

		$('a.control_play').click({box:this},function (e) {
			e.preventDefault();
			e.data.box.play();
		});
		$("a.control_reset").click({box:this},function(e){
			e.preventDefault();
			e.data.box.reset();
		});
		$("a.control_rewind").click({box:this},function(e){
			e.preventDefault();
			e.data.box.animateStep(-1);
		});
		$("a.control_ff").click({box:this},function(e){
			e.preventDefault();
			e.data.box.animateStep(+1);
		});

		//show summary
		$('#summary').click({box:this},function (e) {
			$('#welcome').removeClass('help').addClass('summary');
			if(e.data.box.open) e.data.box.toggleLid();
			e.data.box.displaySummary();
		});

		this.el = {
			"time": $("#tevTime"),
			"stagelabel": $('#current-stage')
		}
	}
	StarInABox.prototype.supernova = function(){
		c = $('#container');
		b = $('#box-top');
		if($('.supernova').length == 0) $('#container').append('<div class="supernova"></div>');
		if(this.open){
			if($('.supernovaflash').length == 0) $('body').append('<div class="supernovaflash"></div>');
			$('.supernovaflash').clearQueue().css({position:'absolute',left:0,top:0,right:0,bottom:0,opacity:1}).animate({opacity:0},500,function() { $(this).remove(); });
		}
		$('.caution').hide();
		$('.supernova').clearQueue().css({position:'absolute',width:c.width()-10,left:5,top:5,height:c.height()-10,'z-index':(b.css('z-index')-2),opacity:1}).delay(200).animate({opacity:0},1500,"easeOutExpo",function() { $(this).remove(); });
		c.clearQueue().css({left:'0px'}).animate({left:"-=12px"},20).animate({left:"+=20px"},20).animate({left:"-=4px"},50).animate({left:"+=7px"},50).animate({left:"-=15px"},50).animate({left:"+=5px"},70).animate({left:"-=2px"},80);
	}
	StarInABox.prototype.supernovaWarning = function(){
		c = $('#container');
		b = $('#box-top');
		if($('.caution').length == 0) $('#container').append('<div class="caution"></div>');
		$('.caution').show().css({top:"0px"}).animate({top: "30px"},500,function(){ setTimeout("$('.caution').hide()",7000); });
	}
	StarInABox.prototype.play = function(e){
		if(this.animating){
			clearInterval(this.eAnim);
			$("a#animateEvolve").text('Start');
			$("a#animateEvolveReset").css('display', '');
			$("a.control_play img.pause").removeClass('pause').addClass('play');
			this.animating = false;
		}else{
			this.animating = true;
			this.closeAnimatePanel();
			if(this.inputopen) this.toggleInputPanel();
			$("a#animateEvolveReset").css('display', 'none');
			if(this.timestep == this.eAnimPoints.length-1) this.reset();

			//animate through stages...
			$("a#animateEvolve").text('Pause');
			this.duration = $("#evolveSpeed option:selected").attr("value");
			var _obj = this;
			this.eAnim = setInterval(function () { _obj.animateStep(1,_obj.reduction); }, this.duration);
			$("a.control_play img.play").removeClass('play').addClass('pause');
		}
		return false;
	}
	StarInABox.prototype.animateStep = function(delta,reduction){
		duration = this.duration;
		if(!reduction) reduction = 1;
		if(!this.timestep){ this.timestep = 0; }
		this.timestep += delta;

		if(this.timestep >= this.eAnimPoints.length){
			$("a#animateEvolve").text('Start');
			clearInterval(this.eAnim);
			$("a#animateEvolveReset").css('display', '');
			$("a#animateEvolveReset").css('display', 'n');
			$("a.control_play img.pause").removeClass('pause').addClass('play');
			if(delta > 0) this.timestep = this.eAnimPoints.length-1;
			//this.timestep = this.stageIndex[this.sStart];
			this.animating = false;
		} else {
			if(this.timestep < 0) this.timestep = 0;
			el = this.getData(this.timestep);
			if(typeof el=="object"){
				if(this.data.data[this.timestep].type > 10){
					if(this.data.data[this.timestep].type != this.data.data[this.timestep-1].type){
						if(this.data.data[this.timestep].type > 11) this.supernova();
					}
				}
				var ahead = this.timestep + 100;
				if(ahead < this.data.data.length){
					if(ahead == this.stageIndex[this.stageIndex.length-1] && this.data.data[ahead].type > 11) this.supernovaWarning();
				}
				if(this.timestep % reduction == 0){
					if(this.timestep < this.data.data.length) {
						r = this.sizeComparison.starR*el.radius
						this.sizeComparison.star.animate({
							cx: (this.sizeComparison.starX+r),
							r: r,
							fill: el.RGB
						}, (duration*reduction));
						this.massComparison.star.animate({
							cy: (this.massComparison.y-r),
							r: r,
							fill: el.RGB
						}, (duration*reduction));
						this.setThermometer(el.temp);
						this.eqLevel(el.lum, true);
						this.updateCurrentStage();
					}
				}
				this.updatePie();
				this.updateScaleText();
				this.displayTime(el.t);
				// In the case of 0 luminosity the y-value is returned as negative.
				if(this.eAnimPoints[this.timestep][1] < 0 || this.eAnimPoints[this.timestep][0] < 0) {
					this.chart.star.attr({ cx: (-20), cy: (-20) });
				}else{
					this.chart.star.attr({ cx: (this.eAnimPoints[this.timestep][0]), cy: (this.eAnimPoints[this.timestep][1]) });
				}
			}
		}
	}
	StarInABox.prototype.setThermometer = function(temp){
		s = Math.min(temp / 60000,1.05);
		//if(typeof duration=="number") this.thermoTemp.animate({ transform: "s1,"+s+",0,343" }, duration);
		//else 
		this.thermoTemp.transform("s1,"+s+",0,343");
	}
	StarInABox.prototype.slideTo = function(p){
		clearInterval(this.eAnim);
		var sMass = this.massVM[p];
		this.loadingStar();
		//on change get stages for the mass of star!
		this.getStages(sMass);
		this.stageLife = Array();
		this.stageIndex = Array();
		
		$("a#animateEvolve").text('Start');
		$("a#animateEvolveReset").css('display', '');
		this.displayTime(0);
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
			$("#mass-slider .ticks p.tick:last").css('left', (i * tickSpace) - 20);
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
			$("#lid-open a").html('&rsaquo; Close the lid');
			this.open = true;
		}
	}
	StarInABox.prototype.toggleInputPanel = function(duration){
		if(typeof duration!="number") duration = 300;
		if(this.inputopen) $("#input").animate({"bottom": "-138px"}, duration).removeClass("open");
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
	StarInABox.prototype.closeAnimatePanel = function(duration){
		if(typeof duration!="number") duration = 300;
		if(!this.animateopen) return;
		$("#animate").animate({"top": "-60px"}, duration);
		this.animateopen = false;
	}
	// get stages for current mass function
	StarInABox.prototype.getStages = function(mass){
		if(!this.allstages["m"+mass]) return;
		var data = this.allstages["m"+mass];
		var that = this;
		$("#stages").slider("destroy").html('').slider({
			value: 0,
			min: 0,
			max: data.length-1,
			change: function (event, ui) { that.slideStages(); }
		});
		//add ticks
		$("#stages").append('<div class="ticks"></div>');
		var i;
		var msLength = 700;
		var tickSpace = msLength / (data.length - 1);
		for (var i = 0; i < data.length; i++) {
			$("#stages .ticks").append("<p class='tick' style='left:"+((i * tickSpace) - 40)+"px;'>" + this.stages[data[i].type] + "</p>");
		}

		this.loadChartData(mass);
	}
	StarInABox.prototype.slideStages = function(p){
		clearInterval(this.eAnim);
		this.resetStage();
		this.updateEvolve();
		$("a#animateEvolve").text('Start');
		$("a#animateEvolveReset").css('display', '');
	}

	StarInABox.prototype.eqLevel = function(num, anim) {
		var zero = 5;
		var units = 0.4;
		var bars = 20;
		var n;
		if (num != null) {
			n = Math.round(this.log10(num) / units) + zero;

			if(this.numBars != n){
				this.numBars = n;
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
	}
	StarInABox.prototype.eqChange = function() {
		if(!this.eqCurrentLevel || this.eqCurrentLevel < 0) this.eqCurrentLevel = 0;
		if(this.numBars == this.eqCurrentLevel) return;
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
		this.assessStages();
		if(i){
			if(i < 1 || i > this.stageIndex.length) return;
		}else i = this.stageIndex[this.sStart];
		this.timestep = (typeof i=="number") ? i : this.data.data.length-1;
		if(this.timestep == this.data.data.length) this.timestep = this.data.data.length - 1;

		var first = this.getData(this.timestep);
		if(typeof first=="object"){
			this.displayTime(first.t);
			this.sStarReset();
			this.setComparisonStar(this.stageIndex[i]);
			this.eqLevel(first.lum);
			this.setThermometer(first.temp);
			this.updatePie();
			this.createScales();
		}
		this.chart.star.attr("cx", (this.eAnimPoints[this.timestep][0]));
		this.chart.star.attr("cy", (this.eAnimPoints[this.timestep][1]));
	}
	StarInABox.prototype.assessStages = function() {
		if(!this.data.data) return;
		if(!this.allstages["m"+this.data.mass]) return;
		var that = this;
		var ii = 0;
		var n = 0;
		var type = new Array(0, this.data.data[0].type);
		this.stageIndex = [0];
		var eType,change
		for (var i = 0; i < this.data.data.length; i++) {
			eType = this.data.data[i].type;
			change = false;
			if (eType != type[1] || i == this.data.data.length-1) {
				type[1] = eType;
				type[0]++;
				ii = 0;
				change = true;
				if(!this.stageIndex[type[0]]) this.stageIndex[type[0]] = n;
				n = i;
			}
			if(!this.stageLife[type[0]]) this.stageLife[type[0]] = new Array();
			this.stageLife[type[0]][ii] = [this.data.data[i].type, this.stages[this.data.data[i].type], this.data.data[i].t];
			ii++;
		}
		this.sStart = 1;
		this.sEnd = 11;
		this.sStart = $('#stages').slider("value")+1;
		if(typeof data=="object") this.sEnd = data[data.length - 1].type
	}
	/**
	 *
	 *	Generate Pie Chart for selected mass and range of lifecycle stages.
	 *
	 */
	StarInABox.prototype.createPie = function(){
		this.pieData = new Array();
		this.pieLegend = new Array();
		for (var i = 1 ; i < this.stageIndex.length-1 ; i++){
			var s = this.getData(this.stageIndex[i]);
			var n = (i < this.stageIndex.length-1) ? this.stageIndex[i+1]-1 : this.data.data.length-1;
			var e = this.getData(n);
			this.pieLegend[i-1] = this.stages[s.type];
			this.pieData[i-1] = (e.t-s.t);
		}
		//raphael script for pie chart...
		if ($("#rPie #pie").length > 0) $("#rPie #pie").remove();
		this.rPie = Raphael("rPie");
		this.pie = this.rPie.piechart(140,130,100,{values:this.pieData,labels:this.pieLegend},{});
		this.updatePie();
	}
	StarInABox.prototype.updatePie = function(){
		radius = 100*0.7;
		total = 324;
		t = this.data.data[this.timestep].t;
		total = this.data.data[this.stageIndex[this.stageIndex.length-1]].t;
		if(t > total) t = total;
		if(t < 0) t = 0;
		a = -Math.PI/2 + Math.PI*2*t/total;
		x = (radius * Math.cos(a));
		y = (radius * Math.sin(a));
		if(this.clockhand) this.clockhand.remove();
		this.clockhand = this.rPie.set();
		this.clockhand.push(this.rPie.path("M 140 130 l "+x+" "+y).attr({'stroke':'white','stroke-width':4,'stroke-linecap':'round'}));
		this.clockhand.push(this.rPie.circle(140+x,130+y,6).attr({'fill':'white','stroke-width':0}));
	}
	StarInABox.prototype.createScales = function(){
		if(!this.rScales) return;
		if(!this.scales){
			var ox = 140;
			var oy = 250;
			var h = 10;
			var w = 80;
			var t = 4;
			this.balance = this.rScales.set();
			this.balance.push(this.rScales.path("M"+(ox-w*1.2-h)+" "+(oy-h)+" l "+h+" "+h+", "+(w*2.4)+" 0, "+h+" -"+h).attr({'stroke':'white','stroke-width':t,'stroke-linecap':'round'}));
			this.balance.push(this.rScales.rect(ox-w/4,oy,w/2,w/2).attr({'fill':'white','fill-opacity':0.5,'stroke-width':0}));
			this.scales = this.rScales.rect(ox-w,oy+w*0.2,w*2,w*0.8,10).attr({'fill':'black','stroke':'white','stroke-width':w*0.25});
			if(!this.scaletext) $('#rScales').append('<div id="scaletext">0.0</div>');
			this.scaletext = $('#scaletext')
			this.scaletext.css({'left':(ox-w*0.8)+'px','top':(oy+w*0.4)+'px','height':(w*0.4)+'px','width':(w*1.6)+'px','font-size':(w*0.4)+'px'})
			this.massComparison.x = ox;
			this.massComparison.y = oy-t/2;
		}
		this.updateScales();
		this.dropOnScales();
	}
	StarInABox.prototype.dropOnScales = function(){
		this.updateScaleText(0.0);
		var _obj = this;
		this.massComparison.star.animate({ cy: (this.massComparison.y-r) }, 1000,"bounce",function(){
			_obj.updateScaleText();
		});
	}
	StarInABox.prototype.updateScales = function(v){
		this.setComparisonStar();
		r = this.massComparison.star.attr('r');
		this.massComparison.star.attr({cy:(this.massComparison.y-r-100)});
		this.updateScaleText();
	}
	StarInABox.prototype.updateScaleText = function(v){
		if(typeof v!="number"){
			var s = this.getData(this.timestep);
			var v = parseFloat(s.mass);
		}
		this.scaletext.html(v.toFixed(3)+'<span class="units">solar</span>');
	}
	StarInABox.prototype.fileName = function(mass) {
		return "db/star_"+mass+"_solar_mass";
	}
	StarInABox.prototype.loadChartData = function(mass) {
		var dataurl = this.fileName(mass)+".json";

		$.ajax({
			url: dataurl,
			method: 'POST',
			dataType: 'json',
			context: this,
			error: function(blah){
				$('#loader').show().removeClass('done').addClass('loading').html('<div class="error">Error: The star failed to form. Please try again later.</div>').delay(3000).fadeOut();
			},
			success: function(data){
				this.data = data;
				this.rebuildCharts();
				this.resetStage();
				this.timestep = 0;
			}
		});
	}
	StarInABox.prototype.rebuildCharts = function() {
		this.assessStages();
		this.updateCurrentStage();
		this.updateChart();
		this.setComparisonStar(0);
		this.createPie();
		this.createScales();
		this.doneLoadingStar();
	}
	StarInABox.prototype.setComparisonStar = function(i) {
		if(!i) i = this.timestep;
		if(i > this.data.data.length) return;
		var d = this.getData(i);
		if(typeof d=="object"){
			this.setcomparisonStarSize(d.radius);
			this.setcomparisonStarColour(d.RGB);
		}
	}
	StarInABox.prototype.setcomparisonStarSize = function(sm) {
		var r = sm*this.sizeComparison.starR;
		if(r){
			this.sizeComparison.star.attr({cx:(this.sizeComparison.starX+r),r:r});
			this.massComparison.star.attr({cx:this.massComparison.x,cy:(this.massComparison.y-r),r:r});
		}
	}
	StarInABox.prototype.setcomparisonStarColour = function(value) {
		this.sizeComparison.star.attr({"fill":value,"stroke-width":"0"});
		this.massComparison.star.attr({"fill":value,"stroke-width":"0"});
	}
	StarInABox.prototype.sStarReset = function() {
		this.sizeComparison.star.remove();
		this.sizeComparison.star = this.sizeComparison.paper.circle(this.sizeComparison.starX, this.sizeComparison.starY, this.sizeComparison.starR);
	}
	StarInABox.prototype.log10 = function(v) {
		return Math.log(v)/2.302585092994046;
	}
	StarInABox.prototype.getPixPos = function(x,y,type){
		if(!type || type!="log"){
			x = this.log10(x);
			y = this.log10(y);
		}
		if(typeof this.chart.opts.xaxis.max=="number" && x > this.chart.opts.xaxis.max) return [-1,-1]
		var newx = this.chart.offset.left + this.chart.offset.width*(Math.abs(this.chart.opts.xaxis.max-x)/(this.chart.opts.xaxis.max-this.chart.opts.xaxis.min));
		if(y < this.chart.opts.yaxis.min) return [newx,-1];
		else return [newx,this.chart.height-(this.chart.offset.bottom + this.chart.offset.height*((y-this.chart.opts.yaxis.min)/(this.chart.opts.yaxis.max-this.chart.opts.yaxis.min)))];
	}
	StarInABox.prototype.getChartOffset = function(){
		if(typeof this.chart!="object") this.chart = {'offset':{}}
		if(typeof this.chart.offset!="object") this.chart.offset = {}
		if(!this.chart.offset.top) this.chart.offset.top = 1;
		if(!this.chart.offset.left) this.chart.offset.left = 20;//62;
		if(!this.chart.offset.right) this.chart.offset.right = 1;
		if(!this.chart.offset.bottom) this.chart.offset.bottom = 20;//18;
		this.chart.offset.width = this.chart.width-this.chart.offset.right-this.chart.offset.left;
		this.chart.offset.height = this.chart.height-this.chart.offset.bottom-this.chart.offset.top;
	}
	StarInABox.prototype.updateChart = function() {
		var p1,p2,mid,m,c,v,s;
		this.getChartOffset();
		if(!this.chart.mainSequence){
			m = 6.1;
			c = 23.2;
			p1 = this.getPixPos(3000,Math.pow(10,m*this.log10(3000)-c));
			p2 = this.getPixPos(50000,Math.pow(10,m*this.log10(50000)-c));
			mid = this.getPixPos(12000,Math.pow(10,m*this.log10(12000)-c));
			this.chart.mainSequence = this.chart.holder.path("M"+p1[0]+","+p1[1]+"L"+p2[0]+","+p2[1]).attr({
				stroke : this.chart.opts.mainsequence.color,
				"stroke-opacity": this.chart.opts.mainsequence.opacity,
				"stroke-width": 35,
				"stroke-linecap" : "round"
			});
			this.chart.mainSequenceLabel = this.chart.holder.text(mid[0],mid[1],"Main Sequence").attr({ fill: "white",'font-size': '14px','text-anchor':'middle' }).rotate(Raphael.angle(p1[0],p1[1],p2[0],p2[1]));
		}
		//if(!this.chart.border) this.chart.border = this.chart.holder.rect(0,0,this.chart.width,this.chart.height).attr({stroke:'rgba(0,0,0,0.2)'});
		if(!this.chart.axes) this.chart.axes = this.chart.holder.rect(this.chart.offset.left,this.chart.offset.top,this.chart.offset.width,this.chart.offset.height).attr({stroke:'rgb(0,0,0)','stroke-opacity': 0.5,'stroke-width':2});
		if(!this.chart.yLabel) this.chart.yLabel = this.chart.holder.text(this.chart.offset.left - 10, this.chart.offset.top+(this.chart.offset.height/2), "Brightness (Solar luminosities)").attr({fill: (this.chart.opts.yaxis.label.color ? this.chart.opts.yaxis.label.color : this.chart.opts.color),'fill-opacity': (this.chart.opts.yaxis.label.opacity ? this.chart.opts.yaxis.label.opacity : 1),'font-size': '12px' }).rotate(270);
		if(!this.chart.sub){
			v = [2,3,4,5,6,7,8,9]
			this.chart.sub = []
			for(var i = 0 ; i < v.length ; i++){
				this.chart.sub[i] = this.log10(v[i]);
			}
		}
		if(!this.chart.yaxis){
			this.chart.yaxis = this.chart.holder.set();
			for(var i = Math.ceil(this.chart.opts.yaxis.min); i <= Math.floor(this.chart.opts.yaxis.max); i++) {
				p1 = this.getPixPos(this.chart.opts.xaxis.max,i,"log");
				p2 = this.getPixPos(this.chart.opts.xaxis.min,i,"log");
				this.chart.yaxis.push(this.chart.holder.path("M"+p1[0]+","+p1[1]+"L"+p2[0]+","+p2[1]).attr({ stroke: this.chart.opts.grid.color,'stroke-opacity':this.chart.opts.grid.opacity,'stroke-width':(this.chart.opts.grid.width ? this.chart.opts.grid.width : 0.5)}));
				this.chart.yaxis.push(this.chart.holder.text(p1[0]+5,p1[1],addCommas(Math.pow(10, i))).attr({
					'text-anchor': 'start',
					'fill': (this.chart.opts.grid.label.color ? this.chart.opts.grid.label.color : this.chart.opts.color),
					'fill-opacity': (this.chart.opts.grid.label.opacity ? this.chart.opts.grid.label.opacity : 0.5),
					'font-size': '11px'
				}));
				for(var j = 0; j < this.chart.sub.length ; j++){
					if(i+this.chart.sub[j] < this.chart.opts.yaxis.max){
						p1 = this.getPixPos(this.chart.opts.xaxis.max,i+this.chart.sub[j],"log");
						p2 = this.getPixPos(this.chart.opts.xaxis.min,i+this.chart.sub[j],"log");
						s = this.chart.opts.grid.sub;
						this.chart.yaxis.push(this.chart.holder.path("M"+p1[0]+","+p1[1]+"L"+p2[0]+","+p2[1]).attr({ stroke: s.color,'stroke-opacity': s.opacity,'stroke-width':(s.width ? s.width : 0.5)}));
					}
				}
			}
		}
		if(!this.chart.xLabel) this.chart.xLabel = this.chart.holder.text(this.chart.offset.left+this.chart.offset.width/2, this.chart.height-this.chart.offset.bottom + 10, "Temperature (Kelvin)").attr({ fill: (this.chart.opts.xaxis.label.color ? this.chart.opts.xaxis.label.color : this.chart.opts.color), 'fill-opacity': (this.chart.opts.xaxis.label.opacity ? this.chart.opts.xaxis.label.opacity : 1),'font-size': '12px' });
		if(!this.chart.xaxis){
			this.chart.xaxis = this.chart.holder.set();
			for (var i = Math.ceil(this.chart.opts.xaxis.min); i <= Math.floor(this.chart.opts.xaxis.max); i++) {
				p1 = this.getPixPos(i,this.chart.opts.yaxis.min,"log");
				p2 = this.getPixPos(i,this.chart.opts.yaxis.max,"log");
				this.chart.xaxis.push(this.chart.holder.path("M"+p1[0]+","+p1[1]+"L"+p2[0]+","+p2[1]).attr({ stroke: this.chart.opts.grid.color,'stroke-opacity':this.chart.opts.grid.opacity,'stroke-width':(this.chart.opts.grid.width ? this.chart.opts.grid.width : 0.5)}));
				this.chart.xaxis.push(this.chart.holder.text(p1[0],p1[1]-10,addCommas(Math.pow(10, i))).attr({
					'text-anchor': (i == Math.ceil(this.chart.opts.xaxis.min)) ? "end" : 'middle',
					'fill': (this.chart.opts.grid.label.color ? this.chart.opts.grid.label.color : this.chart.opts.color),
					'fill-opacity': (this.chart.opts.grid.label.opacity ? this.chart.opts.grid.label.opacity : 0.5),
					'font-size': '11px'
				}));
				for(var j = 0; j < this.chart.sub.length ; j++){
					if(i+this.chart.sub[j] < this.chart.opts.xaxis.max){
						p1 = this.getPixPos(i+this.chart.sub[j],this.chart.opts.yaxis.min,"log");
						p2 = this.getPixPos(i+this.chart.sub[j],this.chart.opts.yaxis.max,"log");
						s = this.chart.opts.grid.sub;
						this.chart.xaxis.push(this.chart.holder.path("M"+p1[0]+","+p1[1]+"L"+p2[0]+","+p2[1]).attr({ stroke: s.color,'stroke-opacity': s.opacity,'stroke-width':(s.width ? s.width : 0.5)}));
					}
				}
			}
		}

		if(this.data.data) {
			this.eAnimPoints = [];
			var str = "";
			var strshadow = "";
			for (var i in this.data.data) {
				var ii = this.getPixPos(this.data.data[i].temp,this.data.data[i].lum);
				this.eAnimPoints.push(ii);
			}
			for(var i = 0 ; i < this.eAnimPoints.length ; i++){
				if(i == 0 || (this.eAnimPoints[i][1] <= 0 || this.eAnimPoints[i][0] <= 0) || (i > 1 && (this.eAnimPoints[i-1][1] <= 0 || this.eAnimPoints[i-1][0] <= 0))){
					str += "M";
					strshadow += "M";
				}else{
					str += "L";
					strshadow += "L";
				}
				str += this.eAnimPoints[i][0]+','+this.eAnimPoints[i][1];
				strshadow += (this.eAnimPoints[i][0]-1)+','+(this.eAnimPoints[i][1]-1);
			}
			if(this.starPath) this.starPath.remove();
			if(this.starPathShadow) this.starPathShadow.remove();
			if(strshadow) this.starPathShadow = this.chart.holder.path(strshadow).attr({stroke:'rgb(0,0,0)','stroke-opacity': 0.2,'stroke-width':3,'stroke-dasharray':'-'});
			if(str) this.starPath = this.chart.holder.path(str).attr({stroke:'#ffcc00','stroke-width':2,'stroke-dasharray':'-'});

			if(this.chart.star) this.chart.star.remove();
			s = this.stageIndex[this.sStart];
			this.chart.star = this.chart.holder.circle((this.eAnimPoints[s][0]), (this.eAnimPoints[s][1]), 5).attr("fill", "#000000");

			//print Solar Mass Value onto Graph!
			if(this.massLabel) this.massLabel.remove();
			$('#starMass').html(((this.data.mass==1) ? '<span class="value">'+this.data.mass+'</span> Solar mass' : '<span class="value">'+this.data.mass+'</span> Solar masses'));
/*
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
*/
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
		this.createPie();
		this.createScales();
		this.updateCurrentStage();
	}
	StarInABox.prototype.loadingStar = function() {
		$('#loader').show().removeClass('done').addClass('loading').width($(window).width()).height($(window).height()).html('<div id="loading"><p>Your star is being prepared.</p><p>Please wait...</p></div>');
	}
	StarInABox.prototype.doneLoadingStar = function() {
		$('#loader').html('').removeClass('loading').addClass('done').hide();
		this.updateSummary();
	}
	StarInABox.prototype.getData = function(i) {
		return this.data.data[i];
	}
	StarInABox.prototype.updateCurrentStage = function() {
		var el = this.getData(this.timestep);
		if(typeof el=="object") this.el.stagelabel.html('<strong>Stage:</strong> ' + this.stages[el.type]);
	}
	StarInABox.prototype.updateSummary = function() {
		$('#welcome #summary-content').html(this.generateSummary());
	}
	StarInABox.prototype.displaySummary = function() {
		$('#welcome').removeClass('help').addClass('summary');
		$('#welcome #summary-content').css({opacity: 0}).animate({opacity: 1},500);
	}
	StarInABox.prototype.generateSummary = function() {
		var sOutput = "<h2>Summary</h2>";
		sOutput += "<p>This is a summary of the star that is currently selected.</p>"
		sOutput += '<p><span class="label">Mass: </span><span class="result">' + this.data.mass + ' Solar mass'+((this.data.mass==1) ? '':'es')+'</span></p>';
		sOutput += '<div id="summary-table"><table border="1"><tr>';
		sOutput += '<th>Stage</th>';
		sOutput += '<th>Radius (R<sub>Sun</sub>)</th>';
		sOutput += '<th>Luminosity (L<sub>Sun</sub>)</th>';
		sOutput += '<th>Temperature (K)</th>';
		sOutput += '<th>Duration (Myr)</th>';
		sOutput += '</tr>';
		var s,t,n,m,e;
		for (var i = 1 ; i < this.stageIndex.length ; i++){
			//var sValue = sEnd - sStart;
			s = this.getData(this.stageIndex[i]);
			n = (i < this.stageIndex.length-1) ? this.stageIndex[i+1]-1 : this.data.data.length-1;
			m = this.getData(Math.floor(this.stageIndex[i]+(n-this.stageIndex[i])/2));
			e = this.getData(n);
			t = e.t-s.t;
			if(typeof e=="object"){
				sOutput += '<tr>';
				sOutput += '<td>' + this.stages[s.type] + '</td>'; //Stage Name
				sOutput += '<td>' + ((e.radius >= 0.01) ? parseFloat(e.radius).toFixed(2) : ((s.type==14) ? "&lt;&lt; 0.01" : "&lt; 0.01")) + '</td>';
				sOutput += '<td>' + ((e.lum < 0.01 && e.lum!= 0) ? ((e.lum < 0.0001) ? "&lt;&lt; 0.01" : "&lt; 0.01") : parseFloat(e.lum).toFixed(2)) + '</td>';
				sOutput += '<td>' + ((i == this.stageIndex.length-1 && e.type!=14) ? ((s.temp > 1e6) ? 'Cool down from '+parseFloat(s.temp) : "Cooling") : ((e.temp >= 1) ? parseFloat(e.temp) : "&lt;&lt; 1")) + '</td>';
				sOutput += '<td>' + ((i < this.stageIndex.length-1) ? t.toFixed(2) : "A very long time") + '</td>';
				sOutput += '</tr>';
			}
		}
		sOutput += '</table></div>';
		sOutput += '<div id="downloads">Download data as: <a href="'+this.fileName(this.data.mass)+'.csv">CSV</a></div>';
		return sOutput;
	}
	StarInABox.prototype.displayTime = function(t) {
		if(typeof t== "number") this.el.time.text(t.toFixed(3) + " million years");
	}
	function addCommas(nStr) {
		nStr += '';
		var x = nStr.split('.');
		var x1 = x[0];
		var x2 = x.length > 1 ? '.' + x[1] : '';
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
	
	
	// functions to make the chart:
	Raphael.fn.piechart = function(x,y,radius,d,attr){
		// Set defauls
		var TWO_PI = Math.PI * 2;
		var offsetAngle = -Math.PI/2;	// The rotation from east to start at
		var total = 0;			// A running total
		if(typeof d.values!="object") d = {values: d,labels:[]}
		var n = d.values.length;		// Number of data points
		// Calculate the total of all values so we can normalize
		for (var i = 0; i < n; i++) total += d.values[i];
		// Create each segment
		var keysize = 12;			// Size of the key boxes in pixels
		var yoff = y + radius*(1.2);
		var yspace = Math.floor(keysize*1.4);
		var pie = Array(n);
		var f = ['#3366dd','#df0000','#fac900','#009d00','#d6ccff','#ffcccc','#fff5cc','#ccffcc'];
		for (var i = 0; i < n; i++){
			c = {'fill': (typeof attr.fill=="object" && attr.fill.length > i) ? attr.fill[i] : ((typeof attr.fill=="string") ? attr.fill : f[i % f.length]), 'stroke': (typeof attr.stroke=="object" && attr.stroke.length > i) ? attr.stroke[i] : ((typeof attr.stroke=="string") ? attr.stroke : "white")}
			var a = offsetAngle;
			var b = a+(TWO_PI * (d.values[i]/total));
			x1 = x+(radius * Math.cos(a));
			y1 = y+(radius * Math.sin(a));
			x2 = x+(radius * Math.cos(b));
			y2 = y+(radius * Math.sin(b));
			t = (d.labels[i].length > 1.8*radius*2/keysize) ? d.labels[i].substring(0,Math.floor(1.75*radius*2/keysize))+'...' : d.labels[i];

			pie[i] = this.set();
			// Add the pie segment
			pie.push(this.path("M "+x+" "+y+" L "+x1+" "+y1+" A "+radius+","+radius+" 0 "+((b-a >= Math.PI) ? 1 : 0)+" 1 "+x2+","+y2+" z").attr({stroke:c.stroke,fill:c.fill,'stroke-width':0}).mouseover(function(){
					this.transform('s1.05,1.05,'+x+','+y);
					this.next.transform('s1.2');	// key
					this.next.next.attr({'font-weight':'bold'});	// key label
				}).mouseout(function(){
					this.transform('s1,1');
					this.next.transform('s1');	// key
					this.next.next.attr({'font-weight':'normal'});	// key label
				})
			);
			// Add the key
			pie.push(this.rect(x-radius+keysize/2,yoff+(i*yspace)-keysize/2,keysize,keysize).attr({stroke:c.stroke,fill:c.fill,'stroke-width':1.2}))
			// Add the key label
			pie.push(this.text(x-radius+keysize*2,yoff+(i*yspace),t).attr({fill:'white','stroke-width':1,'font-size':keysize,'text-anchor':'start'}));
			offsetAngle = b;
		}
		return pie;
	}

	var box = new StarInABox();

}); //ready.function