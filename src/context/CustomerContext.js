import React, { createContext, useEffect, useState } from 'react';
import { getCustomers, addCustomer as addCustomerAPI, editCustomer as editCustomerAPI, deleteCustomer as deleteCustomerAPI } from '../services/api';

export const CustomerContext = createContext();

export function CustomerProvider({ children }) {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        async function fetchCustomers() {
            const response = await getCustomers();
            setCustomers(response.data);
        }
        fetchCustomers();
    }, [customers]);



    const addCustomer = async (customer) => {
        const response = await addCustomerAPI(customer);
        setCustomers([...customers, response.data]);
        console.log(customer);

    };

    const editCustomer = async (customer) => {
        const response = await editCustomerAPI(customer._id, customer);
        setCustomers(customers.map((c) => (c._id === customer._id ? response.data : c)));
    };

    const deleteCustomer = async (id) => {
        await deleteCustomerAPI(id);
        setCustomers(customers.filter((customer) => customer._id !== id));
    };

    return (
        <CustomerContext.Provider value={{ customers, addCustomer, editCustomer, deleteCustomer }}>
            {children}
        </CustomerContext.Provider>
    );
}
