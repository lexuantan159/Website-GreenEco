import * as request from '../ultis/request';

const ROLE_USERS = 'user/';
export const getUser = async (accessToken) => {
    try {
        const response = await request.get(ROLE_USERS, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return {
            fullname: response.data.userData.fullname,
            email: response.data.userData.email,
            address: response.data.userData.address,
            phone: response.data.userData.phone,
            statusCode: response.status,
        };
    } catch (error) {
        return {
            error,
            statusCode: error.status,
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

export const updateUserProfile = async (accessToken, email, fullname,phoneNumber) => {
    try {
        const response = await request.put(
            EDID_USERS,
            {
                email: email,
                fullname: fullname,
                phoneNumber: phoneNumber,
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

export const updateUserAddress = async (accessToken, address) => {
    try {
        const response = await request.put(
            EDID_USERS,
            {
               address,
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
