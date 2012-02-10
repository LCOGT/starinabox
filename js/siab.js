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

		this.massVM = [0.2, 0.65, 1, 2, 4, 6, 10, 20, 30, 40];
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
		// array for animation data points...
		this.eAnimPoints = [];
		this.timestep = 0;
		this.animating = false;
		this.reduction = 4;	// A slower framerate for the size/thermometer animations

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
		this.chart = {
			offset : {
				top: 10,
				left : 30,//62;
				right : 0,
				bottom : 46//18
			},
			width: 600,
			height: 495,
			options: {
				grid: {
					color: "rgba(0,0,0,0.25)",
					width: "0.5",
					sub: {
						color: "rgba(0,0,0,0.08)",
						width: "0.5"
					}
				},
				xaxis: {
					invert: true,
					min: 3, // 3
					max: 5.8 // 6.4
				},
				yaxis: {
					min: -6.4, //-11
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
		this.sizeComparison.sun = this.sizeComparison.paper.circle(25, 200, 5).attr({"fill":"#fff3ea","stroke-width":"0"});
		this.sizeComparison.sunLabel = this.sizeComparison.paper.text(25, 220, "Sun").attr("fill", "#fff3ea");
		//draw comparison star
		this.sizeComparison.starX = 50;
		this.sizeComparison.starY = 200;
		this.sizeComparison.starR = 5;
		this.sizeComparison.starOffset = 45;
		this.sizeComparison.star = this.sizeComparison.paper.circle(this.sizeComparison.starX+this.sizeComparison.starR, this.sizeComparison.starY, this.sizeComparison.starR).attr({"fill":"#fff3ea","stroke-width":"0"});


	}
	StarInABox.prototype.findMassIndex = function(mass){
		for(var i = 0; i < this.massVM.length; i++){
			if(mass == this.massVM[i]) return i;
		}
	}
	StarInABox.prototype.setupUI = function(){
		// Define if we can open the box or not
		$('#welcome').bind('mouseover',{box:this},function(e){ e.data.box.canopen = false; }).bind('mouseout',{box:this},function(e){ e.data.box.canopen = true; });
		$("#box-lid,#box-top").click({box:this},function(e){
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
			if(c == 's'){ box.supernova(); }
			if(c == 'l'){ box.toggleLid(); }
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
		ll = this.thermo.text(50, 200, "Temperature (Kelvin)").attr(txtprops);
		ll.rotate(-90);

		// Luminosity meter
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
		}
	}
	StarInABox.prototype.supernova = function(){
		if($('.supernova').length == 0) $('#container').append('<div class="supernova"></div>');
		c = $('#container');
		b = $('#box-top');
		$('.supernova').css({position:'absolute',width:c.width()-10,left:5,top:5,height:c.height()-10,'z-index':(b.css('z-index')-2),opacity:1}).delay(200).animate({opacity:0},1500,"easeOutExpo",function() { $(this).remove(); });
		c.clearQueue().animate({left:"-=12px"},20).animate({left:"+=20px"},20).animate({left:"-=4px"},50).animate({left:"+=7px"},50).animate({left:"-=15px"},50).animate({left:"+=5px"},70).animate({left:"-=2px"},80);
	}
	StarInABox.prototype.play = function(e){
		if(this.animating){
			clearInterval(this.eAnim);
			$("a#animateEvolve").text('Start');
			$("a#animateEvolveReset").css('display', '');
			this.animating = false;
		}else{
			this.animating = true;
			this.closeAnimatePanel();
			if(this.inputopen) this.toggleInputPanel();
			$("a#animateEvolveReset").css('display', 'none');
			if(this.timestep == this.eAnimPoints.length) this.reset();

			//animate through stages...
			$("a#animateEvolve").text('Pause');
			this.duration = $("#evolveSpeed option:selected").attr("value");
			var _obj = this;
			this.eAnim = setInterval(function () { _obj.animateStep(1,_obj.reduction); }, this.duration);
		}
		return false;
	}
	StarInABox.prototype.animateStep = function(delta,reduction){
		duration = this.duration;
		if(!reduction) reduction = 1;
		if (this.timestep == this.eAnimPoints.length) {
			$("a#animateEvolve").text('Start');
			clearInterval(this.eAnim);
			$("a#animateEvolveReset").css('display', '');
			$("a#animateEvolveReset").css('display', 'n');
			this.timestep = this.stageIndex[this.sStart];
			this.animating = false;
		} else {
			this.timestep+=delta;
			if(this.timestep < 0) this.timestep = 0;
			el = this.getData();
			if(typeof el=="object"){
				if(this.timestep > 1){
					if(this.data.data[this.timestep].type != this.data.data[this.timestep-1].type){
						if(this.data.data[this.timestep].type > 11) this.supernova();
					}
				}
				if(this.timestep % reduction == 0 && this.timestep < this.data.data.length) {
					this.sizeComparison.star.animate({
						cx: (this.sizeComparison.starX+el.radius*this.sizeComparison.starR),
						r: this.sizeComparison.starR*el.radius,
						fill: el.RGB
					}, (duration*reduction));
					this.setThermometer(el.temp, (duration * reduction));
					this.eqLevel(el.lum, true);
					this.updateCurrentStage();
				}
				this.displayTime(el.t);
				// In the case of 0 luminosity the y-value is returned as negative.
				// Don't change anything if that is the case.
				if(this.eAnimPoints[this.timestep][1] >= 0) {
					this.chart.star.animate({
						//path:this.getStarShape(this.eAnimPoints[this.iMod][0],this.eAnimPoints[this.iMod][1])
						cx: (this.eAnimPoints[this.timestep][0]),
						cy: (this.eAnimPoints[this.timestep][1])
					}, duration);
				}
			}
		}
	}
	StarInABox.prototype.setThermometer = function(temp,duration){
		s = Math.min(temp / 60000,1.05);
		if(typeof duration=="number" && duration > 0) this.thermoTemp.animate({ transform: "s1,"+s+",0,343" }, duration);
		else this.thermoTemp.scale(1, s, 0, 343);
	}
	StarInABox.prototype.slideTo = function(p){
		clearInterval(this.eAnim);
		var sMass = this.massVM[p];
		this.loadingStar();
		//on change get stages for the mass of star!
		$('#stages .ui-slider').remove();
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
	StarInABox.prototype.closeAnimatePanel = function(duration){
		if(typeof duration!="number") duration = 300;
		if(!this.animateopen) return;
		$("#animate").animate({"top": "-60px"}, duration);
		this.animateopen = false;
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

		//Load Stages Slider...
		var that = this;
		$('select.stages').selectToUISlider({
			labels: 16,
			sliderOptions: {
				change: function (event, ui) {
					clearInterval(that.eAnim);
					that.resetStage();
					that.updateEvolve();
					$("a#animateEvolve").text('Start');
					$("a#animateEvolveReset").css('display', '');
					that.reset();
				}
			}
		}).hide();
		this.loadChartData(mass);
	}
	StarInABox.prototype.eqLevel = function(num, anim) {
		var zero = 5;
		var units = 0.4;
		var bars = 20;

		if (num != null) {
			this.numBars = Math.round(this.log10(parseFloat(num)) / units) + zero;
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
		this.timestep = i;
		var first = this.getData();
		if(typeof first=="object"){
			this.displayTime(first.t);
			this.sStarReset();
			this.setComparisonStar(this.stageIndex[i]);
			this.eqLevel(first.lum);
			this.setThermometer(first.temp);
		}
		this.chart.star.attr("cx", (this.eAnimPoints[this.timestep][0]));
		this.chart.star.attr("cy", (this.eAnimPoints[this.timestep][1]));
	}
	StarInABox.prototype.assessStages = function() {
		if(!this.data.data) return;
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
		var type = new Array(0, this.data.data[0].type);
		this.stageIndex = [0];
		for (var i = 0; i < this.data.data.length; i++) {
			var eType = this.data.data[i].type;
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
	}
	/**
	 *
	 *	Generate Pie Chart for selected mass and range of lifecycle stages.
	 *
	 */
	StarInABox.prototype.createPie = function(){

		this.pieData = [];
		this.pieLegend = [];

		for (var i = 1 ; i < this.stageIndex.length ; i++){
			s = this.getData(this.stageIndex[i]);
			n = (i < this.stageIndex.length-1) ? this.stageIndex[i+1]-1 : this.data.data.length-1;
			e = this.getData(n);
			this.pieLegend.push(this.stages[s.type]);
			this.pieData.push(e.t-s.t);
		}
		//raphael script for pie chart...
		if ($("#rPie #pie").length > 0) $("#rPie #pie").remove();

		this.rPie = Raphael("rPie");

		this.pie = this.rPie.piechart(140, 130, 100, this.pieData, {
			legend: this.pieLegend,
			legendpos: "south",
			legendcolor: "#FFF"
		}).attr({ 'font': "12px 'Fontin Sans', Fontin-Sans, sans-serif"}).hover(function () {
			this.sector.stop();
			this.sector.scale(1.1, 1.1, this.cx, this.cy);
			if (this.label) {
				this.label[0].stop();
				this.label[0].attr({ r: 7.5 });
				this.label[1].attr({ "font-weight": 800 });
			}
		}, function () {
			this.sector.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 500, "bounce");
			if (this.label) {
				this.label[0].animate({ r: 5 }, 500, "bounce");
				this.label[1].attr({ "font-weight": 400 });
			}
		});
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
				console.log('Arghh!');
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
		this.doneLoadingStar();
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
		r = sm*this.sizeComparison.starR;
		this.sizeComparison.star.attr({cx:(this.sizeComparison.starX+r),r:r});
	}
	StarInABox.prototype.setcomparisonStarColour = function(value) {
		this.sizeComparison.star.attr({"fill":value,"stroke-width":"0"});
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
		newx = this.chart.offset.left + this.chart.offset.width*(Math.abs(this.chart.options.xaxis.max-x)/(this.chart.options.xaxis.max-this.chart.options.xaxis.min));
		if(y < this.chart.options.yaxis.min) return [newx,-1];
		else return [newx,this.chart.height-(this.chart.offset.bottom + this.chart.offset.height*((y-this.chart.options.yaxis.min)/(this.chart.options.yaxis.max-this.chart.options.yaxis.min)))];
	}
	StarInABox.prototype.getChartOffset = function(){
		if(!this.chart.offset.top) this.chart.offset.top = 1;
		if(!this.chart.offset.left) this.chart.offset.left = 20;//62;
		if(!this.chart.offset.right) this.chart.offset.right = 1;
		if(!this.chart.offset.bottom) this.chart.offset.bottom = 20;//18;
		this.chart.offset.width = this.chart.width-this.chart.offset.right-this.chart.offset.left;
		this.chart.offset.height = this.chart.height-this.chart.offset.bottom-this.chart.offset.top;
	}
	StarInABox.prototype.updateChart = function() {
		this.getChartOffset();
		if(!this.chart.mainSequence){
			m = 6.1;
			c = 23.2;
			p1 = this.getPixPos(3000,Math.pow(10,m*this.log10(3000)-c));
			p2 = this.getPixPos(50000,Math.pow(10,m*this.log10(50000)-c));
			mid = this.getPixPos(12000,Math.pow(10,m*this.log10(12000)-c));
			this.chart.mainSequence = this.chart.holder.path("M"+p1[0]+","+p1[1]+"L"+p2[0]+","+p2[1]).attr({
				stroke : "rgba(255, 0, 0, 0.5)",
				"stroke-width": 35,
				"stroke-linecap" : "round"
			});
			this.chart.mainSequenceLabel = this.chart.holder.text(mid[0],mid[1],"Main Sequence").attr({ fill: "white",'font-size': '14px','text-anchor':'middle' }).rotate(Raphael.angle(p1[0],p1[1],p2[0],p2[1]));
		}
		//if(!this.chart.border) this.chart.border = this.chart.holder.rect(0,0,this.chart.width,this.chart.height).attr({stroke:'rgba(0,0,0,0.2)'});
		if(!this.chart.axes) this.chart.axes = this.chart.holder.rect(this.chart.offset.left,this.chart.offset.top,this.chart.offset.width,this.chart.offset.height).attr({stroke:'rgba(0,0,0,0.5)','stroke-width':2});
		if(!this.chart.yLabel) this.chart.yLabel = this.chart.holder.text(this.chart.offset.left - 10, this.chart.offset.top+(this.chart.offset.height/2), "Brightness (L0)").attr({fill: "black",'font-size': '12px' }).rotate(270);
		if(!this.chart.sub){
			var v = [2,3,4,5,6,7,8,9]
			this.chart.sub = []
			for(var i = 0 ; i < v.length ; i++){
				this.chart.sub[i] = this.log10(v[i]);
			}
		}
		if(!this.chart.yaxis){
			this.chart.yaxis = this.chart.holder.set();
			for(var i = Math.ceil(this.chart.options.yaxis.min); i <= Math.floor(this.chart.options.yaxis.max); i++) {
				p1 = this.getPixPos(this.chart.options.xaxis.max,i,"log");
				p2 = this.getPixPos(this.chart.options.xaxis.min,i,"log");
				this.chart.yaxis.push(this.chart.holder.path("M"+p1[0]+","+p1[1]+"L"+p2[0]+","+p2[1]).attr({ stroke: this.chart.options.grid.color,'stroke-width':(this.chart.options.grid.width ? this.chart.options.grid.width : 0.5)}));
				this.chart.yaxis.push(this.chart.holder.text(p1[0]+5,p1[1],addCommas(Math.pow(10, i))).attr({
					'text-anchor': 'start',
					'fill': "rgba(0, 0, 0, 0.5)",
					'font-size': '11px'
				}));
				for(var j = 0; j < this.chart.sub.length ; j++){
					if(i+this.chart.sub[j] < this.chart.options.yaxis.max){
						p1 = this.getPixPos(this.chart.options.xaxis.max,i+this.chart.sub[j],"log");
						p2 = this.getPixPos(this.chart.options.xaxis.min,i+this.chart.sub[j],"log");
						this.chart.yaxis.push(this.chart.holder.path("M"+p1[0]+","+p1[1]+"L"+p2[0]+","+p2[1]).attr({ stroke: this.chart.options.grid.sub.color,'stroke-width':(this.chart.options.grid.sub.width ? this.chart.options.grid.sub.width : 0.5)}));
					}
				}
			}
		}
		if(!this.chart.xLabel) this.chart.xLabel = this.chart.holder.text(this.chart.offset.left+this.chart.offset.width/2, this.chart.height-this.chart.offset.bottom + 10, "Temperature (K)").attr({ fill: "black",'font-size': '12px' });
		if(!this.chart.xaxis){
			this.chart.xaxis = this.chart.holder.set();
			for (var i = Math.ceil(this.chart.options.xaxis.min); i <= Math.floor(this.chart.options.xaxis.max); i++) {
				p1 = this.getPixPos(i,this.chart.options.yaxis.min,"log");
				p2 = this.getPixPos(i,this.chart.options.yaxis.max,"log");
				this.chart.xaxis.push(this.chart.holder.path("M"+p1[0]+","+p1[1]+"L"+p2[0]+","+p2[1]).attr({ stroke: this.chart.options.grid.color,'stroke-width':(this.chart.options.grid.width ? this.chart.options.grid.width : 0.5)}));
				this.chart.xaxis.push(this.chart.holder.text(p1[0],p1[1]-10,addCommas(Math.pow(10, i))).attr({
					'text-anchor': (i == Math.ceil(this.chart.options.xaxis.min)) ? "end" : 'middle',
					'fill': "rgba(0, 0, 0, 0.5)",
					'font-size': '11px'
				}));
				for(var j = 0; j < this.chart.sub.length ; j++){
					if(i+this.chart.sub[j] < this.chart.options.xaxis.max){
						p1 = this.getPixPos(i+this.chart.sub[j],this.chart.options.yaxis.min,"log");
						p2 = this.getPixPos(i+this.chart.sub[j],this.chart.options.yaxis.max,"log");
						this.chart.yaxis.push(this.chart.holder.path("M"+p1[0]+","+p1[1]+"L"+p2[0]+","+p2[1]).attr({ stroke: this.chart.options.grid.sub.color,'stroke-width':(this.chart.options.grid.sub.width ? this.chart.options.grid.sub.width : 0.5)}));
					}
				}
			}
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
				sOutput += '<td>' + parseFloat(e.radius).toFixed(2) + '</td>';
				sOutput += '<td>' + parseFloat(e.lum).toFixed(2) + '</td>';
				sOutput += '<td>' + parseFloat(e.temp) + '</td>';
				sOutput += '<td>' + t.toFixed(2) + '</td>';
				sOutput += '</tr>';
			}
		}
		sOutput += '</table></div>';
		sOutput += '<div id="downloads">Download data as: <a href="'+this.fileName(this.data.mass)+'.csv">CSV</a></div>';
		return sOutput;
	}
	StarInABox.prototype.displayTime = function(t) {
		this.el.time.text(t.toFixed(1) + " million years");
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