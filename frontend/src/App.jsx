import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home/Home'
import ContactPage from './pages/ContactPage/ContactPage'
import AboutPage from './pages/AboutPage/AboutPage'
import Menu from './pages/Menu/Menu'
import Cart from './pages/Cart/Cart'
import SignUp from './components/SignUp/SignUp'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import CheckoutPage from './pages/CheckoutPage/CheckoutPage'
import MyOrderPage from './pages/MyOrderPage/MyOrderPage'

// Component to handle auth clearing when coming from admin logout
const AppContent = () => {
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('clearAuth') === 'true') {
            // Clear all auth data from localStorage
            localStorage.removeItem('authToken');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('user');
            localStorage.removeItem('loginData');
            
            // Remove the parameter from URL without refreshing
            window.history.replaceState({}, document.title, window.location.pathname);
            
            // Reload the page to refresh the navbar state
            window.location.reload();
        }
    }, [location]);

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/login' element={<Home />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/cart' element={<PrivateRoute><Cart /></PrivateRoute>} />
            <Route path='/checkout' element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
            <Route path='/myorder' element={<PrivateRoute><MyOrderPage /></PrivateRoute>} />
        </Routes>
    );
};

const App = () => {
    return <AppContent />;
}

export default App