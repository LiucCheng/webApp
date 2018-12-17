/**
 * Created by Administrator on 2018/12/17.
 */
let findFriends = require('../../db/model/user/Friend')
let Account = require('../../db/model/user/Account')
let express = require('express')
let router = express.Router()
let data = {
    errcode: 0,
    msg: '',
    data: []
}
router.post('/', function(req, res, next) {
    if (!req.body.uid) {
        data.errcode = '20000'
        data.msg = 'uid不能为空'
        res.json(data)
        return
    }
    if (!req.body.friends_user_name) {
        data.errcode = '20001'
        data.msg = '好友用户名不能为空'
        res.json(data)
        return
    }
    Account.findOne({where: {username: req.body.friends_user_name}})
        .then(project => {
            if (project) {
                project = project.toJSON()
                delete project.password
                delete project.state
                delete project.update_time
                delete project.id
                delete project.create_time
                // 该用户已经注册了
                data.data = project
                findFriendList()
            } else {
                // 该用户还未注册
                data.errcode = 10000
                data.msg = '该用户还未注册'
                res.json(data)
            }
        }).catch(e => {
        data.errcode = 22222
        data.msg = 'getFriendList查询出错'
        res.json(data)
    })
    function findFriendList() {
        findFriends.findOne({where: {uid : req.body.uid, friends_user_name: req.body.friends_user_name}}).then(project => {
            if (project) {
                // 存在当前的的朋友中
                data.errcode = 10001
                data.msg = '你们已经是朋友了'
            } else {
                // 还不是朋友，可以进行添加
                data.errcode = 0
                data.msg = '你们还未成为朋友，快添加吧'
            }
            res.json(data)
        }).catch(e => {
            data.errcode = 33333
            data.msg = 'getFriendList查询出错'
            res.json(data)
        })
    }
})
    .get('/', function (req, res, next) {
        data.errcode = 11111
        data.msg = '请使用post'
        res.json(data)
    })
module.exports = router