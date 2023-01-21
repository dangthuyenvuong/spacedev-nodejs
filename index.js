import express from 'express'
import http from 'http'
import { config } from 'dotenv'
import { errorHandler } from './src/middlewares/errorHandler.js'

// config env
config()
const PORT = process.env.PORT || 3000



// Tạo http server và express app
const app = express()
const httpServer = http.createServer(app)

// run server
httpServer.listen(PORT, () => {
    console.log(`Nodejs server listen on port ${PORT}`)
})

// Khai báo các router
app.get('/', (req, res) => {
    res.send('Chào mừng bạn đến với khóa học Nodejs')
})

app.get('/demo', (req, res) => {
    asdfsadf = 100
    // throw new Error('aaaaaaa')
})

// Error Handler
app.use(errorHandler)
