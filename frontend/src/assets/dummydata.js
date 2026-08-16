import { FaShippingFast, FaLeaf, FaHeart } from 'react-icons/fa';
import { FaBolt, FaRegClock, FaCalendarCheck, FaFire } from 'react-icons/fa';
import { FaFacebook, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { FiUser, FiSmartphone, FiMail, FiHome } from 'react-icons/fi';
import { FaUtensils } from 'react-icons/fa';
import { GiChefToque, GiFoodTruck, GiFamilyHouse } from 'react-icons/gi';
import { FaSeedling, FaUsers, FaAward } from 'react-icons/fa';
import IA1 from './IA1.png';
import IA2 from './IA2.png';
import IA3 from './IA3.png';
import IA4 from './IA4.png';
import IA5 from './IA5.png';
import IA6 from './IA6.png';

import Fufu from "./Fufu.jpg";
import Banku from "./Banku.png";
import Banku2 from "./Banku-Tilapia.jpeg";
import RiceBalls from "./RiceBalls.jpg";
import GulabJamun from "./GulabJamun.png";
import MasalaDosa from "./MasalaDosa.png";
import PaneerTikka from "./PannerTikka.png";
import PalakPaneer from "./PalakPaneer.png";

import BannerImage from "./BannerImage.jpg";
import Image1 from "./Image1.jpg";
import Image2 from "./Image2.jpg";
import Image3 from "./Image3.jpg";
import Image4 from "./Image4.jpg";
import Video from "./Video.mp4";

// ABOUT PAGE - Icons only (no images needed)
export const features = [
    {
        id: 1,
        title: "Instant Delivery (Coming Soon)",
        text: "30-minute delivery guarantee in metro areas - launching soon with our own delivery fleet!",
        icon: FaShippingFast,
    },
    {
        id: 2,
        title: "Family Recipes",
        text: "Authentic Ghanaian recipes passed down through generations, made with love.",
        icon: GiFamilyHouse,
    },
    {
        id: 3,
        title: "Fresh Ingredients",
        text: "Locally sourced, fresh ingredients prepared daily for the best taste.",
        icon: FaSeedling,
    },
];

// Updated Stats for P-ZEL
export const stats = [
    {
        number: '98%',
        label: 'SATISFACTION',
        icon: FaHeart,
        gradient: 'from-rose-500 via-amber-500 to-yellow-500',
    },
    {
        number: '15+',
        label: 'YEARS OF SERVICE',
        icon: FaRegClock,
        gradient: 'from-emerald-500 via-amber-500 to-yellow-600',
    },
    {
        number: '24/7',
        label: 'SUPPORT',
        icon: FaRegClock,
        gradient: 'from-amber-500 via-orange-400 to-rose-500',
    },
    {
        number: '100%',
        label: 'AUTHENTIC',
        icon: FaLeaf,
        gradient: 'from-amber-500 via-orange-400 to-yellow-600',
    },
];

// Team Members (kept for reference but not used in About page)
export const teamMembers = [
    {
        name: "Marco Yansen",
        role: "Executive Chef",
        img: IA4,
        bio: "3 Michelin stars | Italian cuisine specialist",
        delay: 0.1,
        social: {
            twitter: "https://x.com/?lang=en",
            instagram: "https://www.instagram.com/",
            facebook: "https://www.facebook.com/",
            linkedin: "https://www.linkedin.com/",
        },
    },
    {
        name: "Amit Singh",
        role: "Pastry Chef",
        img: IA5,
        bio: "World Baking Champion | French desserts expert",
        delay: 0.3,
        social: {
            twitter: "https://x.com/?lang=en",
            instagram: "https://www.instagram.com/",
            facebook: "https://www.facebook.com/",
            linkedin: "https://www.linkedin.com/",
        },
    },
    {
        name: "Akash Trivedi",
        role: "Sushi Chef",
        img: IA6,
        bio: "5th generation sushi chef | Traditional techniques",
        delay: 0.5,
        social: {
            twitter: "https://x.com/?lang=en",
            instagram: "https://www.instagram.com/",
            facebook: "https://www.facebook.com/",
            linkedin: "https://www.linkedin.com/",
        },
    },
];

// ABOUT HOMEPAGE
export const aboutfeature = [
    { icon: FaBolt, title: "Easy Ordering", text: "Order your favorite meals quickly and conveniently anytime.", color: "from-amber-400 to-orange-500" },
    { icon: FaRegClock, title: "Open Daily", text: "Serving you fresh meals every day with consistent quality.", color: "from-rose-400 to-pink-600" },
    { icon: FaCalendarCheck, title: "Freshly Prepared", text: "Every dish is made fresh with authentic Ghanaian ingredients.", color: "from-emerald-400 to-cyan-600" },
    { icon: FaFire, title: "Popular Dishes", text: "Enjoy our most loved meals from jollof to fufu and more.", color: "from-purple-400 to-indigo-600" }
];

// SPECIAL MENU
export const cardData = [
    { id: 1, title: 'Fufu & Light Soup', rating: 4.5, hearts: 105, description: 'Pounded cassava served with spicy light soup and goat meat.', image: Fufu, popular: true, price: 'LRD40' },
    { id: 2, title: 'Banku & Okro Soup', rating: 5.0, hearts: 155, description: 'Fermented corn dough served with fresh okro soup.', image: Banku, bestseller: true, price: 'LRD140' },
    { id: 3, title: 'Light Soup & Rice Balls', rating: 4.2, hearts: 85, description: 'Spicy tomato-based soup with tender meat.', image: RiceBalls, price: 'LRD60' },
    { id: 4, title: 'Banku & Tilapia', rating: 4.8, hearts: 285, description: 'Banku served with spicy pepper and grilled tilapia.', image: Banku2, special: true, price: 'LRD200' },
];
export const additionalData = [
    { id: 5, title: 'Paneer Tikka', rating: 4.8, hearts: 210, description: 'Cottage cheese marinated in spices', image: PaneerTikka, popular: true, price: '₹220' },
    { id: 6, title: 'Masala Dosa', rating: 4.5, hearts: 165, description: 'Crispy rice crepe with potato filling', image: MasalaDosa, price: '₹180' },
    { id: 7, title: 'Palak Paneer', rating: 4.7, hearts: 190, description: 'Spinach curry with cottage cheese', image: PalakPaneer, price: '₹200' },
    { id: 8, title: 'Gulab Jamun', rating: 4.9, hearts: 275, description: 'Golden dumplings in rose syrup', image: GulabJamun, special: true, price: '₹30' },
];

// FOOTER 
export const socialIcons = [
    { icon: FaFacebook, link: 'https://www.facebook.com/share/1DjbwhdR4z/', color: '#3b5998', label: 'Facebook' },
    { icon: FaInstagram, link: 'https://www.instagram.com/hexagondigitalservices?igsh=MW1nanQ2eXIycnRkZQ==', color: '#E1306C', label: 'Instagram' },
];

// LOGIN 
export const inputBase = "w-full rounded-lg bg-[#2D1B0E] text-amber-100 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-600";
export const iconClass = "absolute top-1/2 transform -translate-y-1/2 left-3 text-amber-400";

// CONTACT
export const contactFormFields = [
    { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Enter your full name', Icon: FiUser },
    { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '+231 77 123 4567', pattern: "[+]{0,1}[0-9]{10,13}", Icon: FiSmartphone },
    { label: 'Email Address', name: 'email', type: 'email', placeholder: 'your.email@example.com', Icon: FiMail },
    { label: 'Address', name: 'address', type: 'text', placeholder: 'Enter your delivery address', Icon: FiHome },
    { label: 'Dish Name (optional)', name: 'dish', type: 'text', placeholder: 'Enter dish name (e.g., Fufu, Banku)', Icon: FaUtensils },
];

// BANNER
export const bannerAssets = {
    bannerImage: BannerImage,
    orbitImages: [Image1, Image2, Image3, Image4],
    video: Video,
};

// ABOUT PAGE - VALUES SECTION
export const ourValues = [
    {
        id: 1,
        title: "Authenticity",
        description: "We stay true to traditional Ghanaian recipes and cooking methods.",
        icon: FaHeart
    },
    {
        id: 2,
        title: "Family First",
        description: "Every customer is treated like family. Warmth and hospitality always.",
        icon: FaUsers
    },
    {
        id: 3,
        title: "Quality",
        description: "Only the freshest ingredients make it into our kitchen.",
        icon: FaAward
    }
];

// ABOUT PAGE - CUSTOMER REVIEWS
export const customerReviews = [
    {
        id: 1,
        name: "John K.",
        review: "The best fufu and light soup in town! The flavors are absolutely authentic. My family loves coming here every Sunday.",
        rating: 5,
        location: "Monrovia"
    },
    {
        id: 2,
        name: "Sarah W.",
        review: "Finally found a place that tastes like home. The banku with tilapia is my go-to dish. Highly recommended!",
        rating: 5,
        location: "Paynesville"
    },
    {
        id: 3,
        name: "Michael T.",
        review: "Great atmosphere, friendly service, and delicious food. The jollof rice is simply amazing!",
        rating: 4,
        location: "Sinkor"
    }
];