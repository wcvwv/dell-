<?php 
	header('content-type:text/html;charset="utf-8"');
	//跟后台约定好一个统一的格式
	$responseState = array('code'=> 0, 'message' => '');

	//取出post传递过来的数据
	$username = $_POST['username'];
	$password = $_POST['password'];
//天龙八部
	$link = mysql_connect('localhost','root','123456');
	if(!$link){
		$responseState['code'] = 1;
		$responseState['message'] = '数据库链接失败';
		echo json_encode($responseState);
		exit;
	}
	//设置字符集
	mysql_set_charset('utf8');
	//选择数据库
	mysql_select_db('test');
	//密码要加密进行储存
	$password = md5(md5(md5($password)."qian")."feng");
	//准备sql语句
	$sql = "SELECT * FROM users WHERE username = '{$username}' AND password = '{$password}'";
	$res = mysql_query($sql);
	$row = mysql_fetch_assoc($res);
	if(!$row){
		$responseState['code'] = 2;
		$responseState['message'] = "用户名或密码错误";
		echo json_encode($responseState);
	}else{
		$responseState['message'] = "登录成功";
		echo json_encode($responseState);
	}
	mysql_close($link);
 ?>