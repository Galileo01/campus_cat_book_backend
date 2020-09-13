// mongodb 一些工具函数
const mongoose = require('mongoose');

mongoose.connection.on('open', async () => {
    console.log('连接成功');

    // const dbs = await mongoose.connection.db.collections();
    // console.log(dbs);  //当连接open 之后mongoose.connection.db 不为空 ，改对象是一个 Mongodb.db对象
})


function connect() {

    //本地测试
    mongoose.connect('mongodb://127.0.0.1/campus_cat_book', { useUnifiedTopology: true, useNewUrlParser: true });
    //服务器环境需要身份验证
    // mongoose.connect('mongodb://admin:15823413506@127.0.0.1/campus_cat_book?authSource=admin', { useUnifiedTopology: true, useNewUrlParser: true });
    //测试连接 远程 服务器 mongodb
    // mongoose.connect('mongodb://admin:15823413506@121.41.225.12/campus_cat_book?authSource=admin', { useUnifiedTopology: true, useNewUrlParser: true });
    // console.log(mongoose.connection.base);
    // const { modelSchemas } = mongoose.connection.base;
    // for(const prop in modelSchemas)
    // {
    //     console.log(modelSchemas[prop].obj);
    // }
    // const collections = mongoose.connection.collections;
    // console.log(Object.keys(collections));
}


module.exports = {
    connect
}