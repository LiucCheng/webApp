/**
 * Created by Administrator on 2018/12/17.
 */
let getFriendList = require('../../db/model/user/Friend')
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
        data.errcode = '10000'
        data.msg = '缺少uid'
        res.json(data)
        return
    }
    getFriendList.belongsTo(Account,
        {
            foreignKey: 'friends_user_name',
            targetKey: 'username'
        })
    getFriendList.findAll(
        {
            where: {uid : req.body.uid},
            include: [{
                model: Account,
                attributes: ['uid','username', 'nickname', 'img', 'sex', 'age']
            }]
        }
        ).then(project => {
        if (project) {
            data.errcode = 0
            data.msg = '获取列表成功'
            data.data = project
        } else {
            data.errcode = 2000
            data.msg = '用户名或密码错误'
            delete data.data
        }
        res.json(data)
    }).catch(e => {
        data.errcode = 22222
        data.msg = 'getFriendList查询出错'
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