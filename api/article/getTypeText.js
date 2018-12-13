/**
 * Created by Administrator on 2018/12/11.
 */
// import { getData } from '../model/getData'
let model = require('../../db/model/getData')
let express = require('express')
let router = express.Router()
let data = {
    errcode: 0,
    msg: '',
    data: null
}
/* 获取一个类型里面的文章内容 */
/* GET users listing. */
router.get('/', function(req, res, next) {
    if (!req.query.list_id || !req.query.article_id) {
        data.errcode = '10000'
        data.msg = '缺少文章id'
        res.json(data)
        return
    }
    model.getAppointData({
        table: 'article_text',
        key: 'list_id article_id',
        value: req.query.list_id + ' ' + req.query.article_id,
        cb: function (msg) {
            data.data = msg[0]
            res.json(data)
        }
    })
})
module.exports = router