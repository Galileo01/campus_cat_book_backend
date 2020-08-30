const router = require('express').Router();
const UsersModel = require('../model/users');
const CatsModel = require('../model/cats');
const TweetsModel = require('../model/tweets')
const uploader = require('../commonjs/multerUtils').generateUploader('../public/user/img/avatar');

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
    const { name } = req.query;
    try {
        const doc = await UsersModel.findOne({
            name
        }, { tweets_co: false, cats_co: false });
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
router.post('/user/updateAvatar', uploader.single('avatar'), async (req, res, next) => {
    try {
        const { file, body: { name } } = req;
        if (file) {
            // console.log(file);
            //更新数据库
            const { n, ok } = await UsersModel.updateOne({ name }, {
                $set: {
                    avatar: file.filename
                }
            });
            if (n + ok === 2) {
                res.send({
                    data: file.filename
                })
            }
            else res.send({
                msg: 'update failed'
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
        const { n, ok } = await UsersModel.updateOne({ name }, {
            $addToSet: { cats_co: catId }    //id 唯一
        })
        if (n + ok === 2) {
            res.send({})
        }
        else {
            res.send({
                msg: 'collect failed'
            })
        }
    }
    catch (err) {
        next(err)
    }

})

//取消收藏 猫猫
router.delete('/user/cancelCollectCat', (req, res, next) => {
    const { name, catId } = req.query;
    UsersModel.findOne({ name }, (err, doc) => {
        if (err)
            return next(err);
        const index = doc.cats_co.findIndex(id => id === catId);
        if (!index)
            res.send({
                msg: 'oprate failed'
            })
        else {
            doc.cats_co.splice(index, 1);
            doc.save();
            res.send({
                data: doc.cats_co
            })
        }
    })
})

//收藏动态
router.post('/user/collectTweet', async (req, res, next) => {
    const { name, tweetId } = req.body;
    if (!name || !tweetId)
        return res.sendStatus(400);
    try {
        //更新用户  tweets_co 属性
        const { n, ok } = await UsersModel.updateOne({ name }, {
            $addToSet: { tweets_co: tweetId }    //id 唯一
        })
        //跟新对应 动态 collectCount 属性
        const { n: n1, ok: ok1 } = await TweetsModel.updateOne({ _id: tweetId }, { $inc: { collectCount: 1 } })
        if (n + ok === 2 && n1 + ok1 === 2) {
            res.send({})
        }
        else {
            res.send({
                msg: 'collect failed'
            })
        }
    }
    catch (err) {
        next(err)
    }
})

//取消收藏 动态
router.delete('/user/cancelCollectTweet', (req, res, next) => {
    const { name, tweetId } = req.query;
    UsersModel.findOne({ name }, (err, doc) => {
        if (err)
            return next(err);
        const index = doc.tweets_co.findIndex(id => id === tweetId);
        if (!index)
            res.send({
                msg: 'oprate failed'
            })
        else {
            doc.tweets_co.splice(index, 1);
            doc.save();
            res.send({
                data: doc.tweets_co
            })
        }
    })
})

//获取用户 收藏的猫猫列表
router.get('/user/getCats_co', async (req, res, next) => {
    let { name, offset, limit } = req.query;
    try {
        const { cats_co } = await UsersModel.findOne({ name });
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
    let { name, offset, limit } = req.query;
    try {
        const { tweets_co } = await UsersModel.findOne({ name });
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


module.exports = router;    