const router = require('express').Router();
const CommentsModel = require('../model/comments')
const UsersModel = require('../model/users')
const TweetsModel = require('../model/tweets');
const e = require('express');
//新建评论
router.post('/comment/create', async (req, res, next) => {
    const { tweet_id, user } = req.body;
    if (!tweet_id || !user)
        return res.sendStatus(400);
    try {
        const doc = await CommentsModel.create(req.body);
        const { n, ok } = await TweetsModel.updateOne({ _id: tweet_id }, { $inc: { commentCount: 1 } }) //递增 动态的评论个数
        
        if (n + ok === 2)
            res.send({
                data: doc
            })
        else res.send({
            msg: 'oprate failed'
        })
    }
    catch (err) {
        next(err)
    }
})

//评论点赞
router.post('/comment/star', async (req, res, next) => {
    const { commentId } = req.body;
    if (!commentId)
        return res.sendStatus(400);
    try {
        const { ok, n } = await CommentsModel.updateOne({ _id: commentId }, { $inc: { starCount:1 } });
        if (ok + n === 2) {
            res.send({
                data: commentId
            })
        }
        else {
            res.send({
                msg: 'oprate failed'
            })
        }
    }
    catch (err) {
        next(err)
    }

})

//获取 某个 动态的  评论
router.get('/comment/getBytweetId', async (req, res, next) => {
    const { tweetId, offset, limit } = req.query;
    console.log(tweetId);
    try {
        const docs = await CommentsModel.find({ tweet_id: tweetId }).sort({ starCount: -1, created_time: -1 }).limit(limit).skip(offset);
        if (docs.length === 0) {
            return res.send({
                data: []
            })
        }
        const commentData = [];
        for (const [index, doc] of docs.entries()) {
            console.log(index);
            const userinfo = await UsersModel.findOne({ name: doc.user });
            commentData.push({
                ...doc.toObject(), userinfo
            })
            if (index === docs.length - 1) {
               
                return res.send({
                    data: commentData
                })
            }
        }
    }
    catch (err) {
        next(err)
    }

})



module.exports = router;