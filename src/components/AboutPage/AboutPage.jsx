import React from 'react';

const statistics = [
    { label: 'Cửa Hàng', value: '01' },
    { label: 'Sản Phẩm', value: '19+' },
    { label: 'Phản Hồi', value: '12+' },
];

function AboutPage() {
    return (
        <div className="">
            <div className="mx-auto py-20">
                <div className="w-full h-full flex justify-center items-center">
                    <div className="w-full mx-auto px-5 flex justify-center items-center">
                        <div className="mx-16 text-black text-center">
                            <div className="font-bold text-6xl mb-6">Giới Thiệu</div>
                            <p className="font-medium text-gray-500  text-[16px] mb-10 leading-7 tracking-tight ">
                                Trang web của chúng tôi bán các sản phẩm thân thiện với môi trường.
                                <br />
                                Chúng tôi cam kết tạo ra những sản phẩm chất lượng cao và thân thiện với môi trường.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-[1308px] mx-auto mb-32 bg-opacity-40">
                    <img
                        className="w-full lg:h-[560px] object-cover rounded-xl"
                        src="https://storage.googleapis.com/ops-shopee-files-live/live/shopee-blog/2022/11/169ff58b-san-pham-than-thien-voi-moi-truong.jpg"
                        alt=""
                    />
                </div>

                <div className="py-5 m-auto mb-28">
                    <div className="m-auto h-full flex items-center justify-center text-center">
                        {statistics.map((stat) => (
                            <div className="px-16" key={stat.label}>
                                <div className="text-primaryColor text-6xl font-bold mb-2">{stat.value}</div>
                                <div className="text-textColor text-lg font-bold">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mx-auto mb-40">
                    <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-4 w-[95%] lg:w-[65%] mx-auto mb-24">
                        <div className="basis-1/2">
                            <div className=" w-full h-full object-cover min-h-[350px]">
                                <img
                                    className="rounded-3xl"
                                    src="https://moitruongachau.com/vnt_upload/news/12_2018/sggptui_vyxw.jpg"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="basis-1/2 text-center lg:text-left lg:pl-6 mb-6">
                            <div className="text-4xl leading-10 mb-6 font-bold">Lợi Ích</div>
                            <div className="text-gray-500 text-[16px] leading-7 mb-6">
                                Website bán sản phẩm thân thiện với môi trường, có giá trị kinh tế xã hội. Các sử dụng
                                các sản phẩm thân thiện với môi trường giúp giảm tác động đến môi trường góp phần bảo vệ
                                sức khỏe con người và môi trường sống.
                            </div>
                            <div className="">
                                <a
                                    href="https://baotainguyenmoitruong.vn/san-pham-than-thien-voi-moi-truong-nhu-cau-nguoi-tieu-dung-tang-manh-307115.html"
                                    className="text-coffee-400 hover:text-green-600 relative after:absolute after:-bottom-2 after:left-0 after:bg-coffee-50 hover:after:bg-coffee-200 after:h-0.5 after:w-full after:transition-all after:ease-in-out after:duration-400"
                                >
                                    Đọc toàn bộ
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-4 w-[95%] lg:w-[65%] mx-auto ">
                        <div className="basis-1/2 text-center lg:text-left lg:pl-6">
                            <div className="text-4xl leading-10 mb-6 font-bold">Mở mỗi ngày</div>
                            <div className="text-gray-500  text-[16px] leading-7 mb-6">
                                Chào mừng bạn đến với trang web bán sản phẩm thân thiện với môi trường của chúng tôi!
                                Chúng tôi mở cửa hàng ngày và sẵn sàng phục vụ bạn, giúp bạn lựa chọn những sản phẩm tốt
                                nhất cho sức khỏe và bản thân môi trường.
                            </div>
                            <div className="">
                                <a
                                    href="/"
                                    alt=" "
                                    className="text-coffee-400 hover:text-green-600 relative after:absolute after:-bottom-2 after:left-0 after:bg-coffee-50 hover:after:bg-coffee-200 
                                    after:h-0.5 after:w-full after:transition-all after:ease-in-out after:duration-400"
                                >
                                    Đọc toàn bộ
                                </a>
                            </div>
                        </div>
                        <div className="basis-1/2">
                            <div className="w-[480px] hl-ful object-cover min-h-[350px] ">
                                <img
                                    className="rounded-3xl"
                                    src="https://btnmt.1cdn.vn/2020/07/16/29173d74f2130e4d5702.jpg"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;
