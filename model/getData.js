/**
 * Created by Administrator on 2018/12/7.
 */
// 引入工具类
let mysqlUtil = require('../db/mysqlConnect')

// 获取连接
let connection = async function (conn) {
    // 开启事物
    await new Promise((resolve, reject) => {
        conn.beginTransaction(err => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}
// 关闭事务
let closeConnection = async function (conn) {
    // 关闭事务
    await new Promise((resolve, reject) => {
        conn.commit(err => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
    conn.release()
}
// 声明一个同步方法, 这里要求有 SQL 语句的基础
// 在 beginTransaction 和 commit 之间可以执行多次 query 方法
// 获取整个表的内容
let getData = async function (table, cb) {
    let conn = await mysqlUtil()
    connection(conn)
    let result2 = await new Promise((resolve, reject) => {
        let sqlStr = 'SELECT * FROM ' + table
        conn.query(sqlStr, function (err, ret) {
            if (err) {
                // 回滚之前的数据库操作, 直至碰到 beginTransaction
                return conn.rollback(() => {
                    resolve(err)
                })
            }
            resolve(ret)
        })
    })
    closeConnection(conn)
    cb(result2)
}
let getAppointData = async function (params) {
    if (!params.table) {
        params.cb({
            errcode: 100,
            msg: '请选择数据库表'
        })
        return
    }
    if (!params.key) {
        params.cb({
            errcode: 200,
            msg: '请选择数据表查询的关键字'
        })
        return
    }
    if (!params.value) {
        params.cb({
            errcode: 300,
            msg: '请选择数据表查询的内容'
        })
        return
    }
    let keyArray = params.key.split(' ')
    let valueArray = params.value.split(' ')
    if (keyArray.length !== valueArray.length) {
        params.cb({
            errcode: 400,
            msg: '键值对不统一'
        })
        return
    }
    let appendStr = ''
    for (let i = 0; i < keyArray.length; i++) {
        if (i === keyArray.length - 1) {
            appendStr += keyArray[i] + '=' + valueArray[i]
        } else {
            appendStr += keyArray[i] + '=' + valueArray[i] + ' AND '
        }
    }
    let conn = await mysqlUtil()
    connection(conn)
    // 执行第一个 SQL 语句
    let result = await new Promise((resolve, reject) => {
        let sqlStr = 'SELECT * FROM ' + params.table + ' WHERE ' + appendStr + ';'
        conn.query(sqlStr, function (err, ret) {
            if (err) {
                // 回滚之前的数据库操作, 直至碰到 beginTransaction
                return conn.rollback(() => {
                    resolve(err)
                })
            }
            resolve(ret)
        })
    })
    // 执行第二个 SQL 语句
    closeConnection(conn)
    params.cb(result)
}
// 添加记录
let addData = async function (params) {
    if (!params.table) {
        params.cb({
            errcode: 100,
            msg: '请选择数据库表'
        })
        return
    }
    if (!params.key) {
        params.cb({
            errcode: 200,
            msg: '请选择数据表查询的关键字'
        })
        return
    }
    if (!params.value) {
        params.cb({
            errcode: 300,
            msg: '请选择数据表查询的内容'
        })
        return
    }
    let keyArray = params.key.split(' ')
    let valueArray = params.value.split(' ')
    if (keyArray.length !== valueArray.length) {
        params.cb({
            errcode: 400,
            msg: '键值对不统一'
        })
        return
    }
    let appendStr = ''
    let keyStr = keyArray.join(',')
    let valueStr = valueArray.join(',')
    appendStr = ' ' + keyStr + 'VALUES' + valueStr + ';'
    let conn = await mysqlUtil()
    connection(conn)
    // 执行第一个 SQL 语句
    let result = await new Promise((resolve, reject) => {
        let sqlStr = 'INSERT INTO ' + params.table + appendStr
        conn.query(sqlStr, function (err, ret) {
            if (err) {
                // 回滚之前的数据库操作, 直至碰到 beginTransaction
                return conn.rollback(() => {
                    resolve(err)
                })
            }
            resolve(ret)
        })
    })
    // 执行第二个 SQL 语句
    closeConnection(conn)
    params.cb(result)

}
module.exports.getData = getData
module.exports.getAppointData = getAppointData
module.exports.addData = addData