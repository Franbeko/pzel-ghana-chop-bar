/* eslint-disable react-refresh/only-export-components */

import React, { createContext, useCallback, useContext, useEffect, useReducer } from 'react'
import axios from 'axios'

const CartContext = createContext();

// Reducer Handling Cart Actions Like Add, Remove, Update Quantity, And Item
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'HYDRATE_CART':
            return action.payload;

        case 'ADD_ITEM': {
            const { _id, item, quantity } = action.payload;
            const exists = state.find(ci => ci._id === _id);
            if (exists) {
                return state.map(ci => ci._id === _id ? { ...ci, quantity: ci.quantity + quantity } : ci)
            }
            return [...state, { _id, item, quantity }];
        }

        case 'REMOVE_ITEM': {
            return state.filter(ci => ci._id !== action.payload);
        }
        case 'UPDATE_ITEM': {
            const { _id, quantity } = action.payload;
            if (quantity <= 0) {
                return state.filter(ci => ci._id !== _id);
            }
            return state.map(ci => ci._id === _id ? { ...ci, quantity } : ci)
        }
        case 'CLEAR_CART': {
            return [];
        }
        default: return state;
    }
}

// Initial Cart From LocalStorage
const initializer = () => {
    try {
        return JSON.parse(localStorage.getItem('cart') || '[]');
    }
    catch {
        return []
    }
}

export const CartProvider = ({ children }) => {

    const [cartItems, dispatch] = useReducer(cartReducer, [], initializer);

    // Persist Cart State To LocalStorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // HYDRATE FROM SERVER API
    useEffect(() => {
        const token = localStorage.getItem('authToken')
        axios.get('http://localhost:4000/api/cart', {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => dispatch({ type: 'HYDRATE_CART', payload: res.data }))
            .catch(err => { if (err.response?.status !== 401) console.error(err) })
    }, [])

    // Calculate total amount correctly
    const totalAmount = cartItems.reduce((sum, cartItem) => {
        const price = cartItem.item?.priceLRD || cartItem.item?.price || 0;
        const qty = cartItem.quantity || 0;
        return sum + (Number(price) * Number(qty));
    }, 0);

    // Calculate total items count (for cart badge)
    const totalItemsCount = cartItems.reduce((sum, cartItem) => {
        return sum + (cartItem.quantity || 0);
    }, 0);

    // Alias for backward compatibility
    const totalItems = totalItemsCount;

    // Dispatcher Wrapped With CallBack For Performance
    const addToCart = useCallback(async (item, qty) => {
        const token = localStorage.getItem('authToken')
        const res = await axios.post(
            'http://localhost:4000/api/cart',
            { itemId: item._id, quantity: qty },
            {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` }
            }
        )
        dispatch({ type: 'ADD_ITEM', payload: res.data })
    }, [])

    const removeFromCart = useCallback(async (_id) => {
        const token = localStorage.getItem('authToken')
        await axios.delete(
            `http://localhost:4000/api/cart/${_id}`,
            {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` }
            }
        )
        dispatch({ type: 'REMOVE_ITEM', payload: _id })
    }, [])

    const updateQuantity = useCallback(async (_id, qty) => {
        const token = localStorage.getItem('authToken')
        const res = await axios.put(
            `http://localhost:4000/api/cart/${_id}`,
            { quantity: qty },
            {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` }
            }
        )
        dispatch({ type: 'UPDATE_ITEM', payload: res.data })
    }, [])

    const clearCart = useCallback(async () => {
        const token = localStorage.getItem('authToken')
        await axios.post(
            'http://localhost:4000/api/cart/clear',
            {},
            {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` }
            }
        )
        dispatch({ type: 'CLEAR_CART' })
    }, [])

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalItems,
            totalItemsCount,
            totalAmount,
        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

export default CartProvider;