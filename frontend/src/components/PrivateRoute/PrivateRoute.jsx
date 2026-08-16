import React from "react";
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children, requireAdmin = false }) => {
    const isAuthenticated = Boolean(localStorage.getItem('authToken'));
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    
    if (!isAuthenticated) {
        return <Navigate to='/login' replace />;
    }
    
    if (requireAdmin && !isAdmin) {
        return <Navigate to='/' replace />;
    }
    
    return children;
}

export default PrivateRoute;