import React, { useState, useEffect, useRef } from 'react';

const TermsAndConditions = () => {
  const [accepted, setAccepted] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const [currentSection, setCurrentSection] = useState('introduction');
  const [query, setQuery] = useState('');
  const [progress, setProgress] = useState(0);
  const contentRef = useRef(null);

  // Mock terms content - in a real application this would come from a CMS or backend
  const termsContent = {
    introduction: {
      title: 'Introduction',
      content: `Welcome to our e-commerce platform. These terms and conditions outline the rules and regulations for the use of our website. By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use our website if you do not accept all of the terms and conditions stated on this page.`
    },
    license: {
      title: 'License',
      content: `Unless otherwise stated, we own the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may view and/or print pages from this website for your own personal use subject to restrictions set in these terms and conditions.`
    },
    userAccount: {
      title: 'User Account',
      content: `If you create an account on our website, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security.`
    },
    products: {
      title: 'Products & Services',
      content: `All products or services are subject to availability. We reserve the right to discontinue any product at any time. Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service without notice at any time.`
    },
    limitations: {
      title: 'Limitations of Liability',
      content: `In no event shall we be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.`
    },
    governingLaw: {
      title: 'Governing Law',
      content: `These terms and conditions are governed by and construed in accordance with the laws of the state, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.`
    }
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 8;
    setScrolledToBottom(atBottom);

    const pct = (scrollTop / Math.max(1, scrollHeight - clientHeight)) * 100;
    setProgress(Math.min(100, Math.max(0, pct)));

    let active = 'introduction';
    Object.keys(termsContent).forEach((key) => {
      const el = document.getElementById(key);
      if (el && (el.offsetTop - 12) <= scrollTop) {
        active = key;
      }
    });
    setCurrentSection(active);
  };

  const handleAccept = () => {
    setAccepted(true);
    // In a real application, you would typically:
    // 1. Store acceptance in database
    // 2. Redirect user or close modal
    // 3. Possibly trigger a tracking event
    alert('Thank you for accepting our Terms & Conditions!');
  };

  const handleDecline = () => {
    // In a real application, you would typically:
    // 1. Redirect user away from protected content
    // 2. Possibly log the decline event
    alert('You must accept our Terms & Conditions to use our services.');
  };

  // Navigation click handler
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    const container = contentRef.current;
    if (element && container) {
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const targetTop = elementRect.top - containerRect.top + container.scrollTop;
      container.scrollTo({ top: targetTop, behavior: 'smooth' });
      setCurrentSection(sectionId);
    }
  };

  return (
    <div className="mt-40 lg:mt-47 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Terms & Conditions</h1>
          <p className="text-indigo-200 mt-1">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
        
        <div className="flex flex-col md:flex-row">
          {/* Navigation Sidebar */}
          <div className="w-full md:w-1/4 bg-gray-100 p-4">
            <h2 className="font-semibold text-gray-700 mb-3">Sections</h2>
            <ul className="space-y-2">
              {Object.keys(termsContent).map((key) => (
                <li key={key}>
                  <button
                    onClick={() => scrollToSection(key)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      currentSection === key
                        ? 'bg-indigo-100 text-indigo-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {termsContent[key].title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Content Area */}
          <div className="w-full md:w-3/4 p-6">
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search terms..."
                className="w-full md:w-2/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => {
                  const lower = query.trim().toLowerCase();
                  if (!lower) return;
                  const match = Object.entries(termsContent).find(([, sec]) =>
                    sec.title.toLowerCase().includes(lower) ||
                    sec.content.toLowerCase().includes(lower)
                  );
                  if (match) {
                    scrollToSection(match[0]);
                  }
                }}
                className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Find
              </button>
              <button
                type="button"
                onClick={() => { if (contentRef.current) contentRef.current.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Back to Top
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Print
              </button>
            </div>

            <div className="mb-4">
              <div className="h-2 bg-gray-200 rounded">
                <div className="h-2 bg-indigo-600 rounded" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-1 text-xs text-gray-500">{Math.round(progress)}% read</div>
            </div>
            <div 
              ref={contentRef}
              className="h-96 overflow-y-auto pr-4 mb-6"
              onScroll={handleScroll}
            >
              {Object.entries(termsContent).map(([key, section]) => (
                <div key={key} id={key} className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">{section.title}</h2>
                  <p className="text-gray-600 leading-relaxed">{section.content}</p>
                </div>
              ))}
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
                </p>
              </div>
            </div>
            
            {/* Acceptance Controls */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center mb-4">
                <input
                  id="accept-terms"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={accepted}
                  onChange={() => setAccepted(!accepted)}
                  disabled={!scrolledToBottom}
                />
                <label htmlFor="accept-terms" className="ml-2 block text-sm text-gray-700">
                  I have read and agree to the Terms & Conditions
                  {!scrolledToBottom && (
                    <span className="text-orange-600 ml-1" aria-live="polite">(Please scroll to the bottom to enable)</span>
                  )}
                </label>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={handleAccept}
                  disabled={!accepted}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    accepted
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Accept & Continue
                </button>
                
                <button
                  onClick={handleDecline}
                  className="px-4 py-2 rounded-md text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;