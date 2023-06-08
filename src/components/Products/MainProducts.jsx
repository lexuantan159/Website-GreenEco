import React, { useEffect, useState } from 'react';
import CategoryProducts from './CategoryProducts/CategoryProducts';
import Item from './Item.jsx/Item';
import * as productsService from '../../services/productsServices';
import { Spinner } from '@material-tailwind/react';

const MainProducts = () => {
    const [category, setCategory] = useState('All');
    const [products, setProducts] = useState([]);
    const [productsCategory, setProductsCategory] = useState([]);
    const [loadings, setLoadings] = useState(true);

    const handleDivideProducts = (category, products) => {
        return category === 'All' ? products : products.filter((product) => product.category === category);
    };

    const handleChangeCategory = (category) => {
        setCategory(category);
        const productsList = handleDivideProducts(category, products);
        setProductsCategory(productsList);
    };

    useEffect(() => {
        if (products.length === 0) {
            const fetchProducts = async () => {
                const getProducts = await productsService.getProducts();
                if (getProducts.statusCode === 200) {
                    const products = getProducts.products;
                    setProducts(products);
                    setProductsCategory(products);
                    setLoadings(false);
                } else {
                    setLoadings(true);
                    console.log(getProducts.error);
                }
            };
            fetchProducts();
        }
    });

    return (
        <div className="max-w-[1024px] mx-auto px-7 mb-24">
            <CategoryProducts category={category} onCategoryChange={handleChangeCategory} />

            {loadings ? (
                <Spinner className="h-12 w-12 mt-10 mx-auto" />
            ) : (
                <div className="grid md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-6">
                    {productsCategory.length > 0 &&
                        productsCategory.map((product) => {
                            return <Item key={product.id} product={product} />;
                        })}
                </div>
            )}
        </div>
    );
};

export default MainProducts;
