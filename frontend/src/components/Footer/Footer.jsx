import React, { useState } from 'react'
import { FaRegEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa'
import { BiChevronRight } from 'react-icons/bi'
import { socialIcons } from '../../assets/dummydata'

const navItems = [
    { name: 'Home', link: '/' },
    { name: 'Menu', link: '/menu' },
    { name: 'About', link: '/about' },
    { name: 'Contact', link: '/contact' },
];

const Footer = () => {

    const [email, setEmail] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Thanks for subscribing! We'll send updates to ${email}`);
        setEmail('');
    }

    return (
        <footer className='bg-[#2A211C] text-amber-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
            <div className='max-w-7xl mx-auto relative z-10'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
                    {/* Left Column - Brand & Newsletter */}
                    <div className='space-y-6'>
                        <h2 className='text-4xl sm:text-5xl md:text-5xl font-bold font-sacramento text-amber-400 animate-pulse'>
                            P-Zel Ghana Chop Bar
                        </h2>
                        <p className='text-amber-200/90 text-sm font-sacramento italic'>
                            Serving authentic Ghanaian flavors made fresh daily. From our family to yours,
                            we bring you the true taste of Ghana with love, care, and tradition delicious meals await you!
                        </p>

                        <form onSubmit={handleSubmit} className='relative mt-4 group'>
                            <div className='flex items-center gap-2 mb-2'>
                                <FaRegEnvelope className='text-amber-400 animate-pulse' />
                                <span className='font-bold text-amber-400'>Get Exclusive Offers</span>
                            </div>

                            <div className='relative'>
                                <input 
                                    type="email" 
                                    placeholder='Enter your email...' 
                                    value={email} 
                                    onChange={e => setEmail(e.target.value)}
                                    className='w-full px-4 py-2.5 rounded-lg bg-amber-50/5 border-2 border-amber-400/30 focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all duration-300 placeholder-amber-200/50'
                                    required 
                                />
                                <button 
                                    type='submit' 
                                    className='absolute right-1 top-1 bg-gradient-to-br from-amber-300 via-amber-500 to-amber-600 text-white px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg hover:shadow-amber-400/30 overflow-hidden transition-all duration-500 group'
                                >
                                    <span className='font-bold text-sm tracking-wide transition-transform duration-300 group-hover:-translate-x-1'>
                                        Join Now
                                    </span>
                                    <BiChevronRight className='text-xl transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0' />
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Column 2 - Quick Links */}
                    <div className='flex justify-center'>
                        <div className='space-y-4'>
                            <h3 className='text-xl font-semibold mb-4 border-l-4 border-amber-400 pl-3 font-merriweather italic text-amber-300'>
                                Quick Links
                            </h3>
                            <ul className='space-y-3'>
                                {navItems.map(item => (
                                    <li key={item.name}>
                                        <a href={item.link} className='flex items-center hover:text-amber-400 transition-all group font-lora hover:pl-2'>
                                            <BiChevronRight className='mr-2 text-amber-400 group-hover:animate-bounce' />
                                            <span className='hover:italic'>{item.name}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Column 3 - Business Hours & Contact */}
                    <div className='space-y-4'>
                        <h3 className='text-xl font-semibold mb-4 border-l-4 border-amber-400 pl-3 font-merriweather italic text-amber-300'>
                            Hours & Info
                        </h3>
                        <div className='space-y-3'>
                            <div className='flex items-start gap-3'>
                                <FaClock className='text-amber-400 mt-1 flex-shrink-0' />
                                <div className='text-amber-200/80 text-sm'>
                                    <p>Monday - Saturday: 9am - 12am</p>
                                    <p>Sunday: 9am - 12am</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-3'>
                                <FaMapMarkerAlt className='text-amber-400 flex-shrink-0' />
                                <span className='text-amber-200/80 text-sm'>SKD Boulevard, Paynesville, Monrovia, Liberia</span>
                            </div>
                            <div className='flex items-center gap-3'>
                                <FaPhone className='text-amber-400 flex-shrink-0' />
                                <span className='text-amber-200/80 text-sm'>+231 775 121 332</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 4 - Social Connect */}
                    <div className='flex justify-center md:justify-end'>
                        <div className='space-y-4'>
                            <h3 className='text-xl font-semibold mb-4 border-l-4 border-amber-400 pl-3 font-merriweather italic text-amber-300'>
                                Social Connect
                            </h3>
                            <div className='flex space-x-4'>
                                {socialIcons.map((social, idx) => {
                                    const Icon = social.icon;
                                    return (
                                        <a 
                                            target='_blank' 
                                            href={social.link} 
                                            key={idx} 
                                            className='text-2xl bg-amber-400/10 p-3 rounded-full hover:bg-amber-400/20 hover:scale-110 transition-all duration-300 relative group'
                                            style={{ color: social.color }}
                                            rel='noopener noreferrer'
                                        >
                                            <Icon className='hover:scale-125 transition-transform' />
                                            <span className='absolute -bottom-8 left-1/2 -translate-x-1/2 bg-amber-400 text-black px-2 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap'>
                                                {social.label}
                                            </span>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className='border-t border-amber-800 pt-8 mt-8 text-center'>
                    <p className='text-amber-400 text-lg mb-2 font-playfair'>
                        &copy; 2026 P-ZEL Ghana Chop Bar. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer