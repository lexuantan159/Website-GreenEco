import React, { useContext, useState } from 'react';
import AuthContext from '../../context/authProvider';
import { ToastContainer, toast } from 'react-toastify';
import * as userServices from '../../services/userServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { Spinner } from '@material-tailwind/react';

const UserInfomation = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reNewPassword, setReNewPassword] = useState('');
    const [stateChange, setStateChange] = useState('None');
    const [hiddenOldPassword, setHiddenOldPassword] = useState(true);
    const [hiddenNewPassword, setHiddenNewPassword] = useState(true);
    const [hiddenReNewPassword, setHiddenReNewPassword] = useState(true);
    const [loading, setLoading] = useState(false);

    const inputFullName = document.querySelector('#input-fullName');
    const inputPhoneNumber = document.querySelector('#input-phoneNumber');
    const inputEmail = document.querySelector('#input-email');
    const inputAddress = document.querySelector('#input-address');
    const inputOldPassword = document.querySelector('#input-oldPassword');
    const inputNewPassword = document.querySelector('#input-newPassword');
    const inputReNewPassword = document.querySelector('#input-reNewPassword');

    const notify = (message, type) => {
        const toastType = type === 'success' ? toast.success : toast.error;
        return toastType(message, {
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    };

    const handleEditInformation = () => {
        // disable password change
        inputOldPassword.disabled = true;
        inputNewPassword.disabled = true;
        inputReNewPassword.disabled = true;
        inputFullName.disabled = false;
        inputPhoneNumber.disabled = false;
        inputEmail.disabled = false;
        inputAddress.disabled = false;
        // set input value
        setName(auth.fullName);
        setPhoneNumber(auth.phoneNumber);
        setEmail(auth.email);
        setAddress(auth.address);
        setOldPassword('');
        setNewPassword('');
        setReNewPassword('');
        // focus on the first
        document.querySelector('#input-fullName').focus();
        setStateChange('Info');
    };

    const handleEditPassword = () => {
        // disable password change
        inputOldPassword.disabled = false;
        inputNewPassword.disabled = false;
        inputReNewPassword.disabled = false;
        inputFullName.disabled = true;
        inputPhoneNumber.disabled = true;
        inputEmail.disabled = true;
        inputAddress.disabled = true;
        // set input value
        setName('');
        setPhoneNumber('');
        setEmail('');
        setAddress('');
        // focus on the first
        document.querySelector('#input-oldPassword').focus();
        setStateChange('Pass');
    };

    const editChangeProfiles = async (token, fullName, email, address, phoneNumber) => {
        const response = await userServices.updateUserProfile(token, fullName, email, address, phoneNumber);
        if (response.statusCode === 200) {
            // update context
            setAuth({ ...auth, fullName: fullName, email: email, address: address, phoneNumber: phoneNumber });
            // update localStorage
            localStorage.setItem(
                'auth',
                JSON.stringify({
                    ...auth,
                    fullName: fullName,
                    email: email,
                    address: address,
                    phoneNumber: phoneNumber,
                }),
            );
            notify(response.message, 'success');
        } else notify(response.errorMessage, 'error');
        setLoading(false);
    };
    const editChangePassword = async (token, oldPassword, newPassword) => {
        const response = await userServices.updateUserPassword(token, oldPassword, newPassword);
        if (response.statusCode === 200) {
            // update context
            setAuth({ ...auth, password: newPassword });
            // update localStorage
            localStorage.setItem(
                'auth',
                JSON.stringify({
                    ...auth,
                    password: newPassword,
                }),
            );
            notify(response.message, 'success');
        } else notify(response.errorMessage, 'error');
        setLoading(false);
    };

    const handleCheckInput = (email) => {
        const emailRegex = /\S+@\S+\.\S+/;
        const isEmailValid = emailRegex.test(email);
        if (isEmailValid && email.endsWith('@gmail.com')) return true;
        else return false;
    };

    const checkInputProfile = () => {
        if (handleCheckInput) {
            editChangeProfiles(auth.accessToken, name.trim(), email, address.trim(), phoneNumber);
        } else {
            notify('Email phải bao gồm đuôi "@gmail.com"', 'error');
            setLoading(false);
        }
    };

    const checkInputPassword = () => {
        if (newPassword !== reNewPassword) {
            notify('Mật Khẩu Không Trùng Khớp', 'error');
            setLoading(false);
        } else if (newPassword.length < 6) {
            notify('Mật Khẩu Tối Thiểu 6 Ký Tự', 'error');
            setLoading(false);
        } else editChangePassword(auth.accessToken, oldPassword, newPassword);
    };

    const handleSaveChangeProfile = (e) => {
        e.preventDefault();
        if (stateChange === 'Info') {
            checkInputProfile();
        } else if (stateChange === 'Pass') {
            checkInputPassword();
        } else {
            notify('Chọn Chế Độ Thay Mà Bạn Muốn Thay Đổi', 'error');
        }
        setLoading(true);
    };

    return (
        <>
            <ToastContainer />
            <div className="">
                <div className="container mx-auto mt-10">
                    <div className="relative h-[250px]">
                        <img
                            className="h-full w-full object-cover rounded"
                            src="https://margram.vn/files/san-pham-than-thien-moi-truong-014.png"
                            alt="Sản Phẩm Làm Bằng Gỗ"
                        />
                        <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                            <h2 className="text-textColor text-4xl font-bold mb-5 inline">Thông Tin Cá Nhân</h2>
                        </div>
                    </div>

                    <div className="my-10">
                        <h3 className="text-textColor text-xl font-bold ">Thông Tin Chung</h3>
                        <div className="lg:grid lg:grid-cols-10 mt-5 lg:gap-6">
                            <div className="lg:col-span-4 rounded shadow text-center">
                                <div className="h-[50%] w-full">
                                    <img
                                        className="w-full h-full object-cover rounded-t"
                                        src="https://btnmt.1cdn.vn/2023/03/02/313408215_3360650307525295_9107288947384745325_n.jpg"
                                        alt="Sản Phẩm"
                                    />
                                </div>
                                <p className="block mb-3 mt-5 text-xl font-bold text-primaryColor">{auth.fullName}</p>
                                <p className="block mb-3 font-medium text-lg">{auth.email}</p>
                                <p className="block mb-3 font-medium text-lg">{auth.address}</p>
                                <p className="block mb-3 font-medium text-lg">{auth.phoneNumber}</p>
                                <div className="">
                                    <button
                                        onClick={handleEditInformation}
                                        className="px-5 py-2 text-white text-lg font-bold bg-primaryColor active:opacity-80 rounded mb-5 mr-4"
                                    >
                                        Thay Đổi Thông Tin
                                    </button>
                                    <button
                                        onClick={handleEditPassword}
                                        className="px-5 py-2 text-white text-lg font-bold bg-primaryColor active:opacity-80 rounded mb-5"
                                    >
                                        Thay Đổi Mật Khẩu
                                    </button>
                                </div>
                            </div>

                            <form
                                onSubmit={(e) => handleSaveChangeProfile(e)}
                                className="lg:col-span-6 rounded shadow px-12"
                            >
                                <div className="md:grid md:grid-cols-2 md:gap-3 mt-5 pt-5">
                                    <div className="mb-3">
                                        <label htmlFor="" className="block font-medium text-left text-lg mb-2">
                                            Họ Và Tên
                                        </label>
                                        <input
                                            id="input-fullName"
                                            className="w-full px-4 py-2 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                            type="text"
                                            placeholder="Họ Và Tên"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="" className="block font-medium text-left text-lg mb-2">
                                            Số Điện Thoại
                                        </label>
                                        <input
                                            id="input-phoneNumber"
                                            className="w-full px-4 py-2 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                            type="number"
                                            placeholder="Số Điện Thoại"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            required
                                            max="9999999999"
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="" className="block font-medium text-left text-lg mb-2">
                                        Địa Chỉ Email
                                    </label>
                                    <input
                                        id="input-email"
                                        className="w-full px-4 py-2 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                        type="email"
                                        placeholder="Địa chỉ email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block font-medium text-left text-lg mb-2">
                                        Địa Chỉ
                                    </label>
                                    <input
                                        id="input-address"
                                        className="w-full px-4 py-2 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                        type="text"
                                        placeholder="Địa chỉ"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                    />
                                </div>
                                {/* change pass */}
                                <div className="mb-3">
                                    <label htmlFor="" className="block font-medium text-left text-lg mb-2">
                                        Mật Khẩu Cũ
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="input-oldPassword"
                                            className="w-full px-4 py-2 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                            type={hiddenOldPassword ? 'password' : 'text'}
                                            placeholder="Mật Khẩu Cũ"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            required
                                        />
                                        {hiddenOldPassword ? (
                                            <FontAwesomeIcon
                                                onClick={() => setHiddenOldPassword(!hiddenOldPassword)}
                                                className="absolute top-4 right-6"
                                                icon={faEyeSlash}
                                            />
                                        ) : (
                                            <FontAwesomeIcon
                                                onClick={() => setHiddenOldPassword(!hiddenOldPassword)}
                                                className="absolute top-4 right-6"
                                                icon={faEye}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block font-medium text-left text-lg mb-2">
                                        Mật Khẩu Mới
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="input-newPassword"
                                            className="w-full px-4 py-2 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                            type={hiddenNewPassword ? 'password' : 'text'}
                                            placeholder="Mật Khẩu Mới"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                        />
                                        {hiddenNewPassword ? (
                                            <FontAwesomeIcon
                                                onClick={() => setHiddenNewPassword(!hiddenNewPassword)}
                                                className="absolute top-4 right-6"
                                                icon={faEyeSlash}
                                            />
                                        ) : (
                                            <FontAwesomeIcon
                                                onClick={() => setHiddenNewPassword(!hiddenNewPassword)}
                                                className="absolute top-4 right-6"
                                                icon={faEye}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="block font-medium text-left text-lg mb-2">
                                        Nhập Lại Mật Khẩu Mới
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="input-reNewPassword"
                                            className="w-full px-4 py-2 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                            type={hiddenReNewPassword ? 'password' : 'text'}
                                            placeholder="Nhập Lại Mật Khẩu Mới"
                                            value={reNewPassword}
                                            onChange={(e) => setReNewPassword(e.target.value)}
                                            required
                                        />
                                        {hiddenReNewPassword ? (
                                            <FontAwesomeIcon
                                                onClick={() => setHiddenReNewPassword(!hiddenReNewPassword)}
                                                className="absolute top-4 right-6"
                                                icon={faEyeSlash}
                                            />
                                        ) : (
                                            <FontAwesomeIcon
                                                onClick={() => setHiddenReNewPassword(!hiddenReNewPassword)}
                                                className="absolute top-4 right-6"
                                                icon={faEye}
                                            />
                                        )}
                                    </div>
                                </div>
                                <button className="mt-4 px-8 py-2 text-white text-lg font-bold bg-primaryColor active:opacity-80 rounded mb-5">
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <Spinner className="h-6 w-6 mr-4" /> <span>Đang lưu...</span>
                                        </div>
                                    ) : (
                                        <span>Lưu</span>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserInfomation;
