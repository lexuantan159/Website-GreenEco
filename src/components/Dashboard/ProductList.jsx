/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import ProductsContext from '../../context/productsProvider';
import { faPenToSquare, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/authProvider';
import { Spinner } from '@material-tailwind/react';

document.title = 'Dashboard';
const ProductList = () => {
    const { productsList } = useContext(ProductsContext);
    const [listProd, setListProd] = useState([]);
    const [loading, setLoading] = useState([]);
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    if (auth.accessToken && auth.role === 'User') {
        navigate('/');
    }
    const handleChangeSearch = (e) => {
        const searchValue = e.target.value;
        const searchItem =
            searchValue !== ''
                ? listProd.filter((item) => item.title.toLowerCase().includes(searchValue))
                : productsList;
        setListProd(searchItem);
    };

    useEffect(() => {
        if (productsList.length === 0) {
          setLoading(true);
        } else if (productsList.length !== 0 && listProd.length === 0) {
            setLoading(false);
            setListProd(productsList);
        }
    }, [productsList]);

    return (
        <main className="flex-1 ml-60">
            <div className="sticky top-0 left-0 right-0 flex items-center justify-between py-5 px-10 border-2 border-gray-200 rounded-b-2xl bg-white">
                <div>
                    <h1 className="text-xl font-bold leading-relaxed text-gray-800">List of Products</h1>
                    <p className="text-sm font-sm text-gray-500">Create your products on the store system</p>
                </div>
                <div className="flex items-center p-2 space-x-6 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500">
                    <div className="flex bg-gray-100 p-4 w-72 space-x-4 rounded-lg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 opacity-30"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            className="bg-gray-100 outline-none"
                            type="text"
                            placeholder="Article title or keyword..."
                            onChange={handleChangeSearch}
                        />
                    </div>
                </div>
                <button className="inline-flex gap-x-2 items-center py-2.5 px-6 text-white bg-primaryColor rounded-xl hover:bg-light-green-800">
                    <FontAwesomeIcon icon={faPlus} />
                    <Link to={'/dashboard/add-product'}>
                        <span className="text-sm font-semibold tracking-wide">Create new item</span>
                    </Link>
                </button>
            </div>
            {loading ? (
                <Spinner className="h-12 w-12 mt-60 mx-auto" />
            ) : (
                <table className="w-[90%] m-auto">
                    <thead>
                        <tr className="text-sm font-medium text-gray-700 border-b-4 border-gray-200">
                            <td className="py-4 px-16 text-lg font-bold text-primaryColor">Image</td>
                            <td className="py-4 px-4 text-lg font-bold text-primaryColor">Title</td>
                            <td className="py-4 px-4 text-lg font-bold text-primaryColor text-center">Price</td>
                            <td className="py-4 px-4 text-lg font-bold text-primaryColor text-center">Available</td>
                            <td className="py-4 px-4 text-lg font-bold text-primaryColor text-center">Category</td>
                        </tr>
                    </thead>
                    <tbody>
                        {listProd.map((product) => (
                            <tr key={product.id} className="border-2 border-gray-200">
                                <td className="flex gap-x-4 item-center py-4 pl-14">
                                    <img
                                        src={product.imageUrl}
                                        className="w-16 aspect-[3/2 rounded-lg object-cover object-top border border-gray-200]"
                                    />
                                </td>
                                <td className="py-4 text-blue-gray-900 font-extrabold">{product.title}</td>
                                <td className="py-4 px-8 text-center">{product.price}$</td>
                                <td className="py-4 px-8 text-center">{product.available}</td>
                                <td className="py-4 px-8 text-center">{product.category}</td>
                                <td className="py-4 px-8 text-center">
                                    <Link
                                        to={`/dashboard/edit-product/${product.id}`}
                                        className="px-2 text-primaryColor"
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </Link>
                                    <button className="px-2 text-primaryColor">
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </main>
    );
};

export default ProductList;
