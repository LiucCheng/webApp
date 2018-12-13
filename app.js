let commonJS = require('./commonJS/common')
let express = require('express');
let path = require('path');
// let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let index = require('./routes/index');
// 接口
let getList = require('./api/article/getList'); // 获取所有的类
let getTypeList = require('./api/article/getTypeList') // 一个类里面的所有文章
let getTypeText = require('./api/article/getTypeText') // 获取文章内容
let register = require('./api/user/register') // 注册接口

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
app.use('/api/register', register)

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
