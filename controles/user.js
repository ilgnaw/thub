// const connection=require('../moduls/db-mysql.js')
const User = require('../moduls/user.js')
const moment = require('moment')
// 1. 买一个冰箱（创建一个数据库连接）
const md5 = require('md5')



exports.showSignin = (req, res,next) => {
    res.render('signin.html')
}
exports.signin = (req, res,next ) => {
    // res.send('signin')
    const body = req.body

    User.email(body.email, (err, result) => {
        if (err) {
            return res.send({
                code: 500,
                message: err.message
            })
        }
        if (!result) {
            return res.send({
                code: 1,
                message: "用户名不存在"
            })
        }

        if (v(body.password) !== result.password) {
            return res.send({
                code: 2,
                message: "密码错误"
            })
        }

        req.session.user = result
        res.send({
            code: 200,
            message: "登入成功"
        })
    })


}
exports.showSignup = (req, res,next ) => {
    res.render('signup.html')
}
exports.signup = (req, res,next) => {
    // res.send('showEdit')
    const body = req.body
    body.createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
    // console.log(body)

    User.email(body.email, (err, results) => {
        if (err) {
            return res.send({
                "code": 500,
                "message": err.message
            })
        }
        if (results) {
            return res.send({
                "code": 1,
                "message": "邮箱占用"
            })
        }
        User.nickname(body.nickname, (err, results) => {
            if (err) {
                return res.send({
                    "code": 500,
                    "message": err.messagce
                })
            }
            if (results) {
                return res.send({
                    "code": 2,
                    "message": "昵称占用"
                })
            }
            User.addUser(body, (err, results) => {
                if (err) {
                    return res.send({
                        "code": 500,
                        "message": err.message
                    })
                }
                res.send({
                    "code": 200,
                    "message": "成功"
                })
            })
        })
    })
}
exports.signout = (req, res,next) => {
    // res.send('signout')
    delete req.session.user
    res.redirect('/')
}
