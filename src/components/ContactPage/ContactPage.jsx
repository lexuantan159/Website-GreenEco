import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import { faClock, faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import * as contactServices from '../../services/contactServices';

const ContactPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setrror] = useState('');
    const [submit, setSubmit] = useState(false);

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
            const fetchContact = async () => {
                const contact = await contactServices.contact(name, email, message);
                contact.statusCode === 200
                    ? notify(contact.response.message)
                    : notify(contact.error.response.data.message);
            };
            fetchContact();
        }
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        const emailRegex = /\S+@\S+.\S+/;
        const isEmailValid = emailRegex.test(email);
        if (isEmailValid && email.endsWith('@gmail.com')) {
            setSubmit(!submit);
        } else {
            // email is not valid or does not end with "@gmail.com"
            notify('Email is not valid with "@gmail.com"');
        }
    };
    return (
        <>
            <ToastContainer />
            <section className="">
                <div className="container mb-32 mx-auto px-6 md:px-4 lg:px-0">
                    <div className="relative">
                        <img
                            className="h-[530px] w-full object-cover rounded-xl"
                            src="https://myethicalchoice.com/wp-content/uploads/2021/01/eco-friendly-product-top.jpeg?fbclid=IwAR1tUYFO9a9LU2xEqKgstvjzLxtJx_r5vYPpRToxJSv2_aRFOya7Dtt0EZg"
                            alt="San pham lam bang go"
                        />
                        <div className="absolute sm:left-[30%] top-[60%] w-[40%]">
                            <div className="mx-16 text-black text-center mb-8 sm:mx-auto ">
                                <div className="">
                                    <div className=" uppercase font-bold md:text-lg lg:text-5xl mb-6 whitespace-nowrap left-8 ">
                                        Green Eco
                                    </div>
                                    <div className=" sm:text-sm md:text-sm lg:text-[18px] font-semibold mb-6 whitespace-nowrap italic ">
                                        Friendly Products With The Environment
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto text-center font-bold text-5xl mb-8 text-[#7fad39]">Contact Us</div>

                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-28 mx-auto w-[400px] lg:w-[800px] border-spacing-1"
                >
                    {error && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                            <p>{error}</p>
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                            type="text"
                            placeholder="Full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                            required
                            type="email"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="message">
                            Message
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                            placeholder="Message content"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                    </div>
                    <div className=" flex items-center justify-center ">
                        <button
                            className="bg-[#7fad39] hover:bg-[#7dc413] text-white  text-[20px] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </form>
                <div className=" ">
                    <div className=" flex grid-cols-2 bg-white  justify-between rounded px-8 pt-6 pb-8 mb-28 mx-auto lg:w-[1000px] shadow-2xl">
                        <div className="">
                            <div className=" text-[36px] text-[#7fad39] text-center">
                                <FontAwesomeIcon icon={faLocationDot} />
                            </div>
                            <h4 className="text-center font-bold my-4 text-[24px]">Address</h4>
                            <p className="text-[#666666] text-[16px] font-medium text-center">
                                {' '}
                                40/20 Nguyen Huy Tuong
                            </p>
                        </div>
                        <div className="">
                            <div className="text-[36px] text-[#7fad39] text-center">
                                <FontAwesomeIcon icon={faPhone} />
                            </div>
                            <h4 className="text-center font-bold my-4 text-[24px]">Phone</h4>
                            <p className="text-[#666666] text-[16px] font-medium text-center"> +84 397 881 543</p>
                        </div>
                        <div className="">
                            <div className=" text-[36px] text-[#7fad39] text-center">
                                <FontAwesomeIcon icon={faClock} />
                            </div>
                            <h4 className="text-center font-bold my-4 text-[24px]">Open Time</h4>
                            <p className="text-[#666666] text-[16px] font-medium text-center">10:00 am to 23:00 pm</p>
                        </div>
                        <div className="">
                            <div className="text-[36px] text-[#7fad39] text-center">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </div>
                            <h4 className="text-center font-bold my-4 text-[24px]">Email</h4>
                            <p className="text-[#666666] text-[16px] font-medium text-center"> hello@colorlib.com</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactPage;
