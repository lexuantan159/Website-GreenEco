import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import { Spinner } from '@material-tailwind/react';
import 'react-toastify/dist/ReactToastify.css';
import React, { useContext, useEffect, useState } from 'react';
import * as registerServices from '../../services/registerServices';
import * as authServices from '../../services/authServices';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/authProvider';

const FormSignup = () => {
    const { setAuth } = useContext(AuthContext);
    const [hiddenPass, setHiddenPass] = useState(true);
    const [reHiddenPass, setReHiddenPass] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const notify = (message, type) => {
        const toastType = type === "success" ? toast.success : toast.error
        return toastType(message, {
            position: 'top-center',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    }

    const replaceEmail = (email) => {
        const username = email
            .split('@')[0]
            .toLowerCase()
            .replace(/[^a-z0-9]/gi, '');
        return email.replace(/^[^@]+/, username);
    };

    useEffect(() => {
        if (submit) {
            const fetchRegister = async () => {
                const fullName = firstName + ' ' + lastName;
                const register = await registerServices.register(fullName, email, password);
                if (register.statusCode === 201) {
                    const authentication = await authServices.authentication(email, password);
                    if (authentication.statusCode === 200) {
                        const accessToken = authentication.response.accessToken;
                        setAuth({ email, password, accessToken, fullName });
                        setLoading(false);
                        navigate('/');
                    } else {
                        notify(authentication.error.response.data.message);
                        setLoading(false);
                        setSubmit(false);
                    }
                } else {
                    notify(register.error.response.data.message);
                    setLoading(false);
                    setSubmit(false);
                }
            };
            fetchRegister();
        }
    }, [email, firstName, lastName, navigate, password, setAuth, submit]);

    const handleCheckInput = () => {
        const emailRegex = /\S+@\S+\.\S+/;
        const isEmailValid = emailRegex.test(email);
        if (isEmailValid && email.endsWith('@gmail.com')) {
            // email is valid and ends with "@gmail.com"
            if (rePassword === password) {
                setLoading(true);
                setSubmit(true);
            } else {
                notify('Mật khẩu nhập lại không khớp');
                setSubmit(false);
            }
        } else {
            // email is not valid or does not end with "@gmail.com"
            notify('Email phải bao gồm đuôi "@gmail.com"');
            setSubmit(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCheckInput();
    };

    return (
        <>
            <ToastContainer />
            <div className="h-screen flex items-center bg-gradient-to-r from-[#1e524e] to-[#6cff95]">
                <div className="bg-white  w-full sm:w-[90%] md:w-[80%] lg:w-[75%] lg:grid lg:grid-cols-10 shadow-xl mx-auto rounded-[20px] pb-4 lg:pb-0">
                    <div className="text-center lg:col-span-4">
                        <h1 className="text-primaryColor text-3xl font-bold py-6">Đăng Ký GreenEco</h1>
                        <div className="w-[70%] m-auto">
                            <form action="" onSubmit={(e) => handleSubmit(e)}>
                                <div className="grid grid-cols-2 gap-4 mb-2">
                                    <div className="flex flex-col ">
                                        <label className="font-medium text-left text-lg mb-2 " htmlFor="">
                                            Họ
                                        </label>
                                        <input
                                            className="px-4 py-2 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                            type="text"
                                            placeholder="Họ của bạn"
                                            onChange={(e) => setFirstName(e.target.value)}
                                            value={firstName}
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col ">
                                        <label className="font-medium text-left text-lg mb-2 " htmlFor="">
                                            Tên
                                        </label>
                                        <input
                                            className="px-4 py-2 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                            type="text"
                                            placeholder="Tên của bạn"
                                            onChange={(e) => setLastName(e.target.value)}
                                            value={lastName}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col mb-2">
                                    <label className="font-medium text-left text-lg mb-2 " htmlFor="">
                                        Địa Chỉ Email
                                    </label>
                                    <input
                                        className="px-4 py-2 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                        type="email"
                                        placeholder="youraccount@gmail.com"
                                        onChange={(e) => setEmail(replaceEmail(e.target.value))}
                                        value={email}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col mb-2">
                                    <label className="font-medium text-left text-lg mb-2 " htmlFor="">
                                        Mật Khẩu
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="w-full px-4 py-2 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                            type={hiddenPass ? 'password' : 'text'}
                                            placeholder="Mật khẩu của bạn"
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            required
                                        />
                                        {hiddenPass ? (
                                            <FontAwesomeIcon
                                                onClick={() => setHiddenPass(!hiddenPass)}
                                                className="absolute top-4 right-6"
                                                icon={faEyeSlash}
                                            />
                                        ) : (
                                            <FontAwesomeIcon
                                                onClick={() => setHiddenPass(!hiddenPass)}
                                                className="absolute top-4 right-6"
                                                icon={faEye}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col mb-6">
                                    <label className="font-medium text-left text-lg mb-2 " htmlFor="">
                                        Xác Nhận Mật Khẩu
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="w-full px-4 py-2 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                            type={reHiddenPass ? 'password' : 'text'}
                                            required
                                            placeholder="Nhập lại mật khẩu của bạn"
                                            onChange={(e) => setRePassword(e.target.value)}
                                            value={rePassword}
                                        />
                                        {reHiddenPass ? (
                                            <FontAwesomeIcon
                                                onClick={() => setReHiddenPass(!reHiddenPass)}
                                                className="absolute top-4 right-6"
                                                icon={faEyeSlash}
                                            />
                                        ) : (
                                            <FontAwesomeIcon
                                                onClick={() => setReHiddenPass(!reHiddenPass)}
                                                className="absolute top-4 right-6"
                                                icon={faEye}
                                            />
                                        )}
                                    </div>
                                </div>
                                <button className="py-2 bg-primaryColor w-full mb-3 rounded-lg text-xl font-bold text-white opacity-100 active:opacity-80">
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <Spinner className="h-6 w-6 mr-4" /> <span>Đang tải....</span>
                                        </div>
                                    ) : (
                                        <span>Sign Up</span>
                                    )}
                                </button>
                            </form>

                            <div className="mt-2 mb-9">
                                <p className="">
                                    Đã có tài khoản?
                                    <Link to="/login" className="text-lg text-primaryColor ml-2">
                                        Đăng nhập
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:block h-full w-full col-span-6">
                        <img
                            className="h-full w-full object-cover lg:rounded-r-[20px] "
                            src="https://storage.googleapis.com/ops-shopee-files-live/live/shopee-blog/2022/11/169ff58b-san-pham-than-thien-voi-moi-truong.jpg"
                            alt="Images"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormSignup;
