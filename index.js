const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})