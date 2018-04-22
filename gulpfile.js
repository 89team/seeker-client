var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'), //启动express
    config = require('./config'), //配置文件
    path = require('path'), //路径工具
    rename = require('gulp-rename'), //更改文件名称
    uglify = require('gulp-uglify'), //压缩js
    cssnano = require('gulp-cssnano'), //压缩css
    autoprefixer = require('gulp-autoprefixer'), //浏览器版本自动处理浏览器前缀
    concat = require('gulp-concat'), //合并文件
    browserSync = require('browser-sync').create('Jc server'), //热部署工具
    base64 = require('gulp-base64'), //图片转换base64
    gulpEjs = require('gulp-ejs'), //模版引擎
    runSequence = require('run-sequence'),//执行任务顺序插件
    del     = require('del');


var reload = browserSync.reload;
// path 定义
var BASEDIR = './'
var STATICDIR = './static'

var FLIEPATHS = {
    'css': path.join(STATICDIR, 'css/**/*.css'),
    'js': path.join(STATICDIR, 'js/**/*.js'),
    'image': path.join(STATICDIR, 'images/**/*'),
    'view': path.join(BASEDIR, 'views/**/*.html')
};
//express启动任务
gulp.task('dev:watch', function() {
    nodemon({
        script: BASEDIR + 'server.js',
        ignore: ['.vscode', '.idea', 'node_modules'],
        env: {
            'NODE_ENV': 'development'
        }
    });

    browserSync.init(null, {
        proxy: 'http://localhost:' + config.port,
        files: [FLIEPATHS.css, FLIEPATHS.view],
        notify: false,
        open: true,
        port: 5000
    })

    gulp.watch(FLIEPATHS.view).on("change", browserSync.reload);
});
//express启动任务
gulp.task('dev:server', function() {
    nodemon({
        script: BASEDIR + 'server.js',
        ignore: ['.vscode', '.idea', 'node_modules'],
        env: {
            'NODE_ENV': 'ie'
        }
    });
});
//清空已生成的html文件， 保留文件夹
gulp.task('clean', function(cb) {
    var paths = [];
    paths.push(path.join(STATICDIR, 'pages/**/*.html'));    
    paths.push(path.join(STATICDIR, 'error.html'));    
    paths.push(path.join(STATICDIR, 'index.html'));
    return del(paths, cb);
});
//清空已生成的html文件， 保留文件夹
gulp.task('cleancss', function(cb) {
    var paths = [];
    paths.push(path.join(STATICDIR, 'css/'));    
    return del(paths, cb);
});
//生成静态html文件
gulp.task('static', function() {
    var selfPath = [FLIEPATHS.view, "!views/layout/**/*.html"];
    return gulp.src(selfPath)
        .pipe(gulpEjs({
            rootPath: config.rootPath,
            message: '错误输出信息位置'
        }))
        .pipe(gulp.dest(path.join(STATICDIR)));
});



//普通发布
gulp.task('build', (cd)=>{
    runSequence('clean', ['imageBase64', 'static'], cd);
});
//启动开发环境服务
gulp.task('dev', (cd)=>{
    runSequence('clean',['dev:watch'] ,cd);
});
//启动开发环境服务
gulp.task('devie', (cd)=>{
    runSequence('clean',['dev:server'] ,cd);
});