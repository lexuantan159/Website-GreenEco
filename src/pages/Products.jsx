import React, { useEffect } from 'react';
import MainProducts from '../components/Products/MainProducts';

const Products = () => {

    useEffect( () => {
        document.title = 'Products';
      })
    return (
        <div>
            <MainProducts />
        </div>
    );
};

export default Products;
