var express = require('express');
var fs = require('fs');
var path = require('path');

var router = express.Router();

function readFileJSON(__path, res) {
    var reslut = {};
    fs.readFile(path.join(__dirname, __path), function(err, data) {
        if (err) {
            data = '查询失败';
        }
        res.json(data.toString());
    });
}

function readFileText(__path, res) {
    fs.readFile(__dirname + __path, function(err, data) {
        if (err) {
            data = null;
        }
        res.send(data.toString());
    });
}


/**
 * 首页获取当前登录人全部菜单
 */
router.get('/home/getMenus.action', function(req, res, next) {
    readFileJSON('data/menu.json', res);
});

module.exports = router;