const router = require('express').Router();
const FeedbacksModel = require('../model/feedbacks');
const imgUploader = require('../commonjs/multerUtils').generateUploader('../public/bug/imgs')

//新建bug/反馈
router.post('/feedback/create', imgUploader.array('img', 4), async (req, res, next) => {
    const files = req.files;
    try {
        const doc = await FeedbacksModel.create({ ...req.body, imgs: files.map(file => file.filename) });
        res.send({
            data: doc._id
        })
    }
    catch (err) {
        next(err)
    }

})
//小程序 一次只能上传 一张图片 兼容小程序
router.post('/feedback/continueUpload', imgUploader.single('img'), async (req, res, next) => {
    const file = req.file;
    try {
        const { feedbackId } = req.body;
        const { n, ok } = await FeedbacksModel.updateOne({ _id: feedbackId }, { $addToSet: { imgs: file.filename } });
        if (n + ok === 2)
            res.send({
                data: feedbackId
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


//标记bug 为已处理状态
router.post('feedback/deal', async (req, res, next) => {
    const { bugId } = req.body;
    try {
        const { n, ok } = await FeedbacksModel.updateOne({ _id: bugId }, { $set: { state: true } });
        if (n + ok === 2)
            res.send({});
        else
            res.send({
                msg: 'deal failed'
            })
    }
    catch (err) {
        next(err)
    }

})
//按照 传来的 条件 获取 bug
router.get('/feedback/get', async (req, res, next) => {
    let { limit, offset } = req.query;
    const filter = req.query;
    //删除 offset 和limit 属性， 防止影响 查询
    delete filter.offset;
    delete filter.limit;
    // console.log(filter);
    limit = parseInt(limit);
    offset = parseInt(offset);
    try {
        const docs = await FeedbacksModel.find(filter).skip(offset).limit(limit).sort({ created_time: -1 });
        // console.log(docs);
        res.send({
            data: docs
        });
    }
    catch (err) {
        next(err)
    }
})


module.exports = router;