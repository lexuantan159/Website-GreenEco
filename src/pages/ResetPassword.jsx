import React from 'react';
import Reset from '../components/ForgotPassword/Reset';

const ResetPassword = () => {
    document.title = "Đặt lại mật khẩu"
    return (
        <div>
            <Reset />
        </div>
    );
};

export default ResetPassword;
