/* eslint-disable no-unused-vars */
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import { Spinner } from '@material-tailwind/react';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../context/authProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as authServices from '../../services/authServices';

const FormLogin = () => {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hiddenPass, setHiddenPass] = useState(true);
    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const handleHiddenPassword = () => {
        hiddenPass ? setHiddenPass(false) : setHiddenPass(true);
    };

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

    useEffect(() => {
        if (location.state?.toastMessage !== '') {
            notify(location.state?.toastMessage, 'success');
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, []);

    useEffect(() => {
        if (submit) {
            const fetchAuth = async () => {
                const authentication = await authServices.authentication(email, password);

                if (authentication.statusCode === 200) {
                    const accessToken = authentication.response.accessToken;
                    const authorization = await authServices.authorization(accessToken);
                    const id = authorization.id;
                    const fullName = authorization.fullName;
                    const phoneNumber = authorization.phone;
                    const address = authorization.address;
                    const role = authorization.roles

                    setAuth({ id, email, password, accessToken, fullName , phoneNumber ,address, role });
                    localStorage.setItem('auth',JSON.stringify({ id, email, password, accessToken, fullName, phoneNumber ,address, role }));
                
                    if (authorization.statusCode === 200) {
                        if (authorization.roles === 'Admin') navigate('/dashboard');
                        else if (authorization.roles === 'User') navigate('/');
                        else notify('Đăng nhập thất bại');
                    } else {
                        notify(authorization.error.response.data.message);
                        setLoading(false);
                        setSubmit(false);
                    }
                } else {
                    notify(authentication.error.response.data.message);
                    setLoading(false);
                    setSubmit(false);
                }
            };

            fetchAuth();
        }
    }, [email, navigate, password, setAuth, submit]);

    const handleCheckInput = () => {
        const emailRegex = /\S+@\S+\.\S+/;
        const isEmailValid = emailRegex.test(email);

        if (isEmailValid && email.endsWith('@gmail.com')) {
            // email is valid and ends with "@gmail.com"
            setSubmit(true);
            setLoading(true);
        } else {
            // email is not valid or does not end with "@gmail.com"
            setSubmit(false);
            setLoading(false);
            notify('Email phải bao gồm đuôi "@gmail.com"');
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        handleCheckInput();
    };

    return (
        <>
            <ToastContainer />
            <div className="h-screen flex items-center bg-gradient-to-r from-[#1e524e] to-[#6cff95]">
                <div className="bg-white w-full sm:w-[90%] md:w-[80%] lg:w-[75%] lg:grid lg:grid-cols-10 shadow-xl m-auto my-auto rounded-[20px] pb-4 lg:pb-0">
                    <div className="text-center lg:col-span-4">
                        <div className="w-[70%] m-auto">
                            <h1 className="text-primaryColor text-3xl font-bold py-10">Đăng Nhập GreenEco</h1>
                            <form action="" onSubmit={(e) => handleLogin(e)}>
                                <div className="flex flex-col mb-6">
                                    <label className="font-medium text-left text-lg mb-2 " htmlFor="">
                                        Địa Chỉ Email 
                                    </label>
                                    <input
                                        id="emailInput"
                                        className="px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                        required
                                        type="email"
                                        autoComplete="email"
                                        placeholder="youraccount@gmail.com"
                                        onChange={(event) => setEmail(event.target.value)}
                                        value={email}
                                    />
                                </div>
                                <div className="flex flex-col ">
                                    <label className="font-medium text-left text-lg mb-2 " htmlFor="">
                                        Mật Khẩu
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="passwordInput"
                                            className="w-full px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                            type={hiddenPass ? 'password' : 'text'}
                                            required
                                            placeholder="Mật khẩu của bạn"
                                            onChange={(event) => setPassword(event.target.value)}
                                            value={password}
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
                                <div className=" text-right mt-2 mb-9 ">
                                    <Link to="/forgot-password" className="text-lg text-primaryColor">
                                        Quên mật khẩu?
                                    </Link>
                                </div>
                                <button className="py-3 bg-primaryColor w-full mb-3 rounded-lg text-xl font-bold text-white  opacity-100 active:opacity-80">
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <Spinner className="h-6 w-6 mr-4" /> <span>Đang tải....</span>
                                        </div>
                                    ) : (
                                        <span>Đăng Nhập</span>
                                    )}
                                </button>
                            </form>

                            <div className="mt-2 mb-9">
                                <p className="">
                                    Chưa có tài khoản?
                                    <Link to="/signup" className="text-lg text-primaryColor ml-2">
                                        Đăng Ký
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

export default FormLogin;
