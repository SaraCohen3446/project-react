import axios from "axios";

const API_URL = "https://project-node-qrx7.onrender.com/api/user";

export const loginUserApi = async (userData) => {
    return axios.post(`${API_URL}/login`, userData);
    
};

export const registerUserApi = async (userData) => {
     return axios.post(API_URL, userData);

};
