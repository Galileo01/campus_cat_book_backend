const router = require('express').Router();
const userRouter = require('./user');
const catRouter = require('./cat')
const tweetRouter = require('./tweet')
const commentRouter = require('./comment')
const applyRouter = require('./apply')
const feedbackRouter=require('./feedback')
const scoreRouter=require('./score')

router.use([userRouter, catRouter, tweetRouter, commentRouter, applyRouter,feedbackRouter,scoreRouter])



module.exports = router;