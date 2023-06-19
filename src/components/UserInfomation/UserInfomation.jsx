import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faB, faPen, faUser } from '@fortawesome/free-solid-svg-icons';
import ChangePassword from '../ChangePassword/ChangePassword';
import { useLocation, useNavigate } from 'react-router-dom';

//server
import * as userServer from '../../services/userServices';
import AuthContext from '../../context/authProvider';
import { ToastContainer, toast } from 'react-toastify';

import hinhnam1 from '../../img/hinhnam1.jpg';
import hinhnam2 from '../../img/hinhnam2.jpg';
import hinhnam3 from '../../img/hinhnam3.jpg';
import hinhnamvip from '../../img/hinhnamvip.jpg';
import hinhnu2 from '../../img/hinhnu2.jpg';
import hinhnu3 from '../../img/hinhnu3.jpg';
import hinhnu4 from '../../img/hinhnu4.jpg';
import namngau from '../../img/namngau.jpg';
import namtricker from '../../img/namtricker.jpg';
import nuandanh from '../../img/nuandanh.jpg';
import nutocbui from '../../img/nutocbui.jpg';
import nutocngan from '../../img/nutocngan.jpg';
import { updateUserAddress, updateUserProfile } from '../../services/userServices';
import { getUser } from '../../ultis/request';

