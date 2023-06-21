import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faUser } from '@fortawesome/free-solid-svg-icons';
import ChangePassword from './ChangePassword/ChangePassword';
import { useLocation, useNavigate } from 'react-router-dom';
import * as order from '../../services/Order';
import Xanh2 from '../../img/Xanh2.jpg';
import moment from 'moment/moment';
import * as userServer from '../../services/userServices';
import AuthContext from '../../context/authProvider';
import { ToastContainer, toast } from 'react-toastify';
import { updateUserProfile } from '../../services/userServices';
import OrderDetail from './OrderDetail/OrderDetail';
import { Spinner } from '@material-tailwind/react';

const UserInfomation = () => {
    const [activeButton, setActiveButton] = useState(1);
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [orderList, setOrderList] = useState([]);
    const navigate = useNavigate();
    const [submit, setSubmit] = useState(false);
    const location = useLocation();
    const { auth, setAuth } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [displayOrderDetail, setDisplayOrderDetail] = useState(false);
    const [dataOrder, setDataOrder] = useState({});
    const [loading, setLoading] = useState(false);

    const formattedNumber = (num) => {
        return num.toLocaleString('en-US').replace(/,/g, '.');
    };

    const handleButtonClick = (buttonId) => {
        setActiveButton(buttonId);
        setDisplayOrderDetail(false);
    };

    const handleSaveChanges1 = async (even) => {
        even.preventDefault();
        handleCheckInput();
        if (submit) {
            setLoading(true);
            const response = await updateUserProfile(
                auth.accessToken,
                email,
                fullname.replace(/\s\s+/g, ' '),
                phoneNumber,
                address.replace(/\s\s+/g, ' '),
            );
            console.log(typeof address);
            if (response.statusCode === 200) {
                setAuth({
                    ...auth,
                    fullName: fullname.replace(/\s\s+/g, ' '),
                    email: email,
                    address: address.replace(/\s\s+/g, ' '),
                    phoneNumber: phoneNumber,
                });
                // update localStorage
                localStorage.setItem(
                    'auth',
                    JSON.stringify({
                        ...auth,
                        fullName: fullname.replace(/\s\s+/g, ' '),
                        email: email,
                        address: address.replace(/\s\s+/g, ' '),
                        phoneNumber: phoneNumber,
                    }),
                );
                notify(response.message);
            } else {
                notify(response.errorMessage);
            }
            setIsEditing(false);
            setLoading(false);
        }
        setDisplayOrderDetail(false);
    };

    const handleCheckInput = () => {
        const emailRegex = /\S+@\S+\.\S+/;
        const isEmailValid = emailRegex.test(email);

        if (isEmailValid && email.endsWith('@gmail.com')) {
            // email is valid and ends with "@gmail.com"
            setSubmit(true);
        } else {
            // email is not valid or does not end with "@gmail.com"
            setSubmit(false);
            notify('Email Phải Có Đuôi "@gmail.com"');
        }
    };

    const handleCancelChanges = () => {
        setAddress(auth.address);
        setEmail(auth.email);
        setFullname(auth.fullName);
        setPhoneNumber(auth.phoneNumber);
        setIsEditing(false);
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
        if (location.state?.toastMessage !== '') {
            notify(location.state?.toastMessage);
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, []);

    useEffect(() => {
        if (auth.accessToken !== undefined) {
            const fetchCart = async () => {
                const response = await order.getOrder(auth.accessToken);
                if (response.statusCode === 200) {
                    setOrderList(response.orders);
                } else {
                    console.log(response.error);
                }
            };
            fetchCart();
        }
    }, [auth.accessToken]);

    useEffect(() => {
        const fetchData = async () => {
            if (auth.accessToken) {
                const response = await userServer.getUser(auth.accessToken);
                setEmail(response.email);
                setFullname(response.fullname);
                setAddress(response.address);
                setPhoneNumber(response.phone);
            }
            setIsEditing(false);
        };
        fetchData();
    }, [auth]);

    const handleViewDetail = (order) => {
        setDisplayOrderDetail(true);
        setDataOrder(order);
    };

    return (
        <>
            <ToastContainer />
            <div className="w-[70%] mx-auto my-4 flex font-medium text-left text-lg border border-solid shadow-lg rounded-md">
                <div
                    className="w-1/4 h-auto justify-center bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${Xanh2})` }}
                >
                    {/* Tên và hình đại diện của user */}
                    <div className="border-b border-solid border-green-800">
                        <div className="flex items-center my-3 ml-10 ">
                            <div>
                                <span className="ml-2 text-2xl">{auth.fullName}</span>
                                <div>
                                    <span className="ml-6 text-xs text-gray-900">
                                        <FontAwesomeIcon icon={faPen} className="mr-2" />
                                        Chỉnh sửa trang cá nhân
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* _________________________________Body____________________________________________ */}

                    <div className="h-80 mt-6 ml-14 ">
                        <span className="">
                            <FontAwesomeIcon icon={faUser} className="mr-4" />
                            Tài Khoản
                        </span>
                        <br />
                        <button
                            className={`text-base ${
                                activeButton === 1 ? 'text-red-700 font-bold' : 'text-black'
                            } ml-9 mt-3`}
                            onClick={() => handleButtonClick(1)}
                        >
                            Hồ Sơ Cá Nhân
                        </button>
                        <br />
                        <button
                            className={`text-base ${
                                activeButton === 2 ? 'text-red-700 font-bold' : 'text-black'
                            } ml-9 mt-3`}
                            onClick={() => handleButtonClick(2)}
                        >
                            Đơn Hàng
                        </button>
                        <br />
                        <button
                            className={`text-base ${
                                activeButton === 3 ? 'text-red-700 font-bold' : 'text-black'
                            } ml-9 mt-3`}
                            onClick={() => handleButtonClick(3)}
                        >
                            Thay Đổi Mật Khẩu
                        </button>
                    </div>
                </div>

                <div className="h-auto w-3/4 mb-12">
                    {/* ------------------------------Header colum 2------------------------------------------ */}
                    <div className="border border-solid border-green-800 bg-light-green-300 pt-4 pb-[10px]">
                        {activeButton === 1 && (
                            <div>
                                <span className="text-xl ml-12">Thông tin cá nhân</span>
                                <br />
                                <span className="text-xs text-gray-900 ml-10">
                                    Quản lý thông tin hồ sơ để bảo mật tài khoản
                                </span>
                            </div>
                        )}
                        {activeButton === 2 && (
                            <div>
                                <span className="text-xl ml-12">Đơn hàng của bạn</span>
                                <br />
                                <span className="text-xs text-gray-900 ml-16">
                                    Quản lý những đơn hàng mà bạn đã đặt
                                </span>
                            </div>
                        )}
                        {activeButton === 3 && (
                            <div>
                                <span className="text-xl ml-12">Mật khẩu của bạn</span>
                                <br />
                                <span className="text-xs text-gray-900 ml-16">
                                    Quản lý và thay đổi mật khẩu của tài khoản để bảo mật tốt hơn
                                </span>
                            </div>
                        )}
                    </div>
                    {/* --------------------------Body colum 2 ------------------------------------------ */}
                    <div className="relative">
                        <div className="ml-20 my-20">
                            {activeButton === 1 && (
                                <>
                                    {isEditing ? (
                                        <form className="text-black">
                                            <div>
                                                <div className="flex items-center mb-9">
                                                    <div className="w-1/4">
                                                        <span>Email : </span>
                                                    </div>
                                                    <div className="w-3/4">
                                                        <input
                                                            id="input-email"
                                                            required
                                                            type="email"
                                                            autoComplete="email"
                                                            placeholder="youraccount@gmail.com"
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            value={email}
                                                            className="mb-2 w-4/5 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primaryColor"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex items-center mb-9">
                                                    <div className="w-1/4">
                                                        <span>Họ và Tên : </span>
                                                    </div>
                                                    <div className="w-3/4">
                                                        <input
                                                            id="input-fullName"
                                                            type="text"
                                                            value={fullname}
                                                            onChange={(e) => setFullname(e.target.value)}
                                                            placeholder="Name"
                                                            className="w-4/5 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primaryColor"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex items-center mb-9">
                                                    <div className="w-1/4">
                                                        <span>Số điện thoại : </span>
                                                    </div>
                                                    <div className="w-3/4">
                                                        <input
                                                            id="input-phoneNumber"
                                                            type="text"
                                                            value={phoneNumber}
                                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                                            placeholder="Name"
                                                            className="w-4/5 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primaryColor"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex items-center mb-9">
                                                    <div className="w-1/4">
                                                        <span>Địa chỉ : </span>
                                                    </div>
                                                    <div className="w-3/4">
                                                        <input
                                                            id="input-address"
                                                            type="text"
                                                            value={address}
                                                            onChange={(e) => setAddress(e.target.value)}
                                                            placeholder="Địa chỉ"
                                                            className="w-4/5 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primaryColor"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex mt-8 absolute right-14">
                                                    <button
                                                        className="bg-primaryColor hover:opacity-80 text-white font-semibold py-2 px-6 rounded-lg"
                                                        onClick={handleSaveChanges1}
                                                    >
                                                        {loading ? (
                                                            <div className="flex items-center justify-center">
                                                                <Spinner className="h-6 w-6 mr-4" />{' '}
                                                                <span>Đang lưu...</span>
                                                            </div>
                                                        ) : (
                                                            <span>Lưu</span>
                                                        )}
                                                    </button>
                                                    <button
                                                        className="ml-2 text-red-500 hover:text-red-600 font-semibold"
                                                        onClick={handleCancelChanges}
                                                    >
                                                        Hủy
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    ) : (
                                        <div>
                                            <div className="flex items-center mb-9">
                                                <div className="w-1/4">
                                                    <h1>Email: </h1>
                                                </div>
                                                <div className="w-3/4">
                                                    <h3 className="">{auth.email}</h3>
                                                </div>
                                            </div>

                                            <div className="flex items-center mb-9">
                                                <div className="w-1/4">
                                                    <h1 className="">Họ và Tên: </h1>
                                                </div>
                                                <div className="w-3/4">
                                                    <h3 className="">{auth.fullName}</h3>
                                                </div>
                                            </div>

                                            <div className="flex items-center mb-9">
                                                <div className="w-1/4">Số Điện Thoại: </div>
                                                <div className="w-3/4">
                                                    <h3 className="">{auth.phoneNumber}</h3>
                                                </div>
                                            </div>
                                            <div className="flex items-center mb-9">
                                                <div className="w-1/4">
                                                    <h1>Địa chỉ: </h1>
                                                </div>
                                                <div className="w-3/4">
                                                    <h3 className="">{auth.address}</h3>
                                                </div>
                                            </div>

                                            <div className="flex ml-64 absolute right-14">
                                                <div
                                                    className="text-white bg-primaryColor hover:bg-green-300 font-semibold py-2 px-6 mt-4 border rounded-lg cursor-pointer"
                                                    onClick={() => setIsEditing(true)}
                                                >
                                                    <span className="mb-10">Thay đổi</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {/* ---------------------------------------------------------------------------------------------------------------------------------------*/}
                        <div className="mx-2 h-auto">
                            {activeButton === 2 && (
                                <>
                                    <div className="grid">
                                        <div className="w-full flex border-b border-green-800">
                                            <div className="col-1 w-[10%] py-4 text-lg font-bold text-primaryColor text-center ">
                                                ID
                                            </div>

                                            <div className="col-2 w-[35%] py-4 text-lg font-bold text-primaryColor text-center">
                                                Địa chỉ
                                            </div>

                                            <div className="col-3 w-[20%] py-4 text-lg font-bold text-primaryColor text-center">
                                                Tổng tiền
                                            </div>

                                            <div className="col-4 w-[20%] py-4 text-lg font-bold text-primaryColor text-center">
                                                Ngày đặt
                                            </div>

                                            <div className="col-5 w-[15%] py-4 text-lg font-bold text-primaryColor text-center">
                                                Trạng thái
                                            </div>
                                        </div>

                                        {orderList.length > 0 ? (
                                            orderList.map((order) => (
                                                <div
                                                    key={order.id}
                                                    className="w-full flex mb-4 hover:cursor-pointer shadow"
                                                    onClick={() => handleViewDetail(order)}
                                                >
                                                    <div className="py-4 w-[10%] text-center text-blue-gray-900 font-extrabold">
                                                        {order.id}
                                                    </div>

                                                    <div className="w-[35%] py-4 truncate inline-block text-center">
                                                        {order.address}
                                                    </div>

                                                    <div className="py-4 pl-2 w-[20%] text-center">
                                                        <span>{formattedNumber(order.totalAmount + 25000)} đ</span>
                                                    </div>

                                                    <div className="py-4 w-[20%] text-center">
                                                        {moment(order.createdAt).format('DD/MM/YYYY')}
                                                    </div>

                                                    <div
                                                        className={`py-4 px-1 w-[15%] text-center text-base font-bold ${
                                                            order.status === 'Đã đặt'
                                                                ? 'text-primaryColor'
                                                                : 'text-red-700'
                                                        }`}
                                                    >
                                                        {order.status}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <h3 className="mt-4 text-xl font-bold flex justify-center text-gray-800">
                                                Không Có Đơn Hàng Nào
                                            </h3>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Change Password */}
                        <div className="ml-20">
                            {activeButton === 3 && (
                                <>
                                    <ChangePassword />
                                </>
                            )}
                        </div>
                    </div>
                </div>
                {/* -------------------------column 3------------------ */}
            </div>
            {displayOrderDetail && (
                <div className="">
                    <OrderDetail order={dataOrder} />
                </div>
            )}
        </>
    );
};

export default UserInfomation;
