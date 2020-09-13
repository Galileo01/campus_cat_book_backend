const router = require('express').Router();
const ScoresModel = require('../model/scores');


//进行一次评分
router.post('/score/make', async (req, res, next) => {
    try {
        const { number, isAnonymous } = req.body;
        const doc = await ScoresModel.create({ number, isAnonymous });
        console.log(doc);
        res.send({
            data: doc
        })
    }
    catch (err) {
        next(err)
    }

})


//获得 后台立即运算的分析数据
router.get('/score/analyse', async (req, res, next) => {
    try {
        const docs = await ScoresModel.find();
        const scores = {};
        let anonymousCount = 0;//匿名评分
        let sum = 0;
        for (const [index,doc] of docs.entries()) {
            //统计每种分数的 个数
            const { number, isAnonymous } = doc;
            if (!scores[number]) {
                scores[number] = 1;
            }
            else {
                scores[number]++;
            }
            sum += number;
            if (isAnonymous) anonymousCount++;
        }
        res.send({
            data: {
                total: docs.length,
                average: sum / docs.length,
                scores,
                anonymousCount
            }
        })
    }
    catch (err) {
        next(err)
    }

})




module.exports = router;