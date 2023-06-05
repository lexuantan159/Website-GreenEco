import axios from 'axios';

const request = axios.create({
    baseURL: 'https://greeneco.up.railway.app/api/',
});

export const post = async (endPoints, option = {}) => {
    const response = await request.post(endPoints, option);
    return response.data;
};

export const get = async (endPoints, option = {}) => {
    const response = await request.get(endPoints, option);
    return response.data;
};

export const getUser = async (endPoints, option = {}) => {
    const response = await request.get(endPoints, option);
    return response;
};

export default request;
