import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import * as userServer from '../../services/userServices';
import AuthContext from '../../context/authProvider';
import { ToastContainer, toast } from 'react-toastify';
import * as cartServices from '../../services/cartServices';
import * as orders from '../../services/Order';
import { useNavigate } from 'react-router';
import { Spinner } from '@material-tailwind/react';

const CheckoutPage = () => {
    const navigation = useNavigate();
    const [fullname, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [hasUser, setHasUser] = useState(false);
    const { auth, setAuth } = useContext(AuthContext);
    const [cartList, setCartList] = useState([]);
    const [totalAmount, setTotalAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState(''); // Biến state cho phương thức thanh toán
    const [loading, setLoading] = useState(false);
    const [infoLoading, setInfoLoading] = useState(false);
    const TransportFee = 25000;

    const formattedNumber = (num) => {
        return num.toLocaleString('en-US').replace(/,/g, '.');
    };

    const handleSaveChanges = async (even) => {
        even.preventDefault();
        setInfoLoading(true)
        const response = await userServer.updateUserProfileCheckout(
            auth.accessToken,
            address.replace(/\s\s+/g, ' '),
            fullname.replace(/\s\s+/g, ' '),
            phoneNumber,
        );
        if (response.statusCode === 200) {
            setAuth({
                ...auth,
                fullName: fullname.replace(/\s\s+/g, ' '),
                address: address.replace(/\s\s+/g, ' '),
                phoneNumber: phoneNumber,
            });
            // update localStorage
            localStorage.setItem(
                'auth',
                JSON.stringify({
                    ...auth,
                    fullName: fullname.replace(/\s\s+/g, ' '),
                    address: address.replace(/\s\s+/g, ' '),
                    phoneNumber: phoneNumber,
                }),
            );
            notify(response.message, 'success');
        } else {
            notify(response.errorMessage);
        }
        setInfoLoading(false)
        setIsEditing(false);
    };

    const handleCancelChanges = () => {
        // Hủy bỏ các thay đổi và đóng form chỉnh sửa
        setAddress(auth.address);
        setFullName(auth.fullName);
        setPhoneNumber(auth.phoneNumber);
        setIsEditing(false);
    };

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value); // Cập nhật giá trị biến state paymentMethod khi thay đổi
    };

    const notify = (message, type) => {
        const toastType = type === 'success' ? toast.success : toast.error;
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
    };

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

    useEffect(() => {
        if (auth.accessToken !== undefined) {
            const fetchCart = async () => {
                const fetchCart = await cartServices.getCart(auth.accessToken);
                if (fetchCart.statusCode === 200) {
                    setCartList(fetchCart.products);
                    setTotalAmount(fetchCart.totalAmount);
                } else {
                    console.log(fetchCart.error);
                }
            };
            fetchCart();
        }
    }, [auth.accessToken]);

    const handleCheckout = async () => {
        if (auth.fullName === '' || auth.address === '' || auth.phoneNumber === '') {
            notify("Vui lòng điền đầy đủ thông tin giao hàng")
        } else {
            setLoading(true);
            const response = await orders.createOrders(auth.accessToken, 'Tiền mặt');
            if (response.statusCode === 201) {
                setLoading(false);
                navigation('/userinformation', { state: { toastMessage: 'Thanh Toán Thành Công!' } });
            } else {
                notify(response.error, 'error');
                setLoading(false);
            }
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="container mx-auto">
                {/* header checkout */}
                <div className="h-20 flex items-center mx-auto border pl-10 mt-10">
                    <div className="w-14 h-14 flex items-center justify-center text-white text-3xl font-bold mr-4">
                        <img
                            src="https://cdn.icon-icons.com/icons2/1786/PNG/128/shoppingcart-checkout_114473.png"
                            alt="Logo"
                            className="h-10 w-10 mr-2"
                        />
                    </div>
                    <h1 className="text-3xl font-bold text-primaryColor">Thanh Toán</h1>
                </div>
                {/* body checkout */}
                <div className="mx-auto shadow-lg rounded-lg px-8 py-6 my-8 border-spacing-2 border-primaryColor">
                    {/* Body information user */}
                    <div>
                        <h2 className="text-primaryColor text-2xl font-semibold mb-6">
                            <FontAwesomeIcon icon={faLocationDot} className="text-primaryColor mr-2" />
                            Thông Tin Giao Hàng
                        </h2>

                        {/* edit information user */}

                        {isEditing ? (
                            <form className="text-black h-[290px]">
                                <div className="flex flex-col-2 ">
                                    <div className="w-full md:w-1/2 px-4 mt-2">
                                        <div className="mb-5 flex items-center">
                                            <div>
                                                <span className="text-lg text-primaryColor font-bold">
                                                    Tên Đầy Đủ :{' '}
                                                </span>
                                                <input
                                                    type="text"
                                                    value={fullname}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                    placeholder="Tên Đầy Đủ của bạn"
                                                    className="mt-2 ml-4 w-60 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primaryColor"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-9 flex items-center mt-8">
                                            <div>
                                                <span className="text-lg text-primaryColor font-bold">Địa Chỉ : </span>

                                                <input
                                                    type="text"
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                    placeholder="Địa Chỉ của bạn"
                                                    className="mb-32 ml-6 w-80 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primaryColor"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2 px-4 mt-2">
                                        <div className="mb-5 flex items-center">
                                            <div>
                                                <span className="text-lg text-primaryColor font-bold">
                                                    Số Điện Thoại :{' '}
                                                </span>
                                                <input
                                                    type="text"
                                                    value={phoneNumber}
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                    placeholder="Số Điện Thoại của bạn"
                                                    className="mt-2 ml-4 w-60 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primaryColor"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex ml-auto items-center justify-center mt-32">
                                            <div className="flex">
                                                <button
                                                    className="bg-primaryColor hover:opacity-80 text-white font-bold py-2 px-6 rounded-lg"
                                                    onClick={handleSaveChanges}
                                                >
                                                {infoLoading ? (
                                                    <div className="flex items-center justify-center">
                                                        <Spinner className="h-6 w-6 mr-4 font-bold" />
                                                        <span>Đang lưu....</span>
                                                    </div>
                                                ) : (
                                                        <span>Lưu</span>
                                                        )}
                                                        </button>
                                                <button
                                                    className="ml-2 shadow text-red-500 hover:text-red-600 font-bold py-2 px-6 rounded-lg"
                                                    onClick={handleCancelChanges}
                                                >
                                                    Hủy
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <div className="flex flex-col-2 ml-2 h-[290px]">
                                <div className="w-full md:w-1/2 px-4 mt-2">
                                    <div className="mb-5 flex items-center">
                                        <h1 className="text-lg text-primaryColor font-bold">Tên Đầy Đủ:</h1>
                                        <h3 className="ml-2 text-black">{auth.fullName}</h3>
                                    </div>
                                    <div className="mb-9 flex flex-wrap items-center mt-8">
                                        <h1 className="text-lg text-primaryColor font-bold">Địa Chỉ:</h1>
                                        <span className="ml-4 h-auto min-h-8 w-64 text-black">{auth.address}</span>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 px-4 mt-2">
                                    <div className="mb-5 flex items-center">
                                        <h1 className="text-lg text-primaryColor font-bold">Số Điện Thoại:</h1>
                                        <h3 className="ml-2 text-black">{auth.phoneNumber}</h3>
                                    </div>
                                    <div className="flex ml-auto items-center justify-center mt-16">
                                        <div
                                            className="text-white bg-primaryColor hover:opacity-80 font-bold py-2 px-6 mt-4 border rounded-lg cursor-pointer"
                                            onClick={() => setIsEditing(true)}
                                        >
                                            <span className="mr-2">Thay Đổi</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Body information Product */}

                    <div className="mb-4">
                        <h3 className="text-2xl text-primaryColor font-medium mb-6">Sản Phẩm</h3>
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4"></th>
                                    <th className="py-2 px-4 text-black">Loại</th>
                                    <th className="py-2 px-4 text-black">Giá</th>
                                    <th className="py-2 px-4 text-black">Số Lượng</th>
                                    <th className="py-2 px-4 text-black">Tổng Tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartList.map((product) => (
                                    <tr key={product.id}>
                                        <td className="py-2 px-4">
                                            <div className="flex items-center">
                                                <img
                                                    src={product.imageUrl}
                                                    alt={product.title}
                                                    className="w-12 h-12 rounded-lg mr-4"
                                                />
                                                <div>
                                                    <p className="text-xl font-medium text-textColor">
                                                        {product.title}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 text-lg font-medium text-center text-textColor">
                                            {product.category}
                                        </td>
                                        <td className="py-2 px-4 text-lg font-medium text-center text-textColor">
                                            {formattedNumber(product.price)} vnđ
                                        </td>
                                        <td className="py-2 px-4 text-lg font-medium text-center text-textColor">
                                            {product.CartItem.quantity}
                                        </td>
                                        <td className="py-2 px-4 text-lg font-medium text-center text-textColor">
                                            {formattedNumber(product.CartItem.totalPrice)} vnđ
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mb-2 text-black text-sm text-right">
                        <h3 className="font-bold text-base">
                            Tổng tiền : <span className="text-lg font-medium">{formattedNumber(totalAmount)} vnđ</span>
                        </h3>
                    </div>

                    {/* body Payment methods */}

                    <div className="mb-4 mt-5">
                        <h3 className="text-primaryColor text-2xl font-medium mb-6">Phương Thức Thanh Toán</h3>
                        <select
                            id="paymentMethod"
                            className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={paymentMethod}
                            onChange={handlePaymentMethodChange}
                        >
                            <option value="cod">Thanh Toán Khi Nhận Hàng (COD)</option>
                        </select>
                    </div>

                    {/* total ship + product */}
                    <div className="mb-2 text-black text-sm text-right">
                        <table className="float-right">
                            <tbody>
                                <tr>
                                    <td className="font-bold text-base">Tổng Tiền Đơn Hàng: </td>
                                    <td className="py-2 px-4 text-lg font-medium text-textColor">
                                        {formattedNumber(totalAmount)} vnđ
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-bold text-base">Phí Vận Chuyển: </td>
                                    <td className="py-2 px-4 text-lg font-medium text-textColor">
                                        {formattedNumber(TransportFee)} vnđ
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-bold text-base">Số Tiền Phải Trả: </td>
                                    <td>
                                        <h1 className="py-2 px-4 text-lg text-textColor font-bold inline-block">
                                            {formattedNumber(totalAmount + TransportFee)} vnđ
                                        </h1>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* pay money */}
                    <div className="flex justify-between items-center mt-40">
                        <div className="text-black text-sm">
                            <h3 className="font-medium text-base">
                                Nhấp Vào Liên Kết Để Hiển Thị Các Điều Khoản GreenEco
                            </h3>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="bg-primaryColor hover:opacity-80 text-white font-medium py-2 px-6 rounded "
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <Spinner className="h-6 w-6 mr-4 font-bold" /> <span>Đang Thanh Toán....</span>
                                </div>
                            ) : (
                                <span className="font-bold">Thanh Toán</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CheckoutPage;
