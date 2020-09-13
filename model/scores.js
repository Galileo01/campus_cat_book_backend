const mongoose=require('mongoose');
const scoresSchema=new mongoose.Schema({
    number:{
        type:Number,
        required:true
    },
    //是否是匿名的
    isAnonymous:{
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model('scores',scoresSchema);