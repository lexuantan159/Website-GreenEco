import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const ProductsSlide = ({ title, products, numOfProducts = 6, category = 'All' }) => {
    const truncatedString = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + '...';
        } else {
            return str;
        }
    };

    const randomProducts = (products, numOfProducts) => {
        var randomProducts = [];
        var flag = 0;
        while (flag <= numOfProducts) {
            var randomNumber = Math.floor(Math.random() * products.length);
            if (!randomProducts.includes(products[randomNumber])) {
                randomProducts.push(products[randomNumber]);
            }
            flag++;
        }
        return randomProducts;
    };

    const formattedNumber = (num) => {
        return num.toLocaleString('en-US').replace(/,/g, '.');
    };

    const listProducts = (passProducts) => {
        const products =
            category === 'All' ? passProducts : passProducts.filter((product) => product.category === category);
        if (products.length < 6) {
            return products;
        } else {
            return randomProducts(products, numOfProducts);
        }
    };

    const lowProducts = (passProducts, numOfProducts) => {
        const products =
            category === 'All' ? passProducts : passProducts.filter((product) => product.category === category);
        if (products.length < numOfProducts) return 3;
        return 4;
    };

    var settings = {
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: lowProducts(products, numOfProducts),
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        cssEase: 'linear',
        touchThreshold: 100,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <div className="mb-16">
            <div className="">
                <h1 className="text-[#252525] text-4xl text-center font-bold mb-2">{title}</h1>
                <div className="block w-16 h-1 bg-primaryColor mb-10 mx-auto"></div>
            </div>
            <Slider {...settings}>
                {listProducts(products).map((product) => {
                    return (
                        <div key={product.id} className="inline-block">
                            <div className="w-auto mx-3">
                                <Link to={`/products/${product.id}`}>
                                    <div className="w-full h-[300px]">
                                        <img
                                            className="w-full h-full object-cover rounded"
                                            src={product.imageUrl}
                                            alt={product.title}
                                        />
                                    </div>
                                </Link>
                                <div className="text-center mt-2">
                                    <h3 className=" text-xl font-bold">
                                        {
                                            <h4 className="text-lg font-medium px-2">
                                                {truncatedString(product.title, 23)}
                                            </h4>
                                        }
                                    </h3>
                                    <p className="text-lg text-primaryColor font-bold mt-3">
                                        {formattedNumber(product.price)} VNĐ
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
};

export default ProductsSlide;
