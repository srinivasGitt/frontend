import React, { useContext, useEffect, useState } from 'react';
import { CustomerContext } from '../context/CustomerContext';
import styles from './CustomerForm.module.css';

export function CustomerForm({ customerToEdit }) {
    const { addCustomer, editCustomer } = useContext(CustomerContext);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });

    useEffect(() => {
        if (customerToEdit) {
            setFormData(customerToEdit); // Populate form with customer data for editing
        } else {
            setFormData({ name: '', email: '', phone: '', address: '' }); // Reset form for adding
        }
    }, [customerToEdit]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (customerToEdit) {
                await editCustomer({ ...formData, _id: customerToEdit._id }); // Include the customer ID in the update
            } else {
                await addCustomer(formData); // Add new customer
            }
            setFormData({ name: '', email: '', phone: '', address: '' });
        } catch (error) {
            console.error("Failed to submit:", error);
            // Handle error (e.g., show a message to the user)
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2>{customerToEdit ? 'Edit Customer' : 'Add Customer'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    className={styles.inputField}
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    className={styles.inputField}
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    className={styles.inputField}
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <input
                    className={styles.inputField}
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                />
                <button type="submit" className={styles.submitButton}>
                    {customerToEdit ? 'Update Customer' : 'Add Customer'}
                </button>
            </form>
        </div>
    );
}
