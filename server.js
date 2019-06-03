define(function(){
	function ser(){
		var oDiv = document.getElementById("ser");
				/*
					鼠标移入
					鼠标移出
				*/
				oDiv.onmouseover = function(){
					//-100 =》0
					startMove(0);
				}

				oDiv.onmouseout = function(){
					//0 =》-100
					startMove(-240);
				}


				var timer = null;
				function startMove(iTarget){
					var oDiv = document.getElementById("ser");
					
					clearInterval(timer);
					timer = setInterval(function(){
						//判断速度的正负
						if(iTarget > oDiv.offsetLeft){
							var speed = 5;
						}else{
							var speed = -5;
						}


						//运动和停止分开
						if(oDiv.offsetLeft == iTarget){
							clearInterval(timer);
						}else{
							oDiv.style.left = oDiv.offsetLeft + speed + 'px';
						}
					}, 10);
				}


				
			}

	
	return{
				ser:ser
			}
})