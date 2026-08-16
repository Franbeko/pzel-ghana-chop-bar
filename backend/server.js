import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoute.js';
import path from 'path'
import { fileURLToPath } from 'url';
import itemRouter from './routes/itemRoute.js';
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js';
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express();
const port = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// MIDDLEWARE
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
        if(!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// DATABASE
connectDB();

// ROUTES
app.use('/api/user', userRouter)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/api/items', itemRouter)
app.use('/api/cart', cartRouter)
app.use('/api/orders', orderRouter)

app.get('/', (req, res) => {
    res.send('API WORKING')
})

// CREATE HTTP SERVER FOR SOCKET.IO
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:5173', 'http://localhost:5174'],
        credentials: true
    }
})

// SOCKET CONNECTION
io.on('connection', (socket) => {
    console.log('📡 Client connected:', socket.id)
    
    socket.on('disconnect', () => {
        console.log('📡 Client disconnected:', socket.id)
    })
})

// MAKE IO AVAILABLE TO CONTROLLERS
app.set('io', io)

// START SERVER WITH HTTP SERVER (NOT APP)
httpServer.listen(port, () => {
    console.log(`🚀 Server Started on http://localhost:${port}`)
    console.log(`📡 WebSocket Server is ready`)
})