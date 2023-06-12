import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import ProductsSlide from '../ProductsSlide/ProductsSlide';
import { useParams } from 'react-router-dom';
import ProductsContext from '../../context/productsProvider';
import { ToastContainer, toast } from 'react-toastify';
import { Spinner } from '@material-tailwind/react';
import AuthContext from '../../context/authProvider';
import * as addProductServices from '../../services/addProductServices';

const ProductDetailForm = () => {
    const { productsList } = useContext(ProductsContext);
    const { auth } = useContext(AuthContext);
    const [count, setCount] = useState(0);
    const [activeTab, setActiveTab] = useState('description');
    const [feedbackText, setFeedbackText] = useState('');
    const [feedbackList, setFeedbackList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});
    const param = useParams();

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
        if (productsList.length === 0) {
            setLoading(true);
        } else {
            setProduct(productsList.filter((product) => product.id === param.id)[0]);
            setLoading(false);
        }
    }, [param.id, productsList]);

    const addProduct = async (token, id, quantity) => {
        notify('Add product successfully');
        const response = await addProductServices.addProduct(token, id, quantity);
        response.statusCode !== 200 && notify(response.error);
    };

    const handleAddProducts = () => {
        if (count > 0) {
            auth.accessToken !== undefined
                ? addProduct(auth.accessToken, product.id, count)
                : notify('Login Before Add Product');
        } else notify('Quantity Not Available');
    };

    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const handleFeedbackSave = () => {
        if (feedbackText) {
            setFeedbackList([...feedbackList, feedbackText]);
            setFeedbackText('');
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="max-w-[1100px] m-auto mt-20">
                {loading ? (
                    <Spinner className="h-12 w-12 mt-10 mx-auto" />
                ) : (
                    <div className=" md:flex md:justify-center m-auto px-9">
                        <div className="md:w-1/2 mr-9">
                            <img
                                src={product.imageUrl}
                                alt={product.title}
                                className="w-full h-full object-cover rounded shadow"
                            />
                        </div>
                        <div className="mt-5 md:w-1/2 p-4">
                            <h2 className="text-2xl font-bold mb-2">{product.title}</h2>

                            <div className="mb-2">
                                <p className=" text-lg font-bold">
                                    Price: $ <span className="font-medium">{product.price}</span>
                                </p>
                            </div>
                            <div className="mb-2">
                                <p className="text-lg font-bold">
                                    Category: <span className="font-medium"> {product.category} </span>
                                </p>
                            </div>

                            <div className="flex items-center mb-2 mt-16">
                                <button
                                    className="bg-primaryColor hover:bg-blue-300 text-white font-bold py-2 px-4 rounded-l"
                                    onClick={decrement}
                                >
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                                <button className="bg-gray-300  text-gray-800 font-bold py-2 px-4 mx-2">{count}</button>
                                <button
                                    className="bg-primaryColor hover:bg-blue-300 text-white font-bold py-2 px-4  rounded-r"
                                    onClick={() => setCount(count + 1)}
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                                <button
                                    onClick={handleAddProducts}
                                    className="bg-primaryColor active:opacity-80 text-white font-bold py-2 px-4 w-150 h-46 ml-4 rounded"
                                >
                                    Add To Card
                                </button>
                            </div>
                            <div className="mt-14">
                                <div className="flex mb-2">
                                    <p className="text-lg font-bold">
                                        Date of Manufacture:{' '}
                                        <span className="font-medium"> {product.dateOfManufacture} </span>
                                    </p>
                                </div>

                                <div className="flex mb-2">
                                    <p className="text-lg font-bold">
                                        Available: <span className="font-medium"> {product.available} </span>
                                        <span className="font-medium"> Pieces</span>
                                    </p>
                                </div>

                                <div className="flex mb-2">
                                    <p className="text-lg font-bold">
                                        MadeIn: <span className="font-medium">{product.madeIn}</span>
                                    </p>
                                </div>

                                <div className="flex mb-2">
                                    <p className="text-lg font-bold">
                                        Certificate : <span className="font-medium"> {product.certificate} </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="m-auto mt-10 mb-5">
                    <div className="flex justify-center mb-2">
                        <p
                            className={`mb-2 font-bold cursor-pointer text-xl ${
                                activeTab === 'description' ? 'text-primaryColor' : ''
                            }`}
                            onClick={() => setActiveTab('description')}
                        >
                            Description
                        </p>
                        <span className="mx-4">|</span>
                        <p
                            className={`mb-2 font-bold cursor-pointer text-xl ${
                                activeTab === 'feedback' ? 'text-primaryColor' : ''
                            }`}
                            onClick={() => setActiveTab('feedback')}
                        >
                            Feedback
                        </p>
                    </div>
                    {activeTab === 'description' ? (
                        <div className="px-9">
                            <p className="text-center text-lg font-medium">{product.description}</p>
                        </div>
                    ) : (
                        <div>
                            {feedbackList.map((feedback, index) => (
                                <div key={index} className="block m-7">
                                    <span className="font-bold text-lg block">ThienQuang</span>
                                    <span className="ml-7">{feedback}</span>
                                </div>
                            ))}

                            <div className="flex justify-center px-9">
                                <input
                                    type="text"
                                    value={feedbackText}
                                    onChange={(e) => setFeedbackText(e.target.value)}
                                    className="p-2 mr-2 border border-gray-300 rounded w-96 "
                                    placeholder="Enter your feedback"
                                />

                                <button
                                    className="bg-primaryColor hover:bg-blue-300 text-white font-bold py-2 px-4 rounded w-24"
                                    onClick={handleFeedbackSave}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    <ProductsSlide
                        title="Related Products"
                        products={productsList}
                        numOfProducts={6}
                        category={product.category}
                    />
                </div>
            </div>
        </>
    );
};

export default ProductDetailForm;
