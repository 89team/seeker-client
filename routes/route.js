var express = require('express'),
    rootPath = require('../config').rootPath,
    router = express.Router();


function getConfig(req ,params){
    var config = {
        menuId: req.query.m,
        rootPath: rootPath
    }

    return Object.assign({} , config ,params || {});
}

//首页
router.get('/', function(req, res, next) {
    //res.redirect('/login'); //重定向到登录页
    res.render('index', getConfig(req));
});

//用户页面
router.get('/pages/team/index.html', function(req, res, next) {
    console.log(123);
    res.render('pages/team/index', getConfig(req));
});

module.exports = router;