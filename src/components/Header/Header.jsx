import { faBars, faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../../context/authProvider';

const Header = () => {
    const { auth } = useContext(AuthContext);
    const [hasUser, setHasUser] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const router = useLocation();


    useEffect(() => {
        auth.accessToken === undefined ? setHasUser(false) : setHasUser(true);
        // console.log(auth.fullName);
        // console.log(auth.accessToken);
    });

    return (
        <div className="container mx-auto">
            <header className="mx-auto max-w-5xl  h-[76px] flex justify-between sm:px-3 md:px-10 px-[10%] lg:px-0 lg:grid lg:grid-flow-col">
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold text-primaryColor">GreenEco</h1>
                </div>

                <ul className=" px-3 lg:flex lg:items-center ">
                    <li>
                        <a
                            className={`pr-14 text-lg font-bold hover:text-primaryColor transition duration-300 linear ${
                                router.pathname === '/' ? 'text-primaryColor' : 'text-black'
                            }`}
                            href="/"
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            className={`pr-14 text-lg font-bold hover:text-primaryColor transition duration-300 linear ${
                                router.pathname === '/products' ? 'text-primaryColor' : 'text-black'
                            }`}
                            href="/products"
                        >
                            Our Products
                        </a>
                    </li>
                    <li>
                        <div
                            className="relative pr-14 text-lg font-bold hover:text-primaryColor transition duration-300 linear"
                            href="/page"
                            onMouseEnter={() => setIsOpen(true)}
                            onMouseLeave={() => setIsOpen(false)}
                        >
                            Page
                            <div
                                className={`${
                                    isOpen ? 'opacity-100' : 'opacity-0'
                                } bg-gray-900 transition-opacity duration-300 absolute left-0 mt-2 z-10 w-40 rounded-lg`}
                            >
                                <ul className="py-4">
                                    <li>
                                        <a href="/cart" className="pl-3 mb-2 text-white hover:text-primaryColor font-thin">
                                            Shopping Cart
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/checkout" className="pl-3 text-white hover:text-primaryColor font-thin">
                                            Checkout
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li>
                        <a
                            className={`pr-14 text-lg font-bold hover:text-primaryColor transition duration-300 linear ${
                                router.pathname === '/about' ? 'text-primaryColor' : 'text-black'
                            }`}
                            href="/about"
                        >
                            About
                        </a>
                    </li>
                    <li>
                        <a
                            className={`pr-14 text-lg font-bold hover:text-primaryColor transition duration-300 linear ${
                                router.pathname === '/contact' ? 'text-primaryColor' : 'text-black'
                            }`}
                            href="/contact"
                        >
                            Contact
                        </a>
                    </li>
                </ul>

                <div className="h-full flex items-center">
                    {hasUser ? (
                        <Link to="/user">
                            <div className="hidden lg:flex lg:justify-center lg:items-center">
                                <h3 className="text-[#252525] text-sm mr-2 font-bold">{auth.fullName || "Name User"}</h3>
                                <img
                                    className="h-[36px] w-[36px] rounded-[50%] border-4 border-[#ccc]"
                                    src="https://english4u.com.vn/Uploads/images/bai-viet-ve-mot-nguoi-noi-tieng-bang-tieng-anh2.jpg"
                                    alt="ImageUser"
                                />
                            </div>
                        </Link>
                    ) : (
                        <div className="hidden lg:block">
                            <Link to="/login">
                                <button className="text-lg font-bold mr-3 hover:text-primaryColor">Log In</button>
                            </Link>
                            <Link to="/signup">
                                <button className="text-lg text-white font-bold p-3 bg-primaryColor rounded">
                                    Sign UP
                                </button>
                            </Link>
                        </div>
                    )}

                    <FontAwesomeIcon icon={faBars} className="block lg:hidden text-2xl" />
                </div>
            </header>
        </div>
    );
};

export default Header;
