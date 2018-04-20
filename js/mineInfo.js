$(function () {
	//修改密码
	revicePas ();
	
	//手机号
	$("#telTxt").keypress(function () {
		intOnly();
	})
	
})

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


//注册/登录/购买切换
function revicePas () {
	$(".revicePasBtn").click(function(){
		$("#Shade").fadeIn();
		$(".registerz").css({"display":"block"});
		$("#register").css({"left":"100%"}).stop().animate({"left":"21%"});
	})
	
	$(".rev_cut").click(function () {
		$("#Shade").fadeOut(200);
		$("#register").stop().animate({"left":"100%"},200,function(){
			$(".registerz").css({"display":"none"});
		});
	})
	
	//<修改密码>-------------------------->
	var telTxt = document.getElementById("telTxt");
	var pasTxt = document.getElementById("pasTxt");
	var codeTxt = document.getElementById("codeTxt");
	var $telError = $("#register p.tel_error span");
	var $pasError = $("#register p.pas_error span");
	var $codeError = $("#register p.code_error span");
		
		
	telTxt.onfocus = function() {
		telTxt.value='';		
	}
	pasTxt.onfocus = function() {
		pasTxt.value='';		
	}
	codeTxt.onfocus = function() {
		codeTxt.value='';		
	}
	
	telTxt.onblur = function () {
		test1("telTxt",$telError);
	}
	pasTxt.onblur = function () {
		test2("pasTxt",$pasError);
	}
	codeTxt.onblur = function () {
		test3("codeTxt",$codeError);
	}

	//密码修改短信验证码
	revice_authCode ();
}

//密码修改短信验证码
function revice_authCode () {
	$("#codeBtn").click(function () {
		var codeBtn = document.getElementById("codeBtn");
		var phone = {
			phone: $("#telTxt").val()
		};
		if (test1("telTxt",$("#register p.tel_error span"))) {
			isPhone (phone);
			settime(codeBtn);
		}
	})
	
	//倒计时
	var countdown1=60; 
	function settime(obj) { 
	    if (countdown1 == 0) { 
	        obj.removeAttribute("disabled");    
	        obj.value="获取短信验证码"; 
	        countdown1 = 60; 
	        return;
	    } else { 
	        obj.setAttribute("disabled", true); 
	        obj.value="重新发送(" + countdown1 + ")"; 
	        countdown1--; 
	    } 
		setTimeout(function() { 
	    	settime(obj) }
	    ,1000) 
	}
}

//验证手机号是否正确
function isPhone (obj) {
	$.get( URL1 + "user/checkphone",obj,function(data){
		console.log(data);
		switch(data.code){
			case true:
				console.log("手机号正确！");
				//密码修改-手机发送验证码
				var reg_phone1 = {
					phone: $("#telTxt").val(),
					msgtype: 1
				}
				if (test1("telTxt",$("#register p.tel_error span"))) {
					isAuthCode (reg_phone1);
				}
			break;
			case false:
				alert(data.info);
			break;
		}
	})
}

//验证码是否正确
function isAuthCode (obj) {
	$.get( URL1 + "user/sendauthcode",obj,function(data){
		var codeTxt = document.getElementById("codeTxt");
		console.log(data);
		//忘记密码
		$(".registerBtn2").click(function(){
			var users_revise = {
				phone: $("#telTxt").val(),
				password: $("#pasTxt").val()
			}
			if ($("#codeTxt").val() == data.data.authcode) {
				codeTxt.className = 'codeTxt';
				$("#register p.code_error span").css({"display":"none"});
				submitRevice (users_revise);
			}else{
				codeTxt.className = 'codeTxt1';
				$("#register p.code_error span").css({"display":"block"});
			}
		})
	})
}

//提交密码修改
function submitRevice (obj) {
	$.get( URL1 + "user/editpassword",obj,function(data){
		console.log(data);
		switch(data.code){
			case true:
				//忘记密码
				if (test1("telTxt",$("#register p.tel_error span")) && test2("pasTxt",$("#register p.pas_error span")) && test3("codeTxt",$("#register p.code_error span"))) {
					removeCookie('userPhone',getCookie("userPhone"));
					removeCookie('username',getCookie("username"));
					removeCookie('uid',getCookie("uid"));
					removeCookie('token',getCookie("token"));
					removeCookie('p',getCookie("p"));
					setCookie('userPhone',$("#telTxt").val(),1);
					setCookie('revise',"1",1);
					$("#register").stop().animate({"left":"100%"},200,function(){
						$(".registerz").css({"display":"none"});
					});
					window.open("index.html",'_self');
				}
			break;
			case false:
				alert(data.info);
			break;
		}
	})
}

function test1 (id,$telError) {
    var tel=document.getElementById(id);
    var re=/^1[3|4|5|7|8][0-9]{9}$/;//电话号码

	if(re.test(tel.value)){
		tel.className='telTxt';
		$telError.css({"display":"none"});
		return true;
	}
	else{
		tel.className='telTxt1';
		$telError.css({"display":"block"});
		return false;
	}
}

function test2 (id,$pasError) {
    var mm = document.getElementById(id);
	var re2 = /^\w{6,14}$/;

	if(re2.test(mm.value)){
		mm.className = "pasTxt";
		$pasError.css({"display":"none"});
		return true;
	}
	else{
		mm.className = "pasTxt1";
		$pasError.css({"display":"block"});
		return false;
	}
}

function test3 (id,$codeError) {
    var codeTxt = document.getElementById(id);
    var re3 = /^[0-9]{6}$/;

	if(re3.test(codeTxt.value)){
		codeTxt.className = 'codeTxt';
		$codeError.css({"display":"none"});
		return true;
	}
	else{
		codeTxt.className = 'codeTxt1';
		$codeError.css({"display":"block"});
		return false;
	}
}






























