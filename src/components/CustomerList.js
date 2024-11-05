import React, { useContext, useState } from 'react';
import { CustomerContext } from '../context/CustomerContext';
import styles from './CustomerList.module.css';
import { CustomerForm } from './CustomerForm';
import Modal from './Modal';

export function CustomerList() {
    const { customers, deleteCustomer } = useContext(CustomerContext);
    const [customerToEdit, setCustomerToEdit] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEdit = (customer) => {
        setCustomerToEdit(customer);
        setIsModalOpen(true); // Open modal when editing
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCustomerToEdit(null); // Reset the customer to edit when closing
    };

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer._id}>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.address}</td>
                            <td>
                                <button onClick={() => handleEdit(customer)}>Edit</button>
                                <button onClick={() => deleteCustomer(customer._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for editing the customer */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <CustomerForm customerToEdit={customerToEdit} />
            </Modal>
        </div>
    );
}
