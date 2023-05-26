import React from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MainHome = () => {
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
        <div className="container mx-auto px-6 md:px-4 lg:px-20">
            <div className="relative h-[560px] mt-10 mb-16">
                <img
                    className="h-full w-full object-cover rounded-xl"
                    src="https://truongthang.vn/wp-content/uploads/2020/04/truong-thang-hieu-dung-ve-san-pham-than-thien-voi-moi-truong-3.jpg"
                    alt="San pham lam bang go"
                />
                <div className="absolute left-[10%] top-[40%] w-[40%]">
                    <p className="text-primaryColor text-xl font-bold leading-4 mb-2">
                        Environmental Protection Products
                    </p>
                    <h1 className="text-[#252525] text-4xl font-bold leading-[52px] mb-5">
                        100% Natural, Environmental Protection
                    </h1>
                    <a
                        href="/products"
                        className="inline-block bg-primaryColor text-white text-lg font-bold px-5 py-3 rounded"
                    >
                        SHOP NOW
                    </a>
                </div>
            </div>

            <div className="mb-16">
                <div className="">
                    <h1 className="text-[#252525] text-4xl text-center font-bold mb-2">Top Products</h1>
                    <div className="block w-16 h-1 bg-primaryColor mb-10 mx-auto"></div>
                </div>
                <Slider {...settings}>
                    <div className="inline-block">
                        <div className="w-auto mx-3">
                            <a href="/products">
                                <div className="w-full h-[300px]">
                                    <img
                                        className="w-full h-full object-cover rounded"
                                        src="https://oceansky.vn/image/catalog/C%C3%B4ng%20ty%20TNHH%20Ocean%20Sky/s%E1%BA%A3n%20ph%E1%BA%A9m/H%E1%BB%99p%20C%C6%A1m%20Gi%E1%BA%A5y-h%E1%BB%99p%20C%C6%A1m%20B%C3%A3%20M%C3%ADa/h%E1%BB%99p%20b%C3%A3%20m%C3%ADa%203%2C4%20ng%C4%83n/hop-ba-mia-3-ngan-4-ngan-2.png"
                                        alt="Bagasse Box"
                                    />
                                </div>
                            </a>
                            <div className="text-center mt-2">
                                <h3 className=" text-xl font-bold">Bagasse Box</h3>
                                <p className="text-[#252525] text-lg font-bold ">12$</p>
                            </div>
                        </div>
                    </div>
                    <div className="inline-block">
                        <div className="w-auto mx-3">
                            <a href="/products">
                                <div className="w-full h-[300px]">
                                    <img
                                        className="w-full h-full object-cover rounded"
                                        src="https://vn-test-11.slatic.net/p/f49a4176fae00ae4a8cbbc67b9a26f04.jpg"
                                        alt="Bamboo Straws"
                                    />
                                </div>
                            </a>
                            <div className="text-center mt-2">
                                <h3 className=" text-xl font-bold">Bamboo Straws</h3>
                                <p className="text-[#252525] text-lg font-bold ">20$</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="w-auto mx-3">
                            <a href="/products">
                                <div className="w-full h-[300px]">
                                    <img
                                        className="w-full h-full object-cover rounded"
                                        src="https://anhdungstraws.com/wp-content/uploads/2022/12/ly-giay-dung-mot-lan.jpg"
                                        alt="Paper Cup"
                                    />
                                </div>
                            </a>
                            <div className="text-center mt-2">
                                <h3 className=" text-xl font-bold">Paper Cup</h3>
                                <p className="text-[#252525] text-lg font-bold ">5$</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="w-auto mx-3">
                            <a href="/products">
                                <div className="w-full h-[300px]">
                                    <img
                                        className="w-full h-full object-cover rounded"
                                        src="https://salt.tikicdn.com/ts/tmp/f1/ae/f0/68825f561b125297d51fceb39c5da3f5.jpg"
                                        alt="Loofah dishwashing pads"
                                    />
                                </div>
                            </a>
                            <div className="text-center mt-2">
                                <h3 className=" text-xl font-bold">Loofah dishwashing pads</h3>
                                <p className="text-[#252525] text-lg font-bold ">8$</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="w-auto mx-3">
                            <a href="/products">
                                <div className="w-full h-[300px]">
                                    <img
                                        className="w-full h-full object-cover rounded"
                                        src="https://ik.imagekit.io/ograin/s/files/1/0814/0539/products/Untitled-3_1400x.png?v=1658199947"
                                        alt="bamboo water bottle"
                                    />
                                </div>
                            </a>
                            <div className="text-center mt-2">
                                <h3 className=" text-xl font-bold">Bamboo Water Bottle</h3>
                                <p className="text-[#252525] text-lg font-bold ">22$</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="w-auto mx-3">
                            <a href="/products">
                                <div className="w-full h-[300px]">
                                    <img
                                        className="w-full h-full object-cover rounded"
                                        src="https://cdn.shopify.com/s/files/1/0334/3931/8155/files/Preview-2SteelStrawswithCleaningBrushesPacking_1b4592da-a18f-4ceb-9e38-b759eb1e9e86_1500x.jpg?v=1683972735"
                                        alt="stainless steel straws"
                                    />
                                </div>
                            </a>
                            <div className="text-center mt-2">
                                <h3 className=" text-xl font-bold">Stainless Steel Straws</h3>
                                <p className="text-[#252525] text-lg font-bold ">6$</p>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>

            <div className="my-20">
                <div className="">
                    <h1 className="text-[#252525] text-4xl text-center font-bold mb-2">Criteria For</h1>
                    <div className="block w-16 h-1 bg-primaryColor mb-10 mx-auto"></div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 text-center">
                    <div className="w-full px-3 mb-4">
                        <div className="w-full h-[360px] ">
                            <img
                                className="w-full h-full object-cover rounded"
                                src="https://www.build-review.com/wp-content/uploads/2022/06/Sustainable-Construction-Materials.jpg"
                                alt=""
                            />
                        </div>

                        <div className="mt-3">
                            <h2 className="text-[#252525] text-2xl font-bold my-3">Sustainable materials</h2>
                            <p className="text-[#252525] text-lg">
                                Environmentally friendly products need to use sustainable materials sourced from
                                renewable or recyclable resources.
                            </p>
                        </div>
                    </div>

                    <div className="w-full px-3 mb-4">
                        <div className="w-full h-[360px]">
                            <img
                                className="w-full h-full object-cover rounded"
                                src="https://www.goldenarrow.com/sites/default/files/2021-02/ga-zero-emission_optimized.jpg"
                                alt=""
                            />
                        </div>
                        <div className="mt-3">
                            <h2 className="text-[#252525] text-2xl font-bold my-3">
                                Environmentally Friendly Production Processes
                            </h2>
                            <p className="text-[#252525] text-lg">
                                Environmentally friendly products need to be produced using environmentally friendly
                                processes and methods, including the use of renewable energy, reducing toxic waste and
                                emissions, and reusing water.
                            </p>
                        </div>
                    </div>

                    <div className="w-full px-3 mb-4 md:translate-x-[50%] lg:translate-x-0">
                        <div className="w-full h-[360px]">
                            <img
                                className="w-full h-full object-cover rounded"
                                src="https://www.re-thinkingthefuture.com/wp-content/uploads/2020/07/A1322-10-Sustainable-Materials-Every-Architect-Must-Know.jpg"
                                alt=""
                            />
                        </div>
                        <div className="mt-3">
                            <h2 className="text-[#252525] text-2xl font-bold my-3">Reusable Or Recyclable</h2>
                            <p className="text-[#252525] text-lg">
                                Environmentally friendly products need to be designed to be reusable or recyclable after
                                use. This helps to minimize the amount of waste and resources used to produce new
                                products.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainHome;
