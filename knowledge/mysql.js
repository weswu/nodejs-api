// npm install mysql
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'test'
})

connection.connect();

connection.query('select 1 + 1 as solution', function (error, results, fields) {
  if(error) throw error;
  console.log('The solution is: ', results[0].solution)
})

// 查询数据 chaxun
var sql = 'select * from websites'

// connection.query(sql, (err, result) => {
//   console.log('------------select-------------')
//   console.log(result)
//   console.log('-------------------------------\n')
// })


// 插入数据

var addSql = 'insert into websites(id,name,url,alexa,country) values(0,?,?,?,?)'

var addSqlParams = ['菜鸟工具', 'https://c.runoob.com','23453', 'CN']

// connection.query(addSql, addSqlParams, (err, result) => {
//   console.log('------------insert-------------')
//   console.log('insert id', result)
//   console.log('-------------------------------\n')
// })

// 更新数据

var modSql = 'update websites set name = ?, url = ? where id = ?'
var modSqlParams = ['菜鸟移动站', 'https://m.runoob.com',6]

// connection.query(modSql, modSqlParams, (err, result) => {
//   console.log('------------update-------------')
//   console.log('update affectedRows', result.affectedRows)
//   console.log('-------------------------------\n')
// })

// 删除数据 shanchu

var delSql = 'delete from websites where id=6'

connection.query(delSql, (err, result) => {
  console.log('-----------------del----------------')
  console.log('delete affectedRows', result.affectedRows)
  console.log('------------------------------------\n')
})

connection.end()
