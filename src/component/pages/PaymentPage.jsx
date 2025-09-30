import React from 'react';
import PaymentForm from './PaymentForm';
import Ordersummary from './Ordersummary';

const PaymentPage = () => {
  return (
    <div className="mt-40 lg:mt-47 container mx-auto p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold mb-5">Payment Details</h2>
        <PaymentForm />
      </div>
      <div className="md:col-span-1">
        <h2 className="text-2xl font-bold mb-5">Order Summary</h2>
        <Ordersummary />
      </div>
    </div>
  );
};

export default PaymentPage;