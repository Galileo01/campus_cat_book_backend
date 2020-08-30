const router = require('express').Router();
const TweetsModel = require('../model/tweets');
const UsersModel = require('../model/users')
const { generateUploader } = require('../commonjs/multerUtils')
const imgUploader = generateUploader('../public/tweet/img');
const videoUploader = generateUploader('../public/tweet/video')
//创建、发布 动态
//通过 多个文件图片创建
router.post('/tweet/createWithImgs', imgUploader.array('img', 9), async (req, res, next) => {
    const files = req.files;
    console.log(files);
    try {
        const doc = await TweetsModel.create({ ...req.body, imgs: files.map(file => file.filename) });
        res.send({
            data: doc
        });
    }
    catch (err) {
        next(err)
    }
})

//通过 单个视频创建
router.post('/tweet/createWithVideo', videoUploader.single('video'), async (req, res, next) => {
    const file = req.file;
    try {
        const doc = await TweetsModel.create({ ...req.body, video: file.filename });
        res.send({
            data: doc
        });
    }
    catch (err) {
        next(err)
    }
})



// starCount 的操作  点赞/取消点赞
router.post('/tweet/oprateStarCount', async (req, res, next) => {
    const { tweetId, starCount } = req.body;
    try {
        const { n, ok } = await TweetsModel.updateOne({ _id: tweetId }, { $set: { starCount } });
        if (n + ok === 2) {
            res.send({
                data: starCount
            })
        }
        else
            res.send({
                msg: 'oprate failed'
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
        const tweetData = [];
        for (const [index, doc] of docs.entries()) {
            console.log(index);
            const userinfo = await UsersModel.findOne({ name: doc.user });
            tweetData.push({
                ...doc.toObject(), userinfo
            });
            if (index === docs.length-1) {
               return  res.send({
                    data: tweetData
                })
            }
        }

    }
    catch (err) {
        next(err)
    }


})


module.exports = router;