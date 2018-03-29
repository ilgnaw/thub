const express=require('express')

const index=require('./controles/index.js')
const topic=require('./controles/topic.js')
const user=require('./controles/user.js')

const router=express.Router()
router.get('/', index.showIndex)
router
    .get('/signin', user.showSignin)
    .post('/signin', user.signin)
    .get('/signup', user.showSignup)
    .post('/signup', user.signup)
    .get('/signout', user.signout)



router
    .get('/topic/create', topic.showCreate)
    .post('/topic/create', topic.create)
    .get('/topic/:topicId', topic.show)
    .get('/topic/:topicId/edit', topic.showEdit)
    .post('/topic/:topicId/edit', topic.edit)

    .get('/topic/:topicId/delete', topic.delete)

    module.exports=router