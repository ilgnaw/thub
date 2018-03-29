const db = require('./db-mysql.js')
exports.addUser = function (body, callback) {
    db.query('insert into `users` set ?', body, (err, results) => {
        if (err) {
            return callback(err)
        }
        callback(null, results)
    })
}


exports.email = function (email, callback) {
    db.query('select * from `users` where email=?', [email], (err, results) => {
        if (err) {
            return callback(err)
        }
        callback(null, results[0])
    })
}


exports.nickname = function (nickname, callback) {
    db.query('select * from `users` where nickname=?', [nickname], (err, results) => {
        if (err) {
            return callback(err)
        }
        callback(null, results[0])
    })
}
