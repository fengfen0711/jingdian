$(function () {
	//<登录>-------------------------->
	var log_telTxt = document.getElementById("log_telTxt");
	var log_pasTxt = document.getElementById("log_pasTxt");
	
	log_telTxt.onfocus = function() {
		log_telTxt.value='';		
	}
	log_pasTxt.onfocus = function() {
		log_pasTxt.value='';
	}
	
	log_telTxt.onblur = function () {
		test4("log_telTxt");
	}
	log_pasTxt.onblur = function () {
		test5("log_pasTxt");
	}
	
	//登录
	login();
	//登录验证出错
	loginError ();
	//忘记密码
	revisePasword ();
})
//登录
function login () {
	$(".loginBtn2").bind("click",function () {
		var users_log = {
			phone: $("#log_telTxt").val(),
			password: $("#log_pasTxt").val()
		}
		
		if (test4("log_telTxt") && test5("log_pasTxt")) {
			loginAjax(users_log);
		}
	})
}
//登录验证
function loginAjax (obj) {
	$.get(URL1+"user/loginuser",obj,function(data){
		console.log(data);
		switch(data.code){
			case true:
				setCookie('username',data.data.username,1);
				setCookie('uid',data.data.uid,1);
				setCookie('token',data.data.token,1);
				setCookie('p',data.data.p,1);
				quit();
				$("#loginError").css({"display":"none"});
				$(".registerBtn, .loginBtn").css({"display":"none"});
				
				var $a = $('<a href="mineOrder.html" class="userName">'+ data.data.username +'</a>');
				$(".quitBtn").before($a);
				$(".userName, .quitBtn").css({"display":"inline"});
			break;
			case false:
				$("#loginError").css({"display":"block"});
			break;
		}
	})
}

function test4 (id) {
    var tel=document.getElementById(id);
    var re4=/^1[3|4|5|7|8][0-9]{9}$/;//电话号码

	if(re4.test(tel.value)){
		tel.className='log_telTxt';
		return true;
	}
	else{
		tel.className='log_telTxt1';
		return false;
	}
}

//只允许输入数字,左右移动键,删除键,回车键
//author:larger
function intOnly () {
  var codeNum = event.keyCode;
  if(codeNum == 8 || codeNum == 37 || codeNum == 39 || (codeNum >= 48 && codeNum <= 57)){
    event.returnValue = codeNum;
  }else{
    event.returnValue = false;
  }
}

function test5 (id) {
    var mm = document.getElementById(id);
	var re5 = /^\w{6,14}$/;

	if(re5.test(mm.value)){
		mm.className='log_pasTxt';
		return true;
	}
	else{
		mm.className='log_pasTxt1';
		return false;
	}
}
//登录信息出错
function loginError () {
	$(".loginErrorBtn").click(function () {
		$("#loginError").css({"display":"none"});
		
	})
	$(".quitBtn").click(function () {
		$(".registerBtn, .loginBtn").css({"display":"inline"});
		$(".userName, .quitBtn").css({"display":"none"});
	})
}

//忘记密码
function revisePasword () {
	//忘记密码
	$(".noPasswordBtn").click( function () {
		$("#login").stop().animate({"left":"100%"},200,function(){
			$(".loginz").css({"display":"none"});
		});
		$(".revisePaswordz").css({"display":"block"});
		$("#revisePasword").css({"left":"100%"}).stop().animate({"left":"21%"});
		
		$(".rev_cut").click(function () {
			$("#Shade").fadeOut(200);
			$("#revisePasword").stop().animate({"left":"100%"},200,function(){
				$(".revisePaswordz").css({"display":"none"});
			});
		})
		
		//<修改密码>-------------------------->
		var telTxt1 = document.getElementById("telTxt1");
		var pasTxt1 = document.getElementById("pasTxt1");
		var codeTxt1 = document.getElementById("codeTxt1");
		var $telError1 = $("#revisePasword p.tel_error span");
		var $pasError1 = $("#revisePasword p.pas_error span");
		var $codeError1 = $("#revisePasword p.code_error span");
		
		telTxt1.onfocus = function() {
			telTxt1.value='';		
		}
		pasTxt1.onfocus = function() {
			pasTxt1.value='';		
		}
		codeTxt1.onfocus = function() {
			codeTxt1.value='';		
		}
		
		telTxt1.onblur = function () {
			test1("telTxt1",$telError1);
		}
		pasTxt1.onblur = function () {
			test2("pasTxt1",$pasError1);
		}
		codeTxt1.onblur = function () {
			test3("codeTxt1",$codeError1);
		}
		
		//忘记密码_手机发送验证码
		revice_authCode ();
		//登录
		$(".revisePasword_loginBtn").click(function () {
			$("#revisePasword").stop().animate({"left":"100%"},200,function(){
				$(".revisePaswordz").css({"display":"none"});
			});
			loginShow();
		})
	})
}






