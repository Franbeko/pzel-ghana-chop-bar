import React, { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

const FloatingWhatsApp = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')

    const openWhatsApp = () => {
        const whatsappMessage = `Hello P-ZEL Ghana Chop Bar! I need help with my order.${name ? ` My name is ${name}.` : ''}
${message ? `\n\nMessage: ${message}` : ''}`;
        
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappNumber = '231776005247';
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
        setIsOpen(false);
        setName('');
        setMessage('');
    }

    return (
        <>
            {/* Floating WhatsApp Button */}
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full 
                shadow-lg transition-all duration-300 hover:scale-110 group cursor-pointer"
            >
                <FaWhatsapp className="text-2xl" />
                <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-sm px-2 py-1 
                rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Chat with us
                </span>
            </button>

            {/* WhatsApp Modal */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" 
                    onClick={() => setIsOpen(false)}
                >
                    <div 
                        className="bg-gradient-to-br from-[#2D1B0E] to-[#4a372a] rounded-2xl max-w-md w-full border-2 
                        border-amber-500/30 shadow-2xl" 
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                                        <FaWhatsapp className="text-green-500 text-2xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-amber-100">Start WhatsApp Chat</h3>
                                        <p className="text-amber-400/70 text-sm">You will be taken to WhatsApp</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="text-amber-400 hover:text-amber-300 transition-colors"
                                >
                                    <FiX className="text-2xl" />
                                </button>
                            </div>

                            {/* Quick Help Topics */}
                            <div className="mb-4">
                                <p className="text-amber-400 text-sm mb-2">Quick Help Topics:</p>
                                <div className="flex flex-wrap gap-2">
                                    {['Order Status', 'Menu Questions', 'Delivery Info', 'Payment Issues', 'Special Requests']
                                    .map((topic) => (
                                        <button
                                            key={topic}
                                            type="button"
                                            onClick={() => setMessage(`I need help with: ${topic}`)}
                                            className="text-xs bg-amber-900/30 hover:bg-amber-800/50 text-amber-300 px-2 py-1 
                                            rounded-full transition-colors"
                                        >
                                            {topic}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Name Input */}
                            <div className="mb-4">
                                <label className="block text-amber-300 text-sm mb-1">Your Name (optional)</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                    className="w-full px-4 py-2 rounded-lg bg-amber-900/30 border border-amber-600/30 
                                    text-amber-100 placeholder-amber-400 focus:outline-none focus:border-amber-500"
                                />
                            </div>

                            {/* Message Input */}
                            <div className="mb-4">
                                <label className="block text-amber-300 text-sm mb-1">Your Message</label>
                                <textarea
                                    rows="3"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type your message here..."
                                    className="w-full px-4 py-2 rounded-lg bg-amber-900/30 border border-amber-600/30 
                                    text-amber-100 placeholder-amber-400 focus:outline-none focus:border-amber-500"
                                />
                            </div>

                            {/* Message Preview */}
                            <div className="bg-amber-900/30 rounded-xl p-4 mb-4">
                                <p className="text-amber-400 text-sm mb-2">Message preview:</p>
                                <div className="bg-green-600/20 rounded-lg p-3 border border-green-500/30">
                                    <p className="text-amber-100 text-sm italic">
                                        Hello P-ZEL Ghana Chop Bar! I need help with my order.
                                        {name && ` My name is ${name}.`}
                                        {message && `\n\nMessage: ${message.substring(0, 100)}${message.length > 100 ? '...' : ''}`}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="flex-1 px-4 py-2 rounded-lg border border-amber-500/30 text-amber-300 
                                    hover:bg-amber-800/30 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={openWhatsApp}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg 
                                    transition-colors flex items-center justify-center gap-2"
                                >
                                    <FaWhatsapp className="text-lg" />
                                    Open WhatsApp
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default FloatingWhatsApp