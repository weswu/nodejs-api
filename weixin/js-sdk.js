/*
 * @author: wes
 * @date: 2017-11-6
 * @desc: 微信朋友圈分享
*/
var crypto = require('crypto')
var https = require('https');
var iconv = require("iconv-lite");

var appid = ''
var appsecret = ''
var nonceStr = ''
var urlStr = ''

var share = {
  query: function (req, res, next) {
    urlStr = req.query.url;
    appid = req.query.appid || 'wxe4c05b399c083201';
    appsecret = req.query.appsecret || 'd5c665786530ac03d86e8f346c8d20fe';
    nonceStr = getRandomString(12)
    getAccessToken(res);
  }
}

// 获取长度为len的随机字符串
function getRandomString (len) {
  len = len || 32
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
  var maxPos = $chars.length
  var pwd = ''
  for (i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}


// 1.使用appId、appSecret 获取AccessToken
function getAccessToken(resp) {
  https.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+appid+'&secret='+appsecret, (res) => {
    var ctx = this;
    var datas = [];
    var size = 0;
    console.log('状态码：', res.statusCode);

    res.on('data', function (data) {
        datas.push(data);
        size += data.length;
    });
    res.on("end", function () {
        var buff = Buffer.concat(datas, size);
        var result = iconv.decode(buff, "utf8");//转码//var result = buff.toString();//不需要转编码,直接tostring
        console.log(result);
        getTicket(JSON.parse(result).access_token,resp)
    });
  }).on('error', (e) => {
    console.error(`错误: ${e}`);
  });
}
// 2.AccessToken获取jsapi_ticket
function getTicket(accessToken,resp) {
  https.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + accessToken + '&type=jsapi', (res) => {
    var ctx = this;
    var datas = [];
    var size = 0;
    console.log('状态码：', res.statusCode);

    res.on('data', function (data) {
        datas.push(data);
        size += data.length;
    });
    res.on("end", function () {
        var buff = Buffer.concat(datas, size);
        var result = iconv.decode(buff, "utf8");//转码//var result = buff.toString();//不需要转编码,直接tostring
        console.log(result);
        getSignature(JSON.parse(result).ticket,resp)
    });
  }).on('error', (e) => {
    console.error(`错误: ${e}`);
  });
}

// 3.jsapi_ticket生成signature sha1加密生成签名
function getSignature(ticket,resp) {
  let timestamp = Date.parse(new Date())/1000
  let str = 'jsapi_ticket=' + ticket + '&noncestr=' + nonceStr + '&timestamp=' + timestamp + '&url=' + urlStr
  const sha1 = crypto.createHash('sha1');
  sha1.update(str);
  var obj = {
    appid: appid,
    timestamp: timestamp,
    nonceStr: nonceStr,
    signature:  sha1.digest('hex')
  };
  resp.send({
    code: 200,
    rows: obj
  });
}

module.exports = share
