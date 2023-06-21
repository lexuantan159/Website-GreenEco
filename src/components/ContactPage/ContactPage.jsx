import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import { faClock, faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import * as contactServices from '../../services/contactServices';
import { Spinner } from '@material-tailwind/react';

const ContactPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);

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
        if (submit) {
            const fetchContact = async () => {
                const contact = await contactServices.contact(name, email, message);
                if (contact.statusCode === 200) {
                    setLoading(false);
                    setSubmit(false);
                    notify(contact.response.message, 'success');
                } else {
                    notify(contact.error.response.data.message);
                    setLoading(false);
                    setSubmit(false);
                }
            };
            fetchContact();
        }
    }, [email, message, name, submit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const emailRegex = /\S+@\S+.\S+/;
        const isEmailValid = emailRegex.test(email);
        if (isEmailValid && email.endsWith('@gmail.com')) {
            setSubmit(true);
            setLoading(true);
        } else {
            // email is not valid or does not end with "@gmail.com"
            setSubmit(false);
            setLoading(false);
            notify('Đuôi Email Không Phù Hợp "@gmail.com"');
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
                                        Sản Phẩm Thân Thiện Với Môi Trường
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto text-center font-bold text-5xl mb-8 text-[#7fad39]">Liên Hệ</div>

                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-28 mx-auto w-[400px] lg:w-[800px] border-spacing-1"
                >
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                            Họ và tên
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                            type="text"
                            placeholder="Nhập họ và tên của bạn"
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
                            placeholder="Nhập email của bạn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="message">
                            Tin nhắn
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                            placeholder="Nội dung tin nhắn"
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
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <Spinner className="h-6 w-6 mr-4" /> <span>Đang tải....</span>
                                </div>
                            ) : (
                                <span>Gửi</span>
                            )}
                        </button>
                    </div>
                </form>
                <div className=" ">
                    <div className=" flex grid-cols-2 bg-white  justify-between rounded px-8 pt-6 pb-8 mb-28 mx-auto lg:w-[1000px] shadow-2xl">
                        <div className="">
                            <div className=" text-[36px] text-[#7fad39] text-center">
                                <FontAwesomeIcon icon={faLocationDot} />
                            </div>
                            <h4 className="text-center font-bold my-4 text-[24px]">Địa Chỉ</h4>
                            <p className="text-[#666666] text-[16px] font-medium text-center">
                                {' '}
                                254 Nguyễn Văn Linh
                            </p>
                        </div>
                        <div className="">
                            <div className="text-[36px] text-[#7fad39] text-center">
                                <FontAwesomeIcon icon={faPhone} />
                            </div>
                            <h4 className="text-center font-bold my-4 text-[24px]">Số Điện Thoại</h4>
                            <p className="text-[#666666] text-[16px] font-medium text-center"> +84 397 881 543</p>
                        </div>
                        <div className="">
                            <div className=" text-[36px] text-[#7fad39] text-center">
                                <FontAwesomeIcon icon={faClock} />
                            </div>
                            <h4 className="text-center font-bold my-4 text-[24px]">Thời Gian Mở Cửa</h4>
                            <p className="text-[#666666] text-[16px] font-medium text-center">10:00 am to 23:00 pm</p>
                        </div>
                        <div className="">
                            <div className="text-[36px] text-[#7fad39] text-center">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </div>
                            <h4 className="text-center font-bold my-4 text-[24px]">Email</h4>
                            <p className="text-[#666666] text-[16px] font-medium text-center">GreenEco@gmail.com</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactPage;
