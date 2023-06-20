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