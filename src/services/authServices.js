import * as request from '../ultis/request';

const LOGIN_ENDPOINT = 'auth/login';


export const authentication = async (email, password) => {
    try {
        const response = await request.post(LOGIN_ENDPOINT, { email: email, password: password });
        return response;
    } catch (e) {
       return e
    }
};

const ROLE_USERS = 'user/';

export const authorization = async (accessToken) => {
    try {
        const responseRoles = await request.get(ROLE_USERS, {
            headers: {"Authorization" : `Bearer ${accessToken}`}
        })
        return  responseRoles.userData.Role.value;
    } catch (e) {
        return e
    }
}
