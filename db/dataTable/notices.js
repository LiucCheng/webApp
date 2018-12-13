/**
 * Created by Administrator on 2018/12/13.
 */
let Notices = require('../model/Notices')
// 添加一条数据
//     .then(() => {
//     // Table created
//     return Notices.create({
//         firstName: 'John',
//         lastName: 'Hancock'
//     })
// })
// Notices.create({
//     firstName: 'John',
//     lastName: 'Hancock'
// })
Notices.findAll().then(msg => {
    console.log(msg)
})

// order字段用于指定排序规则，这里指定以createAt字段做降序排序。
// limit字段用于指定查询的数据量，这里表示返回前10条数据。
// where字段用于指定条件查询，这里表示查询status为0的数据
// Notices.findAll({order: [['createAt', 'DESC']], limit: 10, where: {'status': 0}}) // 条件查询