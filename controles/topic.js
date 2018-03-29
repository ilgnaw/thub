const Topic=require('../moduls/topic.js')
const moment=require('moment')
const marked=require('marked')
exports.showCreate = (req, res) => {
    res.render('topic/create.html')
}
exports.create = (req, res ,next) => {
    // res.send('sreate')
    const body = req.body
    body.userId=req.session.user.id
    body.createdAt=moment().format('YYYY-MM-DD HH:mm:ss')
    Topic.creat(body,(err,results)=>{
        if(err){
            return res.send({
                code:500,
                message:err.message
            })
        }
        res.send({
            code:200,
            messag:"发表成功"
        })
    })
}


// topic.content=marked(topic.content)

exports.show = (req, res,next ) => {
    const {topicId} = req.params
    Topic.findById(topicId,(err,topic)=>{
        if(err){
            return next(err)
        }
       console.log(topic)
        res.render("topic/show.html",{
            topic,
            // sessionUser:req.session.user
        })
    }) 
}

exports.showEdit = (req, res,next) => {
      const {topicId} = req.params
   Topic.findById(topicId,(err,topic)=>{
        if(err){
            return next(err)
        }
       console.log(topic)
        res.render("topic/edit.html",{
            topic,
           
        })
    })

}

exports.edit = (req, res,next) => {
    // res.send('edit')
    const {topicId}=req.params
    const body=req.body
    Topic.update(topicId,body,(err,topic)=>{
        if(err){
           return  next(err)
        }
        res.send({
            code:200,
            message:"修改话题成功"
        })
    })
}

exports.delete = (req, res,next) => {
    // res.send('delete')
const {topicId}=req.params


    Topic.delete(topicId,(err,results)=>{
        if(err){
            return  next(err)
        }
        res.send({
            code:200,
            message:"删除成功"
        })
    })
}