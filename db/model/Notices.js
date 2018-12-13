/**
 * Created by Administrator on 2018/12/13.
 */
// 建立数据库表的 模型文件
let sequelize = require('../data/db')
let Sequelize = require('sequelize')
const Model = sequelize.define('abc', {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    }
},{freezeTableName: true})
Model.sync({force: false})
// I want updatedAt to actually be called updateTimestamp
// updatedAt: 'updateTimestamp',
module.exports = Model
