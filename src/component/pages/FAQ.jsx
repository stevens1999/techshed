import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [search, setSearch] = useState('');
  const buttonRefs = useRef([]);

  const slugify = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const toggleFAQ = (index, question) => {
    const newIndex = activeIndex === index ? null : index;
    setActiveIndex(newIndex);
    try {
      const hash = newIndex !== null ? '#' + slugify(question) : '';
      if (hash) {
        history.replaceState(null, '', hash);
      } else {
        history.replaceState(null, '', window.location.pathname);
      }
    } catch {}
  };

  const handleKeyDown = (e, i, filteredFaqs) => {
    const max = filteredFaqs.length - 1;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.min(i + 1, max);
      buttonRefs.current[next]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = Math.max(i - 1, 0);
      buttonRefs.current[prev]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      buttonRefs.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      buttonRefs.current[max]?.focus();
    }
  };

  const faqs = [
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days. Express shipping is available for delivery within 1-2 business days. International shipping typically takes 7-14 business days depending on the destination."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for unused items in their original packaging with receipt. Electronics have a 14-day return window. Final sale items are not eligible for return."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a confirmation email with a tracking number. You can also track your order by logging into your account and visiting the 'Order History' section."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by destination. Additional customs fees may apply depending on your country's import regulations."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and select cryptocurrencies. All payments are processed securely through encrypted channels."
    },
    {
      question: "How do I change or cancel my order?",
      answer: "Orders can be changed or cancelled within 1 hour of placement by contacting our customer service team. After 1 hour, orders enter processing and cannot be modified until they are shipped."
    },
    {
      question: "Are my personal details secure?",
      answer: "Yes, we use industry-standard SSL encryption to protect your personal information. We never share or sell your data to third parties. You can review our privacy policy for more details."
    },
    {
      question: "Do you offer price matching?",
      answer: "We offer price matching within 7 days of purchase if you find the same product at a lower price from an authorized retailer. Some exclusions apply. Contact our customer service for assistance."
    }
  ];

  const filteredFaqs = faqs.filter(f =>
    f.question.toLowerCase().includes(search.toLowerCase()) ||
    f.answer.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash).replace('#','');
    if (hash) {
      const idx = faqs.findIndex(f => slugify(f.question) === hash);
      if (idx !== -1) setActiveIndex(idx);
    }
    // reset refs on filter change
    buttonRefs.current = [];
  }, []);

  return (
    <div className="mt-40 lg:mt-47 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Frequently Asked Questions</h1>
          <p className="mt-4 text-lg text-gray-600">Find answers to common questions about our products and services</p>
        </div>

        <div className="mb-6">
          <label htmlFor="faq-search" className="sr-only">Search FAQs</label>
          <input
            id="faq-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions or answers..."
            className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="space-y-4">
          {filteredFaqs.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-md p-6 text-center text-gray-600">
              No results found.
            </div>
          )}
          {filteredFaqs.map((faq, i) => {
            const slug = slugify(faq.question);
            const originalIndex = faqs.findIndex(f => f.question === faq.question);
            const isOpen = activeIndex === originalIndex;
            return (
              <div 
                key={slug} 
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
              >
                <button
                  id={`head-${slug}`}
                  ref={(el) => (buttonRefs.current[i] = el)}
                  className="w-full px-6 py-5 text-left focus:outline-none"
                  onClick={() => toggleFAQ(originalIndex, faq.question)}
                  onKeyDown={(e) => handleKeyDown(e, i, filteredFaqs)}
                  aria-expanded={isOpen}
                  aria-controls={`panel-${slug}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                    <svg 
                      className={`h-5 w-5 text-gray-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </button>
                
                <div 
                  id={`panel-${slug}`}
                  role="region"
                  aria-labelledby={`head-${slug}`}
                  className={`px-6 pb-5 pt-0 transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'}`}
                  aria-hidden={!isOpen}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-blue-50 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-900">Still have questions?</h2>
          <p className="mt-2 text-gray-600">Our customer support team is here to help you</p>
          <div className="mt-4 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/Contact" className="px-5 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors text-center">
              Contact Support
            </Link>
            <button type="button" className="px-5 py-3 bg-white text-blue-600 font-medium rounded-md border border-blue-600 hover:bg-blue-50 transition-colors">
              Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;