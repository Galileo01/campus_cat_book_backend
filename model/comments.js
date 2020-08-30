const mongoose = require('mongoose');
const commentsSchema = new mongoose.Schema({
    tweet_id: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    created_time: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        default: ''
    },
    starCount: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('comments', commentsSchema);