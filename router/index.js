const router = require('express').Router();
const userRouter = require('./user');
const catRouter = require('./cat')
const tweetRouter = require('./tweet')
const commentRouter = require('./comment')
const applyRouter = require('./apply')
const bugRouter=require('./bug')

router.use([userRouter, catRouter, tweetRouter, commentRouter, applyRouter,bugRouter])



module.exports = router;