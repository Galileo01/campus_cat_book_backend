const router = require('express').Router();
const AppliesModel = require('../model/applies')

//创建 申请
router.post('/apply/create', async (req, res, next) => {
    const { user, right } = req.body;
    if (!user || isNaN(right))
        return res.sendStatus(400);

    try {
        const doc = await AppliesModel.create(req.body);
        res.send({
            data: doc
        })
    }
    catch (err) {
        next(err)
    }
})
//处理申请
router.post('/apply/deal', async (req, res, next) => {
    const { result } = req.body;
    try {
        const { ok, n } = await AppliesModel.updateOne({ _id: req.body.applyId }, { $set: { state: result } });
        if (ok + n === 2)
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

//获取 申请
router.get('/apply/get', async (req, res, next) => {
    let { limit, offset } = req.query;
    const filter = req.query;
    //删除 requy 上的 offset 和limit 属性， 防止影响 查询
    delete filter.offset;
    delete filter.limit;
    console.log(filter);
    limit = parseInt(limit);
    offset = parseInt(offset);
    try {
        const docs = await AppliesModel.find(filter).skip(offset).limit(limit).sort({ created_time: -1 });
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