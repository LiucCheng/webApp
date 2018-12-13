/**
 * Created by Administrator on 2018/12/13.
 */
let Account = require('../model/user/Account')
// 添加一条数据
// Account.create({
//     uid: 'John',
//     username: 'Hancock',
//     password: 'password',
//     mobile: 'mobile',
//     state: 1,
//     create_time: 'create_time'
// }).then(() => {
//     console.log('-------------')
// })
    Account.findAll().then(msg => {
        console.log(msg)
    })
// module.exports = Account