const express = require('express')
const mongodbUtils = require('./commonjs/mongodbUtils');
const router = require('./router/index')
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//连接数据库
mongodbUtils.connect();

//挂载路由
app.use('/public',express.static('public'));
app.use(router)



app.listen(8080, () => {
    console.log('server is running at 8080');
});