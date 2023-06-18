import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const DashboardAdmin = () => {
    document.title = 'Dashboard';
    const navigate = useNavigate();
    const location = useLocation();
    const notify = (message) => {
        return toast.success(message, {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    };

    useEffect(() => {
        if (location.state?.toastMessage !== '') {
            notify(location.state?.toastMessage);
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, []);
    return (
        <>
            <ToastContainer />
            <div className="w-full min-h-screen font-sans text-gray-900 bg-gray-50 flex">
                <h3 className="m-auto text-5xl font-extrabold animate-bounce">
                    Welcome to dashboard <span className="text-primaryColor">GREEN ECO</span>
                </h3>
            </div>
        </>
    );
};

export default DashboardAdmin;
