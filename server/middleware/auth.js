const {User} =require('../models/User')

let auth =(req,res,next)=>{
    // 인증 처리를 하는 부분
    // 1. 클라이언트 쿠키에서 토큰을 가져온다
    let token =req.cookies.x_auth
    //2. 토큰을 복호화 한후 유저를 찾는다
    User.findByToken(token,(err, user)=>{
        // 3. 유저가 있으면 인증 Okay
        if(err) throw err
        // 4. 유저가 없으면 인증 No
        if(!user) return res.json({isAuth:false,error:true})
        req.token =token
        req.user =user
        // next가 없으면 다음으로 진행 안됨
        // 미들웨어에서 다음으로 진행할 수 있도록 next가 필요
        next()
    })


}

module.exports ={auth}