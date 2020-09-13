const router = require('express').Router();
const CatsModel = require('../model/cats');
const UsersModel = require('../model/users')

const uploader = require('../commonjs/multerUtils').generateUploader('../public/cat/imgs');

//新增猫猫数据
router.post('/cat/create', async (req, res, next) => {
    try {
        const doc = await CatsModel.create(req.body);
        res.send({ data: doc })
    }
    catch (err) {
        next(err)
    }

})

//删除猫猫数据
router.delete('/cat/delete', async (req, res, next) => {
    try {
        const { ok, deletedCount } = await CatsModel.deleteOne({ name: req.query.name });
        if (ok + deletedCount === 2)
            res.send({})
        else res.send({
            msg: 'delete failed'
        })
    }
    catch (err) {
        next(err)
    }

})


//更改猫猫数据
router.post('/cat/update', async (req, res, next) => {
    try {
        const { preName } = req.body;
        const { n, ok } = await CatsModel.updateOne({ name: preName }, { $set: req.body });
        if (n === 1 && ok === 1) {
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
//获取 猫猫 数据
router.get('/cat/get', async (req, res, next) => {
    let { name, offset, limit } = req.query;
    //转换为 数字
    offset = parseInt(offset);
    limit = parseInt(limit);
    let docs;
    //正则表达式 查询包含的doc
    if (name) docs = await CatsModel.find({ name: { $regex: name } }).skip(offset).limit(limit);
    else
        docs = await CatsModel.find().skip(offset).limit(limit);
    res.send({
        data: docs
    })
})

//根据id 获取猫猫
router.get('/cat/getById', async (req, res, next) => {
    try {
        const { _id } = req.query;
        const doc = await CatsModel.findOne({ _id });
        if (doc)
            res.send({
                data: doc
            });
        else
            res.send({
                msg: 'non-existent'
            })
    }
    catch (err) {
        next(err)
    }

})

//上传 图片   限制一次只能上传一张  ，默认 追加到imgs 数组的末尾
router.post('/cat/uploadImg', uploader.single('img'), async (req, res, next) => {
    try {

        const { file, body: { name } } = req;
        // console.log(file);
        if (file) {
            //添加到 imgs 属性末尾

            const { n, ok } = await CatsModel.updateOne({ name }, { $addToSet: { imgs: file.filename } });// push 的同时 在名称上保证图片 不重复
            if (n + ok === 2) {
                res.send({ data: file.filename })
            }
            else
                res.send({
                    msg: 'upload failed'
                })
        }
        else res.send({
            msg: 'upload failed'
        })
    }
    catch (err) {
        next(err)
    }
})



//删除  指定下标的 图片
router.delete('/cat/deleteImgByIndex', (req, res, next) => {
    const { name, index } = req.query;
    CatsModel.findOne({ name }, (err, doc) => {
        if (err)
            return next(err);
        doc.imgs.splice(index, 1); // 删除指定下标
        doc.save();//保存更改
        res.send({
            data: doc.imgs
        })
    })
})

// 更新/替换 图片 index
router.post('/cat/replaceImgByIndex', uploader.single('img'), (req, res, next) => {
    const { name, index, file } = req.body;
    CatsModel.findOne({ name }, (err, doc) => {
        if (err)
            return next(err);
        doc.imgs[index] = file.filename; // 替换指定下标
        doc.save();//保存更改
        res.send({
            data: doc.imgs
        })
    })
})


module.exports = router;