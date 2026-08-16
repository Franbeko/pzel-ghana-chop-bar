import React, { useState, useEffect } from 'react'
import { FaArrowRight, FaCheckCircle, FaEye, FaEyeSlash, FaLock, FaUser, FaUserPlus } from 'react-icons/fa';
import { iconClass, inputBase } from '../../assets/dummydata';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const url = 'http://localhost:4000'

const Login = ({ onLoginSuccess, onClose, isOpen }) => {

    const [showToast, setShowToast] = useState({ visible: false, message: '', isError: false });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Clear stale auth data when modal opens
    useEffect(() => {
        if (isOpen) {
            // Clear any stale auth data when login modal opens
            // This ensures admin logout works properly
            const token = localStorage.getItem('authToken');
            const isAdmin = localStorage.getItem('isAdmin');
            
            // If there's stale admin data but no valid session, clear it
            if (isAdmin === 'true' && !token) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('isAdmin');
                localStorage.removeItem('user');
                localStorage.removeItem('loginData');
            }
        }
    }, [isOpen]);

    const [formData, setFormData] = useState(() => {
        const stored = localStorage.getItem('loginData');
        return stored ? JSON.parse(stored) : { username: '', password: '', rememberMe: false };
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await axios.post(`${url}/api/user/login`, {
                username: formData.username,
                email: formData.username,
                password: formData.password,
            });
            
            console.log('Axios Res:', res);

            if (res.status === 200 && res.data.success && res.data.token) {
                localStorage.setItem('authToken', res.data.token);
                localStorage.setItem('isAdmin', res.data.isAdmin || false);

                if (res.data.user) {
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                }

                if (formData.rememberMe) {
                    localStorage.setItem('loginData', JSON.stringify(formData));
                } else {
                    localStorage.removeItem('loginData');
                }

                setShowToast({ visible: true, message: 'Login Successful!', isError: false });
                
                setTimeout(() => {
                    setShowToast({ visible: false, message: '', isError: false });
                    
                    if (res.data.isAdmin) {
                        window.location.href = 'http://localhost:5174';
                    } else {
                        if (onLoginSuccess) {
                            onLoginSuccess(res.data.token);
                        }
                        if (onClose) {
                            onClose();
                        }
                        navigate('/');
                    }
                }, 1500);
            } else {
                console.warn('Unexpected Err:', res.data);
                throw new Error(res.data.message || 'Login failed');
            }
        } catch (err) {
            console.error('Axios error:', err);
            if (err.response) {
                console.error('Server res:', err.response.status, err.response.data);
            }
            const msg = err.response?.data?.message || err.message || 'Failed to login';
            setShowToast({ visible: true, message: msg, isError: true });
            setTimeout(() => {
                setShowToast({ visible: false, message: '', isError: false });
            }, 2000);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = ({ target: { name, value, type, checked } }) =>
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));

    const toggleShowPassword = () => setShowPassword(prev => !prev);

    return (
        <div className='space-y-6 relative'>
            <div className={`fixed top-4 right-4 z-50 transition-all duration-300 
            ${showToast.visible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
                <div className={`px-4 py-3 rounded-md shadow-lg flex items-center gap-2 text-sm ${showToast.isError ? 'bg-red-600' : 'bg-green-600'} text-white`}>
                    <FaCheckCircle className='flex-shrink-0' />
                    <span>{showToast.message}</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='relative'>
                    <FaUser className={iconClass} />
                    <input 
                        type="text" 
                        name='username' 
                        placeholder='Username or Email' 
                        value={formData.username} 
                        onChange={handleChange} 
                        className={`${inputBase} pl-10 pr-4 py-3`} 
                        required
                    />
                </div>
                <div className='relative'>
                    <FaLock className={iconClass} />
                    <input 
                        type={showPassword ? 'text' : 'password'} 
                        name='password' 
                        placeholder='Password' 
                        value={formData.password} 
                        onChange={handleChange} 
                        className={`${inputBase} pl-10 pr-10 py-3`} 
                        required
                    />
                    <button type='button' onClick={toggleShowPassword} className='absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400'>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                <div className='flex items-center'>
                    <label className='flex items-center'>
                        <input 
                            type="checkbox" 
                            name='rememberMe' 
                            checked={formData.rememberMe} 
                            onChange={handleChange} 
                            className='form-checkbox h-5 w-5 text-amber-600 bg-[#2D1B0E] border-amber-400 rounded focus:ring-amber-600' 
                        />
                        <span className='ml-2 text-amber-100'>Remember Me</span>
                    </label>
                </div>

                <button 
                    type='submit' 
                    disabled={isLoading}
                    className='w-full py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-[#2D1B0E] font-bold rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    {isLoading ? 'Signing In...' : 'Sign In'} <FaArrowRight />
                </button>
            </form>

            <div className='text-center'>
                <Link to={'/signup'} onClick={onClose} className='inline-flex items-center gap-2 text-amber-400 hover:text-amber-600 transition-colors'>
                    <FaUserPlus /> Create New Account
                </Link>
            </div>
        </div>
    )
}

export default Login