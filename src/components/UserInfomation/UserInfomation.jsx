import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faUser } from '@fortawesome/free-solid-svg-icons';
import ChangePassword from '../ChangePassword/ChangePassword';
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

const UserInfomation = () => {
    const [activeButton, setActiveButton] = useState(null);
    const [email, setEmail] = useState('Taolaquang2402@gmail.com');
    const [fullname, setFullname] = useState('Thiên Quang');
    const [address, setAddress] = useState('hòa khánh nam, Liên Chiểu, Đà Nắng');
    const [phoneNumber, setPhoneNumber] = useState('(+84)397881543');

    // const [showPassword, setShowPassword] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [showImageList, setShowImageList] = useState(false);

    const [isEditing, setIsEditing] = useState(false);

    const handleButtonClick = (buttonId) => {
        setActiveButton(buttonId);
    };

    const handleSaveChanges = () => {
        setIsEditing(false);
    };

    const handleCancelChanges = () => {
        setIsEditing(false);
    };

    // const handleTogglePassword = () => {
    //     setShowPassword(!showPassword);
    // };
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

    useEffect(() => {
        setIsEditing(false); // Reset form and isEditing when activeButton changes
    }, [activeButton]);

    return (
        <div className="w-4/5 mx-auto my-4 flex">
            <div className="w-1/4 h-80 justify-center">
                {/* ____________logo___________________________ */}
                <div className="flex items-center my-3 ml-16">
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
                            <span className="text-xs text-gray-400">
                                <FontAwesomeIcon icon={faPen} className="mr-2" />
                                Edit Profile
                            </span>
                        </div>
                    </div>
                </div>

                {/* _________________________________Body____________________________________________ */}

                <div className="h-80 mt-6 ml-32 ">
                    <span className="">
                        <FontAwesomeIcon icon={faUser} className="mr-4" />
                        My account
                    </span>
                    <br />
                    <button
                        className={`text-base ${
                            activeButton === 1 ? 'text-red-700 font-bold' : 'text-gray-400'
                        } ml-9 mt-3`}
                        onClick={() => handleButtonClick(1)}
                    >
                        Profile
                    </button>
                    <br />
                    <button
                        className={`text-base ${
                            activeButton === 2 ? 'text-red-700 font-bold' : 'text-gray-400'
                        } ml-9 mt-3`}
                        onClick={() => handleButtonClick(2)}
                    >
                        Address
                    </button>
                    <br />
                    <button
                        className={`text-base ${
                            activeButton === 3 ? 'text-red-700 font-bold' : 'text-gray-400'
                        } ml-9 mt-3`}
                        onClick={() => handleButtonClick(3)}
                    >
                        Change Password
                    </button>
                </div>
            </div>
            <div className="h-80 w-1/2 mt-4 mb-12">
                {/* ------------------------------Header colum 2------------------------------------------ */}
                <div>
                    {activeButton === 1 && (
                        <>
                            <div className="ml-12">
                                <span className="">My Profile</span>
                                <br />
                                <span className="text-xs text-gray-400">
                                    Manage profile information for account security
                                </span>
                            </div>
                        </>
                    )}
                    {activeButton === 2 && (
                        <>
                            <div className="ml-12">
                                <span className="">My Address</span>
                                <br />
                                <span className="text-xs text-gray-400">Manage and change your delivery address</span>
                            </div>
                        </>
                    )}
                    {activeButton === 3 && (
                        <>
                            <div className="ml-12">
                                <span className="">My Password</span>
                                <br />
                                <span className="text-xs text-gray-400">
                                    Manage and change account passwords to prevent theft
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
                                            <span className="mr-14 mr-1">Email : </span>
                                            <input
                                                type="text"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Name"
                                                className="mb-2 ml-6 w-80 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primaryColor"
                                            />
                                        </div>
                                        <br />
                                        <div>
                                            <span className="mr-8">Full Name : </span>
                                            <input
                                                type="text"
                                                value={fullname}
                                                onChange={(e) => setFullname(e.target.value)}
                                                placeholder="Name"
                                                className="mb-2 ml-4 w-80 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primaryColor"
                                            />
                                        </div>
                                        <br />
                                        <div>
                                            <span className="">Phone Number : </span>
                                            <input
                                                type="text"
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                placeholder="Name"
                                                className="mb-2 ml-4 w-80 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primaryColor"
                                            />
                                        </div>
                                        <div className="flex ml-64 mt-8">
                                            <button
                                                className="bg-primaryColor hover:bg-green-300 text-white font-semibold py-2 px-6 rounded-lg"
                                                onClick={handleSaveChanges}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="ml-2 ml-4  text-red-500 hover:text-red-600 font-semibold"
                                                onClick={handleCancelChanges}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div>
                                        <div className="flex items-center mb-9 ">
                                            <h1 className="mb-2">Email :</h1>
                                            <h3 className="ml-20 ">{email}</h3>
                                        </div>

                                        <div className="flex items-center mb-9 ">
                                            <h1 className="mb-2">Full Name :</h1>
                                            <h3 className="ml-14">{fullname}</h3>
                                        </div>

                                        <div className="flex items-center mb-5">
                                            <h1 className="mb-2">Phone Number :</h1>
                                            <h3 className="ml-3">{phoneNumber}</h3>
                                        </div>

                                        <div className="flex ml-64">
                                            <div
                                                className="text-white bg-primaryColor hover:bg-green-300 font-semibold py-2 px-6 mt-4 border rounded-lg cursor-pointer"
                                                onClick={() => setIsEditing(true)}
                                            >
                                                <span className="mr-2 ">Change</span>
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
                                            <span className="mr-14">Address : </span>
                                            <input
                                                type="text"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                placeholder="Name"
                                                className="mb-32 ml-6 w-80 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primaryColor"
                                            />
                                        </div>
                                        <div className="flex ml-64 mt-8">
                                            <button
                                                className="bg-primaryColor hover:bg-green-300 text-white font-semibold py-2 px-6 rounded-lg"
                                                onClick={handleSaveChanges}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="ml-2 ml-4  text-red-500 hover:text-red-600 font-semibold"
                                                onClick={handleCancelChanges}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div>
                                        <div className="flex items-center mb-20 ">
                                            <h1>Address :</h1>
                                            <h3 className="ml-4">{address}</h3>
                                        </div>
                                        <div className="flex ml-64">
                                            <div
                                                className="text-white bg-primaryColor hover:bg-green-300 font-semibold py-2 px-6 mt-6 border rounded-lg cursor-pointer"
                                                onClick={() => setIsEditing(true)}
                                            >
                                                <button className="mr-2 ">Change</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    <div className="ml-20">
                        {activeButton === 3 && (
                            <>
                            <ChangePassword/>                              
                            </>
                        )}
                    </div>
                </div>
            </div>
            {/* -------------------------column 3------------------ */}
            <div className="h-80 w-1/4">
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
                            Select Image
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
    );
};

export default UserInfomation;