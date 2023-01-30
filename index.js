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
import reviewRouter from './src/routes/review'
import fileRouter from './src/routes/file'
import cors from 'cors'
import './src/utils/morgan'
import { jsonBody } from './src/utils/jsonBody'
import reportRouter from './src/routes/report'
import { cacheGetMethod } from './src/utils/cache'
import './src/config/redis'
import { expressAdapter } from './src/config/redis'


// đọc biến môi trường từ .env
config()

const PORT = process.env.PORT || 3000
const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, './resources/log')
})

// Thay thế cho body-parse dùng để sử dụng req.body
app.use('/uploads', express.static('./resources/uploads'))
app.use(express.json())

app.use(cors({
    methods: '*',
    origin: [
        /localhost/
    ]
}))

app.use(jsonBody);

app.use(logMiddleware)
app.use(cacheGetMethod({
    cacheTime: 10,
    adapter: expressAdapter,
    noCache: [
        // '/review'
    ]
}))

app.use(morgan(`
[:date[iso]] :remote-addr 
[:method] :url (:status - :req[content-length] - :response-time ms)
Authentication\: :user
Body\: :body
Response\: :response
`, { stream: accessLogStream }))




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
app.use('/review', reviewRouter)
app.use('/file', fileRouter)
app.use('/report', reportRouter)
app.use(authRouter)

app.get('/test', (req, res) => {
    console.log(req.originalUrl)
    res.json({ origin: true })
})

app.use(errorMiddleware)
