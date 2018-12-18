/**
 * Created by Administrator on 2018/12/18.
 */
let Account = require('../../db/model/user/Account')
let express = require('express')
let router = express.Router()
let data = {
    errcode: 0,
    msg: '',
    data: null
}
router.post('/', function(req, res, next) {
    if (!req.body.uid) {
        data.errcode = 10000
        data.msg = '缺少用户uid'
        res.json(data)
        return
    }
    if (!req.body.friend_uid) {
        data.errcode = 10001
        data.msg = '缺少friend_uid参数'
        res.json(data)
        return
    }
    Account.findOne({where: {uid : req.body.friend_uid}}).then(project => {
        if (project) {
            project = project.toJSON()
            data.errcode = 0
            data.msg = '用户信息获取成功'
            delete project.password
            delete project.state
            delete project.update_time
            delete project.id
            data.data = project
        } else {
            data.errcode = 20000
            data.msg = '未查到该用户信息'
            delete data.data
        }
        res.json(data)
    }).catch(e => {
        data.errcode = 22222
        data.msg = '查询出错'
        delete data.data
        res.json(data)
    })
})
    .get('/', function (req, res, next) {
        data.errcode = 11111
        data.msg = '请使用post'
        res.json(data)
    })
module.exports = router