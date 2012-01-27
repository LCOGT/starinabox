/**
*
*	Star in a Box UI script.
*
*/
$(document).ready(function(){
	
	//Page PreLoader
	QueryLoader.selectorPreload = "body";
	QueryLoader.init();
	
	//Open the box
	var canopen = true;
	$("#box-lid,#box-top").click(function(){
		if(canopen) toggleLid();
		//console.log('opening..');
	});
	
	$('#welcome').bind('mouseover',function(){
		canopen = false;
	}).bind('mouseout',function(){
		canopen = true;
	});
	
	function toggleLid(){
	//Open box if closed and visa-versa
		if($("#box-lid").css("left") == "-10px"){
			//setTimeout(boxIsOpen(),1000);
			$("#box-lid").animate({"left": "-980px"},1000, function(){
				//move #content to top
				$("#content").removeClass("closed").addClass("open");
			});
		}else if($("#box-lid").css("left") == "-980px"){
			//move content underneath lid then animate shut.
			$("#content").removeClass("open").addClass("closed");
			$("#box-lid").animate({"left": "-10px"},1000);
		}

	}
	
	//help & about
	
	$('#about').click(function(){
		$('#welcome').removeClass('help').removeClass('summary').addClass('about');
		if($("#box-lid").css("left") == "-980px"){
			toggleLid();
		}
		$.ajax({
			url: "about.php",
			success: function(data){
				$('#welcome #welcome-content').animate({opacity: 0}, 500,function(){
					$(this).html(data);
					$(this).animate({opacity: 1},500);
				});
				//console.log(data);
			}
		})
	});
	
	$('#help').click(function(){
		$('#welcome').removeClass('about').removeClass('summary').addClass('help');
		if($("#box-lid").css("left") == "-980px"){
			toggleLid();
		}
		$.ajax({
			url: "help.php",
			success: function(data){
				$('#welcome #welcome-content').animate({opacity: 0}, 500,function(){
					$(this).html(data);
					$(this).animate({opacity: 1},500);
				});
				//console.log(data);
			}
		})
	});

	
	//open/close input panel
	$("#input .tab-top").click(function(){
		toggleInputPanel();
	});
	
	//open/close animate panel
	$("#animate .tab-bottom").click(function(){
		toggleAnimatePanel();
	});
	
	//toggle panels
	
	function toggleAnimatePanel(){
		if($("#animate").css("top") == "0px"){
			$("#animate").animate({"top": "-60px"}, 600);
		}else if($("#animate").css("top") == "-60px"){
			$("#animate").animate({"top": "0px"}, 600);
		}
	}
	
	function toggleInputPanel(){
		if($("#input").css("bottom") == "0px"){
			$("#input").animate({"bottom": "-122px"}, 600);
		}else if($("#input").css("bottom") == "-122px"){
			$("#input").animate({"bottom": "0px"}, 600);
		}
	}
	
	$('a#animateEvolve').click(function(){
		if($(this).text() == 'Start'){
			toggleAnimatePanel();
			if($('#input').css('bottom') == "0px"){
				toggleInputPanel();
			}
		}
	});
	
	//make nav divs clickable
	$("#nav .item").click(function(){
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
	
	$('#lid-open a').click(function(){
		toggleLid();
	});

	//add gradient to buttons after loading as it breaks the pre-loader!
	$("a#animateEvolve, a#animateEvolveReset").css("background","-webkit-gradient(linear, left top, left bottom, from(#ddd), to(#6b6b6b))");
    $("a#animateEvolve, a#animateEvolveReset").css("background","-moz-linear-gradient(top, #ddd, #6b6b6b)");
});