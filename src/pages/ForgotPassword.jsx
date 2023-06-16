import React from 'react';
import Forgot from '../components/ForgotPassword/Forgot';

const ForgotPassword = () => {
    document.title = 'Quên mật khẩu'
    return (
        <div>
            <Forgot />
        </div>
    );
};

export default ForgotPassword;
