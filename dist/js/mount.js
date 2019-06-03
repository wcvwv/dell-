define(['jquery'],function($){
	function mount(){
		$(function(){
			$.ajax({
				type:'get',
				url:"../data/mount.json",
				success:function(arr){
					for(var i = 0; i <= 3;i++){
						$(`<li class = "mou_li">
								<img src="${arr[i].pic}" alt="" / class = "mou_img">
								<em class = "mou_em">${arr[i].des}</em >
								<b class = "mou_b">${arr[i].price}</b>
							</li>`).appendTo('.fittings #fit_fit');
					}
					for(var i = 4; i <= 7 ;i++){
						$(`<li class = "mou_li">
								<img src="${arr[i].pic}" alt="" / class = "mou_img">
								<em class = "mou_em">${arr[i].des}</em >
								<b class = "mou_b">${arr[i].price}</b>
							</li>`).appendTo('.fittings #power');
					}
					for(var i = 8; i <= 11;i++){
						$(`<li class = "mou_li">
								<img src="${arr[i].pic}" alt="" / class = "mou_img">
								<em class = "mou_em">${arr[i].des}</em >
								<b class = "mou_b">${arr[i].price}</b>
							</li>`).appendTo('.fittings #headset');
					}
				},
				error:function(msg){
					alert('请求失败' + msg);
				}
			})
			$('#fit_ul').find('li').mouseenter(function(){
				$('#fit_ul').find('li ').attr('class','');
				// $('.fittings').find('.fittings1').attr('display','none');
				$(this).attr('class','active');
				$('.fittings').find('.fittings1').css('display','none').eq($(this).index()).css('display','block');
			})

		})
	}
	return{
		mount:mount
	}
})