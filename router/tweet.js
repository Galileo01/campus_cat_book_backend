const router = require('express').Router();
const TweetsModel = require('../model/tweets');
const UsersModel = require('../model/users')
const { generateUploader } = require('../commonjs/multerUtils');
const { json } = require('express');
const imgUploader = generateUploader('../public/tweet/imgs');
const videoUploader = generateUploader('../public/tweet/videos');
const mediaUploader = generateUploader('../public/tweet/media')
//创建、发布 动态

//一次上传所有媒体文件  
//由于 小程序 限制，一次只能上传一个图片/视频   

router.post('/tweet/create', mediaUploader.any(), async (req, res, next) => {
    try {
        const files = req.files;
        console.log(req.body);
        req.body.topics = JSON.parse(req.body.topics);//通过 小程序wx.uploadFile()传递的参数 为字符串
        console.log(req.body);
        let doc;
        //小程序端 已经限制 只能纯文本，图片，视频 的一种方式 创建
        if (files.findIndex(item => item.fieldname === 'img') >= 0)//包含了图片
        {
            doc = await TweetsModel.create({ ...req.body, imgs: files.map(file => file.filename) });
        }
        else if (files.findIndex(item => item.fieldname === 'video') >= 0) {
            console.log('video');
            doc = await TweetsModel.create({ ...req.body, video: files[0].filename });
        }
        else //纯文本
        {
            doc = await TweetsModel.create(req.body);
        }
        console.log(doc._id);
        res.send({
            data: doc.toObject()._id
        });

    }
    catch (err) {
        next(err)
    }

})

//继续 上传剩余的 图片

router.post('/tweet/createContinue', mediaUploader.single('img'), async (req, res, next) => {
    const file = req.file;
    const { tweetId } = req.body;
    try {
        const { n, ok } = await TweetsModel.updateOne({ _id: tweetId }, { $addToSet: { imgs: file.filename } });
        if (n + ok === 2)
            res.send({
                data: tweetId
            })
        else {
            res.send({
                msg: 'upload failed'
            })
        }
    }
    catch (err) {
        next(err)
    }

})


// starCount 点赞 ,每次递增 starCount
router.post('/tweet/starCount', async (req, res, next) => {
    const { tweetId } = req.body;
    try {
        const { n, ok } = await TweetsModel.updateOne({ _id: tweetId }, { $inc: { starCount: 1 } });
        if (n + ok === 2) {
            res.send({
                data: tweetId
            })
        }
        else
            res.send({
                msg: 'star failed'
            })
    }
    catch (err) {
        next(err)
    }
})


//获取所有 动态
router.get('/tweet/getAll', async (req, res, next) => {
    let { offset, limit } = req.query;
    offset = parseInt(offset);
    limit = parseInt(limit);
    try {
        const docs = await TweetsModel.find().sort({ created_time: -1 }).skip(offset).limit(limit);//按照时间 排序，  后创建得 在前
        //获取用户信息  ,后台一次获取，不用前端获取请求两次
        const total = await TweetsModel.countDocuments();

        const tweetData = [];
        for (const [index, doc] of docs.entries()) {
            const userinfo = await UsersModel.findOne({ name: doc.user });
            tweetData.push({
                ...doc.toObject(), userinfo
            });
            if (index === docs.length - 1) {
                return res.send({
                    data: {
                        list: tweetData,
                        total
                    }
                })
            }
        }

    }
    catch (err) {
        next(err)
    }
})

//根据 id 获取 动态详情
router.get('/tweet/getById', async (req, res, next) => {
    try {
        const _id = req.query._id;
        const doc = await TweetsModel.findOne({ _id });
        const userinfo = await UsersModel.findOne({ name: doc.user });
        if (doc)
            res.send({
                data: {
                    ...doc.toObject(),
                    userinfo: userinfo.toObject()
                }
            })
        else res.send({
            msg: 'none'
        })
    }
    catch (err) {
        next(err)
    }

})

//获取 某个用户 创建的所有 动态
router.get('/tweet/getByUser', async (req, res, next) => {
    let { name: user, offset, limit } = req.query;
    offset = parseInt(offset);
    limit = parseInt(limit);
    try {
        const docs = await TweetsModel.find({ user }).skip(offset).limit(limit);
        const total = docs.length;
        const tweets = [];
        for (const [index, doc] of docs.entries()) {
            const userinfo = await UsersModel.findOne({ name: user });
            tweets.push({
                ...doc.toObject(),
                userinfo: userinfo.toObject()
            })
            if (index === docs.length - 1) {
                return res.send({
                    data: {
                        list: tweets,
                        total
                    }
                })
            }
        }

    }
    catch (err) {
        next(err)
    }

})


module.exports = router;  