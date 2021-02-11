const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt =require('jsonwebtoken')

const userSchema =mongoose.Schema({
    name:{
        type:String,
        maxlength:60
    },
    email:{
        type:String,
        trim:true,
        unique:1
    },
    password:{
        type:String,
        maxlength:60
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

    //  비밀번호를 암호화 시킨다
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password =hash
                next()
            });
        });
    }else{
        next()
    }

})

userSchema.methods.comparePassword = function(plainPassword, cb){
    // plainPassword 1234567 <=> 데이터베이스에 있는 암호화된 비밀번호가 맞는지 확인
    // 입력된 비밀번호룰 암호화 해서 DB의 암호화된 데이터와 비교한다
    bcrypt.compare(plainPassword,this.password, function(err,isMatch){
        if(err) return cb(err)
        cb(null, isMatch)
    })
}
userSchema.methods.generateToken =function(cb){
    //jsonwebtoken을 이용해서 token을 생성하기
    var user=this

    var token = jwt.sign(user._id.toHexString(),'secretToken')

    user.token =token
    user.save(function(err,user){
        if(err) return cb(err)
        cb(null,user)
    })

}

userSchema.statics.findByToken =function(token,cb){
    var user=this
    // 토큰을 decode 한다.
    jwt.verify(token,'secretToken',function(err,decoded){
        //우저 아이디를 이용해서 유저를 찾은 후
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({"_id":decoded,"token":token},function(err,user){
            if(err) return cb(err)
            cb(null, user)
        })

    })
}

const User =mongoose.model('User',userSchema)


// 이 모델을 다른 파일에서 사용할 수 있도록 export를 해줌

module.exports={User}