import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import * as userServer from '../../services/userServices';
import AuthContext from '../../context/authProvider';
import { ToastContainer, toast } from 'react-toastify';

const CheckoutPage = () => {
    const [fullname, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [hasUser, setHasUser] = useState(false);
    const { auth } = useContext(AuthContext);

    const handleSaveChanges = async (even) => {
        even.preventDefault();
        const response = await userServer.updateUserProfileCheckout(auth.accessToken, address, fullname, phoneNumber);
        if (response.statusCode === 200) {
            notify(response.message);
        } else {
            notify(response.errorMessage);
        }
        setIsEditing(false);
    };

    const handleCancelChanges = () => {
        // Hủy bỏ các thay đổi và đóng form chỉnh sửa
        setIsEditing(false);
    };

    const [paymentMethod, setPaymentMethod] = useState(''); // Biến state cho phương thức thanh toán

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value); // Cập nhật giá trị biến state paymentMethod khi thay đổi
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
        const fetchData = async () => {
            if (auth.accessToken) {
                const response = await userServer.getUser(auth.accessToken);
                setFullName(response.fullname);
                setAddress(response.address);
                setPhoneNumber(response.phone);
            } else {
                setHasUser(false);
            }
            setIsEditing(false);
        };

        fetchData();
    }, [auth]);
    const products = [
        {
            id: 1,
            name: 'Ống hút bằng tre',
            description: 'Thân thiện với môi trường',
            price: '100,000 VND',
            quantity: 100,
            total: '10,000,000 VND',
            src: 'https://naturallyvietnam.com/wp-content/uploads/2020/05/ng-h%C3%BAt-tre-1.jpg',
        },
        // Add more products here
        {
            id: 2,
            name: 'Ống hút gạo',
            description: 'Thân thiện với môi trường',
            price: '30,000 VND',
            quantity: 10,
            total: '300,000 VND',
            src: 'https://naturallyvietnam.com/wp-content/uploads/2020/05/ng-h%C3%BAt-tre-1.jpg',
        },
    ];

    return (
        <>
            <ToastContainer />
            <div>
                {/* header checkout */}
                <div className="h-20 flex items-center mx-auto border pl-10 max-w-[866px]">
                    <div className="w-14 h-14 flex items-center justify-center text-white text-3xl font-bold mr-4">
                        <img
                            src="https://cdn.icon-icons.com/icons2/1786/PNG/128/shoppingcart-checkout_114473.png"
                            alt="Logo"
                            className="h-10 w-10 mr-2"
                        />
                    </div>
                    <h1 className="text-3xl font-semibold text-primaryColor">CheckOut</h1>
                </div>
                {/* body checkout */}
                <div className="max-w-2xl mx-auto text-primaryColor shadow-lg rounded-lg px-8 py-6 mt-8">
                    {/* Body information user */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-6">
                            <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                            Delivery Address
                        </h2>

                        {/* edi information user */}

                        {isEditing ? (
                            <form className="text-black">
                                <div className="flex flex-col-2 ">
                                    <div className="w-full md:w-1/2 px-4 mt-2">
                                        <div className="mb-5 flex items-center">
                                            <div>
                                                <span className="text-primaryColor font-bold">Full Name : </span>
                                                <input
                                                    type="text"
                                                    value={fullname}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                    placeholder="Name"
                                                    className="mt-2 ml-4 w-60 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primaryColor"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-9 flex items-center mt-8">
                                            <div>
                                                <span className="text-primaryColor font-bold">Address : </span>

                                                <input
                                                    type="text"
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                    placeholder="Name"
                                                    className="mb-32 ml-6 w-80 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primaryColor"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2 px-4 mt-2">
                                        <div className="mb-5 flex items-center">
                                            <div>
                                                <span className="text-primaryColor font-bold">Phone Number : </span>
                                                <input
                                                    type="text"
                                                    value={phoneNumber}
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                    placeholder="Name"
                                                    className="mt-2 ml-4 w-60 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primaryColor"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex ml-auto items-center justify-center mt-32">
                                            <div className="flex">
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
                                        </div>
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <div className="flex flex-col-2 ml-2 ">
                                <div className="w-full md:w-1/2 px-4 mt-2">
                                    <div className="mb-5 flex items-center">
                                        <h1 className="font-bold">Full Name:</h1>
                                        <h3 className="ml-2 text-black">{fullname}</h3>
                                    </div>
                                    <div className="mb-9 flex flex-wrap items-center mt-8">
                                        <h1 className="font-bold">Address:</h1>
                                        <span className="ml-4 h-auto min-h-8 w-64 text-black">{address}</span>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 px-4 mt-2">
                                    <div className="mb-5 flex items-center">
                                        <h1 className="font-bold">Phone Number:</h1>
                                        <h3 className="ml-2 text-black">{phoneNumber}</h3>
                                    </div>
                                    <div className="flex ml-auto items-center justify-center mt-16">
                                        <div
                                            className="text-white bg-primaryColor hover:bg-green-300 font-semibold py-2 px-6 mt-4 border rounded-lg cursor-pointer"
                                            onClick={() => setIsEditing(true)}
                                        >
                                            <span className="mr-2">Change</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Body information Product */}

                    <div className="mb-4">
                        <h3 className="text-2xl font-semibold mb-6">Product</h3>
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4"></th>
                                    <th className="py-2 px-4"></th>
                                    <th className="py-2 px-4 text-black">Price</th>
                                    <th className="py-2 px-4 text-black">Quantity</th>
                                    <th className="py-2 px-4 text-black">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td className="py-2 px-4">
                                            <div className="flex items-center">
                                                <img
                                                    src={product.src}
                                                    alt={product.name}
                                                    className="w-12 h-12 rounded-lg mr-4"
                                                />
                                                <div>
                                                    <p className="text-gray-700">{product.name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 text-black">{product.description}</td>
                                        <td className="py-2 px-4 text-black">{product.price}</td>
                                        <td className="py-2 px-4 text-black">{product.quantity}</td>
                                        <td className="py-2 px-4 text-black">{product.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mb-2 text-black text-sm text-right">
                        <h3>Total amount : 5000000vnd</h3>
                    </div>

                    {/* body Payment methods */}

                    <div className="mb-4 mt-5">
                        <h3 className="text-2xl font-semibold mb-6">Payment methods</h3>
                        <select
                            id="paymentMethod"
                            className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={paymentMethod}
                            onChange={handlePaymentMethodChange}
                        >
                            <option value="bankTransfer">Payment via bank account</option>
                            <option value="cod">Payment on delivery (COD)</option>
                        </select>
                    </div>

                    {/* total ship + product */}
                    <div className="mb-2 text-black text-sm text-right">
                        <table className="float-right">
                            <tbody>
                                <tr>
                                    <td>Total amount:</td>
                                    <td>5000000vnd</td>
                                </tr>
                                <tr>
                                    <td>Transport Fee:</td>
                                    <td>1500000</td>
                                </tr>
                                <tr>
                                    <td>Total Payment:</td>
                                    <td>
                                        <h1 className="text-primaryColor inline-block">217381294871</h1>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* pay money */}
                    <div className="flex justify-between items-center mt-40">
                        <div className="text-black text-sm">
                            <h3>Click on the link to display the terms GreenEco</h3>
                        </div>
                        <button className="bg-primaryColor hover:bg-blue-300 text-white font-semibold py-2 px-6 rounded-lg focus:outline-none">
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CheckoutPage;
