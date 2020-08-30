const multer = require('multer');
const path = require('path');

//uploader 生成函数

//relePath :是相对于 本 multerUtils.js 的路径，用于存储上传的文件
function generateUploader(relaPath) {
    // 动态的根据 图片名称，扩展名  进行处理
    const storage = multer.diskStorage({
        destination: path.join(__dirname, relaPath),
        filename(req, file, cb) {
            cb(null, file.originalname); //使用 文件 本来的名称   ，multer 不会添加任何扩展名
        },
    });
    return multer({ storage });
}


module.exports = {
    generateUploader
}