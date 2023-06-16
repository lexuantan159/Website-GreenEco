import axios from 'axios';

const request = axios.create({
    baseURL: 'https://greeneco.up.railway.app/api/',
});

export const post = async (endPoints, option = {}) => {
    const response = await request.post(endPoints, option);
    return response;
};

export const postFeedback = async (endPoints, option = {}, header = {}) => {
    const response = await request.post(endPoints, option, header);
    return response;
};

export const postProduct = async (endPoints, body = {}, header = {}) => {
    const response = await request.post(endPoints, body, header);
    return response;
};

export const get = async (endPoints, option = {}) => {
    const response = await request.get(endPoints, option);
    return response;
};

export const put = async (endPoints, body = {}, header = {} ) => {
    const response = await request.put(endPoints, body, header);
    return response;
};

export const reDelete = async (endPoints, option = {}) => {
    const response = await request.delete(endPoints, option);
    return response;
};

export const getUser = async (endPoints, option = {}) => {
    const response = await request.get(endPoints, option);
    return response;
};

export default request;
