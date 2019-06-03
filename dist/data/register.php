<?php 
	header('content-type:text/html;charset="utf-8"');
	//跟后台约定好一个统一的格式
	$responseState = array('code' => 0,'message' => '');
	// 获取post提交过来的数据
	$username = $_POST['username'];
	$password = $_POST['password'];
	$repassword = $_POST['repassword'];
	// 两次输入的密码必须一致
	if($password != $repassword){
		$responseState['code'] = 1;
		$responseState['message'] = "两次密码输入不一致";
		//服务器通过json格式字符串传给html
		echo json_encode($responseState);
		exit;//若错误退出程序
	}
	//输入为空时
	if(!$username || !$password || !$repassword ){
		$responseState['code'] = 3;
		$responseState['message'] = "请填写完整";
		//服务器通过json格式字符串传给html
		echo json_encode($responseState);
		exit;//若错误退出程序
	}
	// 用户名不能重复【连接数据库，天龙八部】
	$link = mysql_connect('localhost','root','123456');

	if(!$link){
		$responseState['code'] = 2;
		$responseState['message'] = "数据库链接失败";
		echo json_encode($reponseState);
		exit;//退出程序

	}

	mysql_set_charset('utf8');

	mysql_select_db('dell');
	//用户名不能重复
	$sql = "SELECT * FROM delluser WHERE username = '{$username}'";
	$res = mysql_query($sql);
	$row = mysql_fetch_assoc($res);
	if($row){
		$responseState['code'] = 3;
		$responseState['message'] = "用户名已存在";
		echo json_encode($responseState);
		exit;//退出程序
	}
	//密码要加密进行存储
	$password =  md5(md5(md5($password).'qian').'feng');
	//准备sql进行注册
	$sql = "INSERT INTO users (username,password) VALUES ('{$username}','{$password}') ";
	$res = mysql_query($sql);

	//判断是否插入成功
	if($res){
		$responseState['message'] = '注册成功';
		echo json_encode($responseState);
	}else{
		$responseState['code'] = 4;
		$responseState ['message'] = '注册失败';
		echo json_encode($responseState);
	}
	mysql_close($link);
 ?>