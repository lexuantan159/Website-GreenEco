import React, { useContext, useEffect, useState } from 'react';
import ProductsContext from '../../context/productsProvider';
import { useParams } from 'react-router-dom';
import { Spinner } from '@material-tailwind/react';
import AuthContext from '../../context/authProvider';
import { ToastContainer, toast } from 'react-toastify';
import * as adminServices from '../../services/adminServices';
import Swal from 'sweetalert2';

const EditProduct = () => {
    const { productsList } = useContext(ProductsContext);
    const { auth } = useContext(AuthContext);
    const params = useParams();
    const formData = new FormData();
    const [loading, setLoading] = useState({});
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [available, setAvailable] = useState(0);
    const [description, setDescription] = useState('');
    const [madeIn, setMadeIn] = useState('');
    const [manufacture, setManufacture] = useState(0);
    const [certificate, setCertificate] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const product = productsList.filter((product) => product.id === params.id)[0];
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

    useEffect(() => {
        if (productsList.length === 0) {
            setLoading(true);
        } else {
            setTitle(product.title);
            setPrice(product.price);
            setAvailable(product.available);
            setDescription(product.description);
            setMadeIn(product.madeIn);
            setManufacture(product.dateOfManufacture);
            setCertificate(product.certificate);
            setCategory(product.category);
            setLoading(false);
        }
    }, []);
    const handleEdit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Do you want to save the changes?',
            showCancelButton: true,
            confirmButtonText: 'Save',
        }).then((result) => {
            if (result.isConfirmed) {
                setLoadingEdit(true);
                setSubmit(true);
            }
        });
    };

    useEffect(() => {
        const fetchEdit = async () => {
            title !== product.title && formData.append('title', title);
            price !== product.price && formData.append('price', price);
            available !== product.available && formData.append('available', available);
            image !== null && formData.append('image', image);
            description !== product.description && formData.append('description', description);
            manufacture !== product.dateOfManufacture && formData.append('dateOfManufacture', manufacture);
            madeIn !== product.madeIn && formData.append('madeIn', madeIn);
            certificate !== product.certificate && formData.append('certificate', certificate);
            category !== product.category && formData.append('category', category);

            for (let [key, value] of formData.entries()) {
                console.log(`Key: ${key}, Value: ${value}`);
            }

            const formDataIterator = formData.entries();
            const firstEntry = formDataIterator.next();
            if (firstEntry.done) {
                notify('There are no instead of change to edit');
                setLoadingEdit(false);
                setSubmit(false);
            } else {
                const editProduct = await adminServices.editProduct(auth.accessToken, params.id, formData);
                // console.log(auth.accessToken);
                console.log(editProduct);
                if (editProduct.statusCode === 200) {
                    notify(editProduct.response.message, 'success');
                    setLoadingEdit(false);
                    setSubmit(false);
                } else {
                    notify(editProduct.error.message);
                    setLoadingEdit(false);
                    setSubmit(false);
                }
            }
        };
        if (submit && auth.accessToken !== undefined) {
            fetchEdit();
        }
    }, [submit]);
    return (
        <>
            <ToastContainer />
            <main className="flex-1 ml-60">
                <div className="flex items-center justify-center z-50">
                    <div className="bg-white p-8 w-full mt-8 mx-10 border-2 border-primaryColor rounded-3xl">
                        <h2 className="flex text-3xl font-extrabold mb-4 justify-center">Edit Product</h2>
                        {loading ? (
                            <Spinner className="h-12 w-12 mt-10 mx-auto" />
                        ) : (
                            <form>
                                <div className="mb-4">
                                    <div className="flex justify-around">
                                        <div className="flex-col mb-10">
                                            <label className="block text-primaryColor text-sm font-bold mb-2">
                                                Title <span className="text-red-900">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="w-[320px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primaryColor"
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
                                                    className="w-[155px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primaryColor"
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
                                                    className="w-[155px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primaryColor"
                                                    placeholder="Enter available"
                                                    value={available}
                                                    onChange={(e) => setAvailable(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-around">
                                        <div className="flex-col mb-10">
                                            <label className="block text-primaryColor text-sm font-bold mb-2">
                                                Description
                                            </label>
                                            <textarea
                                                type="text"
                                                className="w-[320px] h-36 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primaryColor"
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
                                                className="w-[320px] h-36 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primaryColor"
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
                                                className="w-[320px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primaryColor"
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
                                                className="w-[320px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primaryColor"
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
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                            >
                                                <option value="Natural">Natural</option>
                                                <option value="Organic">Organic</option>
                                                <option value="Recycled">Recycled</option>
                                            </select>
                                        </div>
                                        <div className="flex-col">
                                            <label className="block text-primaryColor text-sm font-bold mb-2">
                                                Image
                                            </label>
                                            <input
                                                type="file"
                                                className="w-[320px] px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-primaryColor"
                                                placeholder="Enter certificate"
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
                                        onClick={handleEdit}
                                    >
                                        {loadingEdit ? (
                                            <div className="flex items-center justify-center">
                                                <Spinner className="h-6 w-6 mr-4" /> <span>Loading....</span>
                                            </div>
                                        ) : (
                                            <span>Change</span>
                                        )}
                                    </button>
                                    <a
                                        href="/dashboard/list-product"
                                        className="py-2 px-10 bg-gray-300 text-blue-gray-900 rounded-md w-32 mr-2 text-center hover:bg-gray-400"
                                    >
                                        Back
                                    </a>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
};

export default EditProduct;
