import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import * as adminServices from '../../services/adminServices';
import AuthContext from '../../context/authProvider';
import { Spinner } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

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
    const [category, setCategory] = useState('Natural');
    const [image, setImage] = useState(null);
    const formData = new FormData();

    const notify = (message, type) => {
        const toastType = type === "success" ? toast.success : toast.error
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
    }

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
                notify(addProduct.response.message, "success");
                setLoading(false);
                setSubmit(false);
            } else {
                notify(addProduct.error.data.message);
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
                        <h2 className="flex text-3xl font-extrabold mb-4 justify-center">Add New Product</h2>
                        <form>
                            <div className="mb-4">
                                <div className="flex justify-around">
                                    <div className="flex-col mb-10">
                                        <label className="block text-primaryColor text-sm font-bold mb-2">
                                            Title <span className="text-red-900">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="w-[320px] px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-primaryColor"
                                            placeholder="Enter title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-row">
                                        <div className="mr-4">
                                            <label className="block text-primaryColor text-sm font-bold mb-2">
                                                Price <span className="text-red-900">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                className="w-[155px] px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-primaryColor"
                                                placeholder="Enter price ($)"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-primaryColor text-sm font-bold mb-2">
                                                Available <span className="text-red-900">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                className="w-[155px] px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-primaryColor"
                                                placeholder="Enter available"
                                                value={available}
                                                onChange={(e) => setAvailable(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-around">
                                    <div className="flex-col mb-7">
                                        <label className="block text-primaryColor text-sm font-bold mb-2">
                                            Description
                                        </label>
                                        <textarea
                                            type="text"
                                            className="w-[320px] h-36 px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-primaryColor"
                                            placeholder="Enter description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex-col mb-3">
                                        <label className="block text-primaryColor text-sm font-bold mb-2">
                                            Made in
                                        </label>
                                        <textarea
                                            type="text"
                                            className="w-[320px] h-36 px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-primaryColor"
                                            placeholder="Made in"
                                            value={madeIn}
                                            onChange={(e) => setMadeIn(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-around">
                                    <div className="flex-col mb-3">
                                        <label className="block text-primaryColor text-sm font-bold mb-2">
                                            Year of manufacture
                                        </label>
                                        <input
                                            type="text"
                                            className="w-[320px] px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-primaryColor"
                                            placeholder="Enter year of manufacture"
                                            value={manufacture}
                                            onChange={(e) => setManufacture(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex-col">
                                        <label className="block text-primaryColor text-sm font-bold mb-2">
                                            Certificate
                                        </label>
                                        <input
                                            type="text"
                                            className="w-[320px] px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-primaryColor"
                                            placeholder="Enter certificate"
                                            value={certificate}
                                            onChange={(e) => setCertificate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-around">
                                    <div className="flex-col mb-7">
                                        <label className="block text-primaryColor text-sm font-bold mb-2">
                                            Category
                                        </label>
                                        <select
                                            className="w-[320px] px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-primaryColor"
                                            onChange={(e) => setCategory(e.target.value)}
                                            value={category}
                                        >
                                            <option value="Natural">Natural</option>
                                            <option value="Organic">Organic</option>
                                            <option value="Recycled">Recycled</option>
                                        </select>
                                    </div>
                                    <div className="flex-col">
                                        <label className="block text-primaryColor text-sm font-bold mb-2">Image</label>
                                        <input
                                            type="file"
                                            className="w-[320px] px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-primaryColor"
                                            placeholder="Enter certificate"
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
                                            <Spinner className="h-6 w-6 mr-4" /> <span>Loading....</span>
                                        </div>
                                    ) : (
                                        <span>Add</span>
                                    )}
                                </button>

                                <Link
                                    to="/dashboard/list-product"
                                    className="py-2 px-10 bg-gray-300 text-blue-gray-900 rounded-md w-32 mr-2 hover:bg-gray-400"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
};

export default AddProduct;
