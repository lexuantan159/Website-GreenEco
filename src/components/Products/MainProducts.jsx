import React, { useState } from 'react';
import CategoryProducts from './CategoryProducts/CategoryProducts';

const MainProducts = () => {
    const [category, setCategory] = useState('All');
    
    const handleChangeCategory = (category) => {
        setCategory(category);
    };

    return (
        <div>
            <CategoryProducts category={category} onCategoryChange={handleChangeCategory} />
        </div>
    );
};

export default MainProducts;
