import React from 'react';

const CategoryProducts = ({ category, onCategoryChange }) => {
    return (
        <div className="mt-16">
            <div className="">
                <h1 className="text-[#252525] text-4xl text-center font-bold mb-2">Sản Phẩm Của Chúng Tôi</h1>
            </div>
            <ul className="flex justify-center">
                <li className="px-3 ">
                    <p onClick={() => onCategoryChange('Tất cả')} className="text-[#252525] hover:cursor-pointer">
                        Tất Cả
                    </p>
                    {category === 'Tất cả' ? (
                        <div className="block w-full h-[2px] bg-primaryColor mb-10 mx-auto"></div>
                    ) : null}
                </li>
                <li className="px-3 ">
                    <p onClick={() => onCategoryChange('Tái chế')} className="text-[#252525] hover:cursor-pointer">
                        Tái Chế
                    </p>
                    {category === 'Tái chế' ? (
                        <div className="block w-full h-[2px] bg-primaryColor mb-10 mx-auto"></div>
                    ) : null}
                </li>
                <li className="px-3 ">
                    <p onClick={() => onCategoryChange('Hữu cơ')} className="text-[#252525] hover:cursor-pointer">
                        Hữu Cơ
                    </p>
                    {category === 'Hữu cơ' ? (
                        <div className="block w-full h-[2px] bg-primaryColor mb-10 mx-auto"></div>
                    ) : null}
                </li>
                <li className="px-3 ">
                    <p onClick={() => onCategoryChange('Tự nhiên')} className="text-[#252525] hover:cursor-pointer">
                        Tự Nhiên
                    </p>
                    {category === 'Tự nhiên' ? (
                        <div className="block w-full h-[2px] bg-primaryColor mb-10 mx-auto"></div>
                    ) : null}
                </li>
            </ul>
        </div>
    );
};

export default CategoryProducts;
