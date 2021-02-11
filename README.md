# 1. node.js 와 Express 다운로드 하기
## 1.1 node.js 란
- chrom V8 Javascript 엔진으로 빌드된 javascript 런타임
- node.js 는 이벤트 기반, 논 블로킹 I/O 모델을 사용해 가볍고 효율적
- node.js의 패키지 생태계인 npm은 세계에서 가장 큰 오픈 소스 라이브러리 생태계

## 1.2 express.js 란
- node.js를 위한 빠르고 개발정인 간결한 웹 프레임워크
```angular2html
## npm 시작
## packge.json 파일 생성
npm init

## 백엔드에 시작점이 될 index.js 파일 생성

## express 다운로드
## node_module 다운받은 패키지들이 관리되는 디렉터리
yarn add express
```


# 2. 몽고 DB 연결
- 리눅스 서버에 생성한 mongo에 해당 서버를 연결한다

## 2.1 몽구스 mongosee 설치
https://www.npmjs.com/package/mongoose
```angular2html
yarn add mongoose
```

# 3. 스키마 모델 생성
### 모델
스키마를 감싸주는 역할

### 스키마
몽고 DB에 생성될 컬렉션의 필드 및 설정 

```angular2html
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
    }
    tokenExp:{
        type:Number
    }
})

const User =mongoose.model('User',userSchema)

module.exports={User}
```
생성 후 다른 파일에서 사용할 수 있도록 export 해줘야 함 

# 4. DB 에 데이터 저장하기
sava로 해당 데이터를 저장할 수 있도록 한다
```angular2html
const {User} = require("./models/User")

app.get('/register',(req,res)=>{
    // 회원 가입할 때 필요한 정보들을 client에서 가져오면
    // 그것을 데이터 베이스에 넣어준다
    const user = new User({
        "name":"test",
        "email":"5432tat@naver.com",
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
```


# 5. 비밀번호 bcrypt 암호화 하기
yarn add bcrypt

https://www.npmjs.com/package/bcrypt
1. register 라우터로 가기
2. 유저정보들을 데이터 베이스에 저장하기 전이 암호화할 타이밍
3. bcrypt 공식 사이트 보면서 진행
    - bcrypt 가져오기
    - salt 생성
    - salt 사용 비밀번호 암호화
    - 비밀번호를 바꿀 때만 작동할 수 있도록 조건 걸어주기


# 6. 로그인 시 인증 토큰 생생
jsonwebtoken

yarn add jsonwebtoken

https://www.npmjs.com/package/jsonwebtoken
로그인 라우트 만들기
1. 데이터 베이스에서 요청한 Email 찾기 User.findOne()
2. 데이터베이스에서 요청한 E-mail이 있다면 비밀번호가 같은지 확인
3. 비밀번호 까지 같다면 Token을 생성



# 6. auth 기능 만들기
###why?? 
우리가 사이트 이용시 어떤 페이지는 로그인된 유저만 이용가능

어떤 페이지는 로그인된 유저만 사용할 수 있는 페이지가 있음 그런 부분을 나눠주기 위해서 필요한 과정

### how ??
토큰을 생성 후 유저 정보에 넣고 
1. 서버쪽에서는 DB에 넣고
2. 클라이언트에는 token에 저장하였음

이 두 토큰이 맞는지 체크를 하면 됨
클라이언트에서 cookie에 담겨있는 token user_id 정보 와 DB의 user_id를 비교


## 프로세스 진행 과정
1. Cookie에 저장된 Token을 Server로 가져와서 복호화한다.
2. 복호화 하여 나오는 UserID를 이용해 DB 에서 User Collection의 유저를 찾은 후 크키에서 받아온 token이 유저도 갖고 있는지 확인
    - 쿠키가 일치 하지 않는다면 => 인증 실패
    - 쿠키가 일치한다면 그 해당하는 유저의 정보들을 선별해서 프론트 엔드로 보내준다
    








