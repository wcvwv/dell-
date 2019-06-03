define(['jquery'],function($){
	function banner(){
		$(function(){
			var oBtn = $('.play1').find('ol').find("li");
			var oUl = $('#play').find('ul');
			var oLi = oUl.find('li');
			//设置，我当前点击的按钮的下标，当前应该显示图片的下标
			var iNow = 0;
			oBtn.click(function(){
				iNow = $(this).index();
				tab();
			})
			//切换图片
			function tab(){
				oBtn.attr('class','').eq(iNow).attr('class','active');
				if(iNow == oBtn.size()){
					//iNow == 5 最后一张图片 让下标为0的按钮变成被选中
					oBtn.eq(0).attr('class','active');
				}
				oUl.stop().animate({
					top: -iNow * 465
				},function(){
					if(iNow == oBtn.size()){
						oUl.css('top',0);
						iNow = 0;
					}
				})
			}

			var timer = setInterval(function(){
				iNow++
				// document.title = iNow;
				tab();
			},2000);

			$('#play').mouseenter(function(){
				clearInterval(timer);
			})

			$('#play').mouseleave(function(){
				timer = setInterval(function(){
					iNow++;
					// document.title = iNow;
					tab();
				},2000)
		})
	})
	}

	
	return{
		banner:banner,
		
	}
})