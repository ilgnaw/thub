
const Topic = require('../moduls/topic.js')
exports.showIndex = (req, res,next) => {
    Topic.findAll((err, topics) => {
        if (err) {
            return next(err)
        }
        res.render('index.html', {
            // user:req.session.user,
            topics:topics
        })
    })


}