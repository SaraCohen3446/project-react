

import axios from 'axios';

const baseUrl = "http://localhost:4000/api/order";

export const getAllOrders = (pageNum, limit, token) => {
    return axios.get(`${baseUrl}/?page=${pageNum}&limit=${limit}`, {
        headers: { "authorization": token }
    })
};


export const getByUserId = (id, token) => {
    return axios.get(`${baseUrl}/${id}`, {
        headers: { "authorization": token }
    });
};

export const deleteOrderById = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
};

export const addOrder = (orderData, token) => {
    return axios.post(baseUrl, orderData, {
        headers: { "authorization": token }
    });
};

export const updateOrder = (id, updatedData, token) => {
    return axios.put(`${baseUrl}/${id}`, updatedData, {
        headers: { "authorization": token } // העברת ה-token בהדר
    });
};


export const totalOrderPages = (limit) => {
    return axios.get(`${baseUrl}/total/?limit=${limit}`);
};