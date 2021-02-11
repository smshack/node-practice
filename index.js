const express = require('express')
const app = express()
const port = 3000
const bodyParser =require('body-parser')
const cookieParser =require('cookie-parser')
const {User} = require("./models/User")
const dummuy={
    "email":"54tat@naver.com",
    "password":"1234567"
}
const mongoose = require('mongoose')

// 어플리케이션의 데이터를 분석해서 가져옴
app.use(bodyParser.urlencoded({extended:true}))
// json 타입으로 된 데이터를 읽을 수 있도록 가져옴
app.use(bodyParser.json())
app.use(cookieParser())
// 몽고 사용 설정
mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then((response)=> console.log("successfully connection to mongodb"))
    .catch(e =>console.log(e))


app.get('/', (req, res) => {
    res.send('Hello World 안녕하세요 파일이 변경 되었습니다!')
})

app.post('/register',(req,res)=>{
    // 회원 가입할 때 필요한 정보들을 client에서 가져오면
    // 그것을 데이터 베이스에 넣어준다
    const user =new User(req.body)
    user.save((err,doc)=>{
        if(err) return res,json({success:false,err})
        return res.status(200).json({
            succsee:true
        })
    })
})

app.post('/login',(req,res)=>{
    //1. 요청된 이메일을 데이터베이스에 있는지 확인
    User.findOne({email:req.body.email},(err,user)=>{
        if(!user){
            return res.json({
                loginSuccess:false,
                message:"제공된 이메일에 해당하는 유저가 없습니다"
            })
        }
        // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인
        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) res.json({loginSuccess:false, message:"비밀번호가 틀렸습니다"})

            // 비밀번호까지 맞다면 토큰을 생성하기
            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err)

                res.cookie('x_auth',user.token)
                    .status(200)
                    .json({loginSucces:true,userId:user._id})
            })
        })
    })
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})