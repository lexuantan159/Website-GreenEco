import * as request from '../ultis/request';

const ADD_PRODUCT_ENDPOINT = 'cart/add-to-cart';

export const addProduct = async (accessToken, prodId, quantity) => {
    try {
        const response = await request.postProduct(
            ADD_PRODUCT_ENDPOINT,
            {
                prodId: prodId,
                quantity: quantity,
            },
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            },
        );
        return {
            message: response.data.message,
            statusCode: response.status
        };
    } catch (error) {
        return {
            error: error.response.data.message,
            statusCode: error.status
        };
    }
};
