/**
 * Created by Administrator on 2018/12/7.
 */
// 引入工具类
let mysqlUtil = require('../db/mysqlConnect')

// 声明一个同步方法, 这里要求有 SQL 语句的基础
// 在 beginTransaction 和 commit 之间可以执行多次 query 方法
module.exports = async function (table, cb) {
    // 获取连接
    let conn = await mysqlUtil()
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
    // 执行第一个 SQL 语句
    // let result1 = await new Promise((resolve, reject) => {
    //     let sqlStr = 'INSERT INTO article_list (id, title) values (?, ?)'
    //     let sqlParam = ['003', '有一种借口叫年轻']
    //     conn.query(sqlStr, sqlParam, function (err, ret) {
    //         if (err) {
    //             // 回滚之前的数据库操作, 直至碰到 beginTransaction
    //             return conn.rollback(() => {
    //                 resolve(err)
    //             })
    //         }
    //         resolve(ret)
    //     })
    // })
    // 执行第二个 SQL 语句
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
    cb(result2)
}