import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useCart } from '../../CartContext/CartContext'
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import './OurMenu.css'
import axios from 'axios';
import io from 'socket.io-client';

const categories = ['Daily Specials (Mon-Sat)', 'Sunday Specials', 'Rice Dishes', 'Drinks'];

const OurMenu = () => {

    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();
    const [menuData, setMenuData] = useState({});
    const [allItems, setAllItems] = useState([]);
    const location = useLocation();

    // Get search query from URL
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search') || '';

    // Wrap fetchMenu in useCallback
    const fetchMenu = useCallback(async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/items');
            setAllItems(res.data);
            const byCategory = res.data.reduce((acc, item) => {
                const cat = item.category || 'Uncategorized';
                acc[cat] = acc[cat] || [];
                acc[cat].push(item);
                return acc;
            }, {});
            setMenuData(byCategory);
        } catch (err) {
            console.error('Error fetching menu data:', err);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        fetchMenu();

        // Connect to WebSocket for real-time menu updates
        const socket = io('http://localhost:4000', {
            reconnection: true,
            reconnectionAttempts: 5,
        });

        socket.on('menuUpdated', (newItem) => {
            console.log('📡 Menu item added via WebSocket (OurMenu):', newItem);
            // Update both allItems and menuData
            setAllItems(prev => [newItem, ...prev]);
            setMenuData(prevData => {
                const category = newItem.category || 'Uncategorized';
                const updatedCategory = [...(prevData[category] || []), newItem];
                return { ...prevData, [category]: updatedCategory };
            });
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    // USE ID TO FIND AND UPDATE
    const getCartEntry = id => cartItems.find(ci => ci.item?._id === id);

    // Filter items based on search query
    const filteredItems = useMemo(() => {
        if (!searchQuery) {
            return { ...menuData };
        }
        
        const lowerQuery = searchQuery.toLowerCase();
        const searchResults = allItems.filter(item => 
            item.name?.toLowerCase().includes(lowerQuery) ||
            item.description?.toLowerCase().includes(lowerQuery) ||
            item.category?.toLowerCase().includes(lowerQuery)
        );
        
        const groupedResults = searchResults.reduce((acc, item) => {
            const cat = item.category || 'Uncategorized';
            acc[cat] = acc[cat] || [];
            acc[cat].push(item);
            return acc;
        }, {});
        
        return groupedResults;
    }, [menuData, allItems, searchQuery]);

    const displayItems = useMemo(() => {
        if (searchQuery) {
            return Object.values(filteredItems).flat().slice(0, 12);
        }
        return (filteredItems[activeCategory] ?? []).slice(0, 12);
    }, [filteredItems, activeCategory, searchQuery]);

    const prepareCartItem = (item) => {
        return {
            _id: item._id,
            name: item.name,
            price: parseFloat(item.priceLRD),
            priceUSD: item.priceUSD,
            imageUrl: item.imageUrl,
            description: item.description,
            eatIn: item.eatIn,
            takeaway: item.takeaway
        };
    };

    return (
        <div className='bg-gradient-to-br from-[#1a120b] via-[#2a1e14] to-[#3e2b1d] min-h-screen py-16 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-7xl mx-auto'>
                {searchQuery && (
                    <button 
                        onClick={() => window.location.href = '/menu'}
                        className="mb-6 inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors group"
                    >
                        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Menu
                    </button>
                )}

                <h2 className='text-center mb-12'>
                    <span className='font-dancingscript block text-5xl md:text-7xl sm:text-6xl mb-2 bg-gradient-to-r from-amber-200 
                    via-amber-300 to-amber-200 bg-clip-text text-transparent'>
                        {searchQuery ? `Search Results for "${searchQuery}"` : 'P-ZEL Menu'}
                    </span>
                    <span className='block text-xl sm:text-2xl md:text-3xl font-cinzel mt-4 text-amber-100/80'>
                        {searchQuery ? `Found ${displayItems.length} items` : 'Authentic Ghanaian flavors made fresh daily'}
                    </span>
                </h2>

                {!searchQuery && (
                    <div className='flex flex-wrap justify-center gap-4 mb-16'>
                        {categories.map(cat => (
                            <button key={cat} onClick={() => setActiveCategory(cat)}
                            className={`px-4 sm:px-6 py-2 rounded-full border-2 transition-all duration-300 transform font-cinzel text:sm 
                                sm:text-lg
                            tracking-widest backdrop-blur-sm ${activeCategory === cat ? 
                                'bg-gradient-to-r from-amber-900/80 to-amber-700/80 border-amber-800 scale-105 shadow-xl shadow-amber-900/30' 
                                : 'bg-amber-900/20 border-amber-800/30 text-amber-100/80 hover:bg-amber-800/40 hover:scale-95'}`}>
                                    {cat}
                            </button>
                        ))}
                    </div>
                )}

                {displayItems.length === 0 && searchQuery ? (
                    <div className="text-center py-20">
                        <div className="text-amber-400 text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-amber-100 mb-2">No items found</h3>
                        <p className="text-amber-100/70 mb-6">We couldn't find any items matching "{searchQuery}"</p>
                        <button 
                            onClick={() => window.location.href = '/menu'}
                            className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-2 rounded-full"
                        >
                            Browse All Menu
                        </button>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'>
                        {displayItems.map((item) => {
                            const cartEntry = getCartEntry(item._id);
                            const quantity = cartEntry?.quantity || 0;
                            
                            return (
                                <div key={item._id} className='relative bg-amber-900/20 rounded-2xl overflow-hidden border 
                                border-amber-800/30 backdrop-blur-sm flex flex-col transition-all duration-500 hover:scale-105 hover:shadow-xl 
                                hover:shadow-amber-900/30'>
                                    <div className='relative h-48 sm:h-56 md:h-60 flex items-center justify-center bg-black/10'>
                                        <img 
                                            src={item.imageUrl} 
                                            alt={item.name} 
                                            className='max-h-full max-w-full object-contain transition-all duration-700' 
                                        />
                                    </div>
                                    <div className='p-4 sm:p-6 flex flex-col flex-grow'>
                                        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent
                                        via-amber-800/50 to-transparent opacity-50 transition-all duration-300' />
                                        <h3 className='text-lg sm:text-xl mb-2 font-dancingscript text-amber-100 transition-colors'>
                                            {item.name}
                                        </h3>
                                        <p className='text-amber-100/80 text-xs sm:text-xs mb-3 font-cinzel leading-relaxed'>
                                            {item.description}
                                        </p>

                                        {item.options && (
                                            <div className='flex flex-wrap gap-2 mb-3'>
                                                {item.options.map(option => (
                                                    <span key={option} className='text-xs bg-amber-800/30 px-2 py-0.5 rounded-full 
                                                    text-amber-300'>
                                                        {option}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {item.eatIn && item.takeaway && (
                                            <div className='flex gap-3 mb-3 text-xs'>
                                                <span className='bg-amber-800/20 px-2 py-0.5 rounded text-amber-300 text-[11px]'>
                                                🍽️ Eat-in: {item.eatIn}</span>
                                                <span className='bg-amber-800/20 px-2 py-0.5 rounded text-amber-300 text-[11px]'>
                                                🛍️ Takeaway: {item.takeaway}</span>
                                            </div>
                                        )}

                                        <div className='mt-auto flex items-center gap-4 justify-between'>
                                            <div className='bg-amber-100/10 backdrop-blur-sm px-2 py-1 rounded-2xl shadow-lg'>
                                                <span className='text-base font-bold text-amber-300 font-dancingscript'>
                                                    LRD {item.priceLRD}
                                                </span>
                                                <span className='text-xs text-amber-400/70 ml-1'>
                                                    (${Number(item.priceUSD).toFixed(2)} USD)
                                                </span>
                                            </div>

                                            <div className='flex items-center gap-2'>
                                                {quantity > 0 ? (
                                                    <>
                                                        <button 
                                                            className='w-7 h-7 rounded-full bg-amber-900/40 flex items-center 
                                                            justify-center hover:bg-amber-800/50 transition-colors' 
                                                            onClick={() => {
                                                                if (quantity === 1) {
                                                                    removeFromCart(cartEntry._id);
                                                                } else {
                                                                    updateQuantity(cartEntry._id, quantity - 1);
                                                                }
                                                            }}
                                                        >
                                                            <FaMinus className='text-amber-100 text-xs' />
                                                        </button>
                                                        <span className='w-6 text-center text-amber-100 font-bold text-sm'>
                                                            {quantity}
                                                        </span>
                                                        <button 
                                                            className='w-7 h-7 rounded-full bg-amber-900/40 flex items-center 
                                                            justify-center hover:bg-amber-800/50 transition-colors' 
                                                            onClick={() => updateQuantity(cartEntry._id, quantity + 1)}
                                                        >
                                                            <FaPlus className='text-amber-100 text-xs' />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        onClick={() => addToCart(prepareCartItem(item), 1)} 
                                                        className='bg-amber-900/40 px-3 py-1 rounded-full font-cinzel text-[10px] 
                                                        uppercase sm:text-xs tracking-wider transition-transform duration-300 
                                                        hover:scale-110 hover:shadow-lg hover:shadow-amber-900/20 overflow-hidden 
                                                        border border-amber-800/50'
                                                    >
                                                        <span className='relative z-10 text-black'>
                                                            Add to Cart
                                                        </span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default OurMenu