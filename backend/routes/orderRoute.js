import express from 'express'
import { confirmPayment, createOrder, getAllOrders, getOrderById, getOrders, updateAnyOrder, updateOrder } from '../controllers/orderController.js'
import authMiddleware from '../middleware/auth.js'

const orderRouter = express.Router()

// Public routes
orderRouter.get('/confirm', confirmPayment)

// Admin routes
orderRouter.get('/getall', getAllOrders)
orderRouter.put('/getall/:id', updateAnyOrder)

// NEW ROUTE - Confirm payment (admin only)
orderRouter.put('/confirm-payment/:orderId', confirmPayment)

// Protected routes - require login
orderRouter.post('/', authMiddleware, createOrder)
orderRouter.get('/', authMiddleware, getOrders)
orderRouter.get('/:id', authMiddleware, getOrderById)
orderRouter.put('/:id', authMiddleware, updateOrder)

export default orderRouter