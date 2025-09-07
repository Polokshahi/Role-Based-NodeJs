import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        // Show loading indicator while auth state is being checked
        return <span className="loading loading-dots loading-lg"></span>;
    }

    if (!user?.email) {
        // Redirect to login if not logged in
        return <Navigate to="/login" state={{from : location}} replace />;
    }

    // Render child components if user is logged in
    return children;
};

export default PrivateRoute;
