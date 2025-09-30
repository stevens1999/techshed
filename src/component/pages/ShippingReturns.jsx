import { faWarning } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ShippingReturns = () => {
  const [activeTab, setActiveTab] = useState('shipping');
  const [openItems, setOpenItems] = useState({});
  const [returnInfo, setReturnInfo] = useState({
    orderDate: '',
    productCategory: 'standard',
    reason: 'change-of-mind'
  });

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReturnInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateReturnEligibility = () => {
    // Simple eligibility calculation
    const orderDate = new Date(returnInfo.orderDate);
    const today = new Date();
    const diffTime = Math.abs(today - orderDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 30) {
      return { eligible: true, daysLeft: 30 - diffDays };
    } else {
      return { eligible: false, daysPast: diffDays - 30 };
    }
  };

  const renderReturnCalculator = () => {
    const result = returnInfo.orderDate ? calculateReturnEligibility() : null;
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Return Eligibility Checker</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Order Date</label>
            <input
              type="date"
              name="orderDate"
              value={returnInfo.orderDate}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Category</label>
            <select
              name="productCategory"
              value={returnInfo.productCategory}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Smartphones">Smartphones</option>
              <option value="Speakers">Speakers</option>
              <option value="Tablets">Tablets</option>
              <option value="Wearables">Wearables</option>
              <option value="Drones">Drones</option>
              <option value="Laptops">Laptops</option>
              <option value="WDesktops">Desktops</option>
              <option value="Monitors">Monitors</option>
              <option value="Cameras">Cameras</option>
              <option value="Headphones">Headphones</option>
              <option value="TVs">TVs</option>
              <option value="Projectors">Projectors</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Return Reason</label>
            <select
              name="reason"
              value={returnInfo.reason}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="change-of-mind">Change of Mind</option>
              <option value="defective">Defective Product</option>
              <option value="wrong-item">Wrong Item Received</option>
            </select>
          </div>
          
          {result && (
            <div className={`p-4 rounded-md ${result.eligible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {result.eligible ? (
                <p>Your product is eligible for return! You have {result.daysLeft} days left to initiate the return.</p>
              ) : (
                <p>Unfortunately, your product is not eligible for return as it's been {result.daysPast} days since your order (30-day return policy).</p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const shippingContent = (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
        <p className="mb-4">We offer fast and reliable shipping to most locations. Below you'll find all the information you need about our shipping policies, delivery times, and costs.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-blue-600 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-semibold">Free Shipping</h3>
            <p className="text-sm">On orders over $200</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-blue-600 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold">Fast Delivery</h3>
            <p className="text-sm">2-3 business days</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-blue-600 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="font-semibold">Secure Checkout</h3>
            <p className="text-sm">Safe & encrypted</p>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          {shippingFAQs.map((item) => (
            <div key={item.id} className="border-b last:border-b-0">
              <button
                className="w-full p-4 text-left font-medium flex justify-between items-center"
                onClick={() => toggleItem(item.id)}
              >
                <span>{item.question}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 transform transition-transform ${openItems[item.id] ? 'rotate-180' : ''}`} 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {openItems[item.id] && (
                <div className="p-4 bg-gray-50">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const returnsContent = (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Returns & Refunds</h2>
        <p className="mb-4">We want you to be completely satisfied with your purchase. If you're not happy for any reason, we're here to help with our straightforward return process.</p>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <FontAwesomeIcon icon={faWarning} className="text-xlh-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Important:</strong> Returns are accepted within 30 days of delivery. Some products have different policies (see below).
              </p>
            </div>
          </div>
        </div>
        
        {renderReturnCalculator()}
        
        <div className="mt-8 border rounded-lg overflow-hidden">
          {returnsFAQs.map((item) => (
            <div key={item.id} className="border-b last:border-b-0">
              <button
                className="w-full p-4 text-left font-medium flex justify-between items-center"
                onClick={() => toggleItem(item.id)}
              >
                <span>{item.question}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 transform transition-transform ${openItems[item.id] ? 'rotate-180' : ''}`} 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {openItems[item.id] && (
                <div className="p-4 bg-gray-50">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-40 lg:mt-47 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Shipping & Returns</h1>
        
        <div className="flex border-b mb-6">
          <button
            className={`py-3 px-6 font-medium ${activeTab === 'shipping' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('shipping')}
          >
            Shipping Information
          </button>
          <button
            className={`py-3 px-6 font-medium ${activeTab === 'returns' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('returns')}
          >
            Returns & Refunds
          </button>
        </div>
        
        {activeTab === 'shipping' ? shippingContent : returnsContent}
        
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Need More Help?</h2>
          <p className="mb-4">If you couldn't find the answer to your question, our customer service team is ready to help.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="mailto:support@example.com" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center font-medium py-3 px-4 rounded-md transition duration-300">
              Email Support
            </a>
            <Link to= "tel:+1 (800) TECH-SHD" className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-center font-medium py-3 px-4 rounded-md transition duration-300">
              Call Us: +1 (800) TECH-SHD
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// FAQ data
const shippingFAQs = [
  {
    id: 'shipping-1',
    question: 'What shipping methods do you offer?',
    answer: 'We offer standard shipping (3-5 business days), expedited shipping (2-3 business days), and express shipping (1-2 business days). Shipping costs vary based on the method selected and the order total.'
  },
  {
    id: 'shipping-2',
    question: 'How long does it take to process my order?',
    answer: 'Orders are typically processed within 1-2 business days. During peak seasons or sales, processing may take up to 3 business days. You will receive a confirmation email once your order has shipped.'
  },
  {
    id: 'shipping-3',
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship to over 50 countries worldwide. International shipping times vary by destination (typically 7-14 business days). Additional customs fees or taxes may apply depending on your country\'s regulations.'
  },
  {
    id: 'shipping-4',
    question: 'How can I track my order?',
    answer: 'You can track your order from your TechShed account dashboard. Once your order ships, we will email you a tracking number. You can also track directly through our mobile app.'
  },
  {
    id: 'shipping-5',
    question: 'What if my package is lost or damaged?',
    answer: 'If your package is lost in transit or arrives damaged, please contact our customer service team within 7 days of delivery. We will work with the shipping carrier to resolve the issue and send a replacement if necessary.'
  }
];

const returnsFAQs = [
  {
    id: 'returns-1',
    question: 'What is your return policy?',
    answer: 'We accept returns within 30 days of delivery for most items in original condition with tags attached. Some items like clearance products, intimate apparel, and personalized items may not be eligible for return. Original shipping fees are non-refundable.'
  },
  {
    id: 'returns-2',
    question: 'How do I initiate a return?',
    answer: 'To initiate a return, log into your account and go to your order history. Select the item(s) you wish to return and follow the prompts. If you checked out as a guest, use the returns portal on our website and enter your order number and email address.'
  },
  {
    id: 'returns-3',
    question: 'How long does it take to process a refund?',
    answer: 'Once we receive your returned item, it takes 3-5 business days to process. After processing, refunds are issued to the original payment method and may take additional time to appear on your statement depending on your bank or credit card company.'
  },
  {
    id: 'returns-4',
    question: 'Do you offer exchanges?',
    answer: 'Yes, we offer exchanges for size or color if available. You can request an exchange through the returns portal. If the item you want is not available, we will issue a refund and you can place a new order for the desired item.'
  },
  {
    id: 'returns-5',
    question: 'What if I received a defective or wrong item?',
    answer: 'If you received a defective product or wrong item, please contact us within 7 days of delivery. We will provide a prepaid return label and expedite your replacement item at no additional cost to you.'
  }
];

export default ShippingReturns;