const UserInfomation = () => {
    const [activeButton, setActiveButton] = useState(1);
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    // const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState('');
    const [showImageList, setShowImageList] = useState(false);
    const [submit, setSubmit] = useState(false);
    const location = useLocation();

    const { auth } = useContext(AuthContext); // truy cập vào server để lấy access token trên header
    const [isEditing, setIsEditing] = useState(false);
    const [hasUser, setHasUser] = useState(false);

    const handleButtonClick = (buttonId) => {
        setActiveButton(buttonId);
    };

    const handleSaveChanges1 = async (even) => {
        even.preventDefault();
        handleCheckInput();
        if (submit) {
            const response = await updateUserProfile(auth.accessToken, email, fullname, phoneNumber);
            if (response.statusCode === 200) {
                notify(response.message);
            } else {
                notify(response.errorMessage);
            }
            setIsEditing(false);
        }
    };

    const handleSaveChanges2 = async (even) => {
        even.preventDefault();
        const response = await updateUserAddress(auth.accessToken, address);
        if (response.statusCode === 200) {
            notify(response.message);
        } else {
            notify(response.errorMessage);
        }

        setIsEditing(false);
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
            notify('Email is not valid with "@gmail.com"');
        }
    };

    const handleCancelChanges = () => {
        setIsEditing(false);
    };

    const imageList = [
        { id: 1, url: hinhnam1 },
        { id: 2, url: hinhnam2 },
        { id: 3, url: hinhnam3 },
        { id: 4, url: hinhnamvip },
        { id: 5, url: hinhnu2 },
        { id: 6, url: hinhnu3 },
        { id: 7, url: hinhnu4 },
        { id: 8, url: namngau },
        { id: 9, url: namtricker },
        { id: 10, url: nuandanh },
        { id: 11, url: nutocbui },
        { id: 12, url: nutocngan },
    ];

    const handleImageSelect = (imageUrl) => {
        setSelectedImage(imageUrl.url);
        setShowImageList(false);
    };

    const toggleImageList = () => {
        setShowImageList(!showImageList);
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
        const fetchData = async () => {
            if (auth.accessToken) {
                const response = await userServer.getUser(auth.accessToken);
                setEmail(response.email);
                setFullname(response.fullname);
                setAddress(response.address);
                setPhoneNumber(response.phone);
            } else {
                setHasUser(false);
            }
            setIsEditing(false);
        };

        fetchData();
    }, [auth]);

    //responsive

    return (
        <>
            <ToastContainer />
            <div className="w-4/5 mx-auto my-4 flex">
                <div className="w-1/4 h-80 justify-center border-r border-solid border-green-800">
                    {/* Tên và hình đại diện của user */}
                    <div className="border-b border-solid border-green-800">
                        <div className="flex items-center my-3 ml-16 ">
                            <div
                                className="w-12 h-12 bg-gray-300 rounded-full"
                                style={{
                                    backgroundImage: `url(${selectedImage})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            ></div>
                            <div>
                                <span className="ml-2">{fullname}</span>
                                <div>
                                    <span className="ml-2 text-xs text-gray-400">
                                        <FontAwesomeIcon icon={faPen} className="mr-2" />
                                        Chỉnh sửa trang cá nhân
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* _________________________________Body____________________________________________ */}

                    <div className="h-80 mt-6 ml-32 ">
                        <span className="">
                            <FontAwesomeIcon icon={faUser} className="mr-4" />
                            Tài khoản
                        </span>
                        <br />
                        <button
                            className={`text-base ${
                                activeButton === 1 ? 'text-red-700 font-bold' : 'text-gray-400'
                            } ml-9 mt-3`}
                            onClick={() => handleButtonClick(1)}
                        >
                            Hồ sơ cá nhân
                        </button>
                        <br />
                        <button
                            className={`text-base ${
                                activeButton === 2 ? 'text-red-700 font-bold' : 'text-gray-400'
                            } ml-9 mt-3`}
                            onClick={() => handleButtonClick(2)}
                        >
                            Địa chỉ
                        </button>
                        <br />
                        <button
                            className={`text-base ${
                                activeButton === 3 ? 'text-red-700 font-bold' : 'text-gray-400'
                            } ml-9 mt-3`}
                            onClick={() => handleButtonClick(3)}
                        >
                            Thay đổi mật khẩu
                        </button>
                    </div>
                </div>
                <div className="h-auto w-1/2 mt-4 mb-12">
                    {/* ------------------------------Header colum 2------------------------------------------ */}
                    <div className="pb-2 border-b border-solid border-green-800">
                        {activeButton === 1 && (
                            <>
                                <div className="ml-12">
                                    <span className="">Thông tin cá nhân</span>
                                    <br />
                                    <span className="text-xs text-gray-400">
                                        Quản lý thông tin hồ sơ để bảo mật tài khoản
                                    </span>
                                </div>
                            </>
                        )}
                        {activeButton === 2 && (
                            <>
                                <div className="ml-12">
                                    <span className="">Địa chỉ của bạn</span>
                                    <br />
                                    <span className="text-xs text-gray-400">
                                        Quản lý và thay đổi địa chỉ giao hàng của bạn
                                    </span>
                                </div>
                            </>
                        )}
                        {activeButton === 3 && (
                            <>
                                <div className="ml-12">
                                    <span className="">Mật khẩu của bạn</span>
                                    <br />
                                    <span className="text-xs text-gray-400">
                                        Quản lý và thay đổi mật khẩu của tài khoản để bảo mật tốt hơn
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                    {/* --------------------------Body colum 2 ------------------------------------------ */}
                    <div>
                        <div className="ml-20 mt-12">
                            {activeButton === 1 && (
                                <>
                                    {isEditing ? (
                                        <form className="text-black">
                                            <div>
                                                <div class="flex items-center mb-9">
                                                    <div class="w-1/4">
                                                        <span>Email : </span>
                                                    </div>
                                                    <div class="w-3/4">
                                                        <input
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

                                                <div class="flex items-center mb-9">
                                                    <div class="w-1/4">
                                                        <span>Họ và Tên : </span>
                                                    </div>
                                                    <div class="w-3/4">
                                                        <input
                                                            type="text"
                                                            value={fullname}
                                                            onChange={(e) => setFullname(e.target.value)}
                                                            placeholder="Name"
                                                            className="w-4/5 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primaryColor"
                                                        />
                                                    </div>
                                                </div>

                                                <div class="flex items-center mb-5">
                                                    <div class="w-1/4">
                                                        <span>Số điện thoại : </span>
                                                    </div>
                                                    <div class="w-3/4">
                                                        <input
                                                            type="text"
                                                            value={phoneNumber}
                                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                                            placeholder="Name"
                                                            className="w-4/5 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primaryColor"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex ml-64 mt-8">
                                                    <button
                                                        className="bg-primaryColor hover:bg-green-300 text-white font-semibold py-2 px-6 rounded-lg"
                                                        onClick={handleSaveChanges1}
                                                    >
                                                        Lưu
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
                                            <div class="flex items-center mb-9">
                                                <div class="w-1/4">
                                                    <h1>Email :</h1>
                                                </div>
                                                <div class="w-3/4">
                                                    <h3 class="">{email}</h3>
                                                </div>
                                            </div>

                                            <div class="flex items-center mb-9">
                                                <div class="w-1/4">
                                                    <h1 class="">Họ và Tên :</h1>
                                                </div>
                                                <div class="w-3/4">
                                                    <h3 class="">{fullname}</h3>
                                                </div>
                                            </div>

                                            <div class="flex items-center mb-5">
                                                <div class="w-1/4">
                                                    <h1 class="">Số điện thoại :</h1>
                                                </div>
                                                <div class="w-3/4">
                                                    <h3 class="">{phoneNumber}</h3>
                                                </div>
                                            </div>

                                            <div className="flex ml-64">
                                                <div
                                                    className="text-white bg-primaryColor hover:bg-green-300 font-semibold py-2 px-6 mt-4 border rounded-lg cursor-pointer"
                                                    onClick={() => setIsEditing(true)}
                                                >
                                                    <span className="mr-2 ">Thay đổi</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {/* ---------------------------------------------------------------------------------------------------------------------------------------*/}
                        <div className="ml-20">
                            {activeButton === 2 && (
                                <>
                                    {isEditing ? (
                                        <form className="text-black">
                                            <div>
                                                <div class="flex items-center justify-center mb-9">
                                                    <div class="w-1/4">
                                                        <span>Địa chỉ :</span>
                                                    </div>
                                                    <div class="w-3/4">
                                                        
                                                            <input
                                                                type="text"
                                                                value={address}
                                                                onChange={(e) => setAddress(e.target.value)}
                                                                placeholder="Địa chỉ"
                                                                className="w-4/5 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primaryColor"
                                                            />
                                                        </div>
                                                    
                                                </div>

                                                <div className="flex ml-64 mt-8">
                                                    <button
                                                        className="bg-primaryColor hover:bg-green-300 text-white font-semibold py-2 px-6 rounded-lg"
                                                        onClick={handleSaveChanges2}
                                                    >
                                                        Lưu
                                                    </button>
                                                    <button
                                                        className="ml-2 ml-4  text-red-500 hover:text-red-600 font-semibold"
                                                        onClick={handleCancelChanges}
                                                    >
                                                        Hủy
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    ) : (
                                        <div>
                                            <div class="flex items-center mb-5">
                                                <div class="w-1/4">
                                                    <h1>Địa chỉ :</h1>
                                                </div>
                                                <div class="w-3/4">
                                                    <h3 class="">{address}</h3>
                                                </div>
                                            </div>

                                            <div className="flex ml-64">
                                                <div
                                                    className="text-white bg-primaryColor hover:bg-green-300 font-semibold py-2 px-6 mt-6 border rounded-lg cursor-pointer"
                                                    onClick={() => setIsEditing(true)}
                                                >
                                                    <button className="mr-2 ">Thay đổi</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
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
                <div className="h-80 w-1/4 border border-solid border-green-800">
                    <div className="flex flex-col justify-center items-center h-full">
                        <div
                            className="w-12 h-12 bg-gray-300 rounded-full"
                            style={{
                                backgroundImage: `url(${selectedImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        ></div>
                        <div className="mt-2">
                            <button
                                type="button"
                                onClick={toggleImageList}
                                className="btn btn-light btn-sm inline-flex items-center border"
                            >
                                Chọn hình đại diện
                            </button>
                            {showImageList && (
                                <div className="mt-2">
                                    <div className="grid grid-cols-3 gap-2">
                                        {imageList.map((image) => (
                                            <div
                                                key={image.id}
                                                className="w-12 h-12 bg-gray-300 rounded-full"
                                                style={{
                                                    backgroundImage: `url('${image.url}')`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => handleImageSelect(image)}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserInfomation;
