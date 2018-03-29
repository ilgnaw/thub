const express = require('express')
// const morgan = require('morgan')
const app = express()
// app.use(morgan('tiny'))
const router = require('./router.js')
const errorhandler = require('errorhandler')
const session = require('express-session')

const MySQLStore = require('express-mysql-session')(session)

const options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123',
  database: 'ithub'
}

const sessionStore = new MySQLStore(options)

app.use(session({
  key: "connect.sid", // 配置 Cookie 的名字，默认就是 connect.sid
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: sessionStore // 将 Session 数据存储到数据库中（默认是内存存储）
}))

app.use((req, res, next) =>{
  app.locals.sessionUser = req.session.user
  next()
})



var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.engine('html', require('express-art-template'))
app.use('/public', express.static('./public'))
app.use('/node_modules', express.static('./node_modules'))


app.use(router)

app.use(errorhandler())

app.use((req, res, next) => {
  res.render('404.html')
})



app.listen(3000, () => {
  console.log("3000......")
})