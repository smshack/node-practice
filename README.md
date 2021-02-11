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

