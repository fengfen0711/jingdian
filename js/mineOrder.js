$(function () {
	//分页
	var Pagination = {
	    code: '',
	    // converting initialize data
	    Extend: function(data) {
	        data = data || {};
	        Pagination.size = data.size || 300;
	        Pagination.page = data.page || 1;
	        Pagination.step = data.step || 0;
	    },
	    // add pages by number (from [s] to [f])
	    Add: function(s, f) {
	        for (var i = s; i < f; i++) {
	            Pagination.code += '<a>' + i + '</a>';
	        }
	    },
	    // add last page with separator
	    Last: function() {
	        Pagination.code += '<i>...</i><a>' + Pagination.size + '</a>';
	    },
	    // add first page with separator
	    First: function() {
	        Pagination.code += '<a>1</a><i>...</i>';
	    },
	    // change page
	    Click: function() {
	        Pagination.page = +this.innerHTML;
	        Pagination.Start();
	    },
	    // previous page
	    Prev: function() {
	        Pagination.page--;
	        if (Pagination.page < 1) {
	            Pagination.page = 1;
	        }
	        Pagination.Start();
	    },
	    // next page
	    Next: function() {
	        Pagination.page++;
	        if (Pagination.page > Pagination.size) {
	            Pagination.page = Pagination.size;
	        }
	        Pagination.Start();
	    },
	    // binding pages
	    Bind: function() {
	        var a = Pagination.e.getElementsByTagName('a');
	        for (var i = 0; i < a.length; i++) {
	            if (+a[i].innerHTML === Pagination.page) {
	            	a[i].className = 'current';
	            }
	            a[i].addEventListener('click', Pagination.Click, false);
	        }
	        orderList (Pagination.page);
	    },
	    // write pagination
	    Finish: function() {
	        Pagination.e.innerHTML = Pagination.code;
	        Pagination.code = '';
	        Pagination.Bind();
	    },
	    // find pagination type
	    Start: function() {
	        if (Pagination.size < Pagination.step * 2 + 10) {
	            Pagination.Add(1, Pagination.size + 1);
	        }
	        else if (Pagination.page < Pagination.step * 2 + 1) {
	            Pagination.Add(1, Pagination.step * 2 + 4);
	            Pagination.Last();
	        }
	        else if (Pagination.page > Pagination.size - Pagination.step * 2) {
	            Pagination.First();
	            Pagination.Add(Pagination.size - Pagination.step * 2 - 2, Pagination.size + 1);
	        }
	        else {
	            Pagination.First();
	            Pagination.Add(Pagination.page - Pagination.step, Pagination.page + Pagination.step + 1);
	            Pagination.Last();
	        }
	        Pagination.Finish();
	    },
	    // binding buttons
	    Buttons: function(e) {
	        var nav = e.getElementsByTagName('a');
	        nav[0].addEventListener('click', Pagination.Prev, false);
	        nav[1].addEventListener('click', Pagination.Next, false);
	    },
	    // create skeleton
	    Create: function(e) {
	        var html = [
	            '<a class="glyphicon glyphicon-chevron-left"></a>', // previous button
	            '<span></span>',  // pagination container
	            '<a class="glyphicon glyphicon-chevron-right"></a>'  // next button
	        ];
	
	        e.innerHTML = html.join('');
	        Pagination.e = e.getElementsByTagName('span')[0];
	        Pagination.Buttons(e);
	    },
	    // init
	    Init: function(e, data) {
	        Pagination.Extend(data);
	        Pagination.Create(e);
	        Pagination.Start();
	    }
	};
	
	function init(page_num) {
	    Pagination.Init(document.getElementById('pagination'), {
	        size: page_num,
	        page: 1,
	        step: 0
	    });
	};
	
	var b = true;
	orderList (1);
	
	//订单列表
	function orderList (page_num) {
		$.post( URL1 + "order/all",{pageNum:page_num},function(data){
			console.log(data);
			switch(data.code){
				case true:
					if (b) {
						if (data.data.orders.length ==0){
							init(1);
						}else{
							init(data.data.totalPage);
						}
					}
					console.log(data.data.pageNum);
					var arr = data.data.orders;
					if(arr.length){
						$(".mineOrderBox").html("");
						$.each(arr,function(i){
							order (arr[i]);
						})
					}
					//删除订单
					$(".delOrderBtn").click(function(){
						$("#Shade").fadeIn();
					    $(".delOrderz").css({"display":"block"});
					    $("#delOrder").css({"left":"100%"}).stop().animate({"left":"21%"});
					    var orderId = $(this).parent().parent().attr("id");
						console.log(orderId);
						var order_del = {
							orderId: orderId
						}
					    
					    //取消删除
						$(".cancelBtn").click(function(){
							$("#Shade").fadeOut(200);
							$("#delOrder").stop().animate({"left":"100%"},200,function(){
								$(".delOrderz").css({"display":"none"});
							});
						})
						
						//确定删除
						$(".confirmBtn").click(function(){
							$("#Shade").fadeOut(200);
							$("#delOrder").stop().animate({"left":"100%"},200,function(){
								$(".delOrderz").css({"display":"none"});
							});
							orderDel (order_del);
						})
					})
					
					//去支付
					$(".pay_order").click(function(){
						var payOrderId = $(this).parent().parent().attr("id");
						console.log(payOrderId);
						var order_pay = {
							orderId: payOrderId
						} 
						orderPay (order_pay);
					})
					
					
					b = false;
				break;
				case false:
					alert(data.info);
				break;
			}
		})
	}
	
	//删除订单
	function orderDel (obj) {
		$.post( URL1 + "order/delete",obj,function(data){
			console.log(data);
			switch(data.code){
				case true:
					window.location.reload();
				break;
				case false:
					console.log(data.info);
				break;
			}
		})
	}
	
})


