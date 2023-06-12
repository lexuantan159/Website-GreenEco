import { faBars, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/authProvider';

const Header = () => {
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);
    const [hasUser, setHasUser] = useState(false);
    const router = useLocation();

    useEffect(() => {
        if (Object.keys(auth).length === 0) {
            setHasUser(false);
        } else {
            setHasUser(true);
        }
    }, [auth]);

    const handleLogOut = () => {
        setAuth({});
        localStorage.removeItem('auth');
        setHasUser(false);
        navigate('/');
    };

    return (
        <div className="">
            <header className="">
                <div className="container mx-auto h-[76px]  flex justify-between sm:px-3 md:px-10 px-[10%] lg:px-10 lg:grid lg:grid-flow-col">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold text-primaryColor">GreenEco</h1>
                    </div>

                    <ul className="px-3 lg:flex lg:items-center bg-white">
                        <li className="block ">
                            <Link to="/">
                                <p
                                    className={`mr-14 text-lg font-bold hover:text-primaryColor transition duration-300 linear ${
                                        router.pathname === '/' ? 'text-primaryColor' : 'text-black'
                                    }`}
                                >
                                    Home
                                </p>
                            </Link>
                        </li>
                        <li className="block ">
                            <Link to="/products">
                                <p
                                    className={`mr-14 text-lg font-bold hover:text-primaryColor transition duration-300 linear ${
                                        router.pathname === '/products' ? 'text-primaryColor' : 'text-black'
                                    }`}
                                >
                                    Our Products
                                </p>
                            </Link>
                        </li>
                        <li className="block ">
                            <div className="relative mr-14 text-lg font-bold hover:text-primaryColor transition duration-300 linear group">
                                Page
                                <div className="absolute top-6 hidden bg-transparent w-[45px] h-[12px] group-hover:block"></div>
                                <div className="hidden bg-gray-900 transition-all duration-300 absolute left-0 mt-2 z-10 w-40 rounded-lg group-hover:block group-hover:opacity-100 opacity-0 ">
                                    <ul className="py-4">
                                        <li className="py-1">
                                            <Link to="/cart">
                                                <p className="pl-3 mb-2 text-white hover:text-primaryColor font-thin">
                                                    Shopping Cart
                                                </p>
                                            </Link>
                                        </li>
                                        <li className="py-1">
                                            <Link to="/checkout">
                                                <p className="pl-3 text-white hover:text-primaryColor font-thin">
                                                    Checkout
                                                </p>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li className="block ">
                            <Link to="/about">
                                <p
                                    className={`mr-14 text-lg font-bold hover:text-primaryColor transition duration-300 linear ${
                                        router.pathname === '/about' ? 'text-primaryColor' : 'text-black'
                                    }`}
                                >
                                    About
                                </p>
                            </Link>
                        </li>
                        <li className=" ">
                            <Link to="/contact">
                                <p
                                    className={`mr-14 text-lg font-bold hover:text-primaryColor transition duration-300 linear ${
                                        router.pathname === '/contact' ? 'text-primaryColor' : 'text-black'
                                    }`}
                                >
                                    Contact
                                </p>
                            </Link>
                        </li>
                    </ul>

                    <div className="h-full flex items-center">
                        {hasUser ? (
                            <button className="relative flex justify-center items-center group">
                                <p className="text-lg text-textColor font-medium mr-3">
                                    {auth.fullName || 'Name User'}
                                </p>
                                <FontAwesomeIcon
                                    className="rotate-90 group-hover:rotate-0 transition-all"
                                    icon={faCaretDown}
                                />
                                <div className="absolute top-7 left-0 right-0 hidden group-hover:block transition-all bg-white shadow rounded py-2 z-10">
                                    <ul className="">
                                        <li
                                            onClick={() => navigate('/userinformation')}
                                            className="my-1 text-textColor font-medium "
                                        >
                                            Profiles
                                        </li>

                                        <li onClick={handleLogOut} className="my-1 text-textColor font-medium ">
                                            Log Out
                                        </li>
                                    </ul>
                                </div>
                            </button>
                        ) : (
                            <div className="">
                                <Link to="/login">
                                    <button className="text-lg font-bold mr-3 hover:text-primaryColor">Log In</button>
                                </Link>
                                <Link to="/signup">
                                    <button className="text-lg text-white font-bold p-3 bg-primaryColor active:opacity-80 rounded">
                                        Sign UP
                                    </button>
                                </Link>
                            </div>
                        )}

                        <FontAwesomeIcon icon={faBars} className="block lg:hidden text-2xl" />
                    </div>
                </div>
            </header>

        </div>
    );
};

export default Header;
