import React, { useState } from 'react'
import { useCart } from '../../CartContext/CartContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiCreditCard, FiUser, FiInfo } from 'react-icons/fi'

const Checkout = () => {
    const { cartItems, totalAmount, clearCart } = useCart()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        paymentMethod: 'cod',
        transactionRef: ''
    })

    // Get token from localStorage
    const token = localStorage.getItem('authToken')
    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {}

    // Calculate tax (5%)
    const taxRate = 0.05
    const subtotal = totalAmount || 0
    const tax = subtotal * taxRate
    const total = subtotal + tax

    // Check if selected payment method is Mobile Money
    const isMobileMoney = formData.paymentMethod === 'mtn_money' || formData.paymentMethod === 'orange_money'

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!formData.firstName || !formData.lastName || !formData.phone || !formData.email || !formData.address) {
            alert('Please fill in all required fields')
            return
        }

        // Validate transaction reference for Mobile Money
        if (isMobileMoney && !formData.transactionRef) {
            alert('Please enter your Mobile Money transaction reference number')
            return
        }

        if (cartItems.length === 0) {
            alert('Your cart is empty')
            return
        }

        setIsLoading(true)

        const orderItems = cartItems.map(cartItem => ({
            name: cartItem.item?.name,
            price: cartItem.item?.priceLRD || cartItem.item?.price || 0,
            imageUrl: cartItem.item?.imageUrl || '',
            quantity: cartItem.quantity
        }))

        const orderData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
            paymentMethod: formData.paymentMethod,
            transactionRef: formData.transactionRef,
            subtotal: subtotal,
            tax: tax,
            total: total,
            items: orderItems
        }

        try {
            const response = await axios.post('http://localhost:4000/api/orders', orderData, { headers: authHeaders })
            
            if (response.data.success) {
                alert('Order placed successfully!')
                clearCart()
                navigate('/myorder')
            } else {
                alert(response.data.message || 'Order failed')
            }
        } catch (error) {
            console.error('Checkout error:', error)
            alert(error.response?.data?.message || 'Failed to place order. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    if (cartItems.length === 0) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-[#1a120b] via-[#2a1e14] to-[#3e2b1d] py-20 px-4'>
                <div className='max-w-4xl mx-auto text-center'>
                    <div className='bg-[#3c2a21]/60 backdrop-blur-lg rounded-3xl p-12 border border-amber-600/30'>
                        <h2 className='text-3xl font-bold text-amber-100 mb-4'>Your Cart is Empty</h2>
                        <p className='text-amber-100/70 mb-8'>Add items to your cart before checking out.</p>
                        <button onClick={() => navigate('/menu')} className='bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300'>
                            Browse Menu
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-[#1a120b] via-[#2a1e14] to-[#3e2b1d] py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-7xl mx-auto'>
                {/* Back to Cart Button */}
                <button
                    onClick={() => navigate('/cart')}
                    className='mb-6 inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors group'
                >
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    Back to Cart
                </button>

                <h1 className='text-4xl sm:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent'>
                    Checkout
                </h1>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    {/* Left Column - Personal Information */}
                    <div className='bg-[#3c2a21]/60 backdrop-blur-lg rounded-2xl p-6 border border-amber-600/30'>
                        <h2 className='text-2xl font-bold text-amber-100 mb-4 flex items-center gap-2'>
                            <FiUser className="text-amber-400" /> Personal Information
                        </h2>
                        <div className='space-y-4'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div>
                                    <label className='block text-amber-300 text-sm mb-1'>First Name</label>
                                    <input type='text' name='firstName' value={formData.firstName} onChange={handleChange}
                                        className='w-full px-4 py-2 rounded-lg bg-amber-900/30 border border-amber-600/30 text-amber-100 focus:outline-none focus:border-amber-500'
                                        required />
                                </div>
                                <div>
                                    <label className='block text-amber-300 text-sm mb-1'>Last Name</label>
                                    <input type='text' name='lastName' value={formData.lastName} onChange={handleChange}
                                        className='w-full px-4 py-2 rounded-lg bg-amber-900/30 border border-amber-600/30 text-amber-100 focus:outline-none focus:border-amber-500'
                                        required />
                                </div>
                            </div>
                            <div>
                                <label className='block text-amber-300 text-sm mb-1'>Phone</label>
                                <input type='tel' name='phone' value={formData.phone} onChange={handleChange}
                                    className='w-full px-4 py-2 rounded-lg bg-amber-900/30 border border-amber-600/30 text-amber-100 focus:outline-none focus:border-amber-500'
                                    required />
                            </div>
                            <div>
                                <label className='block text-amber-300 text-sm mb-1'>Email</label>
                                <input type='email' name='email' value={formData.email} onChange={handleChange}
                                    className='w-full px-4 py-2 rounded-lg bg-amber-900/30 border border-amber-600/30 text-amber-100 focus:outline-none focus:border-amber-500'
                                    required />
                            </div>
                            <div>
                                <label className='block text-amber-300 text-sm mb-1'>Delivery Address</label>
                                <input type='text' name='address' value={formData.address} onChange={handleChange}
                                    className='w-full px-4 py-2 rounded-lg bg-amber-900/30 border border-amber-600/30 text-amber-100 focus:outline-none focus:border-amber-500'
                                    placeholder='Enter your delivery address'
                                    required />
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Payment Details */}
                    <div className='bg-[#3c2a21]/60 backdrop-blur-lg rounded-2xl p-6 border border-amber-600/30'>
                        <h2 className='text-2xl font-bold text-amber-100 mb-4 flex items-center gap-2'>
                            <FiCreditCard className="text-amber-400" /> Payment Details
                        </h2>

                        {/* Order Items */}
                        <div className='mb-4'>
                            <h3 className='text-lg font-semibold text-amber-300 mb-2'>Your Order Items</h3>
                            <div className='space-y-2 max-h-40 overflow-auto'>
                                {cartItems.map((cartItem, idx) => {
                                    const itemPrice = cartItem.item?.priceLRD || cartItem.item?.price || 0
                                    return (
                                        <div key={idx} className='flex justify-between text-amber-100/80 text-sm'>
                                            <span>{cartItem.item?.name} x{cartItem.quantity}</span>
                                            <span>LRD {(itemPrice * cartItem.quantity).toFixed(2)}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Price Summary */}
                        <div className='border-t border-amber-600/30 pt-4 space-y-2'>
                            <div className='flex justify-between text-amber-100/80'>
                                <span>Subtotal:</span>
                                <span>LRD {subtotal.toFixed(2)}</span>
                            </div>
                            <div className='flex justify-between text-amber-100/80'>
                                <span>Tax (5%):</span>
                                <span>LRD {tax.toFixed(2)}</span>
                            </div>
                            <div className='flex justify-between text-xl font-bold text-amber-100 pt-2 border-t border-amber-600/30'>
                                <span>Total:</span>
                                <span>LRD {total.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className='mt-6'>
                            <label className='block text-amber-300 text-sm mb-2'>Payment Method</label>
                            <select name='paymentMethod' value={formData.paymentMethod} onChange={handleChange}
                                className='w-full px-4 py-2 rounded-lg bg-amber-900/30 border border-amber-600/30 text-amber-100 focus:outline-none focus:border-amber-500'>
                                <option value="cod">💰 Cash on Delivery</option>
                                <option value="pickup">📦 Payment on Pickup</option>
                                <option value="mtn_money">📱 MTN Mobile Money</option>
                                <option value="orange_money">📱 Orange Money</option>
                            </select>
                        </div>

                        {/* Mobile Money Note and Transaction Reference */}
                        {isMobileMoney && (
                            <div className='mt-4 space-y-4'>
                                {/* Info Note */}
                                <div className='bg-amber-900/20 border-l-4 border-amber-500 p-3 rounded-r-lg'>
                                    <div className='flex items-start gap-2'>
                                        <FiInfo className='text-amber-400 mt-0.5 flex-shrink-0' />
                                        <p className='text-amber-200/80 text-sm'>
                                            For Mobile Money payments, please send payment to our business number after placing your order.
                                            <br />
                                            <span className='text-amber-400 text-xs'>MTN: +231 886 811 113 | Orange: +231 775 121 332</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Transaction Reference Field */}
                                <div>
                                    <label className='block text-amber-300 text-sm mb-1'>
                                        Transaction Reference Number
                                        <span className='text-red-400 ml-1'>*</span>
                                    </label>
                                    <input 
                                        type='text' 
                                        name='transactionRef' 
                                        value={formData.transactionRef} 
                                        onChange={handleChange}
                                        placeholder='e.g., MMTN123456789 or ORG987654321'
                                        className='w-full px-4 py-2 rounded-lg bg-amber-900/30 border border-amber-600/30 text-amber-100 placeholder-amber-400/50 focus:outline-none focus:border-amber-500'
                                        required
                                    />
                                    <p className='text-amber-400/60 text-xs mt-1'>
                                        Enter the transaction ID you received after making payment
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Complete Order Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className='w-full mt-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-xl font-bold hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {isLoading ? 'Processing...' : 'Complete Order'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout