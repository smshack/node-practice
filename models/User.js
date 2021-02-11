const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;



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

userSchema.pre('save',function(next){
    var user =this;

    //  비밀번호를 암호화 시킨
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password =hash
                next()
            });
        });
    }

})



const User =mongoose.model('User',userSchema)


// 이 모델을 다른 파일에서 사용할 수 있도록 export를 해줌

module.exports={User}