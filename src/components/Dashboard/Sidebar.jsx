import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { faBagShopping, faDoorOpen, faHomeAlt, faHouse, faShirt, faShop, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/authProvider';

const Sidebar = () => {
    const router = useLocation();
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext) 
    const sidebar = [
        { name: 'Overview', icon: faHouse, to: '/dashboard' },
        { name: 'Products', icon: faShirt, to: '/dashboard/list-product' },
        { name: 'Users', icon: faUsers, to: '/dashboard/list-user' },
        { name: 'Orders', icon: faBagShopping, to: '/dashboard/orders' },
    ];
    const handleLogOut = () => {
        setAuth({})
        navigate('/login')
    }
    return (
        <aside className="fixed top-0 left-0 bottom-0 z-20 py-6 px-10 w-64 border-r-2 border-gray-200 bg-gradient-to-r to-green-300 from-primaryColor rounded-r-xl">
            <div className="pt-3 w-24 hidden lg:flex lg:justify-center lg:items-center">
                <img
                    className="h-[36px] w-[36px] rounded-[50%] border-4 border-[#ccc]"
                    src="https://us.123rf.com/450wm/tuktukdesign/tuktukdesign1912/tuktukdesign191200146/134984546-profile-icon-vector-male-user-person-avatar-with-gear-cogwheel-for-settings-and-configuration-in.jpg?ver=6"
                    alt="ImageUser"
                />
                <h3 className="text-[#252525] text-xl font-bold px-3">ADMIN</h3>
            </div>
            <ul className="flex flex-col gap-y-6 pt-16 pb-7">
                {sidebar.map((item, index) => (
                    <li key={index}>
                        <FontAwesomeIcon
                            icon={item.icon}
                            className={`${router.pathname === item.to && 'text-blue-gray-900 font-extrabold'}`}
                        />
                        <Link
                            to={item.to}
                            className={`pl-3 text-blue-gray-900 hover:text-black ${router.pathname === item.to &&
                                'text-blue-gray-900 font-extrabold'}`}
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <ul className="flex flex-col gap-y-6 pt-[17rem]">
                <li>
                    <FontAwesomeIcon icon={faShop} />
                    <Link to="/" className="pl-3  text-blue-gray-900 hover:text-black">
                        Shop
                    </Link>
                </li>
                <li>
                    <FontAwesomeIcon icon={faCircleUser} />
                    <Link to="/userinformation" className="pl-3  text-blue-gray-900 hover:text-black">
                        Account
                    </Link>
                </li>
                <li>
                    <FontAwesomeIcon icon={faDoorOpen} />
                    <button className="pl-3 text-blue-gray-900 hover:text-black" onClick={handleLogOut}>Log out</button>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
