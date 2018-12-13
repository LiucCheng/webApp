/**
 * Created by Administrator on 2018/12/12.
 */
let common = {
    formatDate(time) {
        let date = new Date(time),
        Y = date.getFullYear() + '-',
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
        D = date.getDate() < 10 ? ('0' + date.getDate() + ' ') : (date.getDate() + ' '),
        h = date.getHours() < 10 ? ('0' + date.getHours() + ':') : (date.getHours() + ':'),
        m = date.getMinutes() < 10 ? ('0' + date.getMinutes() + ':') : (date.getMinutes() + ':'),
        s = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds()
        return Y+M+D+h+m+s
    }
}
module.exports = common