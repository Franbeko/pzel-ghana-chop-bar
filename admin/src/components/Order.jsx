import { useEffect, useState } from "react";
import { layoutClasses, tableClasses, statusStyles, paymentMethodDetails, iconMap } from "../assets/dummyadmin"
import axios from "axios";
import { FiBox, FiUser, FiCheckCircle, FiClock } from "react-icons/fi";
import io from 'socket.io-client';

const Order = () => {

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  // Fetch orders function
  const fetchOrders = async () => {
    try {
      console.log('Fetching orders...');
      const response = await axios.get('/api/orders/getall');
      
      console.log('API Response:', response.data);
      
      let ordersArray = [];
      if (Array.isArray(response.data)) {
        ordersArray = response.data;
      } else if (response.data.orders && Array.isArray(response.data.orders)) {
        ordersArray = response.data.orders;
      } else {
        ordersArray = [];
      }

      const formatted = ordersArray.map(order => ({
        ...order,
        address: order.address ?? order.shippingAddress?.address ?? '',
        city: order.city ?? order.shippingAddress?.city ?? '',
        zipCode: order.zipCode ?? order.shippingAddress?.zipCode ?? '',
        phone: order.phone ?? '',
        items: order.items?.map(e => ({ 
          _id: e._id, 
          item: e.item, 
          quantity: e.quantity 
        })) || [],
        createdAt: new Date(order.createdAt).toLocaleDateString('en-IN', {
          year: 'numeric', 
          month: 'long', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit',
        }),
      }));

      setOrders(formatted);
      setError(null);
    } 
    catch (err) {
      console.error('Error:', err);
      setError(err.response?.data?.message || 'Failed to load orders.');
    } 
    finally {
      setLoading(false);
    }
  };

  // WebSocket connection and auto-refresh
  useEffect(() => {
    let socket = null;

    // Initial fetch
    const loadOrders = async () => {
      await fetchOrders();
    };
    loadOrders();

    // Connect to Socket.io for real-time updates
    try {
      socket = io('http://localhost:4000', {
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        transports: ['websocket', 'polling'],
      });

      // Listen for order updates - FIXED with proper formatting
      socket.on('orderUpdated', (updatedOrder) => {
        console.log('📡 Order updated via WebSocket (Admin):', updatedOrder);
        
        // Format the incoming order to match your state structure
        const formattedOrder = {
          ...updatedOrder,
          address: updatedOrder.address ?? updatedOrder.shippingAddress?.address ?? '',
          city: updatedOrder.city ?? updatedOrder.shippingAddress?.city ?? '',
          zipCode: updatedOrder.zipCode ?? updatedOrder.shippingAddress?.zipCode ?? '',
          phone: updatedOrder.phone ?? '',
          items: updatedOrder.items?.map(e => ({ 
            _id: e._id, 
            item: e.item, 
            quantity: e.quantity 
          })) || [],
          createdAt: new Date(updatedOrder.createdAt).toLocaleDateString('en-IN', {
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit',
          }),
        };
        
        // Update the orders list
        setOrders(prevOrders => {
          // Check if order exists in current list
          const exists = prevOrders.some(order => order._id === formattedOrder._id);
          
          if (exists) {
            // Update existing order
            return prevOrders.map(order => 
              order._id === formattedOrder._id ? formattedOrder : order
            );
          } else {
            // New order - add to list and sort by createdAt
            const newOrders = [formattedOrder, ...prevOrders];
            return newOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          }
        });
      });

      // Connect event
      socket.on('connect', () => {
        console.log('📡 Admin WebSocket connected:', socket.id);
      });

      // Disconnect event
      socket.on('disconnect', () => {
        console.log('📡 Admin WebSocket disconnected');
      });

      // Error event
      socket.on('connect_error', (err) => {
        console.log('📡 WebSocket connection error:', err.message);
      });

    } catch (err) {
      console.log('WebSocket error:', err);
    }

    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`/api/orders/getall/${orderId}`, { status: newStatus });
      // WebSocket will automatically update the UI
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({...selectedOrder, status: newStatus})
      }
    } 
    catch (err) {
      alert(err.response?.data?.message || 'Failed to update order status.');
    }
  }

  const handleConfirmPayment = async (orderId) => {
    try {
      await axios.put(`/api/orders/confirm-payment/${orderId}`);
      // WebSocket will automatically update the UI
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({...selectedOrder, paymentStatus: 'completed'})
      }
      alert('Payment confirmed successfully!');
    } 
    catch (err) {
      alert(err.response?.data?.message || 'Failed to confirm payment.');
    }
  }

  const handleViewOrder = (order) => {
    setSelectedOrder(order)
    setShowDetails(true)
  }

  const closeDetails = () => {
    setShowDetails(false)
    setSelectedOrder(null)
  }

  if (loading) return (
    <div className={layoutClasses.page + ' flex items-center justify-center'}>
      <div className="text-amber-400 text-xl">Loading orders...</div>
    </div>
  )

  if (error) return (
    <div className={layoutClasses.page + ' flex items-center justify-center'}>
      <div className="text-red-400 text-xl">{error}</div>
    </div>
  )

  return (
    <div className={layoutClasses.page}>
      <div className="mx-auto max-w-7xl">
        <div className={layoutClasses.card}>
          <h2 className={layoutClasses.heading}>
            Order Management
          </h2>
          <div className={tableClasses.wrapper}>
            <table className={tableClasses.table}>
              <thead className={tableClasses.headerRow}>
                <tr>
                  {['Order ID', 'Customer', 'Address', 'Items', 'Total Items', 'Price', 'Payment', 'Status', 'Actions'].map(h => (
                    <th key={h} className={tableClasses.headerCell + (h === 'Total Items' ? ' text-center' : '')}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map(order => {
                  const totalItems = order.items?.reduce((s, i) => s + i.quantity, 0) || 0;
                  let totalPrice = order.total || 0;
                  if (!totalPrice && order.items) {
                    totalPrice = order.items.reduce((s, i) => s + (i.item?.price || 0) * i.quantity, 0);
                  }
                  const payMethod = paymentMethodDetails[order.paymentMethod?.toLowerCase()] || paymentMethodDetails.default;
                  const stat = statusStyles[order.status] || statusStyles.processing;

                  let displayPaymentLabel = payMethod.label;
                  if (displayPaymentLabel === 'Payment on Pickup') displayPaymentLabel = 'Pickup';
                  if (displayPaymentLabel === 'MTN Mobile Money') displayPaymentLabel = 'MTN Money';
                  if (displayPaymentLabel === 'Orange Money') displayPaymentLabel = 'Orange';

                  const isPaid = order.paymentStatus === 'completed';
                  const paymentStatusColor = isPaid ? 'text-green-400' : 'text-yellow-400';
                  const paymentStatusBg = isPaid ? 'bg-green-900/20' : 'bg-yellow-900/20';
                  const paymentStatusText = isPaid ? 'Paid' : 'Pending';
                  const paymentIcon = isPaid ? <FiCheckCircle className="text-green-400" /> : <FiClock className="text-yellow-400" />;

                  return (
                    <tr key={order._id} className={tableClasses.row}>
                      <td className={tableClasses.cellBase + ' font-mono text-sm text-amber-100'}>
                        #{order._id?.slice(-8)}
                      </td>
                      <td className={tableClasses.cellBase}>
                        <div className="flex items-center gap-2">
                          <FiUser className="text-amber-400" />
                          <div>
                            <p className="text-amber-100">
                              {order.user?.name || `${order.firstName || ''} ${order.lastName || ''}`}
                            </p>
                            <p className="text-sm text-amber-400/60">
                              {order.user?.phone || order.phone}
                            </p>
                            <p className="text-sm text-amber-400/60">
                              {order.user?.email || order.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className={tableClasses.cellBase}>
                        <div className="text-amber-100/80 text-sm max-w-[200px]">
                          {order.address}, {order.city} - {order.zipCode}
                        </div>
                      </td>
                      <td className={tableClasses.cellBase}>
                        <div className="space-y-1 max-h-52 overflow-auto">
                          {order.items?.map((itm, idx) => {
                            const imageUrl = itm.item?.imageUrl ? `http://localhost:4000${itm.item.imageUrl}` : '';
                            return (
                              <div key={idx} className="flex items-center gap-3 p-2 rounded-lg">
                                {imageUrl ? (
                                  <img 
                                    src={imageUrl}
                                    alt={itm.item?.name} 
                                    className="w-8 h-8 object-cover rounded-lg"
                                    loading="eager"
                                  />
                                ) : (
                                  <div className="w-8 h-8 bg-amber-900/30 rounded-lg flex items-center justify-center text-amber-400 text-xs">
                                    No img
                                  </div>
                                )}
                                <div className="flex-1">
                                  <span className="text-amber-100/80 text-sm block truncate">
                                    {itm.item?.name}
                                  </span>
                                  <div className="flex items-center gap-2 text-xs text-amber-400/60">
                                    <span>LRD {itm.item?.price?.toFixed(2)}</span>
                                    <span>&bull;</span>
                                    <span>x{itm.quantity}</span>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </td>
                      <td className={tableClasses.cellBase + ' text-center'}>
                        <div className="flex items-center justify-center gap-1">
                          <FiBox className="text-amber-400" />
                          <span className="text-amber-300 text-lg">{totalItems}</span>
                        </div>
                      </td>
                      <td className={tableClasses.cellBase + ' text-amber-300 text-lg'}>
                        LRD {(totalPrice || 0).toFixed(2)}
                      </td>
                      <td className={tableClasses.cellBase}>
                        <div className="flex flex-col gap-2">
                          <div className={`${payMethod.class} px-3 py-1.5 rounded-lg border text-sm`}>
                            {displayPaymentLabel}
                          </div>
                          <div className={`${paymentStatusBg} ${paymentStatusColor} px-3 py-1.5 rounded-lg text-sm flex items-center gap-2`}>
                            {paymentIcon}
                            <span>{paymentStatusText}</span>
                          </div>
                        </div>
                      </td>
                      <td className={tableClasses.cellBase}>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <span className={`${stat.color} text-xl`}>
                              {iconMap[stat.icon]}
                            </span>
                            <select 
                              value={order.status || 'processing'}
                              onChange={e => handleStatusChange(order._id, e.target.value)}
                              className={`px-4 py-2 rounded-lg ${stat.bg} ${stat.color} border border-amber-500/20 text-sm cursor-pointer`}
                            >
                              {Object.entries(statusStyles).filter(([k]) => k !== 'succeeded').map(([key, sty]) => (
                                <option value={key} key={key} className={`${sty.bg} ${sty.color}`}>
                                  {sty.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleViewOrder(order)}
                              className="bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 px-3 py-1 rounded-lg text-sm transition-colors"
                            >
                              View Details
                            </button>
                            {!isPaid && (
                              <button
                                onClick={() => handleConfirmPayment(order._id)}
                                className="bg-green-600/30 hover:bg-green-600/50 text-green-300 px-3 py-1 rounded-lg text-sm transition-colors flex items-center gap-1"
                              >
                                <FiCheckCircle className="text-sm" />
                                Mark as Paid
                              </button>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {orders.length === 0 && (
            <div className="text-center py-12 text-amber-100/60 text-xl">
              No orders found
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {showDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={closeDetails}>
          <div className="bg-[#3c2a21] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-[#3c2a21] border-b border-amber-600/30 p-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-amber-100">Order Details</h3>
              <button onClick={closeDetails} className="text-amber-400 hover:text-amber-300 text-2xl">&times;</button>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-amber-400 text-sm">Order ID</p>
                  <p className="text-amber-100 font-mono">#{selectedOrder._id.slice(-8)}</p>
                </div>
                <div>
                  <p className="text-amber-400 text-sm">Date</p>
                  <p className="text-amber-100">{selectedOrder.createdAt}</p>
                </div>
              </div>

              {/* Customer Info */}
              <div className="border-t border-amber-600/30 pt-4">
                <h4 className="text-amber-400 font-semibold mb-2">Customer Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-amber-400/70 text-sm">Name</p>
                    <p className="text-amber-100">{selectedOrder.firstName} {selectedOrder.lastName}</p>
                  </div>
                  <div>
                    <p className="text-amber-400/70 text-sm">Phone</p>
                    <p className="text-amber-100">{selectedOrder.phone}</p>
                  </div>
                  <div>
                    <p className="text-amber-400/70 text-sm">Email</p>
                    <p className="text-amber-100">{selectedOrder.email}</p>
                  </div>
                  <div>
                    <p className="text-amber-400/70 text-sm">Address</p>
                    <p className="text-amber-100">{selectedOrder.address}, {selectedOrder.city} - {selectedOrder.zipCode}</p>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="border-t border-amber-600/30 pt-4">
                <h4 className="text-amber-400 font-semibold mb-2">Order Items</h4>
                <div className="space-y-2">
                  {selectedOrder.items?.map((itm, idx) => {
                    const imageUrl = itm.item?.imageUrl ? `http://localhost:4000${itm.item.imageUrl}` : '';
                    return (
                      <div key={idx} className="flex justify-between items-center p-2 rounded-lg bg-amber-900/20">
                        <div className="flex items-center gap-3">
                          {imageUrl ? (
                            <img 
                              src={imageUrl}
                              alt={itm.item?.name} 
                              className="w-12 h-12 object-cover rounded-lg"
                              loading="eager"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-amber-900/30 rounded-lg flex items-center justify-center text-amber-400 text-xs">
                              No img
                            </div>
                          )}
                          <div>
                            <p className="text-amber-100">{itm.item?.name}</p>
                            <p className="text-amber-400/60 text-sm">x{itm.quantity}</p>
                          </div>
                        </div>
                        <p className="text-amber-300">LRD {((itm.item?.price || 0) * itm.quantity).toFixed(2)}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Payment & Total */}
              <div className="border-t border-amber-600/30 pt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-amber-400/70 text-sm">Payment Method</p>
                    <p className="text-amber-100">{selectedOrder.paymentMethod}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-amber-400/70 text-sm">Total Amount</p>
                    <p className="text-amber-300 text-2xl font-bold">LRD {selectedOrder.total?.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Payment Status and Action Buttons */}
              <div className="border-t border-amber-600/30 pt-4 flex gap-3">
                {selectedOrder.paymentStatus !== 'completed' ? (
                  <button
                    onClick={() => {
                      handleConfirmPayment(selectedOrder._id);
                      closeDetails();
                    }}
                    className="flex-1 bg-green-600/40 hover:bg-green-600/60 text-green-300 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <FiCheckCircle />
                    Mark as Paid
                  </button>
                ) : (
                  <div className="flex-1 bg-green-900/30 text-green-400 px-4 py-2 rounded-lg text-center flex items-center justify-center gap-2">
                    <FiCheckCircle />
                    Payment Confirmed
                  </div>
                )}
                <select
                  value={selectedOrder.status || 'processing'}
                  onChange={e => {
                    handleStatusChange(selectedOrder._id, e.target.value);
                    setSelectedOrder({...selectedOrder, status: e.target.value});
                  }}
                  className="flex-1 px-4 py-2 rounded-lg bg-amber-900/40 text-amber-100 border border-amber-500/30 cursor-pointer"
                >
                  <option value="processing">Processing</option>
                  <option value="outForDelivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Order