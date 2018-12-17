/**
 * Created by Administrator on 2018/12/17.
 */
let sequelize = require('../../data/db')
let Sequelize = require('sequelize')

const Model = sequelize.define('friend', {
    uid: {
        type: Sequelize.STRING(18)
    },
    friends_user_name: {
        type: Sequelize.STRING(32)
    },
    friends_uid: {
      type: Sequelize.STRING(18)
    },
    isBlackList: {
        type: Sequelize.INTEGER(1),
        defaultValue: 0
    },
    letter: {
        type: Sequelize.STRING(4)
    }
}, {
    timestamps: true, // don't add the timestamp attributes (updatedAt, createdAt)
    freezeTableName: true,
    updatedAt: 'update_time', // 别名'
    createdAt: 'create_time'
})
Model.sync({force: false})
module.exports = Model