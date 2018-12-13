/**
 * Created by Administrator on 2018/12/13.
 */
// 数据库的定义表格类型文件
const Sequelize = require('sequelize')
const mysqlConfig = require('../config/mysqlConfig')
let sequelize = new Sequelize(
    mysqlConfig.database,
    mysqlConfig.user,
    mysqlConfig.password,
    {
        host: mysqlConfig.host,
        charset: "UTF8",
        dialect: mysqlConfig.dialect,
        pool: mysqlConfig.pool,
        operatorsAliases: false,
        logging: false // 取消服务器的打印信息
    }
)
module.exports = sequelize