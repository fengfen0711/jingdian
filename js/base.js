$(function () {
	//<header-menu>-------------->
	var e = "abbr,article,aside,audio,canvas,figure,figcaption,footer,header,hgroup,mark,menu,nav,section,time,vidio".split(",");
	var i = e.length;
	for (i = 0; i < e.length; i++) {
		document.createElement("input");
	}
	
	//判断是否是登录状态
	if (getCookie("username") && getCookie("token") && getCookie("uid") && getCookie("p")) {
		$(".registerBtn, .loginBtn").css({"display":"none"});
		$(".userName").val(getCookie("username"));
		console.log(getCookie("username"));
		var $a = $('<a href="mineOrder.html" class="userName">'+ getCookie("username") +'</a>');
		$(".quitBtn").before($a);
		$(".userName, .quitBtn").css({"display":"inline-block"});
	}
	
	//退出
	$(".quitBtn").click(function () {
		removeCookie('userPhone',getCookie("userPhone"));
		removeCookie('username',getCookie("username"));
		removeCookie('uid',getCookie("uid"));
		removeCookie('token',getCookie("token"));
		removeCookie('p',getCookie("p"));
	})
	//侧边栏
	aside ();
	//回到顶部
	var top = document.getElementById("top");
	dingbu(top);
})

//侧边栏
function aside () {
	$(".QR_codeBtn").click(function(){
		$(".QR_codeBtn").removeClass("QR_codeBtn").addClass("QR_codeBtn1");
		$(".QR_code").removeClass("QR_code").addClass("QR_code1");
	})
	$(".x").click(function(){
		$(".QR_code1").removeClass("QR_code1").addClass("QR_code");
		$(".QR_codeBtn1").removeClass("QR_codeBtn1").addClass("QR_codeBtn");
	})
	
}

//回到顶部
function dingbu(obj){
	$(window).scroll(function () {
		var $scrolltop = $(this).scrollTop();
		var height = document.documentElement.clientHeight/2;
		
		//返回顶部淡入淡出
		if ($scrolltop > height) {
			$(".return_topBtn img").css({"display":"inline-block"});
		}else{
			$(".return_topBtn img").css({"display":"none"});
		}
	})
	
	var timer;
	var bClear = true;
	
	obj.onclick = function(){
		timer = setInterval(function(){
			bClear = true;
			var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
			var iSpeed = Math.floor(-scrolltop/10);
			if(scrolltop == 0){
				clearInterval(timer);
			}
			document.documentElement.scrollTop = document.body.scrollTop = scrolltop + iSpeed;
		},50);
			
		window.onscroll = function(){
			if(!bClear){
				clearInterval(timer);
			}
			bClear = false;
		}
	}
}

//设置cookie
function setCookie(name,value,iDay){
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + iDay);
	//document.cookie = name + '=' + value + ';expires=' + oDate;
	document.cookie = name + '=' + value + ';expires=' + oDate +"; path=/";
}
//setCookie('username','123',30);
//读取cookie
function getCookie(name){
	var arr = document.cookie.split('; ');
	for(i = 0; i < arr.length; i++){
	 	arr2 = arr[i].split('=');
		if(arr2[0] == name){
		    return arr2[1]
		}
	}
	return '';
}
//alert(getCookie('username'));
//删除cookie
function removeCookie(name,value){
	setCookie(name,value,-10)             
}   
























