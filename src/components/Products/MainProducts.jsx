import React, { useContext, useEffect, useState } from 'react';
import CategoryProducts from './CategoryProducts/CategoryProducts';
import Item from './Item.jsx/Item';
import { Spinner } from '@material-tailwind/react';
import ProductsContext from '../../context/productsProvider';
import Search from './Search/Search';
import { ToastContainer, toast } from 'react-toastify';
import * as addProductServices from '../../services/addProductServices';
import AuthContext from '../../context/authProvider';

const MainProducts = () => {
    const { auth } = useContext(AuthContext);
    const { productsList } = useContext(ProductsContext);
    const [category, setCategory] = useState('All');
    const [productsCategory, setProductsCategory] = useState([]);
    const [loadings, setLoadings] = useState(true);

    const notify = (message) =>
        toast(message, {
            position: 'top-center',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });

    const handleDivideProducts = (category) => {
        return category === 'All' ? productsList : productsList.filter((product) => product.category === category);
    };

    const handleChangeCategory = (category) => {
        setCategory(category);
        const productsList = handleDivideProducts(category);
        setProductsCategory(productsList);
    };

    useEffect(() => {
        if (productsList.length === 0) {
            setLoadings(true);
        } else {
            loadings && setProductsCategory(productsList);
            loadings && setLoadings(false);
        }
    }, [loadings, productsCategory, productsList]);

    const addProduct = async (token, id, quantity) => {
        notify("Add product successfully")
        const response = await addProductServices.addProduct(token, id, quantity);
        response.statusCode !== 200 && notify(response.error);
    };

    const handleAddProduct = (id) => {
        if (auth.accessToken !== undefined) {
            addProduct(auth.accessToken,id, 1);
        } else {
            notify('Login Before Add Product')
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="max-w-[1100px] mb-32 mx-auto px-6 md:px-4 lg:px-0">
                <CategoryProducts category={category} onCategoryChange={handleChangeCategory} />
                <Search />
                {loadings ? (
                    <Spinner className="h-12 w-12 mt-10 mx-auto" />
                ) : (
                    <div className="grid md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-6">
                        {productsCategory.length > 0 &&
                            productsCategory.map((product) => {
                                return <Item key={product.id} product={product} onAddProduct={handleAddProduct} />;
                            })}
                    </div>
                )}
            </div>
        </>
    );
};

export default MainProducts;
