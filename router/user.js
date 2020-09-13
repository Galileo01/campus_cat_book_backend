const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const UsersModel = require('../model/users');
const CatsModel = require('../model/cats');
const TweetsModel = require('../model/tweets')
const uploader = require('../commonjs/multerUtils').generateUploader('../public/user/avatar');

//用户使用 自己的微信登录

//登陆的 用户名在数据库  存在    --直接登录
//                     不存在   先注册再登录
router.post('/user/login', async (req, res, next) => {
    const { nickName, avatarUrl, gender } = req.body;
    try {
        let doc = await UsersModel.findOne({ name: nickName });
        //如果 用户不存在  则创建 该用户
        if (!doc) {
            doc = await UsersModel.create({
                name: nickName,
                avatar: avatarUrl,
                sex: gender
            });
            console.log(doc);

        }
        res.send({
            data: doc,
        });
    }
    catch (err) {
        next(err)
    }
})

//获取用户信息

router.get('/user/getInfo', async (req, res, next) => {
    const { name, _id } = req.query;
    const filter = _id ? { _id } : { name };
    try {
        const doc = await UsersModel.findOne(filter, { tweets_co: false, cats_co: false });
        if (!doc)
            res.send({
                msg: '不存在对应的用户'
            })
        else
            res.send({
                data: doc
            })
    }
    catch (err) {
        next(err)
    }

})

//更新用户信息
router.post('/user/updateInfo', async (req, res, next) => {
    try {
        const { preName } = req.body;//获取更改之前的 姓名
        const result = await UsersModel.updateOne({ name: preName }, { $set: req.body });
        console.log(result);
        if (result.n === 1 && result.ok === 1) {
            res.send({
                data: req.body
            })
        }
        else res.send({
            msg: 'update failed'
        })
    }
    catch (err) {
        next(err)
    }

})

//更新用户头像  测试 阶段
//TODO 更新用户头像的时候 删除原来上传到 服务器的头像
router.post('/user/updateAvatar', uploader.single('avatar'), async (req, res, next) => {
    try {
        const { file, body: { name } } = req;
        if (file) {
            // console.log(file);
            //更新数据库
            const doc = await UsersModel.findOne({ name });
            const preFilename = doc.avatar;
            fs.unlinkSync(path.join(__dirname, '../public/user/avatar', preFilename));//删除原有的 头像

            doc.avatar = file.filename;
            doc.save();
            res.send({
                data: file.filename
            })

        }
        else res.send({
            msg: 'update failed'
        })
    }
    catch (err) {
        next(err)
    }
})


//收藏猫猫
router.post('/user/collectCat', async (req, res, next) => {
    const { name, catId } = req.body;
    if (!name || !catId)
        return res.sendStatus(400);
    try {
        const doc = await UsersModel.findOne({ name })
        if (doc.cats_co.includes(catId))
            return res.send({
                msg: 'already collected'
            })
        doc.cats_co.push(catId)
        doc.save();
        res.send({
            data: catId
        })
    }
    catch (err) {
        next(err)
    }

})

//取消收藏 猫猫
router.post('/user/cancelCollectCat', async (req, res, next) => {
    const { name, catId } = req.body;
    const { n, ok } = await UsersModel.updateOne({ name }, { $pull: { cats_co: catId } })

    if (n + ok === 2) {
        res.send({
            data: { name, catId }
        })
    }
    else {
        res.send({
            msg: 'oprate failed'
        })
    }

})

//收藏动态
router.post('/user/collectTweet', async (req, res, next) => {
    const { name, tweetId } = req.body;
    if (!name || !tweetId)
        return res.sendStatus(400);
    try {
        //更新用户  tweets_co 属性
        const doc = await UsersModel.findOne({ name });
        if (doc.tweets_co.includes(tweetId))
            return res.send({
                msg: 'already collected'
            })
        doc.tweets_co.push(tweetId)
        doc.save();
        const { n, ok } = await TweetsModel.updateOne({ _id: tweetId }, { $inc: { collectCount: 1 } });
        if (n + ok !== 2) {
            return res.send({
                msg: 'collect failed'
            })
        }
        res.send({
            data: tweetId
        })
    }
    catch (err) {
        next(err)
    }
})

//取消收藏 动态
router.post('/user/cancelCollectTweet', async (req, res, next) => {
    const { name, tweetId } = req.body;

    const { n, ok } = await UsersModel.updateOne({ name }, { $pull: { tweets_co: tweetId } });
    if (n + ok === 2) {
        const doc = await TweetsModel.findOne({ _id: tweetId });
        doc.collectCount--;
        doc.save();
        res.send({
            data: tweetId
        })
    }
    else {
        res.send({
            msg: 'oprate failed'
        })
    }

})

//获取用户 收藏的猫猫列表
router.get('/user/getCats_co', async (req, res, next) => {
    let { name, _id, offset, limit } = req.query;
    const filter = _id ? { _id } : { name };
    try {
        const { cats_co } = await UsersModel.findOne(filter);
        if (cats_co.length === 0) {
            return res.send({
                data: []
            })
        }
        const cats = [];
        limit = limit > 0 ? limit : cats_co.length;//保证 limit 有效

        for (const [index, _id] of cats_co.entries()) {
            const cat = await CatsModel.findOne({ _id });
            cats.push(cat);
            if (index === cats_co.length - 1)// 当获取到最后一个
            {
                return res.send({
                    data: cats.splice(offset, limit)
                })
            }
        }

    }
    catch (err) {
        next(err)
    }

})

//获取 用户收藏的 帖子                    
router.get('/user/getTweets_co', async (req, res, next) => {
    let { name, _id, offset, limit } = req.query;
    const filter = _id ? { _id } : { name };
    try {
        const { tweets_co } = await UsersModel.findOne(filter);
        if (tweets_co.length === 0) {
            return res.send({
                data: []
            })
        }
        limit = limit > 0 ? limit : tweets_co.length;//保证 limit 有效
        const tweets = [];
        for (const [index, _id] of tweets_co.entries()) {
            const cat = await TweetsModel.findOne({ _id });
            tweets.push(cat);
            if (index === tweets_co.length - 1)// 当获取到最后一个
            {
                return res.send({
                    data: tweets.splice(offset, limit)
                })
            }
        }
    }
    catch (err) {
        next(err)
    }

})


//获取 用户 收藏的猫猫 生成的话题列表
router.get('/user/getMyTopics', async (req, res, next) => {

    try {
        const { cats_co } = await UsersModel.findOne({ name: req.query.user });
        if (cats_co.length === 0)
            return res.send({
                data: []
            })
        const topics = [];
        for (const [i, _id] of cats_co.entries()) {
            const { name } = await CatsModel.findOne({ _id });
            topics.push(name)
        }
        res.send({
            data: topics
        })
    }
    catch (err) {
        next(err)
    }
})

module.exports = router;    