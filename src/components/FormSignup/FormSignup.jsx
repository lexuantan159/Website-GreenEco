import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useContext, useEffect, useState } from 'react';
import * as registerServices from '../../services/registerServices';
import * as authServices from '../../services/authServices';
import { useNavigate } from 'react-router-dom';
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
    const [toggleSubmit, setToggleSubmit] = useState(false);
    const [submit, setSubmit] = useState(false);
    const navigate = useNavigate();

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
        if (submit) {
            const fetchRegister = async () => {
                const fullName = firstName + ' ' + lastName;
                const register = await registerServices.register(fullName, email, password);
                if (register.statusCode === 200) {
                    const authentication = await authServices.authentication(email, password);
                    if (authentication.statusCode === 200) {
                        const accessToken = authentication.response.accessToken;
                        setAuth({ email, password, accessToken, fullName });
                        navigate('/');
                    } else notify(authentication.error.response.data.message);
                } else notify(register.error.response.data.message);
            };
            fetchRegister();
        }
    }, [toggleSubmit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const emailRegex = /\S+@\S+\.\S+/;
        const isEmailValid = emailRegex.test(email);

        if (isEmailValid && email.endsWith('@gmail.com')) {
            // email is valid and ends with "@gmail.com"
            if (rePassword === password) {
                setSubmit(true);
                setToggleSubmit(!toggleSubmit);
            } else {
                setEmail(false);
                notify('Password does not match');
            }
        } else {
            // email is not valid or does not end with "@gmail.com"
            notify('Email is not valid with "@gmail.com"');
            setSubmit(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="h-screen flex items-center bg-gradient-to-r from-[#1e524e] to-[#6cff95]">
                <div className="bg-white  w-full sm:w-[90%] md:w-[80%] lg:w-[75%] lg:grid lg:grid-cols-10 shadow-xl mx-auto rounded-[20px] pb-4 lg:pb-0">
                    <div className="text-center lg:col-span-4">
                        <h1 className="text-primaryColor text-3xl font-bold py-6">Sign Up To GreenEco</h1>
                        <div className="w-[70%] m-auto">
                            <form action="" onSubmit={(e) => handleSubmit(e)}>
                                <div className="grid grid-cols-2 gap-4 mb-2">
                                    <div className="flex flex-col ">
                                        <label className="font-medium text-left text-lg mb-2 " htmlFor="">
                                            First Name
                                        </label>
                                        <input
                                            className="px-4 py-2 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                            type="text"
                                            placeholder="firstname"
                                            onChange={(e) => setFirstName(e.target.value)}
                                            value={firstName}
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col ">
                                        <label className="font-medium text-left text-lg mb-2 " htmlFor="">
                                            Last Name
                                        </label>
                                        <input
                                            className="px-4 py-2 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                            type="text"
                                            placeholder="lastname"
                                            onChange={(e) => setLastName(e.target.value)}
                                            value={lastName}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col mb-2">
                                    <label className="font-medium text-left text-lg mb-2 " htmlFor="">
                                        Email Address
                                    </label>
                                    <input
                                        className="px-4 py-2 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                        type="email"
                                        placeholder="youraccount@gmail.com"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col mb-2">
                                    <label className="font-medium text-left text-lg mb-2 " htmlFor="">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="w-full px-4 py-2 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                            type={hiddenPass ? 'password' : 'text'}
                                            placeholder="yourpassword"
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
                                        Retype Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="w-full px-4 py-2 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                            type={reHiddenPass ? 'password' : 'text'}
                                            required
                                            placeholder="retypeyourpassword"
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
                                    Sign Up
                                </button>
                            </form>

                            <div className="mt-2 mb-9">
                                <p className="">
                                    Already a member?
                                    <a href="/login" className="text-lg text-primaryColor">
                                        Log In
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

export default FormSignup;
