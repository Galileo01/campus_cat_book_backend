const router = require('express').Router();
const CommentsModel = require('../model/comments')
const UsersModel = require('../model/users')
//新建评论
router.post('/comment/create', async (req, res, next) => {
    const { tweet_id, user } = req.body;
    if (!tweet_id || !user)
        return res.sendStatus(400);
    try {
        const doc = await CommentsModel.create(req.body);
        res.send({
            data: doc
        })
    }
    catch (err) {
        next(err)
    }
})

//评论的 starCount 操作
router.post('/comment/oprateStarCount', async (req, res, next) => {
    const { commentId, starCount } = req.body;
    if (!commentId || !starCount)
        return res.sendStatus(400);
    try {
        const { ok, n } = await CommentsModel.updateOne({ _id: commentId }, { $set: { starCount } });
        if (ok + n === 2) {
            res.send({
                data: starCount
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
router.get('/comment/getBytweedId', async (req, res, next) => {
    const { tweetId, offset, limit } = req.query;
    try {
        const docs = await CommentsModel.find({ tweet_id: tweetId }).sort({ starCount: -1, created_time: -1 }).limit(limit).skip(offset);
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