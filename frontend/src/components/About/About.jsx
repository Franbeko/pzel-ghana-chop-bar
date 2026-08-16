import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { features, stats, ourValues, customerReviews } from '../../assets/dummydata'
import { FaQuoteLeft, FaStar } from 'react-icons/fa6';

const About = () => {

    const [hoveredStat, setHoveredStat] = useState(null);

    return (
        <div className='min-h-screen bg-gradient-to-br from-[#1a120b] via-[#3c2a21] to-[#1a120b] text-amber-50 overflow-hidden relative'>
            <div className='absolute inset-0 opacity-10 mix-blend-soft-light' />
            
            {/* Hero Section */}
            <motion.section 
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6 }}
                className='py-16 px-4 text-center relative'
            >
                <div className='max-w-4xl mx-auto'>
                    <motion.h1 
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className='text-5xl sm:text-6xl md:text-7xl font-bold mb-4 font-serif bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-yellow-600'
                    >
                        About P-ZEL
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ delay: 0.3 }}
                        className='text-lg sm:text-xl text-amber-100/80 leading-relaxed max-w-3xl mx-auto'
                    >
                        P-ZEL Ghana Chop Bar was founded with a simple mission: to bring authentic, homemade Ghanaian flavors to our community.
                        What started as a small family kitchen has grown into a beloved spot where families gather, friends meet,
                        and everyone leaves with full hearts and happy taste buds. Every dish is prepared with love, using traditional recipes
                        passed down through generations. From our family to yours, we invite you to taste the true warmth and hospitality of Ghana.
                    </motion.p>
                </div>
            </motion.section>

            {/* Features Section - Icons only, no images */}
            <section className='py-12 px-4 md:px-8 relative'>
                <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12'>
                    {features.map((f, i) => {
                        const Icon = f.icon;
                        return (
                            <motion.div 
                                key={f.id} 
                                initial={{ opacity: 0, y: 30 }} 
                                whileInView={{ opacity: 1, y: 0 }} 
                                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                                transition={{ delay: i * 0.2 }} 
                                className='relative group'
                            >
                                <div className='absolute -inset-1 bg-gradient-to-br from-amber-600/30 to-amber-500/30 rounded-xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500' />

                                <div className='relative bg-[#3c2a21]/90 backdrop-blur-lg rounded-3xl overflow-hidden border border-amber-600/30 hover:border-amber-500 transition-all duration-300 h-full p-8 text-center'>
                                    <motion.div 
                                        className='text-amber-500 mb-6 inline-block' 
                                        whileHover={{ rotate: 15, scale: 1.1 }}
                                    >
                                        <Icon className='w-16 h-16 text-amber-500 mx-auto' />
                                    </motion.div>
                                    <h3 className='text-2xl font-bold mb-3 text-amber-100'>{f.title}</h3>
                                    <p className='text-amber-100/80'>{f.text}</p>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </section>

            {/* Stats Section - Uses updated dummydata */}
            <section className='py-16 px-4 md:px-8 bg-gradient-to-br from-[#1a120b] to-[#3c2a21]/90'>
                <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
                    {stats.map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <motion.div
                                key={s.label}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2, type: 'spring' }}
                                className='relative group h-48'
                                onHoverStart={() => setHoveredStat(i)}
                                onHoverEnd={() => setHoveredStat(null)}
                                animate={{
                                    scale: hoveredStat === i ? 1.05 : 1,
                                    zIndex: hoveredStat === i ? 10 : 1
                                }}
                            >
                                <motion.div
                                    className='absolute inset-0'
                                    animate={{
                                        y: [0, -15, 0],
                                        transition: {
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: i * 0.3
                                        }
                                    }}
                                >
                                    <div className='relative h-full bg-[#3c2a21]/40 backdrop-blur-lg rounded-xl border-2 border-amber-600/30 p-6 overflow-hidden transition-all duration-300'>
                                        <div className='relative z-10 h-full flex flex-col items-center justify-center'>
                                            <motion.div 
                                                className='mb-4 p-3 rounded-full bg-amber-900/30 border border-amber-700/30'
                                                whileHover={{ scale: 1.1, rotate: 10 }}
                                            >
                                                <Icon className='w-8 h-8 text-amber-500/90' />
                                            </motion.div>

                                            <div className='text-4xl font-bold mb-1 bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400 text-transparent'>
                                                {s.number}
                                            </div>
                                            <motion.div
                                                className='text-sm uppercase tracking-widest font-medium text-amber-100/80'
                                                animate={{
                                                    letterSpacing: hoveredStat === i ? '0.15em' : '0.1em',
                                                    textShadow: hoveredStat === i ? '0 0 8px rgba(245, 158, 11, 0.4)' : 'none'
                                                }}
                                            >
                                                {s.label}
                                            </motion.div>
                                        </div>
                                        <motion.div
                                            className='absolute inset-0 bg-amber-900/10 rounded-xl'
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: hoveredStat === i ? 1 : 0 }}
                                        />
                                    </div>
                                </motion.div>
                                <motion.div
                                    className='absolute inset-x-4 bottom-0 h-8 bg-amber-900/30 blur-xl rounded-xl'
                                    animate={{ opacity: hoveredStat === i ? 0.4 : 0.2, scale: hoveredStat === i ? 0.9 : 0.8 }}
                                />
                            </motion.div>
                        )
                    })}
                </div>
            </section>

            {/* Our Values Section - Data from dummydata */}
            <section className='py-16 px-4 md:px-8 bg-gradient-to-br from-[#1a120b] to-[#3c2a21]/50'>
                <div className='max-w-7xl mx-auto'>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        className='text-4xl font-serif sm:text-5xl md:text-6xl font-bold text-center mb-12 text-amber-100'
                    >
                        Our <span className='text-amber-500'>Values</span>
                    </motion.h2>
                    
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        {ourValues.map((value, i) => {
                            const Icon = value.icon;
                            return (
                                <motion.div
                                    key={value.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.2 }}
                                    className='text-center p-8 bg-[#3c2a21]/30 rounded-2xl border border-amber-600/20 hover:border-amber-500 transition-all duration-300 hover:scale-105'
                                >
                                    <div className='inline-block p-4 bg-amber-500/20 rounded-full mb-4'>
                                        <Icon className='w-10 h-10 text-amber-500' />
                                    </div>
                                    <h3 className='text-2xl font-bold mb-3 text-amber-100'>{value.title}</h3>
                                    <p className='text-amber-100/70'>{value.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Customer Reviews Section - Data from dummydata */}
            <section className='py-16 px-4 md:px-8 relative'>
                <div className='max-w-7xl mx-auto'>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        className='text-4xl font-serif sm:text-5xl md:text-6xl font-bold text-center mb-12 text-amber-100'
                    >
                        What Our <span className='text-amber-500'>Customers Say</span>
                    </motion.h2>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        {customerReviews.map((review, i) => (
                            <motion.div
                                key={review.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className='bg-[#3c2a21]/40 backdrop-blur-lg rounded-2xl p-6 border border-amber-600/20 hover:border-amber-500 transition-all duration-300'
                            >
                                <FaQuoteLeft className='text-amber-500 text-3xl mb-4 opacity-50' />
                                <p className='text-amber-100/80 italic mb-4'>"{review.review}"</p>
                                <div className='flex items-center gap-1 mb-2'>
                                    {[...Array(5)].map((_, index) => (
                                        <FaStar 
                                            key={index} 
                                            className={index < review.rating ? 'text-amber-500' : 'text-amber-700'} 
                                            size={16}
                                        />
                                    ))}
                                </div>
                                <h4 className='text-amber-100 font-bold'>{review.name}</h4>
                                <p className='text-amber-400 text-sm'>{review.location}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About