/**
 * Created by Administrator on 2018/12/19.
 */
// 建立数据库表的 模型文件
let sequelize = require('../../data/db')
let Sequelize = require('sequelize')
const Model = sequelize.define('loginPeople', {
    login_uid: {
        type: Sequelize.STRING(18),
        unique: true
    }
},{
    freezeTableName: true
})
Model.sync({force: false})
module.exports = Model