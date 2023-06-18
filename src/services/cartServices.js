import axios from 'axios';
import * as request from '../ultis/request';

const CART_ENDPOINT = 'cart/get-cart';
export const getCart = async (accessToken) => {
    try {
        const response = await request.get(CART_ENDPOINT, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return {
            products: response.data.cartData.Products,
            totalAmount: response.data.cartData.totalAmount,
            statusCode: response.status,
        };
    } catch (error) {
        return {
            error: error.response.data.message,
            statusCode: error.response.status,
        };
    }
};

const DELETEPRODUCT_ENDPOINT = 'cart/delete-cart-item';

export const deleteProductItem = async (accessToken, prodId) => {
    try {
        console.log({accessToken, prodId});
        const response = await request.deleteProduct(
            DELETEPRODUCT_ENDPOINT,
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            },
            {
                prodId: prodId
            },
        );
        return {
            message: response.data.message,
            statusCode: response.status,
        };
    } catch (error) {   
        console.log(error);
        return {
            error: error.response.data.message,
            statusCode: error.response.status,
        };
    }
};
