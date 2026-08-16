import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiRefreshCw, FiArrowLeft } from 'react-icons/fi'
import io from 'socket.io-client'

const MyOrder = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const navigate = useNavigate()

    const token = localStorage.getItem('authToken')

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/orders', {
                headers: { Authorization: `Bearer ${token}` }
            })
            setOrders(response.data.orders || response.data)
        } catch (error) {
            console.error('Error fetching orders:', error)
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    useEffect(() => {
        if (!token) {
            navigate('/login')
            return
        }

        fetchOrders()

        // ✅ SOCKET: Connect to backend
        const socket = io('http://localhost:4000')

        // Listen for order updates
        socket.on('orderUpdated', (updatedOrder) => {
            console.log('Order updated via WebSocket:', updatedOrder)
            setOrders(prevOrders => 
                prevOrders.map(order => 
                    order._id === updatedOrder._id ? updatedOrder : order
                )
            )
        })

        return () => {
            socket.disconnect()
        }
    }, [token, navigate])

    const handleRefresh = () => {
        setRefreshing(true)
        fetchOrders()
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'processing': return <FiClock className="text-amber-400" />
            case 'outForDelivery': return <FiTruck className="text-blue-400" />
            case 'delivered': return <FiCheckCircle className="text-green-400" />
            default: return <FiPackage className="text-amber-400" />
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'processing': return 'bg-amber-900/20 text-amber-400'
            case 'outForDelivery': return 'bg-blue-900/20 text-blue-400'
            case 'delivered': return 'bg-green-900/20 text-green-400'
            default: return 'bg-amber-900/20 text-amber-400'
        }
    }

    const getPaymentStatusIcon = (paymentStatus) => {
        return paymentStatus === 'completed' ? <FiCheckCircle className="text-green-400" /> : <FiClock className="text-yellow-400" />
    }

    const getPaymentStatusColor = (paymentStatus) => {
        return paymentStatus === 'completed' ? 'bg-green-900/20 text-green-400' : 'bg-yellow-900/20 text-yellow-400'
    }

    const getPaymentStatusText = (paymentStatus) => {
        return paymentStatus === 'completed' ? 'Paid' : 'Pending'
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#1a120b] via-[#2a1e14] to-[#3e2b1d] flex items-center justify-center">
                <div className="text-amber-400 text-xl">Loading your orders...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1a120b] via-[#2a1e14] to-[#3e2b1d] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <button
                    onClick={() => navigate('/')}
                    className="mb-6 inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors group"
                >
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </button>

                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                        My Orders
                    </h1>
                    <button
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="flex items-center gap-2 bg-amber-900/40 hover:bg-amber-800/50 text-amber-100 px-4 py-2 rounded-full transition-all"
                    >
                        <FiRefreshCw className={`${refreshing ? 'animate-spin' : ''}`} />
                        {refreshing ? 'Refreshing...' : 'Refresh'}
                    </button>
                </div>

                {orders.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="bg-[#3c2a21]/60 backdrop-blur-lg rounded-3xl p-12 border border-amber-600/30">
                            <FiPackage className="text-6xl text-amber-400 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-amber-100 mb-2">No Orders Yet</h2>
                            <p className="text-amber-100/70 mb-6">You haven't placed any orders yet.</p>
                            <button onClick={() => navigate('/menu')} className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-2 rounded-full">
                                Browse Menu
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-[#3c2a21]/60 backdrop-blur-lg rounded-2xl p-6 border border-amber-600/30 hover:border-amber-500 transition-all">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 pb-4 border-b border-amber-600/30">
                                    <div>
                                        <p className="text-amber-400 text-sm">Order ID</p>
                                        <p className="text-amber-100 font-mono">#{order._id.slice(-8)}</p>
                                    </div>
                                    <div>
                                        <p className="text-amber-400 text-sm">Date</p>
                                        <p className="text-amber-100">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-amber-400 text-sm">Total Amount</p>
                                        <p className="text-amber-300 font-bold">LRD {order.total?.toFixed(2)}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${getStatusColor(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            <span className="capitalize">{order.status === 'outForDelivery' ? 'Out for Delivery' : order.status}</span>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${getPaymentStatusColor(order.paymentStatus)}`}>
                                            {getPaymentStatusIcon(order.paymentStatus)}
                                            <span>{getPaymentStatusText(order.paymentStatus)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-amber-400 text-sm">Items</p>
                                    {order.items?.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <img 
                                                    src={item.item?.imageUrl ? `http://localhost:4000${item.item.imageUrl}` : 'https://via.placeholder.com/48x48?text=No+Image'} 
                                                    alt={item.item?.name || 'Item'} 
                                                    className="w-12 h-12 object-cover rounded-lg"
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/48x48?text=No+Image';
                                                    }}
                                                />
                                                <div>
                                                    <p className="text-amber-100">{item.item?.name || 'Unknown Item'}</p>
                                                    <p className="text-amber-400/60 text-sm">Quantity: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <p className="text-amber-300">LRD {((item.item?.price || 0) * item.quantity).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyOrder