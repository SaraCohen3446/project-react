import axios from "axios";

const API_URL = "http://localhost:4000/api/user";

export const loginUserApi = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
};

export const registerUserApi = async (userData) => {
    const response = await axios.post(API_URL, userData);
    return response.data;
};
