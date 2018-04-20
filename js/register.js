$(function () {
	//<注册>-------------------------->
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

	//注册短信验证码
	reg_authCode ();
	
	
	
	
	//密码忘记短信验证码
	revice_authCode ();
})


//注册短信验证码
function reg_authCode () {
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
	var countdown=60; 
	function settime(obj) { 
	    if (countdown == 0) { 
	        obj.removeAttribute("disabled");    
	        obj.value="获取短信验证码"; 
	        countdown = 60; 
	        return;
	    } else { 
	        obj.setAttribute("disabled", true); 
	        obj.value="重新发送(" + countdown + ")"; 
	        countdown--; 
	    } 
		setTimeout(function() { 
	    	settime(obj) }
	    ,1000) 
	}
}

//密码忘记短信验证码
function revice_authCode () {
	$("#codeBtn1").click(function () {
		var codeBtn1 = document.getElementById("codeBtn1");
		var phone1 = {
			phone: $("#telTxt1").val()
		};
		if (test1("telTxt1",$("#revisePasword p.tel_error span"))) {
			isPhone (phone1);
			settime1(codeBtn1);
		}
	})
	
	//倒计时
	var countdown1=60; 
	function settime1(obj) { 
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
	    	settime1(obj) }
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
				//注册-手机发送验证码
				var reg_phone = {
					phone: $("#telTxt").val(),
					msgtype: 0
				}
				if (test1("telTxt",$("#register p.tel_error span"))) {
					isAuthCode (reg_phone);
				}
				
				//密码忘记-手机发送验证码
				var reg_phone1 = {
					phone: $("#telTxt1").val(),
					msgtype: 1
				}
				if (test1("telTxt1",$("#revisePasword p.tel_error span"))) {
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
		var codeTxt1 = document.getElementById("codeTxt1");
		//注册
		console.log(data);
		$(".registerBtn2").click(function(){
			var users_reg = {
				phone: $("#telTxt").val(),
				password: $("#pasTxt").val()
			}
			if ($("#codeTxt").val() == data.data.authcode) {
				codeTxt.className = 'codeTxt';
				$("#register p.code_error span").css({"display":"none"});
				submitReg (users_reg);
			}else{
				codeTxt.className = 'codeTxt1';
				$("#register p.code_error span").css({"display":"block"});
			}
		})
		
		//忘记密码
		$(".revisePaswordBtn2").click(function(){
			var users_revise = {
				phone: $("#telTxt1").val(),
				password: $("#pasTxt1").val()
			}
			if ($("#codeTxt1").val() == data.data.authcode) {
				codeTxt1.className = 'codeTxt';
				$("#revisePasword p.code_error span").css({"display":"none"});
				submitRevice (users_revise);
			}else{
				codeTxt1.className = 'codeTxt1';
				$("#revisePasword p.code_error span").css({"display":"block"});
			}
		})
	})
}

//提交注册
function submitReg (obj) {
	$.get( URL1 + "user/registuser",obj,function(data){
		switch(data.code){
			case true:
				//注册
				var checkBox = document.getElementById("checkbox");
				if(checkBox.checked && test1 ("telTxt",$("#register p.tel_error span")) && test2 ("pasTxt",$("#register p.pas_error span")) && test3 ("codeTxt",$("#register p.code_error span"))){
					setCookie('userPhone',$("#telTxt").val(),1);
					$("#register").stop().animate({"left":"100%"},200,function(){
						$(".registerz").css({"display":"none"});
					});
					loginShow();
				}
			break;
			case false:
				alert(data.info);
			break;
		}
	})
}

//提交密码修改
function submitRevice (obj) {
	$.get( URL1 + "user/editpassword",obj,function(data){
		console.log(data);
		switch(data.code){
			case true:
				//忘记密码
				if (test1("telTxt1",$("#revisePasword p.tel_error span")) && test2("pasTxt1",$("#revisePasword p.pas_error span")) && test3("codeTxt1",$("#revisePasword p.code_error span"))) {
					removeCookie('userPhone',getCookie("userPhone"));
					removeCookie('username',getCookie("username"));
					removeCookie('uid',getCookie("uid"));
					removeCookie('token',getCookie("token"));
					removeCookie('p',getCookie("p"));
					setCookie('userPhone',$("#telTxt1").val(),1);
					$("#revisePasword").stop().animate({"left":"100%"},200,function(){
						$(".revisePaswordz").css({"display":"none"});
					});
					loginShow();
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



