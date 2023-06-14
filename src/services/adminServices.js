import * as request from '../ultis/request';

const USERS_ENDPOINT = 'user/users';

export const getUsers = async (accessToken) => {
    try {
        const users = await request.get(USERS_ENDPOINT, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        return {
            users: users.data.userData,
            statusCode: users.status
        }
    } catch (e) {
        return {
            error: e.response.data.message,
            status: e.status 
        }
    }
}

const ADD_PRODUCT_ENDPOINT = 'product/add-product';
export const addProduct = async (accessToken, formData) => {
    try {
        const response = await request.postProduct(
            ADD_PRODUCT_ENDPOINT,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                    Authorization: `Bearer ${accessToken}` 
                },
            },
        );
        console.log(response);
        return {
            response: response.data,
            statusCode: response.status
        }
    } catch (e) {
        return {
            error: e.response,
            status: e.response.status 
        }
    }
}
