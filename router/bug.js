const router = require('express').Router();
const BugsModel = require('../model/bugs');
const imgUploader = require('../commonjs/multerUtils').generateUploader('../public/bug/img')

//新建bug/反馈
router.post('/bug/create', imgUploader.array('img', 4), async (req, res, next) => {
    const files = req.files;
    try {
        const doc = await BugsModel.create({ ...req.body, imgs: files.map(file => file.filename) });
        res.send({
            data: doc
        })
    }
    catch (err) {
        next(err)
    }

})
//标记bug 为已处理状态
router.post('bug/deal', async (req, res, next) => {
    const { bugId } = req.body;
    try {
        const { n, ok } = await BugsModel.updateOne({ _id: bugId }, { $set: { state: true } });
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
router.get('/bug/get', async (req, res, next) => {
    let { limit, offset } = req.query;
    const filter = req.query;
    //删除 offset 和limit 属性， 防止影响 查询
    delete filter.offset;
    delete filter.limit;
    console.log(filter);
    limit = parseInt(limit);
    offset = parseInt(offset);
    try {
        const docs = await BugsModel.find(filter).skip(offset).limit(limit).sort({ created_time: -1 });
        console.log(docs);
        res.send(docs);
    }
    catch (err) {
        next(err)
    }
})


module.exports = router;