import React, { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import ProductsSlide from '../ProductsSlide/ProductsSlide';
import { useParams } from 'react-router-dom';
import ProductsContext from '../../context/productsProvider';
import { ToastContainer, toast } from 'react-toastify';
import { Spinner } from '@material-tailwind/react';
import AuthContext from '../../context/authProvider';
import * as addProductServices from '../../services/addProductServices';
import * as feedbackServices from '../../services/feedbackServices';

const ProductDetailForm = () => {
    const [product, setProduct] = useState({});
    product && (document.title = `${product.title}`)
    const inputRef = useRef();
    const { productsList } = useContext(ProductsContext);
    const { auth } = useContext(AuthContext);
    const [count, setCount] = useState(0);
    const [activeTab, setActiveTab] = useState('description');
    const [feedbackList, setFeedbackList] = useState([]);
    const [loading, setLoading] = useState(true);
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
        // scroll top 
        window.scrollTo(0, 0)
        if (param.id !== undefined) {
            const feedback = async () => {
                const feedback = await feedbackServices.getFeedback(param.id);
                const listFeedback = feedback.statusCode === 200 && feedback.response;
                if (listFeedback.length > 0) {
                    console.log(listFeedback)
                    setFeedbackList(
                        listFeedback.map((feedback) => {
                            return {
                                name: feedback.User.fullname,
                                comment: feedback.comment,
                            };
                        }),
                    );
                } else {
                    setFeedbackList([]);
                }
            };

            feedback();
        }

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

    const postFeedback = async (token, comment, productId) => {
        setFeedbackList([...feedbackList, { name: auth.fullName, comment: comment }]);
        await feedbackServices.postFeedback(token, comment, productId);
    };

    const handleFeedbackSave = () => {
        if (inputRef.current.value.trim() === '') {
            notify('Feedback Value Not Available');
        } else {
            auth.accessToken !== undefined
                ? postFeedback(auth.accessToken, inputRef.current.value.trim(), param.id)
                : notify('Login Before Add Product');
        }
        inputRef.current.value = '';
    };

    // const handleDeleteFeedback = () => {
    //     console.log(1);
    // }

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
                                    Giá: <span className="font-medium">{product.price} vnđ</span>
                                </p>
                            </div>
                            <div className="mb-2">
                                <p className="text-lg font-bold">
                                    Danh Mục: <span className="font-medium"> {product.category} </span>
                                </p>
                            </div>

                            <div className="flex items-center mb-2 mt-16">
                                <button
                                    className="bg-primaryColor active:opacity-80 text-white font-bold py-2 px-4 rounded-l"
                                    onClick={decrement}
                                >
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                                <button className="bg-gray-300  text-gray-800 font-bold py-2 px-4 mx-2">{count}</button>
                                <button
                                    className="bg-primaryColor active:opacity-80 text-white font-bold py-2 px-4  rounded-r"
                                    onClick={() => setCount(count + 1)}
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                                <button
                                    onClick={handleAddProducts}
                                    className="bg-primaryColor active:opacity-80 text-white font-bold py-2 px-4 w-150 h-46 ml-4 rounded"
                                >
                                    Thêm Vào Giỏ
                                </button>
                            </div>
                            <div className="mt-14">
                                <div className="flex mb-2">
                                    <p className="text-lg font-bold">
                                        Ngày Sẩn Xuất:{' '}
                                        <span className="font-medium"> {product.dateOfManufacture} </span>
                                    </p>
                                </div>

                                <div className="flex mb-2">
                                    <p className="text-lg font-bold">
                                        Số Lượng: <span className="font-medium"> {product.available} </span>
                                        <span className="font-medium"> Pieces</span>
                                    </p>
                                </div>

                                <div className="flex mb-2">
                                    <p className="text-lg font-bold">
                                        Nơi Sản Xuất: <span className="font-medium">{product.madeIn}</span>
                                    </p>
                                </div>

                                <div className="flex mb-2">
                                    <p className="text-lg font-bold">
                                        Chứng Chỉ: <span className="font-medium"> {product.certificate} </span>
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
                            Mô Tả
                        </p>
                        <span className="mx-4">|</span>
                        <p
                            className={`mb-2 font-bold cursor-pointer text-xl ${
                                activeTab === 'feedback' ? 'text-primaryColor' : ''
                            }`}
                            onClick={() => setActiveTab('feedback')}
                        >
                            Đánh Giá
                        </p>
                    </div>
                    {activeTab === 'description' ? (
                        <div className="px-9">
                            <p className="text-center text-lg font-medium">{product.description}</p>
                        </div>
                    ) : (
                        <div className="my-5">
                            <div className="flex justify-center px-9">
                                <input
                                    type="text"
                                    ref={inputRef}
                                    className="p-2 mr-2 border border-gray-300 focus:border-primaryColor outline-none rounded w-96 "
                                    placeholder="Enter your feedback"
                                    required
                                />

                                <button
                                    className="bg-primaryColor active:opacity-80 text-white font-bold py-2 px-4 rounded w-24"
                                    onClick={handleFeedbackSave}
                                >
                                    Đánh Giá
                                </button>
                            </div>

                            <ul className="max-w-[450px] lg:max-w-[800px] h-[350px] overflow-y-scroll  my-8 mx-auto shadow rounded">
                                {feedbackList.length > 0
                                    ? feedbackList.map((feedback, index) => {
                                          return (
                                              <li key={index} className="my-4 grid grid-cols-2 gap-8 items-center lg:gap-80">
                                                  <div className='pl-4' >
                                                      <p className="font-bold text-lg">{feedback.name}</p>
                                                      <p className="font-bold text-lg">
                                                          Nội Dung:{' '}
                                                          <span className="font-medium">{feedback.comment}</span>
                                                      </p>
                                                  </div>
                                                  {
                                                    
                                                  }
                                              </li>
                                          );
                                      })
                                    : null}
                            </ul>
                        </div>
                    )}
                </div>
                <div>
                    <ProductsSlide
                        title="Sản Phẩm Liên Quan"
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
