/**
 * Created by Administrator on 2018/12/13.
 */
let sequelize = require('../../data/db')
let Sequelize = require('sequelize')
const Model = sequelize.define('account', {
    uid: {
        type: Sequelize.STRING(18),
        unique: true
    },
    username: {
        type: Sequelize.STRING(32),
        unique: true
    },
    nickname: {
        type: Sequelize.STRING(32)
    },
    img: {
        type: Sequelize.STRING(50)
    },
    sex: {
        type: Sequelize.INTEGER(1),
        defaultValue: 0
    },
    age: {
        type: Sequelize.INTEGER(3)
    },
    password: {
        type: Sequelize.STRING(32)
    },
    mobile: {
        type: Sequelize.STRING(11)
    },
    state: {
        type: Sequelize.INTEGER(1)
    },
    create_time: {
        type: Sequelize.STRING(32)
    }
}, {
    timestamps: true, // don't add the timestamp attributes (updatedAt, createdAt)
    freezeTableName: true,
    updatedAt: 'update_time', // 别名'
    createdAt: 'create_time'
})
Model.sync({force: false})
module.exports = Model