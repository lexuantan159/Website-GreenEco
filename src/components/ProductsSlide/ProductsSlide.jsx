import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductsSlide = ({ title, products , numOfProducts = 6 }) => {


    const listProducts = (passProducts) => {
        var randomProducts = [];
        var flag = 0;
        while (flag <= numOfProducts) {
            var randomNumber = Math.floor(Math.random() * passProducts.length);
            if (!randomProducts.includes(passProducts[randomNumber])) {
                randomProducts.push(passProducts[randomNumber]);
            }
            flag++;
        }
        return randomProducts;
    };


    var settings = {
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 4,
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
                                <a href="/products">
                                    <div className="w-full h-[300px]">
                                        <img
                                            className="w-full h-full object-cover rounded"
                                            src={product.imageUrl}
                                            alt={product.title}
                                        />
                                    </div>
                                </a>
                                <div className="text-center mt-2">
                                    <h3 className=" text-xl font-bold">{product.title}</h3>
                                    <p className="text-[#252525] text-lg font-bold ">{product.price}$</p>
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
