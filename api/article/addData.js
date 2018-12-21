/**
 * Created by Administrator on 2018/12/11.
 */
let express = require('express')
let router = express.Router()
let data = {
    errcode: 0,
    msg: ''
}
/* GET users listing. */
router.post('/', function(req, res, next) {
    res.json(data)
})
module.exports = router