import axios from "axios";

const API_URL = "http://localhost:4000/api/user";

export const loginUserApi = async (userData) => {
    return axios.post(`${API_URL}/login`, userData);
    
};

export const registerUserApi = async (userData) => {
     return axios.post(API_URL, userData);

};
