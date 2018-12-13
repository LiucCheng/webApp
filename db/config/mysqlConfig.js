/**
 * Created by Administrator on 2018/12/13.
 * 数据库的配置文件
 */
let config = {
    host: '119.23.191.153',
    port: 3306,
    database: 'pastime',
    user: 'root',
    password: '.Lc123456',
    dialect: 'mysql',           // 数据库类型，这里是mysql
    typeCast: true,             // 是否把结果值转换为原生的 javascript 类型
    supportBigNumbers: true,    // 处理大数字 (bigint, decimal), 需要开启 ( 结合 bigNumberStrings 使用 )
    charset: "UTF8",
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    }
}
module.exports = config