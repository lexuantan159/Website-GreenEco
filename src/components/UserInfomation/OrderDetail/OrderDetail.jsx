/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import moment from 'moment';

const OrderDetail = ({ order }) => {
    document.title = 'Chi Tiết Đơn Hàng | User';

    const formattedNumber = (num) => {
        return num.toLocaleString('en-US').replace(/,/g, '.');
    };

    return (
        <>
            <main className=" flex-1">
                <div className="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-2xl sm:rounded-lg border-y-4 border-t-primaryColor">
                        <div className="px-4 py-5 sm:p-6">
                            <h2 className="text-2xl font-bold leading-6 text-gray-900 text-center">
                                Chi Tiết Đơn Hàng
                            </h2>
                            <div className="mt-4">
                                <div className="flex justify-between items-center">
                                    <span className="block font-medium text-gray-700">Ngày Đặt Hàng:</span>
                                    <span className="block font-medium text-gray-900">
                                        {moment(order.createdAt).format('DD/MM/YYYY')}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="block font-medium text-gray-700">Tên Khách Hàng:</span>
                                    <span className="block font-medium text-gray-900">{order.name}</span>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="block font-medium text-gray-700">Địa Chỉ:</span>
                                    <span className="block font-medium text-gray-900">{order.address}</span>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="block font-medium text-gray-700">Số Điện Thoại:</span>
                                    <span className="block font-medium text-gray-900">{order.phone}</span>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="block font-medium text-gray-700">Trạng Thái Đơn Hàng:</span>
                                    <span className="block font-medium text-gray-900">{order.status}</span>
                                </div>
                                <div className="mt-4">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead>
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 bg-gray-50 text-left text-sm font-bold text-primaryColor uppercase tracking-wider"
                                                >
                                                    Sản Phẩm
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 bg-gray-50 text-left text-sm font-bold text-primaryColor uppercase tracking-wider"
                                                >
                                                    Số Lượng
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 bg-gray-50 text-left text-sm font-bold text-primaryColor uppercase tracking-wider"
                                                >
                                                    Đơn Giá
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 bg-gray-50 text-left text-sm font-bold text-primaryColor uppercase tracking-wider"
                                                >
                                                    Tổng Giá Trị
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {order.Products.map((prod) => (
                                                <tr>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <img
                                                                    className="h-10 w-10 rounded-full"
                                                                    src={prod.imageUrl}
                                                                    alt="Product image"
                                                                />
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-base font-medium text-gray-900">
                                                                    {prod.title}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-14 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {prod.OrderItem.quantity}
                                                        </div>
                                                    </td>
                                                    <td className="px-7 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {formattedNumber(prod.price)} đ
                                                        </div>
                                                    </td>
                                                    <td className="px-12 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {formattedNumber(prod.OrderItem.totalPrice)}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex justify-end mt-4 items-center">
                                    <span className="block text-lg font-bold text-primaryColor">Tổng cộng:</span>
                                    <span className="block font-bold text-gray-900 ml-6">
                                        {formattedNumber(order.totalAmount)} đ
                                    </span>
                                </div>
                                <div className="flex justify-end mt-4 items-center">
                                    <span className="block text-lg font-bold text-primaryColor">Phí vận chuyển:</span>
                                    <span className="block font-bold text-gray-900 ml-6">
                                        {formattedNumber(25000)} đ
                                    </span>
                                </div>
                                <div className="flex justify-end mt-4 items-center">
                                    <span className="block text-lg font-bold text-primaryColor">Số tiền phải trả:</span>
                                    <span className="block font-bold text-gray-900 ml-6">
                                        {formattedNumber(order.totalAmount + 25000)} đ
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default OrderDetail;
