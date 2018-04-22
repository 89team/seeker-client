var express = require('express'),
    rootPath = require('../config').rootPath,
    rootData = require('../client-data'),
    router = express.Router();


function getConfig(req ,params){
    var config = {
        rootData: rootData,
        rootPath: rootPath,
        data: rootData['热门产品']
    }

    return Object.assign({} , config ,params || {});
}

//首页
router.get('/', function(req, res, next) {
    res.render('index', getConfig(req , {
        name: '热门产品',

    }));
});

//用户页面
router.get('/pages/team/index.html', function(req, res, next) {
    res.render('pages/team/index', getConfig(req , {
        name: '吃鸡游戏'
    }));
});

module.exports = router;