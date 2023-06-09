import React from 'react';
import Reset from '../components/ForgotPassword/Reset';

const ResetPassword = () => {
    document.title = "Reset Password"
    return (
        <div>
            <Reset />
        </div>
    );
};

export default ResetPassword;
