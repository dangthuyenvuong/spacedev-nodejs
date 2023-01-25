import http from 'http'
import { config } from 'dotenv'

// đọc biến môi trường từ .env
config()

const PORT = process.env.PORT || 3000


// Tạo ra một http server
const httpServer = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello World\n')
})


// Start server ở PORT
httpServer.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})