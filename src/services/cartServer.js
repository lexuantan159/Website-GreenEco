import * as request from '../ultis/request';

const CART_ENDPOINT = 'cart/get-cart';
export const getCart = async (accessToken) => {
    try {
        const response = await request.get(
            CART_ENDPOINT,
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            },
        );
        return {
            products: response.data.cartData.Products,
            totalAmount: response.data.cartData.totalAmount,
            statusCode: response.status
        };
    } catch (error) {
        return {
            error: error.response.message,
            statusCode: error.response.status
        };
    }
};