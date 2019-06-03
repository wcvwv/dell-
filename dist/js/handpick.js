define(['jquery'],function($){
	function handpick(){
		$(function(){
			$.ajax({
				type:"get",
				url:"../data/data_hp.json",
				success:function(arr){
					//获取解析好得数据
					for(var i = 0;i < arr.length;i++){
						//node创建好的节点【其中获取图片，获取加入购物车的id】
						$(`<li class = "js_li">
								<div class = 'js_div'>
									<a href="" id = "js_a">
										<img src="${arr[i].pic}" alt=""  class = "js_img">
										<div id = "js_flo"><a href="">&ensp;&ensp;值得信赖的品牌,激发人类潜能 —— 这是技术的终极意义，也是戴尔所做一切的源动力。此理念激励着人们、社区乃至全球不断进步。我们的环保行动，带动世界范围内的客户加入环保行列，为资源匮乏的年轻人提供技术、教育和培训，让他们的潜能得到充分的发挥。</a></div>
									</a>
									<button class = 'js_btn'><a href="commo.html">立即选购</a></button>
								</div>
								
							</li>`).appendTo('.jx_group ul');
					}
				},
				error:function(msg){
					alert('请求错误' + msg);
				}
			})
		})
	}
	return {
		handpick:handpick
	}
})