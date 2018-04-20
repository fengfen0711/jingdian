$(function () {
	//支付方式选择
	paymentMethodClassify ();
	//add_ADDRESS
	add_ADDRESS ();
	
	//全国城市三级联动
	var Gid  = document.getElementById ;
	var showArea = function(){
		Gid('show').innerHTML = "<h3>省" + Gid('s_province').value + " - 市" + 	
		Gid('city').value + " - 县/区" + 
		Gid('s_county').value + "</h3>"
	}
	
	//商品详情
	goodDetail ();
	
	//查询地址列表
	addressList ();
	
	//手机号
	$("#reciverTel").keypress(function () {
		intOnly();
	})
})

//addAdressBtn和地址选择
function addAdressBtn () {
	$(".addAddress1").mouseover(function () {
		$(this).find("img").attr("src","img/index/add1.png");
	})
	$(".addAddress1").mouseout(function () {
		$(this).find("img").attr("src","img/index/add.png");
	})
	
	$(".addAddressz div:eq(0)").addClass("addAddressHover");
	$(".addAddressz div:eq(0)").find(".del").addClass("disblock");
	$(".addAddressz div:eq(0)").find(".reviseAdrBtn").addClass("disblock");
	
	$(".addAddressz div").bind("click",function () {
		$(this).addClass("addAddressHover").siblings().removeClass("addAddressHover");
		$(this).find(".del").addClass("disblock").parent().parent().siblings().find(".del").removeClass("disblock");
		$(this).find(".reviseAdrBtn").addClass("disblock").parent().parent().siblings().find(".reviseAdrBtn").removeClass("disblock");
		
		//当前选中地址详情
		var addressSelId = $(".addAddressHover").attr("id");
		var addressSelid = {
			id: addressSelId
		}
		addressSel(addressSelid);
	})
	
	//提交订单
	$(".submitBtn").click(function(){
		submitOrder ();
	})
	
	
}

//支付方式
function paymentMethodClassify () {
	$(".paymentMethodClassify a:eq(1)").addClass("payActive")
	
	$(".paymentMethodClassify a").bind("click",function () {
		$(this).addClass("payActive").siblings().removeClass("payActive");
	})
}

//add_ADDRESS
function add_ADDRESS () {
	$(".addAddress1").click(function(){
		$("#Shade").fadeIn();
	    $(".addressBoxz").css({"display":"block"});
	    $("#addressBox").css({"left":"100%"}).stop().animate({"left":"21%"});
	    
	    $(".addr_cut").click(function () {
			$("#Shade").fadeOut(200);
			$("#addressBox").stop().animate({"left":"100%"},200,function(){
				$(".addressBoxz").css({"display":"none"});
			});
			$(".adr_nameError").css({"display":"none"});
		    $(".adr_telError").css({"display":"none"});
		    $(".adr_adr3Error").css({"display":"none"});
		    $(".adr_postalCodeError").css({"display":"none"});
		    $("#reciverName").html("").removeClass("reciverName1").addClass("reciverName");
		    $("#reciverTel").html("").removeClass("reciverTel1").addClass("reciverTel");
		    $("#adrTxt").html("").removeClass("adrTxt1").addClass("adrTxt");
		    $("#postalCode").html("").removeClass("postalCode1").addClass("postalCode");
		})
	})
	
	//<地址>-------->
	var reciverName = document.getElementById("reciverName");
	var reciverTel = document.getElementById("reciverTel");
	var adrTxt = document.getElementById("adrTxt");
	var postalCode = document.getElementById("postalCode");
	var s_province = document.getElementById("s_province");
	var s_city = document.getElementById("s_city");
	var s_county = document.getElementById("s_county");
	
	reciverName.onfocus = function() {
		reciverName.value='';		
	}
	reciverTel.onfocus = function() {
		reciverTel.value='';		
	}
	adrTxt.onfocus = function() {
		adrTxt.value='';		
	}
	postalCode.onfocus = function() {
		postalCode.value='';		
	}
	labelTxt.onfocus = function() {
		labelTxt.value='';		
	}
	
	reciverName.onblur = function () {
		test6("reciverName");
	}
	reciverTel.onblur = function () {
		test7("reciverTel");
	}
	adrTxt.onblur = function () {
		test9("adrTxt");
	}
	postalCode.onblur = function () {
		test8("postalCode");
	}
	
	//保存地址
	$(".keepBtn").click(function(){
		if (test6("reciverName") && test7("reciverTel") && test9("adrTxt")) {
			var address = {
				name: $(".reciverName").val(),
				phone: $(".reciverTel").val(),
				addr: $("#s_province").val() +"-"+ $("#s_city").val() +"-"+ $("#s_county").val() +"-"+ $("#adrTxt").val(),
				status: 0,
				addrId: ""
			}
			firstAddress (address);
			$("#Shade").fadeOut(200);
			$("#addressBox").stop().animate({"left":"100%"},200,function(){
				$(".addressBoxz").css({"display":"none"});
			});
		}
	})
}

