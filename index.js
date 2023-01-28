import './src/config/database'
import { config } from 'dotenv'
import express from 'express'
import http from 'http'
import morgan from 'morgan'
import path from 'path'
import rfs from 'rotating-file-stream'
import { fileURLToPath } from 'url'

import { errorMiddleware } from './src/middlewares/errorMiddleware'
import { logMiddleware } from './src/middlewares/logMiddleware'
import authRouter from './src/routes/auth'
import categoryRouter from './src/routes/category'
import courseRouter from './src/routes/course'
import memberRouter from './src/routes/member'
import taskRouter from './src/routes/task'
import userRouter from './src/routes/user'

// đọc biến môi trường từ .env
config()

const PORT = process.env.PORT || 3000
const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, 'log')
})


// Thay thế cho body-parse dùng để sử dụng req.body
app.use(express.json())

app.use(logMiddleware)

app.use(morgan(':method :url :status :req[content-length] - :response-time ms', { stream: accessLogStream }))

// Tạo ra một http server
const httpServer = http.createServer(app)


// Start server ở PORT
httpServer.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})

app.use('/task', taskRouter)
app.use('/category', categoryRouter)
app.use('/member', memberRouter)
app.use('/course', courseRouter)
app.use('/user', userRouter)
app.use(authRouter)

app.use(errorMiddleware)
