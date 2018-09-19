const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()

const path = require('path')

const noteRouter = require('./routes/note')
const userRouter = require('./routes/user')
const uploadRouter = require('./fileupload/upload')

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/note', noteRouter)
app.use('/user', userRouter)
app.use('/upload', uploadRouter)

app.use('/page', express.static(path.join(__dirname, 'ui')))

app.listen(9095, function(){
    console.log('Node app start at port 9095')
})
