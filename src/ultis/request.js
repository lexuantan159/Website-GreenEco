import axios from "axios";

const request = axios.create({
    baseURL: 'https://api-greeneco.onrender.com/api/',
});

export const post = async (endPoints, option = {}) => {
    const response = await request.post(endPoints, option);
    return response.data;
}

export const get = async (endPoints, option = {}) => {
    const response = await request.post(endPoints, option);
    return response.data;
}

export default request;