//初次添加地址
function firstAddress (obj) {
	$.get( URL1 + "address/save",obj,function(data){
		console.log(data);
		switch(data.code){
			case true:
				window.location.reload();
			break;
			case false:
				alert(data.info);
			break;
		}
	})
}

//查询地址列表
function addressList () {
	$.get( URL1 + "address/list",function(data){
		console.log(data);
		switch(data.code){
			case true:
				var arr = data.data;
				if(data.data.length){
					$.each(data.data,function(i){
						var arr1 = arr[i].addr.split("-");
						var $div = $('<div class="addAddress" id="'+arr[i].id+'"><p class="address_userName">'+arr[i].name+'</p><p class="address_tel">'+arr[i].phone+'</p><p class="address_address"><span>'+ arr1[0] +'</span> <span>'+arr1[1]+'</span> <span>'+arr1[2]+'</span> <br/>'+arr1[3]+'</p><p class="address_revise"><a href="###" class="reviseAdrBtn">修改</a><a href="###" class="del">删除</a></p></div>');
						$(".addAddressz").prepend($div);
						//删除地址
						$(".del").click(function(){
							var addrId = $(this).parent().parent().attr("id");
							var del = {
								id: addrId
							}
							addressDel (del);
						})
						
						//修改地址
						$(".reviseAdrBtn").click(function () {
							setCookie("revice","1",1);
							$("#Shade").fadeIn();
						    $(".addressBoxz").css({"display":"block"});
						    $("#addressBox").css({"left":"100%"}).stop().animate({"left":"21%"});
						    
						    
						    $(".addr_cut").click(function () {
								$("#Shade").fadeOut(200);
								$("#addressBox").stop().animate({"left":"100%"},200,function(){
									$(".addressBoxz").css({"display":"none"});
								});
								$(".adr_nameError").css({"display":"none"});
							    $(".adr_telError").css({"display":"none"});
							    $(".adr_adr3Error").css({"display":"none"});
							    $(".adr_postalCodeError").css({"display":"none"});
							    $("#reciverName").html("").removeClass("reciverName1").addClass("reciverName");
							    $("#reciverTel").html("").removeClass("reciverTel1").addClass("reciverTel");
							    $("#adrTxt").html("").removeClass("adrTxt1").addClass("adrTxt");
							    $("#postalCode").html("").removeClass("postalCode1").addClass("postalCode");
							})
							var addrId1 = $(this).parent().parent().attr("id");
							var reviceId = {
								id: addrId1
							}
							addressSelRevice (reviceId);
						})
					})
				}
				//addAdressBtn和地址选择
				addAdressBtn ();
				if (arr.length > 0 ) {
					//当前选中地址详情
					var addressSelId = $(".addAddressHover").attr("id");
					var addressSelid = {
						id: addressSelId
					}
					addressSel(addressSelid);
				}
				
			break;
			case false:
				console.log(data.info);
			break;
		}
	})
}

//当前地址详情显示
function addressSel (obj) {
	$.get( URL1 + "address/sel",obj,function(data){
		console.log(data);
		switch(data.code){
			case true:
				var arr = data.data.addr.split("-");
				$(".orderTotalAderss").html("");
				var $addressSelShow = $('<p class="detail_address" id="'+ data.data.id +'"><span>寄送地址：</span><span>'+ arr[0] +'</span> <span>'+ arr[1] +'</span> <span>'+ arr[2] +'</span> <span>'+ arr[3] +'</span></p><p class="detail_receiver"><span>收货人：</span><span>'+ data.data.name +'</span> <span>'+ data.data.phone +'</span></p>');
				$(".orderTotalAderss").append($addressSelShow);
			break;
			case false:
				console.log(data.info);
			break;
		}
	})
}

