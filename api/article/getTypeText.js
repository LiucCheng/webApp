/**
 * Created by Administrator on 2018/12/11.
 */
// import { getData } from '../model/getData'
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
    res.json(data)
})
module.exports = router