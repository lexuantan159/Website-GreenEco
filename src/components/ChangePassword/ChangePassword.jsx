import React, { useContext, useState,useEffect } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';

import AuthContext from '../../context/authProvider';
import { updateUserPassword } from '../../services/userServices';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hiddenPass, setHiddenPass] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const { auth } = useContext(AuthContext);

    const handleHiddenPassword = () => {
        setHiddenPass(!hiddenPass);
    };

    const handleChangePassword = async (event) => {
        event.preventDefault(); // Ngăn chặn trình duyệt tải lại trang
    
        if (oldPassword === '' || newPassword === '' || confirmPassword === '') {
            setErrorMessage('Please fill in all fields');
            return;
        } else if (oldPassword !== auth.password) {
            setErrorMessage('The old password was entered incorrectly. Please try again');
            return;
        } else if (newPassword !== confirmPassword) {
            setErrorMessage('New password and confirm password do not match. Please try again.');
            return;
        } else {
            try {
                const response = await updateUserPassword(auth.accessToken, oldPassword, newPassword);
    
                if (response.statusCode === 200) {
                    toast.success(response.message);
                    // Perform any additional actions on success
                    console.log(oldPassword);
                    console.log(newPassword);
                } else {
                    setErrorMessage(response.error.message);
                    // Perform any additional actions on error
                }
            } catch (error) {
                setErrorMessage('An error occurred. Please try again.');
                // Perform any additional error handling
            }
        }
    };
    useEffect(() => {
        console.log(auth.accessToken);
      }, []);

    return (
        <form>
            <div className="flex flex-col ">
                <label className="font-medium text-left text-lg mb-2 " htmlFor="">
                    Old Password
                </label>
                <div className="relative">
                    <input
                        id="passwordInput"
                        className="w-full px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                        type={hiddenPass ? 'password' : 'text'}
                        required
                        placeholder="Input Old PassWord"
                        onChange={(event) => setOldPassword(event.target.value)}
                        value={oldPassword} 
                    />
                    {hiddenPass ? (
                        <FontAwesomeIcon
                            onClick={handleHiddenPassword}
                            className="absolute top-5 right-6"
                            icon={faEyeSlash}
                        />
                    ) : (
                        <FontAwesomeIcon
                            onClick={handleHiddenPassword}
                            className="absolute top-5 right-6"
                            icon={faEye}
                        />
                    )}
                </div>

                <label className="font-medium text-left text-lg mt-4 mb-2 " htmlFor="">
                    New Password
                </label>
                <div className="relative">
                    <input
                        id="passwordInput"
                        className="w-full px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                        type={hiddenPass ? 'password' : 'text'}
                        required
                        placeholder="Input New PassWord"
                        onChange={(event) => setNewPassword(event.target.value)}
                        value={newPassword}
                    />
                    {hiddenPass ? (
                        <FontAwesomeIcon
                            onClick={handleHiddenPassword}
                            className="absolute top-5 right-6"
                            icon={faEyeSlash}
                        />
                    ) : (
                        <FontAwesomeIcon
                            onClick={handleHiddenPassword}
                            className="absolute top-5 right-6"
                            icon={faEye}
                        />
                    )}
                </div>

                <label className="font-medium text-left text-lg mt-4 mb-2 " htmlFor="">
                    Confirm Password
                </label>
                <div className="relative">
                    <input
                        id="passwordInput"
                        className="w-full px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                        type={hiddenPass ? 'password' : 'text'}
                        required
                        placeholder="Input Confirm PassWord"
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        value={confirmPassword}
                    />
                    {hiddenPass ? (
                        <FontAwesomeIcon
                            onClick={handleHiddenPassword}
                            className="absolute top-5 right-6"
                            icon={faEyeSlash}
                        />
                    ) : (
                        <FontAwesomeIcon
                            onClick={handleHiddenPassword}
                            className="absolute top-5 right-6"
                            icon={faEye}
                        />
                    )}
                </div>
            </div>
            {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
            <button
                className="border p-3 ml-96 rounded-lg bg-primaryColor text-white mt-4 "
                type="submit"
                onClick={handleChangePassword}
            >
                Change Password
            </button>
        </form>
    );
};
export default ChangePassword;
