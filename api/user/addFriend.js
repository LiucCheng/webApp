/**
 * Created by Administrator on 2018/12/17.
 */
let addFriends = require('../../db/model/user/Friend')
let express = require('express')
let router = express.Router()
let data = {
    errcode: 0,
    msg: '',
    data: null
}
router.post('/', function(req, res, next) {
    if (!req.body.friends_user_name && !req.body.uid) {
        data.errcode = '10000'
        data.msg = '缺少必备条件'
        res.json(data)
        return
    }
    addFriends.findOne({where:
        {
            uid : req.body.uid,
            friends_user_name: req.body.friends_user_name
        }
    }).then(project => {
        if (project) {
            // 存在当前的的朋友中
            data.errcode = 10000
            data.msg = '你们已经是朋友了'
            res.json(data)
        } else {
            // 还不是朋友，进行添加
            addFriend()
        }
    }).catch(e => {
        data.errcode = 22222
        data.msg = 'getFriendList查询出错'
        delete data.data
        res.json(data)
    })
    function addFriend() {
        addFriends.create({
            uid: req.body.uid,
            friends_user_name: req.body.friends_user_name,
            friends_uid: req.body.friends_uid,
            isBlackList: 0
        }).then(project => {
            if (project) {
                data.errcode = 0
                data.msg = '添加成功'
            } else {
                data.errcode = 10000
                data.msg = '添加失败'
            }
            delete data.data
            res.json(data)
        }).catch(() => {
            data.errcode = 22222
            data.msg = 'catch添加失败'
            delete data.data
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