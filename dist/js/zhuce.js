define(['jquery'],function($){
	function zhuce(){
	$('')
		$.ajax({
			type: "post",
			url: "../data/register.php",
			data:str,
			success:function(result){
						// console.log(result);
				var obj = JSON.parse(result);
					if(!obj.code){
						oA.style.display = "block";
						oA.innerHTML = obj.message;

							//启动延时器，直接跳转到登录页面
							// setTimeout(function(){
							// 	location.replace('登录.html');
							// },1000)
					}else{
						oA.style.display = "block";
						oA.innerHTML = obj.message;
					}
				},
			error:function(msg){
				console.log(msg);
			}
		})
		//封装一个函数，传入元素节点，拼接成querystring
		function queryString(nodes){
			var str = '';
			for(var i = 0; i < nodes.length; i++ ){
				str +=nodes[i].name + "=" + nodes[i].value + "&";
			}
			return(str.substring(0,str.length-1));
		}
		// 实现密码的可查看
		$('show').click(function(){
			$(this).css('type','text');
		})
	}
	return{
		zhuce:zhuce
	}
})