
import { createContext, useEffect, useState } from 'react';
import * as productsService from '../services/productsServices';


const ProductsContext = createContext({});

export const ProductsProvider = ({ children }) => {
    const [productsList, setProductsList] = useState([]);
    
    useEffect(() => {
        if (productsList.length === 0) {
            const fetchProducts = async () => {
                const response = await productsService.getProducts();
                const listProducts = response.products;
                if(response.statusCode === 200) {
                    setProductsList(listProducts) 
                } else {
                    console.log(response.error);
                }
            };

            fetchProducts();
        }
    });

    return <ProductsContext.Provider value={{ productsList, setProductsList }}>{children}</ProductsContext.Provider>;
};

export default ProductsContext



