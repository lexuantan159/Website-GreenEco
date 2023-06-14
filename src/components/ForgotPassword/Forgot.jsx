import { Spinner } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import * as authServices from '../../services/authServices';
import { useLocation, useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
const Forgot = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [submit, setSubmit] = useState(false);
    const location = useLocation();

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

    const toLowerEmail = (email) => {
        const username = email
            .split('@')[0]
            .toLowerCase()
            .replace(/[^a-z0-9]/gi, '');
        return email.replace(/^[^@]+/, username);
    };


    useEffect(() => {
        if (submit) {
            const fetchAuth = async () => {
                const forgotPassword = await authServices.forgotPassword(email);
                console.log(forgotPassword);
                if (forgotPassword.statusCode === 200) {
                    setLoading(false);
                    navigate('/reset-password', { state: { toastMessage: forgotPassword.response.message + ". Please check your mailbox to receive the OTP" } });
                } else {
                    notify(forgotPassword.error.message);
                    setLoading(false);
                    setSubmit(false);
                }
            };
            fetchAuth();
        }
    }, [submit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const emailRegex = /\S+@\S+\.\S+/;
        const isEmailValid = emailRegex.test(email);
        // Validation input
        if (isEmailValid && email.endsWith('@gmail.com')) {
            // email is valid and ends with "@gmail.com"
            setSubmit(true);
            setLoading(true);
        } else {
            // email is not valid or does not end with "@gmail.com"
            setSubmit(false);
            setLoading(false);
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
                            <h1 className="text-primaryColor text-3xl font-bold py-12">Forgot Password</h1>
                            <h1 className="text-primaryColor text-base font-bold">Please enter your email address. You will receive a OTP code to create a new password via email <FontAwesomeIcon icon={faEnvelope}/></h1>
                            <form action="" onSubmit={(e) => handleSubmit(e)}>
                                <div className="flex flex-col mb-6 mt-9">
                                    <label className="font-medium text-left text-lg mb-2 " htmlFor="">
                                        Email Address
                                    </label>
                                    <input
                                        className="px-4 py-3 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                        required
                                        type="email"
                                        autoComplete="email"
                                        placeholder="youraccount@gmail.com"
                                        onChange={(e) => setEmail(toLowerEmail(e.target.value))}
                                        value={email}
                                    />
                                </div>
                                <button className="py-3 bg-primaryColor w-full mt-3 mb-3 rounded-lg text-xl font-bold text-white  opacity-100 active:opacity-80">
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <Spinner className="h-6 w-6 mr-4" /> <span>Loading....</span>
                                        </div>
                                    ) : (
                                        <span>Send</span>
                                    )}
                                </button>
                            </form>
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

export default Forgot;
