import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductDetailForm = () => {
    const [count, setCount] = useState(0);
    const [activeTab, setActiveTab] = useState('description');
    const [feedbackText, setFeedbackText] = useState('');
    const [feedbackList, setFeedbackList] = useState([]);

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const handleFeedbackSave = () => {
        if (feedbackText) {
            setFeedbackList([...feedbackList, feedbackText]);
            setFeedbackText('');
        }
    };
    const settings = {
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
        <div className="max-w-screen-lg m-auto">
            <div className="flex max-w-screen-lg m-auto mt-20">
                <div className="w-1/2">
                    <img
                        src="https://drive.google.com/uc?export=view&id=14wTQYBCqt_5milt2BwK-akfd7aNFLUkU"
                        alt="Product"
                        className="w-full"
                    />
                </div>
                <div className="w-1/2 p-4">
                    <h2 className="text-2xl font-bold mb-4">Bamboo toothbrush</h2>
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map((index) => (
                            <FontAwesomeIcon key={index} icon={faStar} className="text-yellow-500 w-4 h-4 mr-1" />
                        ))}

                        <span> (18 vote) </span>
                    </div>

                    <div className="flex mb-2 ">
                        <p className="mb-2 font-bold">Price: $</p>
                        <span className="ml-2"> 0.95 </span>
                    </div>
                    <div className="flex">
                        <p className="mb-2 font-bold">Category: </p>
                        <span className="ml-2"> toothbrush </span>
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
                            onClick={increment}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                        <button className="bg-primaryColor hover:bg-blue-300 text-white font-bold py-2 px-4 w-150 h-46 ml-4">
                            Add To Card
                        </button>
                    </div>
                    <div className="mt-14">
                        <div className="flex">
                            <p className="mb-2 font-bold">Date of Manufacture: </p>
                            <span className="ml-2"> 2023 </span>
                        </div>

                        <div className="flex">
                            <p className="mb-2 font-bold">Available: </p>
                            <span className="ml-2"> 1000 </span>
                            <p className="ml-2"> Pieces</p>
                        </div>

                        <div className="flex">
                            <p className="mb-2 font-bold">MadeIn: </p>
                            <span className="ml-2">
                                {' '}
                                VinhPhatWood, 2563, Map sheet 13-3, Tan An Ward, City. Thu Dau Mot, Binh Duong, Vietnam{' '}
                            </span>
                        </div>

                        <div className="flex">
                            <p className="mb-2 font-bold">Certificate : </p>
                            <span className="ml-2"> ISO 14001:2015 </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-screen-md m-auto mt-10 mb-5">
                <div className="flex justify-center mb-2">
                    <p
                        className={`mb-2 font-bold cursor-pointer text-xl ${
                            activeTab === 'description' ? 'text-primaryColor' : ''
                        }`}
                        onClick={() => handleTabClick('description')}
                    >
                        Description
                    </p>
                    <span className="mx-4">|</span>
                    <p
                        className={`mb-2 font-bold cursor-pointer text-xl ${activeTab === 'feedback' ? 'text-primaryColor' : ''}`}
                        onClick={() => handleTabClick('feedback')}
                    >
                        Feedback
                    </p>
                </div>
                {activeTab === 'description' ? (
                    <div>
                        <p>
                            Bamboo toothbrushes are eco-friendly toothbrushes with handles made from sustainable bamboo.
                            They are biodegradable and non-toxic, offering a natural and safe oral care option. With
                            ergonomic designs and various bristle choices, they provide comfortable brushing and
                            versatility. Bamboo toothbrushes are a conscious consumer choice, reducing plastic waste and
                            promoting sustainability.
                        </p>
                    </div>
                ) : (
                    <div>
                        <div>
                            {/* Hiển thị danh sách feedback */}
                            {feedbackList.map((feedback, index) => (
                                <div key={index} className='block m-7'>
                                    <span className='font-bold text-lg block'>ThienQuang</span>
                                    <span className='ml-7'>{feedback}</span>
                                </div>
                            ))}
                        </div>
                        <div className='flex justify-center '>
                            {/* Input để nhập feedback */}
                            <input
                                type='text'
                                value={feedbackText}
                                onChange={(e) => setFeedbackText(e.target.value)}
                                className='p-2 mr-2 border border-gray-300 rounded w-96 '
                                placeholder='Enter your feedback'
                            />
                            {/* Nút "Save" để lưu feedback */}
                            <button
                                className='bg-primaryColor hover:bg-blue-300 text-white font-bold py-2 px-4 rounded w-24'
                                onClick={handleFeedbackSave}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div>
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
            </div>
        </div>
    );
};

export default ProductDetailForm;
