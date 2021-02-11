const express = require('express')
const app = express()
const port = 3000
const bodyParser =require('body-parser')
const {User} = require("./models/User")

const mongoose = require('mongoose')

// 어플리케이션의 데이터를 분석해서 가져옴
app.use(bodyParser.urlencoded({extended:true}))
// json 타입으로 된 데이터를 읽을 수 있도록 가져옴
app.use(bodyParser.json())

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

app.get('/register',(req,res)=>{
    // 회원 가입할 때 필요한 정보들을 client에서 가져오면
    // 그것을 데이터 베이스에 넣어준다
    const user = new User({
        "name":"test",
        "email":"54tat@naver.com",
        "password":"1234567"
    })

    user.save((err,doc)=>{
        if(err) {
            console.log(err)
        }else{
            console.log('success data save')
        }
    })
})

console.log('hihi')


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})