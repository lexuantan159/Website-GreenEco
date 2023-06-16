import { faBars, faCaretDown, faChartSimple, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
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
        <header className="sticky top-0 left-0 right-0 w-full z-50 bg-white shadow-sm">
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
                                Trang Chủ
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
                                Sản Phẩm
                            </p>
                        </Link>
                    </li>
                    <li className="block ">
                        <Link to="/cart">
                            <p
                                className={`mr-14 text-lg font-bold hover:text-primaryColor transition duration-300 linear ${
                                    router.pathname === '/cart' ? 'text-primaryColor' : 'text-black'
                                }`}
                            >
                                Giỏ Hàng
                            </p>
                        </Link>
                    </li>

                    <li className="block ">
                        <Link to="/about">
                            <p
                                className={`mr-14 text-lg font-bold hover:text-primaryColor transition duration-300 linear ${
                                    router.pathname === '/about' ? 'text-primaryColor' : 'text-black'
                                }`}
                            >
                                Giới Thiệu
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
                                Liên Hệ
                            </p>
                        </Link>
                    </li>
                </ul>

                <div className="h-full flex items-center">
                    {hasUser ? (
                        <button className="relative flex justify-center items-center group">
                            <p className="text-lg text-textColor font-medium mr-3">{auth.fullName || 'Name User'}</p>
                            <FontAwesomeIcon
                                className="rotate-90 group-hover:rotate-0 transition-all"
                                icon={faCaretDown}
                            />
                            <div className="absolute top-7 left-0 w-[200px] hidden group-hover:block transition-all bg-white shadow rounded z-10">
                                <ul className="">
                                    <li
                                        onClick={() => navigate('/userinformation')}
                                        className="my-2 px-2 py-2 text-start mx-3 hover:text-primaryColor "
                                    >
                                        <FontAwesomeIcon className="mr-2" icon={faUser} />
                                        <span className="text-textColor font-medium hover:text-primaryColor">
                                            Thông Tin Cá Nhân
                                        </span>
                                    </li>
                                    {auth.role === 'Admin' && (
                                        <li
                                            onClick={() => navigate('/dashboard')}
                                            className="my-2 px-2 py-2 text-start mx-3 hover:text-primaryColor "
                                        >
                                            <FontAwesomeIcon className="mr-2" icon={faChartSimple} />
                                            <span className="text-textColor font-medium hover:text-primaryColor">
                                                Bảng Điều Khiển
                                            </span>
                                        </li>
                                    )}
                                    <li
                                        onClick={handleLogOut}
                                        className="my-2 px-2 py-2 text-start mx-3 hover:text-primaryColor "
                                    >
                                        <FontAwesomeIcon className="mr-2" icon={faRightFromBracket} />
                                        <span className="text-textColor font-medium hover:text-primaryColor">
                                            Đăng Xuất
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </button>
                    ) : (
                        <div className="">
                            <Link to="/login">
                                <button className="text-lg font-bold mr-3 hover:text-primaryColor">Đăng Nhập</button>
                            </Link>
                            <Link to="/signup">
                                <button className="text-lg text-white font-bold px-3 py-2 bg-primaryColor active:opacity-80 rounded">
                                    Đăng Ký
                                </button>
                            </Link>
                        </div>
                    )}

                    <FontAwesomeIcon icon={faBars} className="block lg:hidden text-2xl" />
                </div>
            </div>
        </header>
    );
};

export default Header;
