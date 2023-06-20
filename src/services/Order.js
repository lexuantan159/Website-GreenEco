import * as request from '../ultis/request';

const ORDERS_ENDPOINT = 'order/get-order';

export const getOrder = async (accessToken) => {
    try {
        const response = await request.get(ORDERS_ENDPOINT, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return {
            product:response.data.ordersData.Products,
            orders: response.data.ordersData,
            statusCode: response.status,
        };
    } catch (e) {
        return {
            error: e.response.data,
            status: e.response.status,
        };
    }
};

const CREATE_ORDERS_ENDPOINT = "order/create-form-cart"

export const createOrders = async (accessToken, paymentMethod) => {
    try {
        const response = await request.postProduct(
            CREATE_ORDERS_ENDPOINT,
            {
                paymentMethod: paymentMethod
            },
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            },
        );
        console.log(response);
        return {
            message: response.data.message,
            statusCode: response.status
        };
    } catch (error) {
        console.log(error);
        return {
            error: error.response.data.message,
            statusCode: error.status
        };
    }
};
