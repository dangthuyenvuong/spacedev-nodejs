import express from 'express'
import http from 'http'
import { config } from 'dotenv'
import { errorHandler } from './src/middlewares/errorHandler'
import morgan, { token } from 'morgan'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url';
import rfs from 'rotating-file-stream'
import { tokenHanller } from './src/middlewares/tokenHanler'
import userRouter from './src/routes/user'
import './src/config/database'
import authRouter from './src/routes/auth'


// config env
config()
const PORT = process.env.PORT || 3000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, 'log')
})


// Tạo http server và express app
const app = express()
const httpServer = http.createServer(app)

// config app

// body parse thay thế cho body-parser
app.use(express.json())


// setup the logger
app.use(morgan(':method :url :status :res[content-length] - :response-time ms', { stream: accessLogStream }))


// run server
httpServer.listen(PORT, () => {
    console.log(`Nodejs server listen on port ${PORT}`)
})


// Khai báo các router
app.get('/', (req, res) => {
    res.send('Chào mừng bạn đến với khóa học Nodejs')
})

app.use('/user',tokenHanller, userRouter)
app.use(authRouter)

// Error Handler
app.use(errorHandler)
