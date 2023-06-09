import axios from 'axios';

const request = axios.create({
    baseURL: 'https://greeneco.up.railway.app/api/',
});

export const post = async (endPoints, option = {}) => {
    const response = await request.post(endPoints, option);
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



export default request;
