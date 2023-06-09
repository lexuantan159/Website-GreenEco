import * as request from '../ultis/request';

const REGISTER_ENDPOINT = 'auth/register';

export const register = async (fullName, email, password) => {
    try {
        const response = await request.post(REGISTER_ENDPOINT, {
            fullname: fullName,
            email: email,
            password: password,
        });
        return {
            response: response,
            statusCode: 200,
        };
    } catch (error) {
        return {
            error,
            statusCode: 400,
        };
    }
};
