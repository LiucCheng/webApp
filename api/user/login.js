/**
 * Created by Administrator on 2018/12/14.
 */
let Account = require('../../db/model/user/Account')
let LoginIn = require('../../db/model/loginStatus/loginPeople')
let express = require('express')
let router = express.Router()
let data = {
    errcode: 0,
    msg: '',
    data: null
}
router.post('/', function(req, res, next) {
    if (!req.body.username || !req.body.pwd) {
        data.errcode = 10000
        data.msg = '缺少用户信息'
        res.json(data)
        return
    }
    Account.findOne({where: {username : req.body.username, password: req.body.pwd}}).then(project => {
        if (project) {
            project = project.toJSON()
            data.errcode = 0
            data.msg = '登录成功'
            delete project.password
            delete project.state
            delete project.update_time
            delete project.id
            data.data = project
            // 保存登录状态
            saveLoginStatus()
        } else {
            data.errcode = 2000
            data.msg = '用户名或密码错误'
            delete data.data
        }
        res.json(data)
    }).catch(e => {
        data.errcode = 22222
        data.msg = '查询出错'
        delete data.data
        res.json(data)
    })
    function saveLoginStatus() {
        LoginIn.create({
            login_uid: data.data.uid
        }).then(project => {
            console.log('保存成功')
        })
    }
})
    .get('/', function (req, res, next) {
        data.errcode = 11111
        data.msg = '请使用post'
        res.json(data)
    })
module.exports = router