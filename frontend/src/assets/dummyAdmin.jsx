import { FiClock, FiTruck, FiCheckCircle } from 'react-icons/fi';

// Status styles for orders
export const statusStyles = {
    processing: {
        color: 'text-amber-400',
        bg: 'bg-amber-900/20',
        icon: <FiClock className="text-lg" />,
        label: 'Processing'
    },
    outForDelivery: {
        color: 'text-blue-400',
        bg: 'bg-blue-900/20',
        icon: <FiTruck className="text-lg" />,
        label: 'Out for Delivery'
    },
    delivered: {
        color: 'text-green-400',
        bg: 'bg-green-900/20',
        icon: <FiCheckCircle className="text-lg" />,
        label: 'Delivered'
    },
    pending: {
        color: 'text-yellow-400',
        bg: 'bg-yellow-900/20',
        icon: <FiClock className="text-lg" />,
        label: 'Payment Pending'
    },
    completed: {
        color: 'text-green-400',
        bg: 'bg-green-900/20',
        icon: <FiCheckCircle className="text-lg" />,
        label: 'Completed'
    }
};

// Get payment method details
export const getPaymentMethodDetails = (method) => {
    switch (method?.toLowerCase()) {
        case 'cod':
            return {
                label: 'Cash on Delivery',
                class: 'bg-yellow-600/30 text-yellow-300 border-yellow-500/50'
            };
        case 'pickup':
            return {
                label: 'Pickup',
                class: 'bg-orange-600/30 text-orange-300 border-orange-500/50'
            };
        case 'mtn_money':
            return {
                label: 'MTN Money',
                class: 'bg-blue-600/30 text-blue-300 border-blue-500/50'
            };
        case 'orange_money':
            return {
                label: 'Orange Money',
                class: 'bg-purple-600/30 text-purple-300 border-purple-500/50'
            };
        default:
            return {
                label: method || 'Unknown',
                class: 'bg-gray-600/30 text-gray-300 border-gray-500/50'
            };
    }
};

// Order table headers
export const orderHeaders = [
    'Order ID', 'Customer', 'Address', 'Items', 'Total Items', 'Price', 'Payment', 'Status'
];

// Helper function to format orders
export const formatOrders = (orders) => {
    return orders.map(order => ({
        ...order,
        items: order.items?.map(entry => ({
            _id: entry._id,
            item: {
                ...entry.item,
                imageUrl: entry.item.imageUrl,
            },
            quantity: entry.quantity
        })) || [],
        createdAt: new Date(order.createdAt).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }),
        paymentStatus: order.paymentStatus?.toLowerCase() || 'pending'
    }));
};