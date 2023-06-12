import React, { useContext, useEffect, useState } from 'react';
import CategoryProducts from './CategoryProducts/CategoryProducts';
import Item from './Item.jsx/Item';
import { Spinner } from '@material-tailwind/react';
import ProductsContext from '../../context/productsProvider';
import Search from './Search/Search';

const MainProducts = () => {
    const { productsList } = useContext(ProductsContext);
    const [category, setCategory] = useState('All');
    const [productsCategory, setProductsCategory] = useState([]);
    const [loadings, setLoadings] = useState(true);

    const handleDivideProducts = (category) => {
        return category === 'All' ? productsList : productsList.filter((product) => product.category === category);
    };

    const handleChangeCategory = (category) => {
        setCategory(category);
        const productsList = handleDivideProducts(category);
        setProductsCategory(productsList);
    };

    useEffect(() => {
        console.log(1);
        if (productsList.length === 0) {
            setLoadings(true);
        } else {
            loadings && setProductsCategory(productsList);
            loadings && setLoadings(false);
        }
    }, [loadings, productsCategory, productsList]);

    return (
        <div className="max-w-[1100px] mb-32 mx-auto px-6 md:px-4 lg:px-0">
            <CategoryProducts category={category} onCategoryChange={handleChangeCategory} />
            <Search/>
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
