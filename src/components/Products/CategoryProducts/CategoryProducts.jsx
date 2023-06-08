import React from 'react';

const CategoryProducts = ( { category , onCategoryChange}) => {

    return (
        <div className="mt-16">
            <div className="">
                <h1 className="text-[#252525] text-4xl text-center font-bold mb-2">Featured Products</h1>
            </div>
            <ul className="flex justify-center">
                <li className="px-3 ">
                    <p onClick={() => onCategoryChange('All')} className="text-[#252525] hover:cursor-pointer">
                        All
                    </p>
                    {category === 'All' ? (
                        <div className="block w-full h-[2px] bg-primaryColor mb-10 mx-auto"></div>
                    ) : null}
                </li>
                <li className="px-3 ">
                    <p onClick={() => onCategoryChange('Recycled')} className="text-[#252525] hover:cursor-pointer">
                        Recycled
                    </p>
                    {category === 'Recycled' ? (
                        <div className="block w-full h-[2px] bg-primaryColor mb-10 mx-auto"></div>
                    ) : null}
                </li>
                <li className="px-3 ">
                    <p onClick={() => onCategoryChange('Organic')} className="text-[#252525] hover:cursor-pointer">
                        Organic
                    </p>
                    {category === 'Organic' ? (
                        <div className="block w-full h-[2px] bg-primaryColor mb-10 mx-auto"></div>
                    ) : null}
                </li>
                <li className="px-3 ">
                    <p onClick={() => onCategoryChange('Natural')} className="text-[#252525] hover:cursor-pointer">
                        Natural
                    </p>
                    {category === 'Natural' ? (
                        <div className="block w-full h-[2px] bg-primaryColor mb-10 mx-auto"></div>
                    ) : null}
                </li>
            </ul>
        </div>
    );
};

export default CategoryProducts;
