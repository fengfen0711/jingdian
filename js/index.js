$(function () {
	//判断是否是密码修改过来的页面
	if (getCookie("revise")) {
		loginShow();
		removeCookie('revise',"1");
	}
	
	//商品详情
	var goodPro = {
		goodId: "blooma"
	}
	goodDetail ();
	
	//注册/登录/购买切换
	reg_log_buy ();
	
	//手机号
	$("#telTxt").keypress(function () {
		intOnly();
	})
	$("#log_telTxt").keypress(function () {
		intOnly();
	})
	$("#telTxt1").keypress(function () {
		intOnly();
	})
	
})


//购物加减
function shoppingcar (goodPrice,partPrice) {
	var t1 = $(".numtxt1");
	var t1_num = parseInt(t1.val());
	var t2 = $(".numtxt2");
	var t2_num = parseInt(t2.val());
	
	
	$(".plus1").click(function(){
		if (t1_num > 8) {
			t1_num = 9;
			t1.val(t1_num);
		}else{
			t1_num++;
			t1.val(t1_num);
		}
		setTotal(goodPrice,partPrice);
	});
	$(".minus1").click(function(){
		if (t1_num < 1) {
			t1_num = 0;
			t1.val(t1_num);
		}else{
			t1_num--;
			t1.val(t1_num);
		}
		setTotal(goodPrice,partPrice);
	});
	$(".plus2").click(function(){
		if (t2_num > 8) {
			t2_num = 9;
			t2.val(t2_num);
		}else{
			t2_num++;
			t2.val(t2_num);
		}
		setTotal(goodPrice,partPrice);
	});
	$(".minus2").click(function(){
		if (t2_num < 1) {
			t2_num = 0;
			t2.val(t2_num);
		}else{
			t2_num--;
			t2.val(t2_num);
		}
		setTotal(goodPrice,partPrice);
	});
	function setTotal(goodPrice,partPrice){
		$(".price_num").html((parseInt(t1.val())*goodPrice) + (parseInt(t2.val())*partPrice));
	}
	setTotal(goodPrice,partPrice);
}

//注册/登录/购买切换
function reg_log_buy () {
	//注册
	$(".registerBtn").click(function(){
		regiterShow ();
	})
	//登录
	$(".loginBtn").click(function(){
		loginShow ();
	})
	
}

//注册页面显示
function regiterShow () {
	$("#Shade").fadeIn();
	$(".registerz").css({"display":"block"});
	$("#register").css({"left":"100%"}).stop().animate({"left":"21%"});
	
	$(".reg_cut").click(function () {
		$("#Shade").fadeOut(200);
		$("#register").stop().animate({"left":"100%"},200,function(){
			$(".registerz").css({"display":"none"});
		});
	})
	
	$(".reg_bottom_loginBtn").click(function(){
		$("#register").stop().animate({"left":"100%"},200,function(){
			$(".registerz").css({"display":"none"});
		});
		$(".loginz").css({"display":"block"});
		$("#login").css({"left":"100%"}).stop().animate({"left":"21%"});
		
		$(".log_cut").click(function () {
			quit ();
		})
		
		$(".log_bottom_regBtn").click(function(){
			$("#login").stop().animate({"left":"100%"},200,function(){
				$(".loginz").css({"display":"none"});
			});
			$(".registerz").css({"display":"block"});
			$("#register").css({"left":"100%"}).stop().animate({"left":"21%"});
		})
	})
}
//登录页面显示
function loginShow () {
	log_telTxt.value = getCookie("userPhone");
	$("#Shade").fadeIn();
	$(".loginz").css({"display":"block"});
	$("#login").css({"left":"100%"}).stop().animate({"left":"21%"});
	
	$(".log_cut").click(function () {
		quit ();
	})
	
	$(".log_bottom_regBtn").click(function(){
		$("#login").stop().animate({"left":"100%"},200,function(){
			$(".loginz").css({"display":"none"});
		});
		$(".registerz").css({"display":"block"});
		$("#register").css({"left":"100%"}).stop().animate({"left":"21%"});
		
		$(".reg_bottom_loginBtn").click(function(){
			$("#register").stop().animate({"left":"100%"},200,function(){
				$(".registerz").css({"display":"none"});
			});
			$(".loginz").css({"display":"block"});
			$("#login").css({"left":"100%"}).stop().animate({"left":"21%"});		
		})
	})
}
//登录成功
function quit () {
	//登录成功
	$("#Shade").fadeOut(200);
	$("#login").stop().animate({"left":"100%"},200,function(){
		$(".loginz").css({"display":"none"});
	});
	
}

//购买判断
function checkOrder (obj,goodPrice,partPrice) {
	$.get( URL1 + "order/checkOrder",obj,function(data){
		console.log(data);
		switch(data.code){
			case true:
				setCookie('goodNum',$("#blooma").val(),1);
				setCookie('partNum',$("#bloomaPart").val(),1);
				setCookie('totalPrice',(parseInt($("#blooma").val())*goodPrice) + (parseInt($("#bloomaPart").val())*partPrice),1);
				setCookie('goodPrice',$(".proPrice").html(),1);
				setCookie('partPrice',$(".proPrice1").html(),1);
				window.open("payTheOrder.html","_self");
			break;
			case false:
				alert(data.info);
			break;
		}
	})
}

//商品详情
function goodDetail () {
	$.get( URL1 + "good/getInfo",function(data){
		console.log(data);
		switch(data.code){
			case true:
				$(".proPrice").html(data.data.goodPrice);
				$(".proPrice1").html(data.data.partPrice);
				//<购物加减>-------------------------->
				shoppingcar (data.data.goodPrice,data.data.partPrice);
				
				//购买按钮
				$(".buyBtn").click(function(){
					console.log($(".loginBtn").css("display"))
					if ($(".loginBtn").css("display") == "inline") {
						loginShow ();
					}else{
						//商品详情
						var goods = {
							goodId: "blooma",
							goodNum: $("#blooma").val(),
							partId: "bloomaPart",
							partNum: $("#bloomaPart").val()
						}
						
						if ($("#blooma").val() == "0" && $("#bloomaPart").val() == "0") {
							alert("请至少选择一个商品！")
						}else{
							checkOrder (goods,data.data.goodPrice,data.data.partPrice);
						}
					}
				})
			break;
			case false:
				alert(data.info);
			break;
		}
	})
}





























