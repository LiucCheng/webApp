/**
 * Created by Administrator on 2018/12/11.
 */
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
    res.json(data)
})
module.exports = router