/**
 * Created by Administrator on 2018/12/11.
 */
let model = require('../model/getData')
let express = require('express')
let router = express.Router()
let querystring = require("querystring")
let data = {
    errcode: 0,
    msg: '',
    data: []
}
/* 获取一个类型里面的文章列表（不包括文章内容） */
/* GET users listing. */
router.get('/', function(req, res, next) {
    if (!req.query.id) {
        data.errcode = '10000'
        data.msg = '缺少文章类型的id'
        res.json(data)
        return
    }
    model.getAppointData({
        table: 'type_list',
        key: 'article_id',
        value: req.query.id,
        cb: function (msg) {
            data.data = msg
            res.json(data)
        }
    })
})
module.exports = router