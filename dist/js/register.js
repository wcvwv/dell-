define(['jquery'],function($){
	function register(){
		$.ajax({
			type:'get',
			url:'../data/register.json',
			success:function(arr){
				for(var i = 0; i < 3;i++ ){
					$(`
						<li class = "reg_li">
						<a href="">${arr[i].des}</a>
						</li>
						`
						).appendTo('.register')
				}
			},
			error:function(msg){
				alert('请求失败' + msg);
			}
		})
		$('#enter').click(function(){
			$('.register_div').css('display',"block");
			$(this).css('backgroundColor','white');
			$(this).css('color','#007db8');
			$("#enter .iconfont").css('color','#007db8');
			// $("#enter").css('backgroundColor','#007db8');
			// $("#enter").css('color','#007db8');


		});
		$('.register_div em').click(function(){
			$('.register_div').css('display','none');
			$('#enter').css('backgroundColor','#007db8');
			$("#enter .iconfont").css('color','white');
			$("#enter").css('color','white');


		})
	}
	return{
		register:register
	}
})