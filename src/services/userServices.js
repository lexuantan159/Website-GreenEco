import * as request from '../ultis/request';

const ROLE_USERS = 'user/';
export const getUser = async (accessToken) => {
    try {
        const response = await request.get(ROLE_USERS, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return {
            fullname: response.userData.fullname,
            address: response.userData.address,
            email: response.userData.email,
            phone: response.userData.phone,
            password: response.userData.password,
            statusCode: 200,
        };
    } catch (error) {
        return {
            error,
            statusCode: 400,
        };
    }
};

const EDID_USERS = 'user/edit-profile';
export const updateUserPassword = async (accessToken, oldPassword, newPassword) => {
    try {
        const response = await request.put(
            EDID_USERS,
            {
                oldPassword: oldPassword,
                newPassword: newPassword,
            },
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            },
        );

        return {
            message: response.data.message,
            statusCode: response.status,
        };
    } catch (error) {
        return {
            errorMessage: error.response.data.message,
            statusCode: error.status,
        };
    }
};