//动态添加订单
function order (obj) {
	var a,$b;
	if (obj.status == 0) {
		a = "未付款";
		$b = $('<a href="###" class="pay_order">支付货款</a>');
		c = "无";
	}else if(obj.status == 1){
		a = "待发货";
		$b = $('<a href="help.html">申请售后</a>');
		c = "无";
	}else if(obj.status == 2){
		a = "已发货";
		$b = $('<a href="help.html">申请售后</a>');
		c = "中通快递（222299993333）";
	}else if(obj.status == 3){
		a = "已收货";
		$b = $('<a href="help.html">申请售后</a>');
		c = "中通快递（222299993333）";
	}
	var arr1 = obj.address.split("-");
	var $order = $('<div class="onlyOrder" id="'+ obj.mainOrderId +'"></div>');
	var $orderlist = $('<p class="orderNum"><span>订单号：'+ obj.mainOrderId +'</span></p><p class="only_title clearFloat"><span class="l">'+ a +'</span><span class="r">订单金额：'+ obj.totalPrice +'元</span></p><p class="only_data"><span>'+ obj.orderDate +'</span><span>'+ obj.orderTime +'</span><span>'+ obj.name +'</span><span>在线支付</span><span>快递：'+ c +'</span></p><p class="only_tel"><span>电话：'+ obj.phone +'</span><span>地址：'+ arr1[0] +' '+ arr1[1] +' '+ arr1[2] +' '+ arr1[3] +'</span></p>');		
	var $orderlist1 = $('<p class="only_product"></p>');
	if (obj.goodNum > 0) {
		var $a = $('<a class="only_pro"><img src="img/index/ablooma_small.png"/> <span>阿布</span> <span>999元 * '+ obj.goodNum +'</span></a><a class="only_pro"><img src="img/index/more_small.png"/> <span>传屏接收器</span> <span>赠送 * '+ obj.goodNum +'</span></a>');
	}
	if (obj.partNum > 0) {
		var $a1 = $('<a class="only_pro1"><img src="img/index/base_small.png"/> <span>底座</span> <span>50元 * '+ obj.partNum +'</span></a>');
	}
	$orderlist1.prepend($a);
	$orderlist1.prepend($a1);
	
	var $orderlist2 = $('<p class="only_btn"><a href="###" class="delOrderBtn">删除订单</a></p>');
	$orderlist2.prepend($b);
	$order.append($orderlist);
	$order.append($orderlist1);
	$order.append($orderlist2);
	$(".mineOrderBox").prepend($order);
}




//去支付
function orderPay (obj) {
	$.post( URL1 + "pay/getCharge",obj,function(data){
		console.log(data);
		switch(data.code){
			case true:
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
}






















