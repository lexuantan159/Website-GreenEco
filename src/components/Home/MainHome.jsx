import React, { useContext, useEffect, useState } from 'react';
import ProductsSlide from '../ProductsSlide/ProductsSlide';
import { Spinner } from '@material-tailwind/react';
import ProductsContext from '../../context/productsProvider';

const MainHome = () => {
    const [loading, setLoading] = useState(true);
    const titleProductsSlide = 'Sản Phẩm Bán Chạy';
    const { productsList } = useContext(ProductsContext);

    useEffect(() => {
        productsList.length === 0 ? setLoading(true) : setLoading(false);
    }, [productsList.length]);

    return (
        <div className="container mb-32 mx-auto px-6 md:px-4 lg:px-0">
            <div className="relative h-[560px] mt-10 mb-16">
                <img
                    className="h-full w-full object-cover rounded-xl"
                    src="https://truongthang.vn/wp-content/uploads/2020/04/truong-thang-hieu-dung-ve-san-pham-than-thien-voi-moi-truong-3.jpg"
                    alt="San pham lam bang go"
                />
                <div className="absolute left-[10%] top-[40%] w-[40%]">
                    <p className="text-primaryColor text-xl font-bold leading-4 mb-2">Sản Phẩm Bảo Vệ Môi Trường</p>
                    <h1 className="text-[#252525] text-4xl font-bold leading-[52px] mb-5">
                        100% Tự Nhiên, Bảo Vệ Môi Trường
                    </h1>
                    <a
                        href="/products"
                        className="inline-block bg-primaryColor text-white text-lg font-bold px-5 py-3 rounded"
                    >
                        Cửa Hàng
                    </a>
                </div>
            </div>

            {loading ? (
                <Spinner className="h-12 w-12 mt-10 mx-auto" />
            ) : (
                productsList.length > 0 && (
                    <ProductsSlide title={titleProductsSlide} products={productsList} numOfProducts={6} />
                )
            )}

            <div className="my-20">
                <div className="">
                    <h1 className="text-[#252525] text-4xl text-center font-bold mb-2">Tiêu Chuẩn</h1>
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
                            <h2 className="text-[#252525] text-2xl font-bold my-3">Vật liệu bền vững</h2>
                            <p className="text-[#252525] text-lg">
                                Các sản phẩm thân thiện với môi trường cần sử dụng các vật liệu bền vững có nguồn gốc từ
                                các nguồn tái tạo hoặc tái chế.
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
                                Quy trình sản xuất thân thiện với môi trường
                            </h2>
                            <p className="text-[#252525] text-lg">
                                Các sản phẩm thân thiện với môi trường cần được sản xuất bằng cách sử dụng thân thiện
                                với môi trường quy trình và phương pháp, bao gồm cả việc sử dụng năng lượng tái tạo,
                                giảm chất thải độc hại và khí thải và tái sử dụng nước.
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
                            <h2 className="text-[#252525] text-2xl font-bold my-3">Tái sử dụng hoặc có thể tái chế</h2>
                            <p className="text-[#252525] text-lg">
                                Các sản phẩm thân thiện với môi trường cần được thiết kế để có thể tái sử dụng hoặc tái
                                chế sau khi sử dụng. Điều này giúp giảm thiểu lượng chất thải và tài nguyên được sử dụng
                                để sản xuất sản phẩm mới.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainHome;
