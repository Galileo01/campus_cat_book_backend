// mongodb 一些工具函数
const mongoose = require('mongoose');

mongoose.connection.on('open', () => {
    console.log('连接成功');
})

function connect() {
    mongoose.connect('mongodb://127.0.0.1/campus_cat_book', { useUnifiedTopology: true, useNewUrlParser: true });
}


module.exports={
    connect
}