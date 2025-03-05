import axios from 'axios';

const baseUrl = "http://localhost:4000/api/product";

export const getAllProducts = (pageNum,limit) => {
    return axios.get(`${baseUrl}/?page=${pageNum}&limit=${limit}`);
};

export const totalPages = (limit) => {
    return axios.get(`${baseUrl}/total/?limit=${limit}`);
};

export const getById = (id) => {
    return axios.get(`${baseUrl}/${id}`);
};

export const deleteById = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
};

export const addProduct = (productData) => {
    return axios.post(baseUrl, productData);
};

export const update = (id, updatedData) => {
    return axios.put(`${baseUrl}/${id}`, updatedData);
};
