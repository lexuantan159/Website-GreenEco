import * as request from '../ultis/request';

const USERS_ENDPOINT = 'user/users';

export const getUsers = async (accessToken) => {
    try {
        const users = await request.get(USERS_ENDPOINT, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return {
            users: users.data.userData,
            statusCode: users.status,
        };
    } catch (e) {
        return {
            error: e.response.data,
            status: e.response.status,
        };
    }
};

export const editUser = async (accessToken, userId, data) => {
    try {
        const response = await request.put(`user/edit-user/${userId}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return {
            response: response.data,
            statusCode: response.status,
        };
    } catch (e) {
        return {
            error: e.response.data,
            status: e.response.status,
        };
    }
};

export const deleteUser = async (accessToken, userId) => {
    try {
        const response = await request.reDelete('user/delete-user', {
            params: {
                userId: userId,
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return {
            response: response.data,
            statusCode: response.status,
        };
    } catch (e) {
        return {
            error: e.response.data,
            status: e.response.status,
        };
    }
};

const ADD_PRODUCT_ENDPOINT = 'product/add-product';
export const addProduct = async (accessToken, formData) => {
    try {
        const response = await request.postProduct(ADD_PRODUCT_ENDPOINT, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return {
            response: response.data,
            statusCode: response.status,
        };
    } catch (e) {
        return {
            error: e.response.data,
            status: e.response.status,
        };
    }
};

export const editProduct = async (accessToken, prodId, formData) => {
    try {
        const response = await request.put(`product/edit-product/${prodId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return {
            response: response.data,
            statusCode: response.status,
        };
    } catch (e) {
        return {
            error: e.response.data,
            status: e.response.status,
        };
    }
};

export const deleteProduct = async (accessToken, prodId, fileName) => {
    try {
        const response = await request.reDelete('product/delete-product', {
            params: {
                prodId: prodId,
                fileName: fileName,
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return {
            response: response.data,
            statusCode: response.status,
        };
    } catch (e) {
        return {
            error: e.response.data,
            status: e.response.status,
        };
    }
};

const ORDERS_ENDPOINT = 'order/get-all-order';
export const getOrders = async (accessToken) => {
    try {
        const response = await request.get(ORDERS_ENDPOINT, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return {
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
