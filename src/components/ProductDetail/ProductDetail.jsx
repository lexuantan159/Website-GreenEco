import React, { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import ProductsSlide from '../ProductsSlide/ProductsSlide';
import { useNavigate, useParams } from 'react-router-dom';
import ProductsContext from '../../context/productsProvider';
import { ToastContainer, toast } from 'react-toastify';
import { Spinner } from '@material-tailwind/react';
import AuthContext from '../../context/authProvider';
import * as addProductServices from '../../services/addProductServices';
import * as feedbackServices from '../../services/feedbackServices';
import Swal from 'sweetalert2';

const ProductDetailForm = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    product && (document.title = `${product.title}`);
    const inputRef = useRef();
    const { productsList } = useContext(ProductsContext);
    const { auth } = useContext(AuthContext);
    const [count, setCount] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [feedbackList, setFeedbackList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [feedbackAgain, setFeedbackAgain] = useState('None');
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
        window.scrollTo(0, 0);

        if (param.id !== undefined) {
            const feedback = async () => {
                const feedback = await feedbackServices.getFeedback(param.id);
                const listFeedback = feedback.statusCode === 200 && feedback.response;
                if (listFeedback.length > 0) {
                    // handle setting feedback list
                    setFeedbackList(
                        listFeedback.map((feedback) => {
                            return {
                                name: feedback.User.fullname,
                                comment: feedback.comment,
                            };
                        }),
                    );
                    // handle has comment
                    listFeedback.some((feedback) => feedback.User.fullname === auth.fullName) &&
                        setFeedbackAgain('Posted');
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
    }, [auth.fullName, param.id, productsList]);

    const addProduct = async (token, id, quantity) => {
        notify('Thêm vào giỏ  thành công');
        const response = await addProductServices.addProduct(token, id, quantity);
        response.statusCode !== 200 && notify(response.error);
    };

    const handleAddProducts = () => {
        auth.accessToken !== undefined ? addProduct(auth.accessToken, product.id, count) : navigate('/login');
    };

    const decrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const postFeedback = async (token, comment, productId) => {
        setFeedbackList([...feedbackList, { name: auth.fullName, comment: comment }]);
        // handle feedback again
        setFeedbackAgain('Posted');
        // call api
        const response = await feedbackServices.postFeedback(token, comment, productId);
        response.statusCode !== 200 && console.log(response.error);
    };

    const firstSubmitFeedback = () => {
        auth.accessToken !== undefined
            ? postFeedback(auth.accessToken, inputRef.current.value.trim(), param.id)
            : navigate('/login');
    };

    const handleFeedbackSave = () => {
        if (feedbackAgain === 'None') {
            if (inputRef.current.value.trim() === '') {
                notify('Đánh Giá Không Được Để Trống');
            } else firstSubmitFeedback();
        } else if (feedbackAgain === 'Edit') {
            // handle render feedback edit
            setFeedbackList(updateCommentByName(auth.fullName, inputRef.current.value.trim()));
            // call api
            editFeedback(auth.accessToken, inputRef.current.value, param.id);
            // set has feedback
            setFeedbackAgain('Posted');
        } else notify('Bạn Chỉ Được Đánh Giá 1 Lần!');

        inputRef.current.value = '';
    };

    const deleteFeedback = async (token, productId, fullName) => {
        Swal.fire({
            title: 'Bạn có chắn là muốn xóa đánh giá này không?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có, Xóa nó đi!',
        }).then((result) => {
            if (result.isConfirmed) {
                const newFeedbackList = feedbackList.filter((feedback) => feedback.name !== fullName);
                setFeedbackList(newFeedbackList);
                setFeedbackAgain('None');
            }
        });
        const response = await feedbackServices.deleteFeedback(token, productId);
        response.statusCode !== 200 && console.log(response.error);
    };

    const handleDeleteFeedback = () => {
        if (auth.accessToken === undefined) {
            navigate('/login');
        } else {
            deleteFeedback(auth.accessToken, param.id, auth.fullName);
        }
    };

    const displayMenu = () => {
        const menuFeedback = document.querySelector('#menu-feedback');
        menuFeedback.classList.toggle('hidden');
    };

    const editFeedback = async (token, comment, productId) => {
        const response = await feedbackServices.editFeedback(token, productId, comment, productId);
        response.statusCode !== 200 && console.log(response.error);
    };

    function updateCommentByName(name, newComment) {
        return feedbackList.map(function(element) {
            if (element.name === name) {
                return { name: element.name, comment: newComment };
            } else {
                return element;
            }
        });
    }

    const handleEditFeedback = () => {
        if (auth.accessToken === undefined) {
            navigate('/login');
        } else {
            // get comments and add them to the input field
            inputRef.current.value = feedbackList.find((feedback) => feedback.name === auth.fullName).comment;
            // hidden menu feedback
            displayMenu();
            // handle feedback again
            setFeedbackAgain('Edit');
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
                                        Năm Sản Xuất:{' '}
                                        <span className="font-medium"> {product.dateOfManufacture} </span>
                                    </p>
                                </div>

                                <div className="flex mb-2">
                                    <p className="text-lg font-bold">
                                        Số Lượng Còn Lại: <span className="font-medium"> {product.available} </span>
                                        <span className="font-medium"> Sản Phẩm</span>
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

                            <ul className="max-w-[450px] lg:max-w-[800px] max-h-[350px] overflow-y-auto my-8 mx-auto shadow rounded">
                                {feedbackList.length > 0 ? (
                                    feedbackList.map((feedback, index) => {
                                        return (
                                            <li
                                                key={index}
                                                className="my-4 grid grid-cols-2 gap-8 items-center lg:gap-80"
                                            >
                                                <div className="pl-4">
                                                    <p className="font-bold text-lg"> {feedback.name}</p>
                                                    <p className="font-bold text-lg">
                                                        Nội Dung:
                                                        <span className="font-medium"> {feedback.comment}</span>
                                                    </p>
                                                </div>
                                                {feedback.name === auth.fullName ? (
                                                    <div className="relative bg-white  ">
                                                        <FontAwesomeIcon
                                                            id="three-dots"
                                                            className="px-2 hover:cursor-pointer"
                                                            icon={faEllipsisVertical}
                                                            onClick={displayMenu}
                                                        />
                                                        <div
                                                            id="menu-feedback"
                                                            className="hidden absolute top-[-25px] left-6 z-10 shadow rounded "
                                                        >
                                                            <p
                                                                onClick={handleDeleteFeedback}
                                                                className="block px-4 text-lg font-medium hover:text-primaryColor hover:cursor-pointer hover:rounded-t transition-all hover:bg-blue-gray-100"
                                                            >
                                                                Xóa
                                                            </p>
                                                            <p
                                                                onClick={handleEditFeedback}
                                                                className="block px-4 text-lg font-medium hover:text-primaryColor hover:cursor-pointer hover:rounded-b transition-all hover:bg-blue-gray-100"
                                                            >
                                                                Sửa
                                                            </p>
                                                        </div>
                                                    </div>
                                                ) : // <FontAwesomeIcon
                                                //     className="text-xl text-textColor hover:text-red-700"
                                                //     onClick={handleDeleteFeedback}
                                                //     icon={faXmark}
                                                // />
                                                null}
                                            </li>
                                        );
                                    })
                                ) : (
                                    <p className="text-xl text-textColor font-bold text-center py-3">
                                        Sản Phẩm Chưa Có Đánh Giá
                                    </p>
                                )}
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
