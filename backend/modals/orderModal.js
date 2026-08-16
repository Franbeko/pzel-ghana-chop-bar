import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    item: {
        name: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        imageUrl: { type: String, required: true }
    },
    quantity: { type: Number, required: true, min: 1 }
}, { _id: true });

const orderSchema = new mongoose.Schema({
    // USER INFO
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    email: { type: String, required: true, index: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },

    address: { type: String, required: true },

    // ORDER INFO
    items: [orderItemSchema],

    // PAYMENT METHOD
    paymentMethod: {
        type: String,
        required: true,
        enum: ['cod', 'pickup', 'mtn_money', 'orange_money'],
        index: true
    },

    transactionId: { type: String },
    
    // Transaction Reference for Mobile Money payments
    transactionRef: { type: String, default: '' },

    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
        index: true
    },

    // ORDER CALCULATION
    subtotal: { type: Number, required: true, min: 0 },
    tax: { type: Number, required: true, min: 0 },
    shipping: { type: Number, required: true, min: 0, default: 0 },
    total: { type: Number, required: true, min: 0 },

    // ORDER TRACKING
    status: {
        type: String,
        enum: ['processing', 'outForDelivery', 'delivered'],
        default: 'processing',
        index: true
    },

    expectedDelivery: Date,
    deliveredAt: Date,

}, {
    timestamps: true
});

// INDEXES
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ status: 1, paymentStatus: 1 });
orderSchema.index({ transactionRef: 1 });

const Order = mongoose.model('Order', orderSchema);
export default Order;