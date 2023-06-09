import * as request from '../ultis/request';

const LOGIN_ENDPOINT = 'auth/login';

export const authentication = async (email, password) => {
    try {
        const response = await request.post(LOGIN_ENDPOINT, { email: email, password: password });
        return {
            response: response.data,
            statusCode: response.status,
        };
    } catch (error) {
        return {
            error,
            statusCode: error.status,
        };
    }
};

const ROLE_USERS = 'user/';

export const authorization = async (accessToken) => {
    try {
        const responseRoles = await request.get(ROLE_USERS, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return {
            fullName: responseRoles.data.userData.fullname,
            roles: responseRoles.data.userData.Role.value,
            statusCode: responseRoles.status,
        };
    } catch (error) {
        return {
            error,
            statusCode: error.status,
        };
    }
};

