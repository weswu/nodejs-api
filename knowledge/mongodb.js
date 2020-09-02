// npm install mongodb
var mongo = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'

// ---------------------  1.创建集合  ------------------------
// mongo.connect(url, { useNewUrlParser: true }, function(err, db) {
//   if(err) throw error
//   console.log('数据库已创建')
//   var dbo = db.db('runoob')
  // dbo.createCollection('site', function(err, res) {
  //   if(err) throw error
  //   console.log('创建集合！')
  //   db.close()
  // })

  // 插入一条
  // var myobj = { name: '菜鸟教程', url: 'www.runoob' }
  // dbo.collection('site').insertOne(myobj, (err, res) => {
  //   console.log('文档插入成功')
  //   db.close()
  // })

  // 插入多条
  // var myobj = [
  //   { name: '菜鸟工具', url: 'https://c.runoob.com', type: 'cn'},
  //   { name: 'Google', url: 'https://www.google.com', type: 'en'},
  //   { name: 'Facebook', url: 'https://www.google.com', type: 'en'}
  // ]
  // dbo.collection('site').insertMany(myobj, (err, res) => {
  //   console.log('插入的文档数量为：' + res.insertedCount)
  //   db.close()
  // })

  // 查询数据
  // dbo.collection('site').find({}).toArray((err, result) => {
  //   console.log(result)
  //   db.close()
  // })

  // 更新一条数据
  // var whereStr = {'name': '菜鸟教程'}
  // var updateStr = {$set: {'url': 'https://www.runoob.com'}}
  // dbo.collection('site').updateOne(whereStr, updateStr, (err, res) => {
  //   console.log('文档更新成功')
  //   db.close()
  // })

  // 更新多条数据
  // var whereStr = {'type':'en'}
  // var updateStr = {$set: {'url': 'https://www.runoob.com'}}
  // dbo.collection('site').updateMany(whereStr, updateStr, (err, res) => {
  //   console.log(res.result.nModified + '条文档被更新')
  //   db.close()
  // })

  // 删除数据
  // var whereStr = {'type': 'en'}
  // dbo.collection('site').deleteOne(whereStr, (err, obj) => {
  //   console.log(obj.result.n + '文档删除成功')
  //   db.close()
  //   // 多条数据删除 deleteMany()
  // })

  // 排序 1,升序  -1，降序
  // var mySort = {type: -1}
  // dbo.collection('site').find().sort(mySort).toArray((err, result) => {
  //   console.log(result)
  //   db.close()
  // })

  // 查询分页
  // dbo.collection('site').find().limit(2).toArray((err, result) => {
  //   console.log(result)
  //   db.close()
  // })

  // 跳过前面2条数据 skip()
  // dbo.collection('site').find().skip(2).limit(2).toArray((err, result) => {
  //   console.log(result)
  //   db.close()
  // })

  // 链接 lianjie  操作 caozuo
  // $lookup 两个集合左链接 liangge
  // dbo.collection('orders').aggregate([
  //   {
  //     $lookup: {
  //       from: 'products',
  //       localField: 'product_id',
  //       foreignField: '_id',
  //       as: 'orderDetails'
  //     }
  //   }
  // ]).toArray((err, res) => {
  //   console.log(JSON.stringify(res))
  //   db.close()
  // })

  // 删除集合 drop()
  // 删除 test 集合
  // dbo.collection('test').drop((err, delOK) => {
  //   console.log(delOK)
  //   if(delOK) console.log('集合已删除')
  //   db.close()
  // })

// })


// ---------------------  2.使用Promise  ------------------------

// mongo.connect(url, {useNewUrlParser: true}).then((conn) => {
//   console.log('数据库已链接')
//   var dbase = conn.db('runoob')
//   dbase.createCollection('site').then((res) => {
//     console.log('已链接集合')
//   }).catch((err) => {
//     console.log('数据库操作错误')
//   }).finally(() => {
//     conn.close()
//   })
// }).catch((err) => {
//   console.log('数据库链接失败') // shibai
// })

// 使用promise 增删改查  zengshangaicha
// mongo.connect(url,{useNewUrlParser: true}).then((conn) => {
//   console.log('数据库已链接')
//   var test = conn.db('testdb').collection('test')
//   test.insertOne({'site': 'runoob.com'}).then(res => {
//     // 查询
//     return test.find().toArray().then(arr => {
//       console.log(arr)
//     })
//   }).then(() => {
//     // 更改
//     return test.updateMany({'site': 'runoob.com'}, {$set: {'site': 'example.com'}})
//   }).then((res) => {
//     // 查询
//     return test.find().toArray().then(arr => {
//       console.log(arr)
//     })
//   }).then(() => {
//     // 删除
//     return test.deleteMany({'site': 'example.com'})
//   }).then((res) => {
//     // 查询
//     return test.find().toArray().then(arr => {
//       console.log(arr)
//     })
//   }).catch(err => {
//     console.log('数据库操作错误'+ err.message)
//   }).finally(() => {
//     conn.close()
//   })
// }).catch((err) => {
//   console.log('数据库链接失败')
// })

// 使用异步函数实现相同的数据操作  异步函数是一种非常良好的编程风格
async function dataOperate() {
  var conn = null
  try {
    conn = await mongo.connect(url)
    console.log('数据库已链接')
    const test = conn.db('testdb').collection('test')
    // 增加
    await test.insertOne({'site': 'runoob.com'})
    var arr = await test.find().toArray()
    console.log(arr)
    // 更改
    await test.updateMany({'site': 'runoob.com'}, {$set: {'site': 'baidu.com'}})
    var arr = await test.find().toArray()
    console.log(arr)
    // 删除
    await test.deleteMany({'site': 'baidu.com'})
    var arr = await test.find().toArray()
    console.log(arr)
  } catch (err) {
    console.log('错误' + err.message) // cuowu
  } finally {
    if (conn != null) conn.close()
  }
}

dataOperate()
