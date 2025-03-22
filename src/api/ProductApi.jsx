import axios from 'axios';

const baseUrl = "https://project-node-qrx7.onrender.com/api/product";

export const getAllProducts = (pageNum, limit) => {
    return axios.get(`${baseUrl}/?page=${pageNum}&limit=${limit}`);
};

export const totalPages = (limit) => {
    return axios.get(`${baseUrl}/total/?limit=${limit}`);
};

export const getById = (id) => {
    return axios.get(`${baseUrl}/${id}`);
};

export const deleteById = (id, token) => {
    return axios.delete(`${baseUrl}/${id}`, {
        headers: { "authorization": token }
    });
};

export const addProduct = (productData, token) => {
    return axios.post(baseUrl, productData, {
        headers: { "authorization": token }
    })
};


export const update = (id, updatedData, token) => {
    
    return axios.put(`${baseUrl}/${id}`, updatedData,{
        headers:{authorization:token}

    })
};
