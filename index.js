import http from 'http'
import { config } from 'dotenv'
import express from 'express'
import taskRouter from './src/routes/task'
import categoryRouter from './src/routes/category'

// đọc biến môi trường từ .env
config()

const PORT = process.env.PORT || 3000
const app = express()


// Thay thế cho body-parse
app.use(express.json())

// Tạo ra một http server
const httpServer = http.createServer(app)


// Start server ở PORT
httpServer.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})

// const tasks = []
app.use('/task', taskRouter)
app.use('/category', categoryRouter)
