import Order from '../modals/orderModal.js'
import asyncHandler from 'express-async-handler'
import 'dotenv/config'

// CREATE ORDER FUNCTION
export const createOrder = asyncHandler(async (req, res) => {
    console.log('Creating order with body:', req.body);
    
    const {
        firstName, lastName, phone, email, address, 
        paymentMethod, subtotal, tax, total, items, transactionRef
    } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({success: false, message: 'No items in the cart'});
    }

    if (!firstName || !lastName || !phone || !email || !address) {
        return res.status(400).json({success: false, message: 'Missing required customer information'});
    }

    const orderItems = items.map(item => ({
        item: {
            name: item.name || 'Unknown',
            price: Number(item.price) || 0,
            imageUrl: item.imageUrl || ''
        },
        quantity: Number(item.quantity) || 1
    }));

    const shippingCost = 0;
    let paymentStatus = 'pending';

    const newOrder = new Order({
        user: req.user?._id || null,
        firstName, 
        lastName, 
        phone, 
        email, 
        address, 
        paymentMethod, 
        subtotal: Number(subtotal),
        tax: Number(tax), 
        total: Number(total), 
        shipping: shippingCost, 
        items: orderItems,
        paymentStatus: paymentStatus,
        status: 'processing',
        transactionRef: transactionRef || ''
    });

    const savedOrder = await newOrder.save();
    
    console.log('Order created successfully:', savedOrder._id);
    return res.status(201).json({
        success: true,
        order: savedOrder,
        message: 'Order created successfully'
    })
});

// CONFIRM PAYMENT - Admin can call this to mark order as paid
export const confirmPayment = asyncHandler(async (req, res) => {
    const { orderId } = req.params;
    
    const order = await Order.findById(orderId);
    if (!order) {
        return res.status(404).json({success: false, message: 'Order not found'});
    }
    
    order.paymentStatus = 'completed';
    await order.save();
    
    // SOCKET: Emit event when payment is confirmed
    const io = req.app.get('io')
    io.emit('orderUpdated', order)
    
    res.json({success: true, message: 'Payment confirmed successfully', order});
})

// GET ORDERS FOR LOGGED IN USER
export const getOrders = asyncHandler(async (req, res) => {
    const filter = req.user?._id ? {user: req.user._id} : {};
    const rawOrders = await Order.find(filter).sort({createdAt: -1}).lean()

    const formatted = rawOrders.map(o => ({
        ...o,
        items: o.items.map(i => ({
            _id: i._id,
            item: i.item,
            quantity: i.quantity
        }))
    }));
    res.json({success: true, orders: formatted})
})

// ADMIN ROUTE - GET ALL ORDERS
export const getAllOrders = asyncHandler(async (req, res) => {
    const rawOrders = await Order.find({}).sort({createdAt: -1}).lean()

    const formatted = rawOrders.map(o => ({
        _id: o._id,
        user: o.user,
        firstName: o.firstName,
        lastName: o.lastName,
        email: o.email,
        phone: o.phone,
        address: o.address,
        paymentMethod: o.paymentMethod,
        paymentStatus: o.paymentStatus,
        status: o.status,
        createdAt: o.createdAt,
        transactionRef: o.transactionRef || '',
        items: o.items.map(i => ({
            _id: i._id,
            item: i.item,
            quantity: i.quantity
        }))
    }));

    res.json({success: true, orders: formatted})
})

// ADMIN ROUTE - UPDATE ANY ORDER
export const updateAnyOrder = asyncHandler(async (req, res) => {
    const updated = await Order.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true, runValidators: true}
    );

    if(!updated) {
        return res.status(404).json({success: false, message: 'Order not found'})
    }
    
    // SOCKET: Emit event when order status is updated
    const io = req.app.get('io')
    io.emit('orderUpdated', updated)
    
    res.json({success: true, order: updated})
})

// GET ORDER BY ID
export const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(!order) return res.status(404).json({success: false, message: 'Order not found'});

    res.json({success: true, order: order})
})

// UPDATE ORDER BY ID
export const updateOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(!order) return res.status(404).json({success: false, message: 'Order not found'});

    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json({success: true, order: updated})
})