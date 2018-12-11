/**
 * Created by Administrator on 2018/12/7.
 */
let express = require('express')
let router = express.Router()
let getData = require('../model/getData')
let data = {
    errcode: 0,
    data: null
}
/* GET users listing. */
router.get('/', function(req, res, next) {
    getData('article_list', function (msg) {
        data.data = msg
        res.json(data)
    })
})
module.exports = router
