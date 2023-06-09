import * as request from '../ultis/request';

const PRODUCTS_ENDPOINT = 'product/products';


export const getProducts = async () => {
    try {
        const products = await request.get(PRODUCTS_ENDPOINT);
        return {
            products: products.data.productData,
            statusCode: products.status
        }
    } catch (e) {
        return {
            error: e.response.data.message,
            status: e.status 
        }
    }
}
