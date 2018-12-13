/**
 * Created by Administrator on 2018/12/12.
 */
// 注册接口
let Account = require('../../db/model/user/Account')
let express = require('express')
let router = express.Router()
let data = {
    errcode: 0,
    msg: '',
    data: null
}
router.post('/', function(req, res, next) {
    if (!req.body.account || !req.body.pwd) {
        data.errcode = '10000'
        data.msg = '缺少用户信息'
        res.json(data)
        return
    }
    let date = new Date()
    let uid = date.getTime() + Math.round(Math.random() * 100000) // 18
    let userName = req.body.account
    let pwd = req.body.pwd
    let mobile = req.body.mobile || ''
    let create_time = common.formatDate(date)
    Account.findOne({where: {username : userName}}).then(project => {
        data.data = project
        if (project) {
            data.errcode = '10000'
            data.msg = '用户名已注册'
            res.json(data)
        } else {
            addData()
        }
    }).catch(e => {
        data.errcode = 22222
        data.msg = e
        res.json(data)
    })
    function addData() {
        Account.create({
            uid: uid,
            username: userName,
            password: pwd,
            mobile: mobile,
            state: 1,
            create_time: create_time
        }).then(project => {
            data.data = project
            data.msg = '注册成功'
            res.json(data)
        }).catch(e => {
            data.errcode = 22222
            data.msg = e
            res.json(data)
        })
    }
})
    .get('/', function (req, res, next) {
        data.errcode = '11111'
        data.msg = '请使用post'
        res.json(data)
    })
module.exports = router