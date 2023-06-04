import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../context/authProvider';
import { useNavigate } from 'react-router-dom';
import * as authServices from '../../services/authServices';

const FormLogin = () => {
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hiddenPass, setHiddenPass] = useState(true);
    const [toggleSubmit, setToggleSubmit] = useState(false);

    const handleHiddenPassword = () => {
        hiddenPass ? setHiddenPass(false) : setHiddenPass(true);
    };

    const notify = (message) =>
        toast(message, {
            position: 'top-center',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });

    useEffect(() => {
        document.title = 'Log In';
    });

    useEffect(() => {
        if (email !== '' || password !== '') {
            const fetchAuth = async () => {
                const authentication = await authServices.authentication(email, password);
                if (authentication.response.status === 200) {
                    const accessToken = authentication.accessToken;
                    setAuth({ email, password, accessToken });
                    const roles = await authServices.authorization(accessToken);
                    if (roles.response.status === 200) {
                        if (roles === 'Admin') navigate('/admin');
                        else if (roles === 'User') navigate('/');
                        else notify('Login failed');
                    } else {
                        notify(roles.response.data.message);
                    }
                } else {
                    notify(authentication.response.data.message);
                }
            };

            fetchAuth();
        }
    }, [toggleSubmit]);

    const handleLogin = (e) => {
        e.preventDefault();
        const emailRegex = /\S+@\S+\.\S+/;
        const isEmailValid = emailRegex.test(email);

        if (isEmailValid && email.endsWith('@gmail.com')) {
            // email is valid and ends with "@gmail.com"
            setToggleSubmit(!toggleSubmit);
        } else {
            // email is not valid or does not end with "@gmail.com"
            notify('Email is not valid with "@gmail.com"');
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="h-screen flex items-center bg-gradient-to-r from-[#1e524e] to-[#6cff95]">
                <div className="bg-white w-full sm:w-[90%] md:w-[80%] lg:w-[75%] lg:grid lg:grid-cols-10 shadow-xl m-auto my-auto rounded-[20px] pb-4 lg:pb-0">
                    <div className="text-center lg:col-span-4">
                        <div className="w-[70%] m-auto">
                            <h1 className="text-primaryColor text-3xl font-bold py-10">Log In To GreenEco</h1>
                            <form action="" onSubmit={(e) => handleLogin(e)}>
                                <div className="flex flex-col mb-6">
                                    <label className="font-medium text-left text-lg mb-2 " htmlFor="">
                                        Email Address
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
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="passwordInput"
                                            className="w-full px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                            type={hiddenPass ? 'password' : 'text'}
                                            required
                                            placeholder="yourpassword"
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
                                    <a href="/" className="text-lg text-primaryColor">
                                        Forgot Password?
                                    </a>
                                </div>
                                <button
                                    onClick={handleLogin}
                                    className="py-3 bg-primaryColor w-full mb-3 rounded-lg text-xl font-bold text-white"
                                >
                                    Log In
                                </button>
                            </form>

                            <div className="mt-2 mb-9">
                                <p className="">
                                    Don’t have account?
                                    <a href="/signup" className="text-lg text-primaryColor">
                                        Sign Up
                                    </a>
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
