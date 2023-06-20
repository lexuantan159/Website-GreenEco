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

export const deleteProductItem = async (token, prodId) => {
    try {
        const response = await request.reDelete(
            DELETEPRODUCT_ENDPOINT,{
                headers: { Authorization: `Bearer ${token} `},
                data: {
                    prodId: prodId,
                },
            }
        );
        console.log(response);
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

const QUANTITYPRODUCT_ENDPOINT = 'cart/edit-quantity';

export const quantityProductItem = async (token, prodId, quantity) => {
    console.log({token, prodId, quantity});
    try {
        const response = await request.put(
            QUANTITYPRODUCT_ENDPOINT, {
                    prodId: prodId,
                    quantity: quantity
            },
            {
                headers: { Authorization: `Bearer ${token} `},
               
            }
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
