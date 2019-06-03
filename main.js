console.log('引入成功');

/*配置引入的模块*/

require.config({
	paths:{
		'jquery' : 'jquery-1.11.3',
		'jquery-cookie':"jquery.cookie",
		'parabola':'parabola',
		'slide':'slide',
		'index':'index',
		'handpick':'handpick',
		'ser':'server',
		'serli':'server_li',
		'mount':'mount',
		'nav':'nav',
		'register':'register',
		'zhuce':'zhuce'
		
	},

//jquery-cookie模块依赖jQuery
	shim:{
		'jquery-cookie':['jquery'],
//声明不适用AMD规范的模块
		'parabola':{
			exports:'_'
		}
	}
})

require(['slide','index','handpick','ser','serli','mount','nav','register','zhuce'],function(slide,index,handpick,ser,serli,mount,nav,register,zhuce){
	slide.banner();
	index.shop();
	handpick.handpick();
	ser.ser();
	serli.serli();
	mount.mount();
	nav.nav();
	register.register();
	zhuce.zhuce();
})