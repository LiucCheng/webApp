let commonJS = require('./commonJS/common')
let express = require('express');
let path = require('path');
// let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let index = require('./routes/index');

// 解析body的参数，form表单提交等 上传
// const multiparty = require("connect-multiparty");
// const multipartyMiddleware = multiparty();

// 接口
let getList = require('./api/article/getList'); // 获取所有的类
let getTypeList = require('./api/article/getTypeList') // 一个类里面的所有文章
let getTypeText = require('./api/article/getTypeText') // 获取文章内容
let register = require('./api/user/register') // 注册接口
let login = require('./api/user/login')
let addFriend = require('./api/user/addFriend')
// let deleteFriend = require('./api/user/deleteFriend')
let findFriends = require('./api/user/findFriends')
let getFriendList = require('./api/user/getFriendList')
let getUserInfo = require('./api/user/getUserInfo')

let app = express();
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// 指定静态文件
app.use(express.static(path.join(__dirname, './public')));

app.use('/', index);
app.use('/api/getList', getList);
app.use('/api/getTypeList', getTypeList)
app.use('/api/getTypeText', getTypeText)
app.use('/api/login', login)
app.use('/api/register', register)
app.use('/api/addFriends', addFriend)
app.use('/api/findFriends', findFriends)
app.use('/api/getFriendList', getFriendList)
app.use('/api/getUserInfo', getUserInfo)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
global.common = commonJS
module.exports = app;
