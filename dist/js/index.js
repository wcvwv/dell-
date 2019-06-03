define(['parabola','jquery','jquery-cookie'],function(parabola,$){
	function index(){
		$(function(){
			sc_num();
			sc_msg();
			//通过ajax下载数据，将数据添加页面上
			$.ajax({
				type:"get",
				url:"../data/data.json",
				success:function(arr){
					//1.我们获取数据是解析好的数据
					for(var i = 0;i < arr.length; i++){
						//2.node创建好的节点【其中获取图片，获取加入购物车id】
						$(`<li class = "goods_item">
							   	<div class = "goods_pic">
									<img src="${arr[i].pic}" alt="">
								</div>
								<div class = "goods_name">${arr[i].name}</div>
								<div class="sc">
									<div class="sc_btn" id = "${arr[i].id}">加入购物车</div>
								</div>
							</li>`).appendTo('.goods_box ul')
					}
				},
				error:function(msg){
					alert('请求错误' + msg);
				}
			})

			/*【4】商品的id：商品的数量
			1.cookie存储的数据量要尽可能的少
			2.cookie只能存储字符串
				存储json格式的字符串
				"goods" = "[{id:id,num:1},{id:id,num:3}]"*/

			//给加入购物车按钮添加一个点击事件
			//【3、后添加的节点也拥有事件，事件委托】
			$('.goods_box ul').on('click','.sc_btn',function(){
				// alert(this.id);
				var id = this.id;
				//【4.1】判断是否是第一次添加
				var first = $.cookie('goods') == null? true:false;
				if(first){
					//直接生成cookie
					$.cookie('goods',`[{"id":${id},"num":1}]`,{
						expires:7
					})
				}else{
					//2.判断之前是否添加过
					var same = false;//假设没有添加过
						//取出cookie
					var cookieStr = $.cookie('goods');//获取的值是一个字符串，
					//判断cookie是否存在
					if(cookieStr){
						//把字符串转为数据结构
						var cookieArr = JSON.parse(cookieStr);
						for(var i = 0; i < cookieArr.length;i++){
							if(cookieArr[i].id == id){
								same = true;
								//如果之前添加过
								cookieArr[i].num++;
								break;
							}
						}
						//3.没添加过，新增一条商品记录
						if(!same){
							var obj = {id:id,num:1};
							cookieArr.push(obj)
						}

						//重新存储回cookie
						$.cookie('goods',JSON.stringify(cookieArr),{
							expires:7
						})
					}
				}
					// alert($.cookie("goods"));
					sc_num();
					sc_msg();
					//抛物线运动
					ballMove(this);

			})
			//mouseenter  mouseleave
			// $('#scar').mouseover(function(){
			// 	$('.sc_right').css('display','block')
			// })
			// $('.sc_right').mouseover(function(){
			// 	$('.sc_right').css('display','block')
			// })
			// $('#scar').mouseout(function(){
			// 	$('.sc_right').css('display','none')
			// })
			// $('.sc_right').mouseout(function(){
			// 	$('.sc_right').css('display','none')
			// })




			//封装计算商品的数量【页面加载的时候调用，商品点击进购物车还要调用】
			function sc_num(){
				var cookieStr = $.cookie('goods');
				if(cookieStr){
					var cookieArr = JSON.parse(cookieStr)
					var sum = 0;//求和的数
					for(var i = 0;i < cookieArr.length;i++){
						sum +=cookieArr[i].num;
					}
					$('.sc_right .sc_num').html(sum);
				}else{
					$(".sc_right .sc_num").html(0);
				}
			}


			//加载购物车里面的商品数据
			function sc_msg(){
				//清空上一次的数据
				$('.sc_right ul').html('');
				//cookie存储 商品的id和商品的数量，需要全部商品的数量
				$.ajax({
					type:"get",
					url:"../data/data.json",
					success:function(arr){
						//arr 这个是所有商品的数据
						var cookieStr = $.cookie('goods')
						if(cookieStr){
							var cookieArr = JSON.parse(cookieStr);
							var newArr = [];

							for(var i = 0; i < arr.length; i++){
								for(var j = 0; j < cookieArr.length;j++){
									if(arr[i].id == cookieArr[j].id){
										//将商品数据添加上去
										arr[i].num = cookieArr[j].num;
										newArr.push(arr[i]);
									}
								}
							}
							/*console.log(newArr);*/
						}
						//通过查找到新数组，添加到数据到页面上
						for(var i = 0; i< newArr.length; i++){
							var node = $(`<li>
											<div class="sc_goodsPic">
												<img src="${newArr[i].pic}" alt="">
											</div>
											<div class="sc_goodsBtn" id = "${newArr[i].id}">购买</div>
											<div class="sc_removeBtn" id = "${newArr[i].id}">删除</div>
											<div class="sc_goodsNum">
												<span>商品数量：&ensp;${newArr[i].num}</span>
												<button id = "${newArr[i].id}">+</button>
												<button id = "${newArr[i].id}">-</button>
											</div>
										</li>`);
							node.appendTo('.sc_right ul');
						}
					},
					error:function(msg){
						alert('请求错误:' + msg);
					}
				})
			}
			//node点击的按钮
			function ballMove(node){
				$('#ball').css({
					display:'block',
					left:$(node).offset().left,
					top:$(node).offset().top
				})
				//给球设置图片
				$('#ball').find('img').attr('src',$(node).closest('.goods_item').find('.goods_pic img').attr('src'))
			//计算我们运动的偏移量
			var x = $(' .sc_num').offset().left - $(node).offset().left;
			var y = $('.sc_num').offset().top - $(node).offset().top;
			//声明一个抛物线对象
			var bool = new Parabola({
				el:"#ball",
				offset:[x,y],
				duration:500,
				curvature:0.0001,
				callback:function(){
					$('#ball').hide();
				}
			})
			bool.start();
			}
			//给右侧购物车添加点击删除的事件
			$(".sc_right ul").on('click','.sc_removeBtn',function(){
				var id = this.id;
				/*1、在cookie中商品删除
				2、可视界面上删除*/
				var cookieStr = $.cookie('goods');
				var cookieArr = JSON.parse(cookieStr);
				for(var i = 0; i < cookieArr.length; i++){
					if(cookieArr[i].id == id){
						cookieArr.splice(i,1);
						break;
					}
				}
				if(!cookieArr.length){
					$.cookie('goods',null);
				}else{
					$.cookie('goods',JSON.stringify(cookieArr),{
						expires:7
					})
				}
				//移出可视化界面
				$(this).closest('li').remove();
				sc_num();
			})
			//给+，—号添加点击事件
			$('.sc_right ul').on('click','.sc_goodsNum button',function(){
				//商品的id
				var id = this.id;
				var cookieStr = $.cookie('goods');
				var cookieArr = JSON.parse(cookieStr);
				//查找我们要修改的商品
				var obj = cookieArr.find(item => item.id ==id);
				if(this.innerHTML == '+'){
					obj.num++;
				}else{
					if(obj.num == 1){
						alert('商品数量为1，不能继续减少');
					}else{
						obj.num--;
					}
				}
				//更改显示的内容
				$(this).prevAll('span').html('商品数量' + obj.num);
				$.cookie('goods',JSON.stringify(cookieArr),{
					expires:7
				})
				sc_num();
			})
		})
	}
	return {
		shop:index
	}
})