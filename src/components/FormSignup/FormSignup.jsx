import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const FormSignup = () => {
    const [hiddenPass, setHiddenPass] = useState(true);
    const [reHiddenPass, setReHiddenPass] = useState(true);

    const handleHiddenPassword = () => {
        hiddenPass ? setHiddenPass(false) : setHiddenPass(true);
    };

    const handleHiddenRePassword = () => {
        reHiddenPass ? setReHiddenPass(false) : setReHiddenPass(true);
    };

    return (
        <div className="h-screen flex items-center bg-gradient-to-r from-[#1e524e] to-[#6cff95]">
            <div className="bg-white  w-full sm:w-[90%] md:w-[80%] lg:w-[75%] lg:grid lg:grid-cols-10 shadow-xl mx-auto rounded-[20px] pb-4 lg:pb-0">
                <div className="text-center lg:col-span-4">
                    <h1 className="text-primaryColor text-3xl font-bold py-6">Sign Up To GreenEco</h1>
                    <div className="w-[70%] m-auto">
                        <form action="">
                            <div className="grid grid-cols-2 gap-4 mb-2">
                                <div className="flex flex-col ">
                                    <label className="font-medium text-left text-lg mb-2 " htmlFor="">
                                        First Name
                                    </label>
                                    <input
                                        className="px-4 py-2 border-2 border-[#afafaf] rounded-lg shadow-lg outline-none focus:border-primaryColor placeholder:text-lg text-lg"
                                        type="text"
                                        placeholder="firstname"
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
                                        required
                                    />
                                    {hiddenPass ? (
                                        <FontAwesomeIcon
                                            onClick={handleHiddenPassword}
                                            className="absolute top-4 right-6"
                                            icon={faEyeSlash}
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            onClick={handleHiddenPassword}
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
                                    />
                                    {reHiddenPass ? (
                                        <FontAwesomeIcon
                                            onClick={handleHiddenRePassword}
                                            className="absolute top-4 right-6"
                                            icon={faEyeSlash}
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            onClick={handleHiddenRePassword}
                                            className="absolute top-4 right-6"
                                            icon={faEye}
                                        />
                                    )}
                                </div>
                            </div>
                            <button className="py-2 bg-primaryColor w-full mb-3 rounded-lg text-xl font-bold text-white">
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
    );
};

export default FormSignup;