//当前地址修改
function addressSelRevice (obj) {
	$.get( URL1 + "address/sel",obj,function(data){
		console.log(data);
		switch(data.code){
			case true:
				var arr = data.data.addr.split("-");
				$("#reciverName").val(data.data.name);
				$("#reciverTel").val(data.data.phone);
				$("#s_province").val(arr[0]);
				change(1);
				$("#s_city").val(arr[1]);
				change(2);
				$("#s_county").val(arr[2]);
				$("#adrTxt").val(arr[3]);
				
				//修改保存
				$(".keepBtn").click(function(){
					if (getCookie("revice")) {
						if (test6("reciverName") && test7("reciverTel") && test9("adrTxt")) {
							var address1 = {
								name: $(".reciverName").val(),
								phone: $(".reciverTel").val(),
								addr: $("#s_province").val() +"-"+ $("#s_city").val() +"-"+ $("#s_county").val() +"-"+ $("#adrTxt").val(),
								status: 1,
								addrId: parseInt(data.data.id)
							}
							firstAddress (address1);
							$("#Shade").fadeOut(200);
							$("#addressBox").stop().animate({"left":"100%"},200,function(){
								$(".addressBoxz").css({"display":"none"});
							});
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

//删除地址
function addressDel (obj) {
	$.get( URL1 + "address/del",obj,function(data){
		console.log(data);
		switch(data.code){
			case true:
				window.location.reload();
			break;
			case false:
				alert(data.info);
			break;
		}
	})
}

//商品详情
function goodDetail () {
	if (getCookie("goodNum") > 0) {
		var $p = ('<p class="clearFloat"><img src="img/index/ablooma_small.png"/> <span class="productName">阿布</span><span><span class="productPrice">'+ parseInt(getCookie("goodPrice")) +'</span>元 * <span class="productNum">'+ getCookie("goodNum") +'</span></span><span class="totalPrice">'+ ( parseInt(getCookie("goodPrice")) * getCookie("goodNum")) +'元</span></p><p class="clearFloat"><img src="img/index/more_small.png"/> <span class="productName">传屏接收器</span><span><span class="productPrice">0</span>元 * <span class="productNum">'+ getCookie("goodNum") +'</span></span><span class="totalPrice">0元</span></p>');
		$(".orderProduct").append($p);
	}
	if (getCookie("partNum") > 0) {
		var $p1 = $('<p class="clearFloat"><img src="img/index/base_small.png"/> <span class="productName">底座</span><span><span class="productPrice">'+ parseInt(getCookie("partPrice")) +'</span>元 * <span class="productNum">'+ getCookie("partNum") +'</span></span><span class="totalPrice">'+ ( parseInt(getCookie("partPrice")) * getCookie("partNum")) +'元</span></p>');
		$(".orderProduct").append($p1);
	}
	var $p2 = $('<p class="totalNum"><span>商品件数：</span><b>'+ (parseInt(getCookie("goodNum")*2)+parseInt(getCookie("partNum"))) +'件</b></p><p class="totalNum"><span>金额总计：</span><b>'+ getCookie("totalPrice") +'元</b></p><p class="totalNum"><span>运费：</span><b>0元</b></p>');
	$(".productTotal").append($p2);
	var $p3 = $('<p class="detail_price"><span>共计应付金额：</span><i>¥</i><b>'+ getCookie("totalPrice") +'.00</b></p>');
	$(".orderTotalPrice").append($p3);
}

//提交订单
function submitOrder () {
	var goods = {
		goodId: "blooma",
		goodNum: getCookie("goodNum"),
		partId: "bloomaPart",
		partNum: getCookie("partNum"),
		addrId: $(".addAddressHover").attr("id"),
		channel: $(".payActive").attr("id")
	}
		
	if ($(".addAddressHover").attr("id") && $(".payActive").attr("id")) {
		$.post( URL1 + "order/toSubmit",goods,function(data){
			console.log(data);
			switch(data.code){
				case true:
					removeCookie('goodNum',getCookie("goodNum"));
					removeCookie('partNum',getCookie("partNum"));
					removeCookie('totalPrice',getCookie("totalPrice"));
					removeCookie('goodPrice',getCookie("goodPrice"));
					removeCookie('partPrice',getCookie("partPrice"));
					pingppPc.createPayment(data.data, function(result, err) {
    	                console.log(result);
    	                console.log(err);
    	            });
				break;
				case false:
					console.log(data.info);
				break;
			}
		})
	}else{
		alert("请填写收货地址和支付方式！");
	}
}


function test6 (id) {
    var mm = document.getElementById(id);
	
	if(mm.value && mm.value != "姓名"){
		if (strlen($("#reciverName").val()) <= 16) {
			mm.className='reciverName';
			$(".adr_nameError").html("");
			$(".adr_nameError").css({"display":"none"});
			return true;
		}else{
			mm.className='reciverName1';
			$(".adr_nameError").html("姓名最长8个汉字16个字符！");
			$(".adr_nameError").css({"display":"block"});
		}
	}
	else{
		mm.className='reciverName1';
		$(".adr_nameError").html("姓名不能为空！");
		$(".adr_nameError").css({"display":"block"});
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

	

function test7 (id) {
    var tel=document.getElementById(id);
    var re=/^1[3|4|5|7|8][0-9]{9}$/;//电话号码

	if(re.test(tel.value)){
		tel.className='reciverTel';
		$(".adr_telError").css({"display":"none"});
		return true;
	}
	else{
		tel.className='reciverTel1';
		$(".adr_telError").css({"display":"block"});
		return false;
	}
}

function test8 (id) {
    var codeTxt = document.getElementById(id);
    var re3 = /^[0-9]{6}$/;
	
	if (codeTxt.value) {
		if(re3.test(codeTxt.value)){
			codeTxt.className='postalCode';
			$(".adr_postalCodeError").css({"display":"none"});
			return true;
		}
		else{
			codeTxt.className='postalCode1';
			$(".adr_postalCodeError").css({"display":"block"});
			return false;
		}
	}else{
		codeTxt.className='postalCode';
		$(".adr_postalCodeError").css({"display":"none"});
	}
}

function test9 (id) {
    var mm = document.getElementById(id);
	
	if(mm.value && mm.value != "详细地址"){
		mm.className='adrTxt';
		$(".adr_adr3Error").css({"display":"none"});
		return true;
	}
	else{
		mm.className='adrTxt1';
		$(".adr_adr3Error").css({"display":"block"});
		return false;
	}
}

//判断字符串长度
function strlen(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        //单字节加1 
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++;
        }else {
            len += 2;
        }
    }
    return len;
}
























