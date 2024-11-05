import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getCustomers = async () => await axios.get(`${API_URL}/api/customers`);
export const addCustomer = async (customer) => await axios.post(`${API_URL}/api/customers`, customer);
export const editCustomer = async (id, customer) => {
    return await axios.put(`${API_URL}/api/customers/${id}`, customer);
};
export const deleteCustomer = async (id) => await axios.delete(`${API_URL}/api/customers/${id}`);
