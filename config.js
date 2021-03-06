var minimist = require('minimist');

var knownOptions = {
    string: 'env',
    default: {
        env: process.env.NODE_ENV || 'development'
    }
};

var port = 3000;
//开发环境
var rootPath = 'http://192.168.199.154:5000';
var options = minimist(process.argv.slice(2), knownOptions);

//定义发布页面输出rootPath
if(options.env === 'production'){
	rootPath = 'http://89team.com';
}

const shopsList = [
	'王者荣耀',
	'英雄联盟',
	'吃鸡手游',
	'夏日女装',
	'首页面'
];

/**
 * [项目配置信息]
 * @param  {[number]}    port        [服务器端口号]
 * @param  {[string]}    projectName [项目名称用于mockjs访问express接口使用， rootPath + projectName + 接口名称访问后台]
 * @param  {[string]}    rootPath    [所有html模版中引用的根路径]
 */
module.exports = {
    'port': options.env === 'ie' ? 5000 : 3000,
    'projectName': 'server',
    'rootPath': rootPath,
    'globalConfig': options,
    'shopsList': shopsList
}