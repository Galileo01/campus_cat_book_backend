const mongoose = require('mongoose');
const bugsSchema = new mongoose.Schema({
    user: {
        type: String,
        required:true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        default: ''
    },
    //bug 处理状态
    state: {
        type: Boolean,
        default: false
    },
    created_time: {
        type: Date,
        default: Date.now
    },
    //描述 bug 的截图 最多4张
    imgs: {
        type: Array,
        default: []
    },
})


module.exports = mongoose.model('bugs', bugsSchema);