import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const CheckoutPage = () => {
    const [name, setName] = useState('Phạm Hữu Sáng'); // Biến state cho tên
    const [address, setAddress] = useState('40/20/02 Nguyễn Huy Tượng, Hòa Minh , Liên Chiểu ,Đà Nắng'); // Biến state cho địa chỉ
    const [phoneNumber, setPhoneNumber] = useState('(+84)397881543'); // Biến state cho số điện thoại
    const [isEditing, setIsEditing] = useState(false);

    const handleSaveChanges = () => {
        // Lưu các thay đổi vào các biến trạng thái tương ứng
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
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                                className="mb-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Phone Number"
                                className="mb-2 ml-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <textarea
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Address"
                                className="mb-2 resize-none w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                style={{ width: `${address.length + 2}ch` }}
                            />

                            <div className="flex justify-end">
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg"
                                    onClick={handleSaveChanges}
                                >
                                    Save
                                </button>
                                <button
                                    className="ml-2 text-red-500 hover:text-red-600 font-semibold"
                                    onClick={handleCancelChanges}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div>
                            <h3 className="mb-2 text-black font-bold text-sm">
                                {name} {phoneNumber}
                            </h3>
                            <h3 className="mb-2 text-black text-sm">{address}</h3>
                            <div className="flex justify-end">
                                <div
                                    className="text-blue-500 font-semibold py-2 px-6 mt-4 cursor-pointer"
                                    onClick={() => setIsEditing(true)}
                                >
                                    <span className="mr-2">Change</span>
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
    );
};

export default CheckoutPage;
