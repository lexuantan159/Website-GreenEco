import React from 'react';
import { useLocation } from 'react-router';
import Sidebar from '../components/Dashboard/Sidebar';

const LayoutAdmin = ({ children }) => {
    const location = useLocation();
    return (
        <>
            {location.pathname.startsWith('/dashboard') && <Sidebar />}
            <div>{children}</div>
        </>
    );
};

export default LayoutAdmin;
