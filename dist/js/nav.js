define(['jquery'],function($){
	function nav(){
		$(function(){
			$.ajax({
				type:'get',
				url:'../data/nav.json',
				success:function(arr){
					for(var i = 0; i <= 1;i++){
						$(`<li class = "me_li1">
								<img src="${arr[i].pic}" alt="" />
								<p>${arr[i].des}</p>
								<em>${arr[i].name}</em>
						   </li>`).appendTo('.menu #me_note')
					}
					for(var i = 2; i <= 3;i++){
						$(`<li class = "me_li2">
								<img src="${arr[i].pic}" alt="" />
								<p>${arr[i].des}</p>
								<em>${arr[i].name}</em>
						   </li>`).appendTo('.menu #me_all')
					}
					for(var i = 4; i<= 5;i++){
						$(`<li class = "me_li3">
								<img src="${arr[i].pic}" alt="" />
								<p>${arr[i].des}</p>
								<em>${arr[i].name}</em>
						   </li>`).appendTo('.menu #me_two')
					}
				},
				error:function(msg){
					alert('请求加载失败' + msg);
				}
			})
	/*第一个*/
			
			$('#me_liid1').on('click','#me_me1',function(){
				$(this).css('display','block');
			})
			$('#me_me1').on('mouseenter','li',function(){
				$('#me_me1').find('li').attr('class','');
				$(this).attr('class','nav_act');
				$('#me_me1').attr('display','block');
				$('.menu').find('.me_noteid').css('display','none').eq($(this).index()).css('display','block');

			})
		// 三级菜单加样式
		$('#me_me2').on('mouseenter','#me_me3',function(){
			$(this).css('display','block');
			$('#me_me3').on('mouseenter','li',function(){
				$('#me_me3').find('li').attr('class','');
				$(this).attr('class','nav_act');
		})
			
			

			})
			$('#me_me1').on('mouseleave','li',function(){
				$('#me_me1').attr('display','none');
				$('.menu').find('.me_noteid').css('display','none').eq($(this).index()).css('display','block');
			})
			

			
			
			
		})
	}
	return{
		nav:nav
	}
})