import http from 'http'
import { config } from 'dotenv'
import express from 'express'

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

const tasks = []

app.post('/task', (req, res) => {
    const { name } = req.body
    const task = {
        id: Date.now(),
        name
    }

    tasks.push(task)
    res.json(task)
})
app.get('/task', (req, res) => {
    res.json(tasks)
})
app.get('/task/:id', (req, res) => {
    const { id } = req.params
    const task = tasks.find(e => e.id === parseInt(id))
    res.json(task)
})
app.patch('/task/:id', (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const task = tasks.find(e => e.id === parseInt(id))
    if (task) {
        task.name = name
        res.json(task)
    } else {
        res.status(403).send('Task không tồn tại')
    }
})
app.delete('/task/:id', (req, res) => {
    const { id } = req.params

    const index = tasks.findIndex(e => e.id === parseInt(id))
    if (index !== -1) {
        tasks.splice(index, 1)
        res.sendStatus(204)
    } else {
        res.status(403).send('Task không tồn tại')
    }
})