const mongoose = require('mongoose');
const appliesSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    //要申请的权限   0:数据录入
    right: {
        type: Number,
        default: 0
    },
    //处理状态  -1:未处理  1：通过 0：未通过
    state: {
        type: Number,
        default: -1,
    },
    created_time: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('applies', appliesSchema);