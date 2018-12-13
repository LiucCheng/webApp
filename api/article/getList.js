/**
 * Created by Administrator on 2018/12/7.
 */
let getList = require('../../db/model/article/getList')
let express = require('express')
let router = express.Router()
let data = {
    errcode: 0,
    msg: '',
    data: null
}
/* GET users listing. */
router.get('/', function(req, res, next) {
    getList.findAll().then(project => {
        data.data = project
        res.json(data)
    }).catch(e => {
        data.errcode = 22222
        data.msg = e
        res.json(data)
    })
})
module.exports = router
