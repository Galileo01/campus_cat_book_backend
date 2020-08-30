const mongoose = require('mongoose')
const catsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    //所有图片
    imgs:{     //图片的第一张作为  猫猫头像
        type:Array,
        default:[]
    },
    sex: {
        type: Number,
        default: 0  //0 male 1:female
    },
    //猫猫状态  0 ：在校  1：毕业   2：休学
    state: {
        type: Number,
        default: 0
    },
    color: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    //绝育情况
    sterilized: {
        type: Boolean,
        default: false
    },
    birthday: {
        type: String,
        default: ''
    },
    //上一次 状态更改 的时间
    changeTime: {
        type: String,
        default: ''
    },
    //第一次目击时间
    witnessTime: {
        type: String,
        default: ''
    },
    //外观
    appearance: {
        type: String,
        default: ''
    },
    //个性
    character: {
        type: String,
        default: ''
    }

})

module.exports=mongoose.model('cats',catsSchema);