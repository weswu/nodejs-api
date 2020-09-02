// https://www.runoob.com/nodejs/nodejs-express-framework.html
var express = require('express');
var app = express();
var bodyParser = require('body-parser'); // 用于处理 JSON, Raw, Text 和 URL 编码的数据
var multer = require('multer')  // 用于处理 enctype="multipart/form-data"（设置表单的MIME编码）的表单数据
// 文件上传
var fs = require('fs')
// Cookie 管理
var cookieParser = require('cookie-parser')
var util = require('util')

//app.use(express.static('public'));
app.use(bodyParser.json());
// 创建 application/x-www-form-urlencoded 编码解析
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({dest: '/tmp/'}).array('image'))
app.use(cookieParser())


//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', 'localhost', port);
});

// 微信文章内容
var articalDao = require('./weixin/article');
app.get('/api/wechat/article', function(req, res, next){
  articalDao.query(req, res, next);
});

// 微信分享
var wechatShare = require('./weixin/js-sdk');
app.get('/api/wechat/jsSdk', function(req, res, next){
  wechatShare.query(req, res, next);
});

app.get('/', (req, res) => {
  console.log("Cookies: " + util.inspect(req.cookies))
  res.send('Hello World !')
})
// POST
app.post('/', function(req, res) {
  console.log('主页 POST 请求')
  res.send('Hello POST')
})
//  /del_user 页面响应
app.get('/del_user', (req, res) => {
  console.log("/del_user 响应 DELETE 请求")
  res.send('删除页面')
})
//  /list_user 页面 GET 请求
app.get('/list_user', function (req, res) {
   console.log("/list_user GET 请求");
   res.send('用户列表页面');
})
// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function(req, res) {
   console.log("/ab*cd GET 请求");
   res.send('正则匹配');
})

// demo.html
app.get('/process_get', (req, res) => {
  var response = {
    'first_name': req.query.first_name,
    'last_name': req.query.last_name
  }
  console.log(response)
  res.end(JSON.stringify(response))
})

app.post('/process_post', (req, res) => {
  var response = {
    'first_name': req.body.first_name,
    'last_name': req.body.last_name
  }
  console.log(response)
  res.end(JSON.stringify(response))
})

app.post('/file_upload', (req, res) => {
  console.log(req.files[0]) // 上传的文件信息
  var des_file = __dirname + '/' + req.files[0].originalname
  fs.readFile(req.files[0].path, (err, data) => {
    fs.writeFile(des_file, data, (err) => {
      if (err) {
        console.log(err)
      } else {
        response = {
          message: 'File uploaded successfully',
          filename: req.files[0].originalname
        }
      }
      res.end(JSON.stringify(response))
    })
  })
})
