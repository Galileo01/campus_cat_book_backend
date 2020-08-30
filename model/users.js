const mongoose = require('mongoose');
const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    // password: {
    //     type: String,
    //     required: true
    // },
    //0 :保密/未知     1:男 2：女  
    sex: {
        type: Number,
        default: 0
    },
    signature: {
        type: String,
        default: ''
    },
    avatar: {
        type: String,
        default: ''
    },
    campus: {
        type: String,
        default: ''
    },
    created_time: {
        type: Date,
        default: Date.now
    },
    //收藏 的动态  ，存储动态id
    tweets_co: {
        type: Array,
        default: []
    },
    //收藏的 猫猫  存储猫猫id
    cats_co: {
        type: Array,
        default: []
    }
})

module.exports=mongoose.model('users',UsersSchema)