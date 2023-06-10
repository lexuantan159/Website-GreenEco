import React, { useContext, useState, useEffect } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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

        if (oldPassword !== newPassword) {
            setErrorMessage('The old password was entered incorrectly. Please try again');
            return;
        } else if (oldPassword === newPassword) {
            setErrorMessage('The old password and the new password are the same');
            return;
        } else if (newPassword !== confirmPassword) {
            setErrorMessage('New password and confirm password do not match. Please try again.');
            return;
        } else {
            const response = await updateUserPassword(auth.accessToken, oldPassword, newPassword);
            if (response.statusCode === 200) {
                setErrorMessage(response.message);
            } else {
                setErrorMessage(response.errorMessage);
            }
        }
    };
    return (
        <form>
            <div className="flex flex-col ">
                <label className="font-medium text-left text-lg mb-2 " htmlFor="">
                    Old Password
                </label>
                <div className="relative">
                    <input
                        id="passwordInput"
                        className="w-11/12 px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                        type={hiddenPass ? 'password' : 'text'}
                        required
                        placeholder="Input Old PassWord"
                        onChange={(event) => setOldPassword(event.target.value)}
                        value={oldPassword}
                    />
                    {hiddenPass ? (
                        <FontAwesomeIcon
                            onClick={handleHiddenPassword}
                            className="absolute top-5 right-14"
                            icon={faEyeSlash}
                        />
                    ) : (
                        <FontAwesomeIcon
                            onClick={handleHiddenPassword}
                            className="absolute top-5 right-14"
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
                        className="w-11/12 px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                        type={hiddenPass ? 'password' : 'text'}
                        required
                        placeholder="Input New PassWord"
                        onChange={(event) => setNewPassword(event.target.value)}
                        value={newPassword}
                    />
                    {hiddenPass ? (
                        <FontAwesomeIcon
                            onClick={handleHiddenPassword}
                            className="absolute top-5 right-14"
                            icon={faEyeSlash}
                        />
                    ) : (
                        <FontAwesomeIcon
                            onClick={handleHiddenPassword}
                            className="absolute top-5 right-14"
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
                        className="w-11/12 px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                        type={hiddenPass ? 'password' : 'text'}
                        required
                        placeholder="Input Confirm PassWord"
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        value={confirmPassword}
                    />
                    {hiddenPass ? (
                        <FontAwesomeIcon
                            onClick={handleHiddenPassword}
                            className="absolute top-5 right-14"
                            icon={faEyeSlash}
                        />
                    ) : (
                        <FontAwesomeIcon
                            onClick={handleHiddenPassword}
                            className="absolute top-5 right-14"
                            icon={faEye}
                        />
                    )}
                </div>
            </div>
            {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
            <button
                className="border px-4 py-2 ml-96 rounded-lg bg-primaryColor text-white mt-4 "
                type="submit"
                onClick={handleChangePassword}
            >
                Change Password
            </button>
        </form>
    );
};

export default ChangePassword;
