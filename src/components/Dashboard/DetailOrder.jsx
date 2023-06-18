import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OrdersContext } from '../../context/ordersProvider';
import moment from 'moment';
import { Spinner } from '@material-tailwind/react';

const DetailOrder = () => {
    const { ordersList } = useContext(OrdersContext);
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState([]);
    const params = useParams();
    const formattedNumber = (num) => {
        return num.toLocaleString('en-US').replace(/,/g, '.');
    };
    useEffect(() => {
        if (ordersList.length > 0) {
            setOrder(ordersList.filter((order) => order.id === +params.id)[0]);
            setLoading(false)
        }
        console.log(order);
    });
    return (
        <>
            <div></div>
            <main className="flex-1">
                {loading ? (
                    <Spinner className="h-12 w-12 mt-60 mx-auto" />
                ) : (
                    <div className="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-2xl sm:rounded-lg border-y-4 border-t-primaryColor">
                            <div className="px-4 py-5 sm:p-6">
                                <h2 className="text-2xl font-bold leading-6 text-gray-900 text-center">
                                    Chi tiết đơn hàng
                                </h2>
                                <div className="mt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="block font-medium text-gray-700">Ngày đặt hàng:</span>
                                        <span className="block font-medium text-gray-900">
                                            {moment(order.createdAt).format('DD/MM/YYYY')}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="block font-medium text-gray-700">Tên khách hàng:</span>
                                        <span className="block font-medium text-gray-900">{order.name}</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="block font-medium text-gray-700">Địa chỉ:</span>
                                        <span className="block font-medium text-gray-900">{order.address}</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="block font-medium text-gray-700">Số điện thoại:</span>
                                        <span className="block font-medium text-gray-900">{order.phone}</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="block font-medium text-gray-700">Trạng thái đơn hàng:</span>
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
                                                        Sản phẩm
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 bg-gray-50 text-left text-sm font-bold text-primaryColor uppercase tracking-wider"
                                                    >
                                                        Số lượng
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 bg-gray-50 text-left text-sm font-bold text-primaryColor uppercase tracking-wider"
                                                    >
                                                        Đơn giá
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 bg-gray-50 text-left text-sm font-bold text-primaryColor uppercase tracking-wider"
                                                    >
                                                        Tổng giá trị
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
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
};

export default DetailOrder;
