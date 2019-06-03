const gulp = require('gulp');//引入gulp
/*静态资源，所有不需要你编写的代码，预先准备好的，叫做静态页面
.html  图片  数据  .js*/

//网页
gulp.task('copy-html',function(){
	return gulp.src(['index.html','commo.html'])
	.pipe(gulp.dest('dist'))
	.pipe(connect.reload());
})

//图片
gulp.task('images',function(){
	return gulp.src('images/*.{jpg,png,gif}')
	.pipe(gulp.dest('dist/images'))
	.pipe(connect.reload());
})

//拷贝数据
gulp.task('data',function(){
	return gulp.src(['*.json','!package.json'])
	.pipe(gulp.dest('dist/data'))
	.pipe(connect.reload());
})
//拷贝php数据
gulp.task('data2',function(){
	return gulp.src('*.php')
	.pipe(gulp.dest('dist/data'))
	.pipe(connect.reload());
})

//拷贝第三方的js
gulp.task('scripts',function(){
	gulp.src(['*.js','gulpfile.js'])
	.pipe(gulp.dest('dist/js'))
	.pipe(connect.reload());
})

//编译scss样式
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const minifyCSS = require('gulp-minify-css');

gulp.task('sass',function(){
	return gulp.src('stylesheet/index.scss')
	.pipe(sass())
	.pipe(gulp.dest('dist/css'))
	.pipe(minifyCSS())
	.pipe(rename('index.min.css'))
	.pipe(gulp.dest('dist/css'))
	.pipe(connect.reload());
})
gulp.task('sass2',function(){
	return gulp.src('stylesheet/iconfont.scss')
	.pipe(sass())
	.pipe(gulp.dest('dist/css'))
	.pipe(connect.reload());
})
gulp.task('sass3',function(){
	return gulp.src('stylesheet/reset.scss')
	.pipe(sass())
	.pipe(gulp.dest('dist/css'))
	.pipe(connect.reload());
})
gulp.task('sass4',function(){
	return gulp.src('stylesheet/commo.scss')
	.pipe(sass())
	.pipe(gulp.dest('dist/css'))
	.pipe(minifyCSS())
	.pipe(rename('commo.min.css'))
	.pipe(gulp.dest('dist/css'))
	.pipe(connect.reload());
})
//一次性执行多个任务

gulp.task('build',['copy-html','images','data','data2','scripts','sass','sass2','sass3','sass4'],function(){
	console.log('工程执行成功')
})

//实时监听功能
gulp.task('watch',function(){
	gulp.watch('stylesheet/index.scss',['sass']);
	gulp.watch('stylesheet/iconfont.scss',['sass2']);
	gulp.watch('stylesheet/reset.scss',['sass3']);
	gulp.watch('stylesheet/commo.scss',['sass4']);

	gulp.watch(['*.js','gulpfile.js'],['scripts']);
	gulp.watch(['*.json','!package.json'],['data']);
	gulp.watch('*.php',['data2']);

	gulp.watch('images/*.{jpg,png}',['images']);
	gulp.watch(['index.html','commo.html'],['copy-html']);
})

//连接服务器
const connect = require('gulp-connect');
gulp.task('server',function(){
	connect.server({
		root:'dist',
		port:8888,
		livereload:true
	})
})

//同时启动监听和服务器
gulp.task('default',['watch','server']);