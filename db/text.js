/**
 * Created by Administrator on 2018/12/13.
 */
const Sequelize = require('sequelize')
const sequelize = new Sequelize('pastime', 'root', '.Lc123456', {
    host: '119.23.191.153',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        charset: "UTF8",
        acquire: 30000,
        idle: 10000
    }
});
const User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    }
})
// User.sync({force: false}).then(() => {
//     // Table created
//     return User.create({
//         firstName: 'John',
//         lastName: 'Hancock'
//     })
// })
User.findAll().then(users => {
    console.log('-----------------')
})