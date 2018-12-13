/**
 * Created by Administrator on 2018/12/13.
 */
let sequelize = require('../../data/db')
let Sequelize = require('sequelize')
const Model = sequelize.define('article', {
    title: {
        type: Sequelize.STRING(50),
        unique: true
    },
    logo: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: true,
        defaultValue: null
    }
}, {
    timestamps: false, // don't add the timestamp attributes (updatedAt, createdAt)
    freezeTableName: true
})
Model.sync({force: false})
module.exports = Model