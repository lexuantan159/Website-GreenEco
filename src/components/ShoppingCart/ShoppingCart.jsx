import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ShoppingCart = () => {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Bamboo Straws',
            price: 10,
            quantity: 0,
            image:
                'https://cdn.tgdd.vn/2022/09/CookDishThumb/ong-hut-tre-la-gi-cach-lam-su-dung-va-noi-mua-ong-hut-tre-thumb-620x620.jpg',
        },
        {
            id: 2,
            name: 'Bamboo Straws',
            price: 10,
            quantity: 0,
            image:
                'https://cdn.tgdd.vn/2022/09/CookDishThumb/ong-hut-tre-la-gi-cach-lam-su-dung-va-noi-mua-ong-hut-tre-thumb-620x620.jpg',
        },
        {
            id: 3,
            name: 'Bamboo Straws',
            price: 10,
            quantity: 0,
            image:
                'https://cdn.tgdd.vn/2022/09/CookDishThumb/ong-hut-tre-la-gi-cach-lam-su-dung-va-noi-mua-ong-hut-tre-thumb-620x620.jpg',
        },
    ]);

    const calculateTotal = () => {
        let total = 0;
        products.forEach((product) => {
            total += product.price * product.quantity;
        });
        return total;
    };

    const updateQuantity = (productId, newQuantity) => {
        const updatedProducts = products.map((product) => {
            if (product.id === productId) {
                return { ...product, quantity: newQuantity };
            }
            return product;
        });
        setProducts(updatedProducts);
    };

    return (
        <div className="container mb-32 mx-auto px-6 md:px-4 lg:px-0">
            <div className="relative h-[250px] mt-10 mb-16">
                <img
                    className="h-full w-full object-cover rounded"
                    src="https://margram.vn/files/san-pham-than-thien-moi-truong-014.png"
                    alt="San pham lam bang go"
                />
                <div className="absolute left-[40%] top-[40%] w-[40%]">
                   
                    <h1 className="text-[#0f110f] text-5xl font-bold leading-[52px] mb-5 ">
                        Shopping Cart
                    </h1>
                    <p className='font-bold italic text-[#353b35] ml-[75px]'>Add To Cart, Pay Now</p>
                </div>
            </div>

            <div className="flex shadow-md my-10 mx-auto mt-10 w-[70%]">
                <div className="w-3/4 bg-white px-10 py-10">
                    <div className="flex justify-between border-b pb-8">
                        <h1 className="font-bold text-2xl">Selected Products</h1>
                        <h2 className="font-semibold text-2xl">{products.length} Items</h2>
                    </div>
                    <div className="flex mt-10 mb-6 ">
                        <h3 className="font-bold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                        <h3 className="font-bold text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
                        <h3 className="font-bold text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
                        <h3 className="font-bold text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
                    </div>
                    <div>
                        {products.map((product) => (
                            <div key={product.id} className="flex items-center justify-between mb-2 cursor-pointer">
                                <div className="flex items-center ">
                                    <img className="w-[100px] h-[100px] mr-6" src={product.image} alt={product.name} />
                                    <div className="">{product.name}</div>
                                </div>
                                <div>${product.price}</div>
                                <div className="mr-[54px]">
                                    <button
                                        className=""
                                        onClick={() => updateQuantity(product.id, product.quantity - 1)}
                                        disabled={product.quantity === 0}
                                    >
                                        -
                                    </button>
                                    <span className="mx-2 flex-1 text-center">{product.quantity}</span>
                                    <button
                                        className=""
                                        onClick={() => updateQuantity(product.id, product.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="">${product.price * product.quantity}</div>
                            </div>
                        ))}
                    </div>

                    <Link to="/products" className="flex font-semibold text-indigo-600 text-sm mt-10">
                        <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
                            <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                        </svg>
                        Continue Shopping
                    </Link>
                </div>

                <div id="summary" className="w-1/4 px-8 py-10">
                    <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                    <div className="flex justify-between mt-10 mb-5">
                        <span className="font-semibold text-sm uppercase">Items 3</span>
                        <span className="font-semibold text-sm">590$</span>
                    </div>

                    <div className="py-10">
                        <label for="promo" className="font-semibold inline-block mb-3 text-sm uppercase">
                            Discount Code
                        </label>
                        <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full" />
                    </div>
                    <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
                        Apply Coupon
                    </button>
                    <div className="border-t mt-8">
                        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                            <span>Total cost</span>
                            <span>${calculateTotal()}</span>
                        </div>
                        <Link to="/checkout">
                            <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                                Checkout
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
