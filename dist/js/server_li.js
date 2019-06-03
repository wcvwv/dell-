define(['jquery'],function($){
	function serli(){
		$(function(){
			$.ajax({
				type:'get',
				url:"../data/server_li.json",
				success:function(arr){
					for(var i = 0;i < arr.length;i++){
						$(`<li class = "ser_li">
								<a href="">
									<img src="${arr[i].pic}" alt="" / class = "ser_img"><i>${arr[i].dec}</i>
								</a>
							</li>`).appendTo('#ser ul')
					}
				},
				error:function(msg){
					alert('请求失败'+ msg);
				}
			})
		})
	}
	return{
		serli:serli
	}
})