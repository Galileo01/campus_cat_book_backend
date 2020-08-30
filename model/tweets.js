const mongoose = require('mongoose');
const tweetsSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    created_time: {
        type: Date,
        default: Date.now
    },
    text: {
        type: String,
        default: ''
    },
    //动态话题
    topic: {
        type: String,
        default: ''
    },
    imgs: {
        type: Array,
        default: []
    },
    video: {
        type: String,
        default: ''
    },
    starCount: {
        type: Number,
        default: 0
    },
    commentCount: {
        type: Number,
        default: 0
    },
    collectCount: {
        type: Number,
        default: 0
    }
})


module.exports = mongoose.model('tweets', tweetsSchema);