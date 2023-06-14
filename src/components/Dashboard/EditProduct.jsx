import React, { useContext, useEffect, useState } from 'react';
import ProductsContext from '../../context/productsProvider';
import { Link, useParams } from 'react-router-dom';
import { Spinner } from '@material-tailwind/react';
import AuthContext from '../../context/authProvider';

const EditProduct = () => {
    const { productsList } = useContext(ProductsContext);
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState({});
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [available, setAvailable] = useState(0);
    const [description, setDescription] = useState('');
    const [madeIn, setMadeIn] = useState('');
    const [manufacture, setManufacture] = useState(0);
    const [certificate, setCertificate] = useState('');
    const [category, setCategory] = useState('Natural');
    const [image, setImage] = useState(null);
    const params = useParams();
    useEffect(() => {
        if (productsList.length === 0) {
            setLoading(true);
        } else {
            setProduct(productsList.filter((product) => product.id === params.id)[0]);
            setLoading(false);
        }
    });
    return (
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
                                            value={product.title}
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
                                                value={product.price}
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
                                                value={product.available}
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
                                            value={product.description}
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
                                            value={product.madeIn}
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
                                            value={product.dateOfManufacture}
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
                                            value={product.certificate}
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
                                    className="py-2 px-4 bg-primaryColor text-blue-gray-900 rounded-md w-32 mx-6"
                                >
                                    Change
                                </button>
                                <Link
                                    to="/dashboard/list-product"
                                    className="py-2 px-10 bg-gray-300 text-blue-gray-900 rounded-md w-32 mr-2"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </main>
    );
};

export default EditProduct;
