/**
 * Created by Administrator on 2018/12/11.
 */
let model = require('../../db/model/getData')
let express = require('express')
let router = express.Router()
let data = {
    errcode: 0,
    msg: ''
}
/* GET users listing. */
router.post('/', function(req, res, next) {
    model.addData({
        table: 'type_list',
        key: 'list_id article_id title logo',
        value: req.body.list_id + ' ' + req.body.article_id + ' ' + req.body.title + ' ' + req.body.logo,
        cb: function (msg) {
            if (!msg.errcode) {
                model.addData({
                    table: 'article_text',
                    key: 'list_id text article_id img',
                    value: req.body.list_id + ' ' + req.body.text + ' ' + req.body.article_id + ' ' + req.body.img,
                    cb: function (msg) {
                        data.data = msg
                        res.json(data)
                    }
                })
            }
        }
    })
})
module.exports = router