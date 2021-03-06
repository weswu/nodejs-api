/*
 * @author: wes
 * @date: 2017-11-2
 * @desc: 获取微信文章数据
*/
var request = require('request');
var cheerio = require('cheerio');

var article = {
  query: function (req, res, next) {
    var urlStr = req.query.url;
    request(urlStr, function (err, response, body) {
      if (err) {
        res.send({
          code: 500,
          msg: err
        })
      } else {
        filterWeixinArticle(body, res);
      }
    })
  },
}

function filterWeixinArticle(html, res) {
  var $ = cheerio.load(html);
  var title = $('#activity-name').text().trim();
  var content = $('#js_content').html();
  var my = {
    title: title,
    content: content
  };

  res.send({
    code: 200,
    rows: my,
  });
}

module.exports = article;
