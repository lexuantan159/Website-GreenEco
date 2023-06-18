import React, { useContext } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Dashboard/Sidebar';
import AuthContext from '../context/authProvider';

const LayoutAdmin = ({ children }) => {
    const location = useLocation();
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <>
            {location.pathname.startsWith('/dashboard') ? (
                <div className="flex gap-64 min-h-screen">
                    <Sidebar />
                    {!auth.accessToken || auth.role !== 'Admin' ? navigate('/') : children}
                </div>
            ) : (
                children
            )}
        </>
    );
};

export default LayoutAdmin;
