/**
 * Created by Administrator on 2018/12/7.
 */
let model = require('../model/getData')
let express = require('express')
let router = express.Router()
let data = {
    errcode: 0,
    msg: '',
    data: null
}
/* GET users listing. */
router.get('/', function(req, res, next) {
    model.getData('article', function (msg) {
        data.data = msg
        res.json(data)
    })
})
module.exports = router
