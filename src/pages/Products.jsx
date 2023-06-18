import React, { useEffect } from 'react';
import MainProducts from '../components/Products/MainProducts';

const Products = () => {

    useEffect( () => {
        document.title = 'Danh sách sản phẩm';
      })
    return (
        <div>
            <MainProducts />
        </div>
    );
};

export default Products;
