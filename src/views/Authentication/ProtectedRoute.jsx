import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

export default function ProtectedRoute() {
    const isAuthenticated=() => {
        const token= localStorage.getItem('jwtToken');
        return !!token;
    };
    const authenticated = isAuthenticated();
    return authenticated? <Outlet />: <Navigate to='/'/>;
}