import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { getCart, deleteProductItem } from '../../services/cartServices';
import AuthContext from '../../context/authProvider';

const ShoppingCart = () => {
    const [cartList, setCartList] = useState([]);
    const { auth } = useContext(AuthContext);

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
        if (auth.accessToken !== undefined) {
            const fetchCart = async () => {
                const fetchCart = await getCart(auth.accessToken);
                if (fetchCart.statusCode === 200) {
                    setCartList(fetchCart.products);
                    console.log(fetchCart);
                } else {
                    console.log(fetchCart.error);
                }
            };
            fetchCart();
        }
    }, [auth.accessToken]);

   
    const calculateTotal = () => {
        let total = 0;
        cartList.forEach((product) => {
            total += product.price * product.CartItem.quantity;
        });
        return total;
    };
    const updateCartItemQuantity = (productId, newQuantity) => {
        setCartList((prevCartList) => {
            return prevCartList.map((product) => {
                if (product.id === productId) {
                    return {
                        ...product,
                        CartItem: {
                            ...product.CartItem,
                            quantity: newQuantity,
                        },
                    };
                }
                return product;
            });
        });
    };
    const decrement = (productId) => {
        setCartList((prevCartList) => {
            const updatedCartList = prevCartList.map((product) => {
                if (product.id === productId) {
                    const newQuantity = product.CartItem.quantity - 1;
                    updateCartItemQuantity(productId, newQuantity);
                    return {
                        ...product,
                        CartItem: {
                            ...product.CartItem,
                            quantity: newQuantity,
                        },
                    };
                }
                return product;
            });
            return updatedCartList.filter((product) => product.CartItem.quantity > 0);
        });
    };

    const increment = (productId) => {
        setCartList((prevCartList) => {
            return prevCartList.map((product) => {
                if (product.id === productId) {
                    const newQuantity = product.CartItem.quantity + 1;
                    updateCartItemQuantity(productId, newQuantity);
                    return {
                        ...product,
                        CartItem: {
                            ...product.CartItem,
                            quantity: newQuantity,
                        },
                    };
                }
                return product;
            });
        });
    };

    const handleDeleteProduct = async (prodId) => {
        
        const deleteResponse = await deleteProductItem(auth.accessToken, prodId);
        if (deleteResponse.statusCode === 200) {
          console.log(deleteResponse.message);
        } else {
          console.error(deleteResponse.error);
        }
      };

    return (
        <>
            <ToastContainer />
            <div className="container mb-32 mx-auto px-6 md:px-4 lg:px-0">
                <div className="relative h-[250px] mt-10 mb-16">
                    <img
                        className="h-full w-full object-cover rounded"
                        src="https://margram.vn/files/san-pham-than-thien-moi-truong-014.png"
                        alt="San pham lam bang go"
                    />
                    <div className="absolute left-[40%] top-[40%] w-[40%]">
                        <h1 className="text-[#0f110f] text-5xl font-bold leading-[52px] mb-5 ml-[40px] ">Giỏ Hàng</h1>
                        <p className="font-bold italic text-[#353b35] ">Thêm vào giỏ hàng, thanh toán ngay</p>
                    </div>
                </div>

                <div className="flex shadow-md mx-auto mt-10 h-full mb-20">
                    <div className="w-3/4 bg-white px-10 py-10">
                        <div className="flex justify-between border-b pb-8">
                            <h1 className="font-bold text-2xl">Sản Phẩm Được Chọn</h1>
                            <h2 className="font-bold text-2xl">{cartList.length} Mặt Hàng</h2>
                        </div>
                        <div className="grid grid-cols-5 mt-10 mb-6">
                            <h3 className="font-bold text-gray-700 text-lg uppercase col-span-2">Chi Tiết Sản Phẩm</h3>
                            <h3 className="font-bold text-gray-700 text-lg uppercase col-span-1 text-center">
                                Số Lượng
                            </h3>
                            <h3 className="font-bold text-gray-700 text-lg uppercase col-span-1 text-center">Giá</h3>
                            <h3 className="font-bold text-gray-700 text-lg uppercase col-span-1 text-center">
                                Tổng Tiền
                            </h3>
                        </div>

                        <div className="">
                            {cartList.length > 0
                                ? cartList.map((product) => (
                                      <div
                                          key={product.id}
                                          className="grid grid-cols-5 items-center mb-2 cursor-pointer"
                                      >
                                          <div className="col-span-2 flex items-center text-[18px]">
                                              <img
                                                  className="w-[100px] h-[100px] mr-6"
                                                  src={product.imageUrl}
                                                  alt={product.title}
                                              />
                                              <div className="">{product.title}</div>
                                          </div>
                                          <div className="col-span-1 font-semibold text-[18px] flex justify-center items-center">
                                              <button
                                                  className="bg-primaryColor active:opacity-80 text-white font-bold py-1 px-2 rounded-l"
                                                  onClick={() => decrement(product.id)} // Pass productId as an argument
                                              >
                                                  <FontAwesomeIcon icon={faMinus} />
                                              </button>
                                              <span className="mx-2 text-center py-1 px-2">
                                                  {product.CartItem.quantity}
                                              </span>
                                              <button
                                                  className="bg-primaryColor active:opacity-80 text-white font-bold py-1 px-2 rounded-r"
                                                  onClick={() => increment(product.id)} // Pass productId as an argument
                                              >
                                                  <FontAwesomeIcon icon={faPlus} />
                                              </button>
                                          </div>
                                          <div className="col-span-1 font-semibold text-[18px] flex justify-center items-center">
                                              <div className="">{product.price} </div>
                                          </div>
                                          <div className="col-span-1 font-semibold text-[18px] flex items-center justify-center ">
                                              <div className="ml-12 ">
                                                  {product.price * product.CartItem.quantity} VND
                                              </div>
                                              <div className="ml-auto">
                                                  <FontAwesomeIcon
                                                      icon={faXmark}
                                                      className="text-[20px] text-gray-600 cursor-pointer"
                                                      onClick={() => handleDeleteProduct(product.id)}
                                                  />
                                              </div>
                                          </div>
                                      </div>
                                  ))
                                : null}
                        </div>

                        <Link to="/products" className="flex font-bold text-[24px] text-indigo-600 text-sm mt-10">
                            <svg className="fill-current mr-2 text-indigo-600 w-4 text-[24px]" viewBox="0 0 448 512">
                                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                            </svg>
                            Tiếp Tục Mua Sắm
                        </Link>
                    </div>

                    <div id="summary" className="w-1/4 px-8 py-10">
                        <h1 className="font-bold text-2xl border-b pb-8">Tóm Tắt Đơn Hàng</h1>
                        <div className="flex justify-between items-center mt-4">
                            <h2 className="font-bold text-xl">{cartList.length} Mặt Hàng </h2>
                            <span className="font-bold text-lg">{calculateTotal()} VND</span>
                        </div>

                        <div className="border-t mt-8">
                            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                                <span className="text-[18px] font-bold">Tổng Chi Phí</span>
                                <span className="text-[18px] font-bold">{calculateTotal()} VND</span>
                            </div>
                            <Link to="/checkout">
                                <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                                    Thanh Toán
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShoppingCart;
