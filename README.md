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



# 7. auth 기능 만들기
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
    


# 8. 로그아웃 기능 만들기
로그아웃 라우트 만들기

1. 로그아웃 하려는 유저를 데이터베이스에서 찾아서
2. 그 유저의 토큰을 지워준다

인증 시에 쿠키의 토큰과 DB의 토큰과 같으면 인증
만약 DB의 토큰이 없다면 인증이 되지 않고 로그인이 풀림

해당 코드 작업 진행 후 로그인 하고 

DB 확인 로그 아웃 하고 DB를 확인하여 토큰이 사라진걸 확인


# 9. 리액트 시작하기
### webpack
복잡하게 된 사이트 구성을 묶어주는 개념
많은 모듈들을 합해서 간단하게 만들어 주는 개념

### babel
javascript 최신 기능이 오래된 브라우저에서 동작할 수 있도록 변환 시켜줌

npx create-react-app

config
middleware
models
index.js를 모두 server 디렉터리를 만들어 넣어준
- 리액트 기본 틀 다운로드
npx create-react-app .


# 10. 리액트 앱 구조 분석
### 1. Redux를 위한 디렉터리
- _action
- _reducer

### 2. Page 디렉터리
- componenets/views

### 3. 해당 페이지에 관련된 css 파일이나, component를 넣는다
- components/views/Sections

### 4. Routing 관련 처리
- App.js

### 5. 환경 변수 정리
- Confing.js

### 6. higher Order Component
- hoc

### 7. utils 여러군데 사용될 수 있는 메소드 등 정리
- utils


# 11. 페이지 Routing 하기
yarn add react-router-dom

https://reactrouter.com/web/guides/quick-start

페이지를 분기 할 수 있도록 페이지를 라우팅 해준다

```angular2html
# 라우팅 페이지 만들기
## 페이지 생성
import React from 'react'

function LodingPage(){
return (
<div>
LodingPage
</div>
)
}

export default LodingPage

## 페이지 연결
import LandingPage from './components/views/LandingPage/LandingPage'

## 라우팅 설정
<Router>
   <div>
      <NavBar/>
      <Switch>
         <Route exact path="/landingpage" component={LandingPage} />
      </Switch>
      <Footer/>
   </div>
</Router>
```

# 12.데이터 흐름을 알아보자 (Data Request, Response Flow Axios)
## DB <=> 서버 <=> 클라이언트

클라이언트에서 서버로 요청을 보낼 때 axios를 사용해 보냄
- Axios는 브라우저, Node.js를 위한 Promise API를 활용하는 HTTP 비동기 통신 라이브러리
- 쉽게 말해서 백엔드랑 프론트엔드랑 통신을 쉽게하기 위해 Ajax와 더불어 사용


  https://velog.io/@zofqofhtltm8015/Axios-%EC%82%AC%EC%9A%A9%EB%B2%95-%EC%84%9C%EB%B2%84-%ED%86%B5%EC%8B%A0-%ED%95%B4%EB%B3%B4%EA%B8%B0


  https://github.com/axios/axios

  https://xn--xy1bk56a.run/axios/guide/api.html

yarn add axios


# 13. CORS 이슈 Proxy SERVER 설정
yarn add http-proxy-middleware

https://www.npmjs.com/package/http-proxy-middleware

src/setupProxy.js 파일 생성
```angular2html
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
 
const app = express();
 
app.use('/api', createProxyMiddleware({ target: 'http://www.example.org', changeOrigin: true }));
app.listen(3000);
```

## 14. Concurrently 두 서버 한번에 켜기
yarn add concurrently

```angular2html
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "server-start": "node ./server/index.js",
    "dev":"concurrently \"npm run server-start\" \"npm run start --prefix client\""
  },
```


# 15. CSS 프레임 워크 종류 for React JS
1. Material UI
2. React Bootstrap
3. Semantic UI
4. Ant Design
5. Materialize

https://ant.design/

클라이언트에서

yarn add antdQ


# 16.로그인 기능 /회원 가입 기능 (리덕스 활용)
- 회원가입
- 이메일 
- 이름
- 비밀번호
- 비밀번호 확인
- 확인

# 17. 로그 아웃 기능

# 18. 인증 체크
- hoc 
  컴포넌트를 받아서 다른 컴포넌트를 반환하는식으로 사용하는 함
  

## 서버 정보
- 백엔드 서버 :http://34.64.248.21:3000/
- 프론트 서버 :http://34.64.248.21:5000/



