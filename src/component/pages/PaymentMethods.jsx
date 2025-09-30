import React, { useState } from 'react';

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'credit_card',
      last4: '4242',
      brand: 'Visa',
      expiry: '12/25',
      name: 'John Doe',
      isDefault: true
    },
    {
      id: 2,
      type: 'credit_card',
      last4: '5555',
      brand: 'Mastercard',
      expiry: '03/24',
      name: 'John Doe',
      isDefault: false
    },
    {
      id: 3,
      type: 'paypal',
      email: 'john.doe@example.com',
      isDefault: false
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'credit_card',
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: '',
    paypalEmail: '',
    makeDefault: false
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.type === 'credit_card') {
      if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length !== 16) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }
      
      if (!formData.expiry || !/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.expiry)) {
        newErrors.expiry = 'Please enter a valid expiry date (MM/YY)';
      }
      
      if (!formData.cvv || !/^[0-9]{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = 'Please enter a valid CVV';
      }
      
      if (!formData.name) {
        newErrors.name = 'Please enter the name on the card';
      }
    } else if (formData.type === 'paypal') {
      if (!formData.paypalEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.paypalEmail)) {
        newErrors.paypalEmail = 'Please enter a valid PayPal email';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddPaymentMethod = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    let newMethod;
    
    if (formData.type === 'credit_card') {
      newMethod = {
        id: Date.now(),
        type: 'credit_card',
        last4: formData.cardNumber.slice(-4),
        brand: getCardBrand(formData.cardNumber),
        expiry: formData.expiry,
        name: formData.name,
        isDefault: formData.makeDefault || paymentMethods.length === 0
      };
    } else {
      newMethod = {
        id: Date.now(),
        type: 'paypal',
        email: formData.paypalEmail,
        isDefault: formData.makeDefault || paymentMethods.length === 0
      };
    }
    
    // If this is set as default, remove default from others
    let updatedMethods;
    if (formData.makeDefault) {
      updatedMethods = paymentMethods.map(method => ({
        ...method,
        isDefault: false
      }));
    } else {
      updatedMethods = [...paymentMethods];
    }
    
    setPaymentMethods([...updatedMethods, newMethod]);
    setSuccessMessage('Payment method added');
    setTimeout(() => setSuccessMessage(''), 2000);
    setShowAddForm(false);
    setFormData({
      type: 'credit_card',
      cardNumber: '',
      expiry: '',
      cvv: '',
      name: '',
      paypalEmail: '',
      makeDefault: false
    });
  };

  const getCardBrand = (cardNumber) => {
    const firstDigit = cardNumber[0];
    if (firstDigit === '4') return 'Visa';
    if (firstDigit === '5') return 'Mastercard';
    if (firstDigit === '3') return 'American Express';
    if (firstDigit === '6') return 'Discover';
    return 'Card';
  };

  const setDefaultMethod = (id) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
    setSuccessMessage('Default payment method updated');
    setTimeout(() => setSuccessMessage(''), 2000);
  };

  const deleteMethod = (id) => {
    if (window.confirm('Are you sure you want to delete this payment method?')) {
      const updatedMethods = paymentMethods.filter(method => method.id !== id);
      
      // If we deleted the default and there are other methods, set the first one as default
      if (updatedMethods.length > 0 && !updatedMethods.some(m => m.isDefault)) {
        updatedMethods[0].isDefault = true;
      }
      
      setPaymentMethods(updatedMethods);
      setSuccessMessage('Payment method deleted');
      setTimeout(() => setSuccessMessage(''), 2000);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData({...formData, cardNumber: formatted});
  };

  const handleExpiryChange = (e) => {
    let v = e.target.value.replace(/[^0-9]/g, '');
    if (v.length > 4) v = v.slice(0, 4);
    if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
    setFormData({ ...formData, expiry: v });
  };

  const handleCvvChange = (e) => {
    const v = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
    setFormData({ ...formData, cvv: v });
  };

  return (
    <div className="mt-40 lg:mt-47 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Payment Methods</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Manage your payment methods for quick checkout</p>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            {/* Saved Payment Methods */}
            {successMessage && (
              <div className="mb-4 p-3 rounded-md bg-green-100 text-green-800" aria-live="polite">
                {successMessage}
              </div>
            )}
            <div className="space-y-4">
              {[...paymentMethods].sort((a,b) => (b.isDefault - a.isDefault)).map((method) => (
                <div key={method.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    {method.type === 'credit_card' ? (
                      <>
                        <div className="bg-gray-100 p-2 rounded mr-4">
                          {method.brand === 'Visa' && (
                            <svg className="h-8 w-12" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10.286 5.357H6.103L4.571 10.75H8.754L10.286 5.357Z" fill="#1A1F71"/>
                              <path d="M16.857 5.429C16.5 5.286 15.857 5.143 15 5.143C13.286 5.143 12 6.143 12 7.429C12 8.5 13 9 14.143 9C15.143 9 15.714 8.714 16 8.5L15.857 9.5H17.714L18.571 5.429H16.857ZM17.286 7.357C17 7.643 16.429 7.857 15.857 7.857C15.286 7.857 14.714 7.643 14.714 7.214C14.714 6.786 15.286 6.571 16 6.571C16.429 6.571 16.857 6.643 17.286 6.857V7.357Z" fill="#1A1F71"/>
                              <path d="M21.143 5.357H19.286L17.857 10.75H19.714L20 9.5H21.714L21.857 10.75H23.714L21.143 5.357ZM20.571 8.214L21 6.5L21.429 8.214H20.571Z" fill="#1A1F71"/>
                              <path d="M9.143 5.357L7.714 8.929L7.429 7.643C7 6.5 5.857 5.5 4.571 5.5H0L0.071 5.643C3.143 6.286 5.286 7.929 6 10.75H7.857C8.143 10.75 8.286 10.321 8.429 10L10.286 5.357H9.143Z" fill="#1A1F71"/>
                            </svg>
                          )}
                          {method.brand === 'Mastercard' && (
                            <svg className="h-8 w-12" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M15.364 12.571H8.636V3.429h6.728v9.142z" fill="#FF5A00"/>
                              <path d="M9.273 8a5.844 5.844 0 0 1 2.727-4.571 5.714 5.714 0 1 0 0 9.142A5.844 5.844 0 0 1 9.273 8z" fill="#EB001B"/>
                              <path d="M15.364 8a5.844 5.844 0 0 1-2.727 4.571A5.714 5.714 0 1 0 12 3.429 5.844 5.844 0 0 1 15.364 8z" fill="#F79E1B"/>
                            </svg>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{method.brand} ending in {method.last4}</h4>
                          <p className="text-sm text-gray-500">Expires {method.expiry}</p>
                          <p className="text-sm text-gray-500">{method.name}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-blue-50 p-2 rounded mr-4">
                          <svg className="h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8.5 11.5L10 10 8.5 8.5 10 7 8.5 5.5 7 7l1.5 1.5L7 10l1.5 1.5zm5 0L15 10l-1.5-1.5L15 7l-1.5-1.5L12 7l1.5 1.5L12 10l1.5 1.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium">PayPal</h4>
                          <p className="text-sm text-gray-500">{method.email}</p>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {method.isDefault ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Default
                      </span>
                    ) : (
                      <button
                        onClick={() => setDefaultMethod(method.id)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-500"
                      >
                        Set as default
                      </button>
                    )}
                    
                    <button
                      onClick={() => deleteMethod(method.id)}
                      className="text-sm font-medium text-red-600 hover:text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Add Payment Method Button */}
            {!showAddForm && (
              <div className="mt-6">
                <button
                  onClick={() => setShowAddForm(true)}
                  className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Payment Method
                </button>
              </div>
            )}
            
            {/* Add Payment Method Form */}
            {showAddForm && (
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Add Payment Method</h4>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method Type</label>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, type: 'credit_card'})}
                      aria-pressed={formData.type === 'credit_card'}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        formData.type === 'credit_card' 
                          ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                          : 'bg-gray-100 text-gray-700 border border-gray-300'
                      }`}
                    >
                      Credit Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, type: 'paypal'})}
                      aria-pressed={formData.type === 'paypal'}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        formData.type === 'paypal' 
                          ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                          : 'bg-gray-100 text-gray-700 border border-gray-300'
                      }`}
                    >
                      PayPal
                    </button>
                  </div>
                </div>
                
                <form onSubmit={handleAddPaymentMethod} className="space-y-4">
                  {formData.type === 'credit_card' ? (
                    <>
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleCardNumberChange}
                          inputMode="numeric"
                          autoComplete="cc-number"
                          maxLength={19}
                          aria-invalid={errors.cardNumber ? "true" : "false"}
                          aria-describedby="cardNumber-error"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        {errors.cardNumber && <p id="cardNumber-error" className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">
                            Expiry Date (MM/YY)
                          </label>
                          <input
                            type="text"
                            id="expiry"
                            name="expiry"
                            placeholder="MM/YY"
                            value={formData.expiry}
                            onChange={handleExpiryChange}
                            inputMode="numeric"
                            autoComplete="cc-exp"
                            maxLength={5}
                            aria-invalid={errors.expiry ? "true" : "false"}
                            aria-describedby="expiry-error"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                          {errors.expiry && <p id="expiry-error" className="mt-1 text-sm text-red-600">{errors.expiry}</p>}
                        </div>
                        
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                            CVV
                          </label>
                          <input
                            type="password"
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={handleCvvChange}
                            inputMode="numeric"
                            autoComplete="cc-csc"
                            maxLength={4}
                            aria-invalid={errors.cvv ? "true" : "false"}
                            aria-describedby="cvv-error"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                          {errors.cvv && <p id="cvv-error" className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleInputChange}
                          autoComplete="cc-name"
                          aria-invalid={errors.name ? "true" : "false"}
                          aria-describedby="name-error"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        {errors.name && <p id="name-error" className="mt-1 text-sm text-red-600">{errors.name}</p>}
                      </div>
                    </>
                  ) : (
                    <div>
                      <label htmlFor="paypalEmail" className="block text-sm font-medium text-gray-700">
                        PayPal Email
                      </label>
                      <input
                        type="email"
                        id="paypalEmail"
                        name="paypalEmail"
                        placeholder="you@example.com"
                        value={formData.paypalEmail}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      {errors.paypalEmail && <p className="mt-1 text-sm text-red-600">{errors.paypalEmail}</p>}
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <input
                      id="makeDefault"
                      name="makeDefault"
                      type="checkbox"
                      checked={formData.makeDefault}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="makeDefault" className="ml-2 block text-sm text-gray-900">
                      Set as default payment method
                    </label>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Save Payment Method
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;