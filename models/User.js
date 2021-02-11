const mongoose = require('mongoose');

const userSchema =mongoose.Schema({
    name:{
        type:String,
        maxlength:50
    },
    email:{
        type:String,
        trim:true,
        unique:1
    },
    password:{
        type:String,
        maxlength:50
    },
    role:{
        type:Number,
        default:0
    },
    image:{
        type:String
    },
    token:{
        type:String
    },
    tokenExp:{
        type:Number
    }
})

const User =mongoose.model('User',userSchema)


// 이 모델을 다른 파일에서 사용할 수 있도록 export를 해줌

module.exports={User}