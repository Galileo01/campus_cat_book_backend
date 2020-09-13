const fs=require('fs')
const https=require('https')
const express = require('express')
const mongodbUtils = require('./commonjs/mongodbUtils');
const router = require('./router/index')
const app = express();

const options={
    key:fs.readFileSync('./certificate/markjoe.xyz.key'),
    cert:fs.readFileSync('./certificate/markjoe.xyz.crt')
};

//使用证书和 密钥文件 创建 https 服务
const server=https.createServer(options,app);
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//连接数据库
mongodbUtils.connect();

//挂载路由
app.use('/public',express.static('public'));
app.use(router)

// app.listen(8080, () => {
//     console.log('server is running at 8080');
// });



server.listen(8080, () => {
    console.log('server is running at 8080');
});