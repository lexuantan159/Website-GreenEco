import * as request from '../ultis/request';

const PRODUCTS_ENDPOINT = 'product/products';


export const getProducts = async () => {
    try {
        const products = await request.get(PRODUCTS_ENDPOINT);
        return products;
    } catch (e) {
        return e;
    }
}
