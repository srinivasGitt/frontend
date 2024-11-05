import React from 'react';
import { CustomerProvider } from './context/CustomerContext';
import { CustomerList } from './components/CustomerList';
import { CustomerForm } from './components/CustomerForm';

function App() {

  return (
    <CustomerProvider>
      <h1>Customer Management System</h1>
      <CustomerForm />
      <CustomerList />
    </CustomerProvider>
  );
}

export default App;
