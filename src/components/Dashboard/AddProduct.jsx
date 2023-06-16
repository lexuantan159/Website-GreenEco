import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import * as adminServices from '../../services/adminServices';
import AuthContext from '../../context/authProvider';
import { Spinner } from '@material-tailwind/react';

const AddProduct = () => {
    const { auth } = useContext(AuthContext);
    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [available, setAvailable] = useState('');
    const [description, setDescription] = useState('');
    const [madeIn, setMadeIn] = useState('');
    const [manufacture, setManufacture] = useState('');
    const [certificate, setCertificate] = useState('');
    const [category, setCategory] = useState('Tự nhiên');
    const [image, setImage] = useState(null);
    const formData = new FormData();

    const notify = (message, type) => {
        const toastType = type === 'success' ? toast.success : toast.error;
        return toastType(message, {
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    };

    const handleAdd = (e) => {
        e.preventDefault();
        setSubmit(true);
        setLoading(true);
    };

    for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }
    useEffect(() => {
        const fetchAdd = async () => {
            formData.append('title', title);
            formData.append('price', price);
            formData.append('available', available);
            formData.append('image', image);
            formData.append('description', description);
            formData.append('dateOfManufacture', manufacture);
            formData.append('madeIn', madeIn);
            formData.append('certificate', certificate);
            formData.append('category', category);
            
            const addProduct = await adminServices.addProduct(auth.accessToken, formData);
            // console.log(auth.accessToken);
            console.log(addProduct);
            if (addProduct.statusCode === 201) {
                notify(addProduct.response.message, 'success');
                setLoading(false);
                setSubmit(false);
            } else {
                notify(addProduct.error.message);
                setLoading(false);
                setSubmit(false);
            }
        };
        if (submit && auth.accessToken !== undefined) {
            fetchAdd();
        }
    }, [submit]);

    return (
        <>
            <ToastContainer />
            <main className="flex-1 ml-60">
                <div className="flex items-center justify-center z-50">
                    <div className="bg-white p-8 w-full mt-8 mx-10 border-2 border-primaryColor rounded-3xl">
                        <h2 className="flex text-3xl font-extrabold mb-4 justify-center">Thêm sản phẩm mới</h2>
                        <form>
                            <div className="mb-4">
                                <div className="flex justify-around">
                                    <div className="flex-col mb-10">
                                        <label className="block text-primaryColor text-sm font-bold mb-2">
                                            Tiêu đề <span className="text-red-900">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="w-[320px] px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-primaryColor"
                                            placeholder="Nhập tiêu đề"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-row">
                                        <div className="mr-4">
                                            <label className="block text-primaryColor text-sm font-bold mb-2">
                                                Giá <span className="text-red-900">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                className="w-[155px] px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-primaryColor"
                                                placeholder="Nhập giá (VND)"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-primaryColor text-sm font-bold mb-2">
                                                Số lượng trong kho <span className="text-red-900">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                className="w-[155px] px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-primaryColor"
                                                placeholder="Nhập số lượng"
                                                value={available}
                                                onChange={(e) => setAvailable(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-around">
                                    <div className="flex-col mb-7">
                                        <label className="block text-primaryColor text-sm font-bold mb-2">
                                            Mô tả
                                        </label>
                                        <textarea
                                            type="text"
                                            className="w-[320px] h-36 px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-primaryColor"
                                            placeholder="Nhập mô tả"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex-col mb-3">
                                        <label className="block text-primaryColor text-sm font-bold mb-2">
                                            Địa chỉ xuất xứ
                                        </label>
                                        <textarea
                                            type="text"
                                            className="w-[320px] h-36 px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-primaryColor"
                                            placeholder="Địa chỉ xuất xứ"
                                            value={madeIn}
                                            onChange={(e) => setMadeIn(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-around">
                                    <div className="flex-col mb-3">
                                        <label className="block text-primaryColor text-sm font-bold mb-2">
                                            Năm sản xuất
                                        </label>
                                        <input
                                            type="text"
                                            className="w-[320px] px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-primaryColor"
                                            placeholder="Nhập năm sản xuất"
                                            value={manufacture}
                                            onChange={(e) => setManufacture(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex-col">
                                        <label className="block text-primaryColor text-sm font-bold mb-2">
                                            Chứng chỉ
                                        </label>
                                        <input
                                            type="text"
                                            className="w-[320px] px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-primaryColor"
                                            placeholder="Nhập chứng chỉ"
                                            value={certificate}
                                            onChange={(e) => setCertificate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-around">
                                    <div className="flex-col mb-7">
                                        <label className="block text-primaryColor text-sm font-bold mb-2">
                                            Danh mục
                                        </label>
                                        <select
                                            className="w-[320px] px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-primaryColor"
                                            onChange={(e) => setCategory(e.target.value)}
                                            value={category}
                                        >
                                            <option value="Tự nhiên">Tự nhiên</option>
                                            <option value="Hữu cơ">Hữu cơ</option>
                                            <option value="Tái chế">Tái chế</option>
                                        </select>
                                    </div>
                                    <div className="flex-col">
                                        <label className="block text-primaryColor text-sm font-bold mb-2">Hình ảnh</label>
                                        <input
                                            type="file"
                                            className="w-[320px] px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-primaryColor"
                                            placeholder="Nhập chứng chỉ"
                                            accept=".png, .jpg, .jpeg"
                                            files={image}
                                            onChange={(e) => setImage(e.target.files[0])}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="py-2 px-4 bg-primaryColor text-blue-gray-900 rounded-md w-32 mx-6 hover:bg-light-green-800"
                                    onClick={handleAdd}
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <Spinner className="h-6 w-6 mr-4" /> <span>Loading...</span>
                                        </div>
                                    ) : (
                                        <span>Thêm</span>
                                    )}
                                </button>

                                <a
                                    href="/dashboard/list-product"
                                    className="py-2 px-10 bg-gray-300 text-blue-gray-900 rounded-md w-32 mr-2 hover:bg-gray-400 text-center"
                                >
                                    Hủy
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
};

export default AddProduct;
