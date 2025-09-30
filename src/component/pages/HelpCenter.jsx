import React, { useState } from "react";

const TechShedHelpCenter = () => {
  const [activeCategory, setActiveCategory] = useState("orders");
  const [searchQuery, setSearchQuery] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi there! I'm Nova, your TechShed support assistant. How can I help you today?",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const helpCategories = [
    { id: "orders", name: "Orders & Shipping", icon: "📦" },
    { id: "returns", name: "Returns & Refunds", icon: "🔄" },
    { id: "tech", name: "Technical Support", icon: "🔧" },
    { id: "account", name: "Account & Security", icon: "🔒" },
    { id: "payments", name: "Payments & Pricing", icon: "💳" },
    { id: "products", name: "Product Questions", icon: "💻" },
  ];

  const faqs = {
    orders: [
      {
        question: "How can I track my order?",
        answer:
          "You can track your order from your TechShed account dashboard. Once your order ships, we'll email you a tracking number. You can also track directly through our mobile app.",
      },
      {
        question: "What shipping options are available?",
        answer:
          "We offer standard (3-5 business days), expedited (2 business days), and same-day delivery in select metropolitan areas. Shipping options appear at checkout based on your location.",
      },
      {
        question: "Can I change my shipping address?",
        answer:
          "You can change your shipping address within 1 hour of placing your order through your account. After that, contact our support team immediately for assistance.",
      },
    ],
    returns: [
      {
        question: "What is your return policy?",
        answer:
          "We offer a 30-day hassle-free return policy. Items must be in original condition with all packaging. Some exceptions apply for open software and personalized items.",
      },
      {
        question: "How do I start a return?",
        answer:
          "Go to your Orders page, select the item you want to return, and follow the instructions. You'll receive a prepaid return label instantly. Returns are processed within 3 business days of receipt.",
      },
      {
        question: "When will I get my refund?",
        answer:
          "Refunds are processed within 3 business days after we receive your return. The refund method depends on your original payment. Credit card refunds take 3-5 business days to appear on your statement.",
      },
    ],
    tech: [
      {
        question: "How do I contact technical support?",
        answer:
          "We offer 24/7 technical support via live chat, phone (+1-800-TECH-SHD), and email (support@techshed.com). For complex issues, you can schedule a remote support session.",
      },
      {
        question: "Where can I find product manuals?",
        answer:
          "All product manuals are available in your TechShed account under 'My Products'. You can also access our knowledge base with setup guides and troubleshooting articles.",
      },
      {
        question: "Do you offer installation services?",
        answer:
          "Yes! We offer professional installation for most products. You can add installation services at checkout or schedule later through your account. Our certified technicians ensure optimal setup.",
      },
    ],
    account: [
      {
        question: "How do I reset my password?",
        answer:
          "Click 'Forgot Password' on the login page. We'll email you a secure link to reset your password. For security, the link expires in 15 minutes.",
      },
      {
        question: "Can I merge multiple accounts?",
        answer:
          "Yes, contact our support team with the email addresses associated with your accounts. We'll verify ownership and merge your order history and benefits.",
      },
      {
        question: "How do I enable two-factor authentication?",
        answer:
          "In your account security settings, select 'Enable 2FA'. You can choose between SMS, authenticator apps, or security keys for enhanced account protection.",
      },
    ],
  };

  const popularArticles = [
    { title: "Setting up your TechShed Smart Home Hub", category: "tech" },
    { title: "Troubleshooting Wi-Fi Connectivity Issues", category: "tech" },
    { title: "Understanding Our Price Match Guarantee", category: "payments" },
    { title: "How to Use Your TechShed Rewards Points", category: "account" },
    { title: "Preparing Your Device for Return", category: "returns" },
    { title: "Same-Day Delivery Eligibility", category: "orders" },
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    // Add user message
    const userMessage = {
      id: chatMessages.length + 1,
      sender: "user",
      text: newMessage,
    };
    setChatMessages([...chatMessages, userMessage]);
    setNewMessage("");

    // Simulate bot response after delay
    setTimeout(() => {
      const botResponses = [
        "I understand your concern. Our support team can help with that.",
        "Thanks for sharing. Let me connect you to a specialist.",
        "I've found a helpful article that might solve your issue.",
        "For detailed assistance, I recommend contacting our technical support team.",
      ];
      const botMessage = {
        id: chatMessages.length + 2,
        sender: "bot",
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
      };
      setChatMessages((prev) => [...prev, botMessage]);
    }, 1500);
  };

  const filteredArticles = popularArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category === activeCategory
  );

  return (
    <div className="mt-40 md:mt-39 lg:mt-47">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 text-gray-900">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How can we help you today?
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Find answers, guides, and solutions for all your TechShed needs.
              Our support team is always ready to assist.
            </p>

            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder="Search help articles, FAQs, and guides..."
                className="w-full px-6 py-4 pr-14 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </section>

          {/* Categories Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Browse by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {helpCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-300 ${
                    activeCategory === category.id
                      ? "border-cyan-500 bg-gradient-to-br from-cyan-50 to-white shadow-md"
                      : "border-gray-200 bg-white hover:border-cyan-300 hover:shadow-sm"
                  }`}
                >
                  <span className="text-3xl mb-3">{category.icon}</span>
                  <span className="font-medium text-gray-800">
                    {category.name}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* FAQ Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50">
                  <h2 className="text-xl font-bold text-gray-900">
                    Frequently Asked Questions
                    <span className="text-cyan-600 ml-2">
                      {
                        helpCategories.find((c) => c.id === activeCategory)
                          ?.name
                      }
                    </span>
                  </h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {faqs[activeCategory]?.map((faq, index) => (
                    <div key={index} className="p-6">
                      <h3 className="text-lg font-medium text-gray-900">
                        {faq.question}
                      </h3>
                      <p className="mt-2 text-gray-600">{faq.answer}</p>
                      <button className="mt-3 inline-flex items-center text-sm font-medium text-cyan-600 hover:text-cyan-800">
                        Read more
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Articles */}
              <div className="mt-8 bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">
                    Popular Help Articles
                  </h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {filteredArticles.map((article, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block p-6 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-cyan-100 text-cyan-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          {
                            helpCategories.find(
                              (c) => c.id === article.category
                            )?.name
                          }
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">
                            {article.title}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Updated 3 days ago · 5 min read
                          </p>
                        </div>
                        <div className="ml-auto">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <a
                    href="#"
                    className="text-sm font-medium text-cyan-600 hover:text-cyan-800"
                  >
                    View all help articles
                  </a>
                </div>
              </div>
            </div>

            {/* Support Options */}
            <div>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden sticky top-8">
                <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50">
                  <h2 className="text-xl font-bold text-gray-900">
                    Support Options
                  </h2>
                </div>
                <div className="p-6">
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Get Help Faster
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-blue-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h4 className="font-medium text-gray-900">
                            Live Chat
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            Instant help from our support team
                          </p>
                          <button
                            onClick={() => setIsChatOpen(true)}
                            className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
                          >
                            Start Chat
                          </button>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-cyan-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h4 className="font-medium text-gray-900">
                            Email Support
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            Get a response within 24 hours
                          </p>
                          <button className="mt-2 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            Email Us
                          </button>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-green-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h4 className="font-medium text-gray-900">Call Us</h4>
                          <p className="mt-1 text-sm text-gray-500">
                            Available 24/7 for urgent issues
                          </p>
                          <div className="mt-2 font-medium text-gray-900">
                            +1 (800) TECH-SHD
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Community Support
                    </h3>
                    <div className="space-y-4">
                      <a
                        href="#"
                        className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-cyan-300 hover:bg-cyan-50 transition-colors duration-200"
                      >
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-purple-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h4 className="font-medium text-gray-900">
                            Community Forum
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            Ask questions and share solutions
                          </p>
                        </div>
                      </a>

                      <a
                        href="#"
                        className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-cyan-300 hover:bg-cyan-50 transition-colors duration-200"
                      >
                        <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-yellow-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h4 className="font-medium text-gray-900">
                            Knowledge Base
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            Guides, tutorials and troubleshooting
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Live Chat Modal */}
        {isChatOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div
                  className="absolute inset-0 bg-gray-500 opacity-75"
                  onClick={() => setIsChatOpen(false)}
                ></div>
              </div>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full fixed bottom-4 right-4 w-96">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg leading-6 font-medium text-white">
                      TechShed Support Chat
                    </h3>
                    <button
                      onClick={() => setIsChatOpen(false)}
                      className="text-white hover:text-gray-200 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="h-80 overflow-y-auto mb-4">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`mb-4 ${
                          message.sender === "user" ? "text-right" : ""
                        }`}
                      >
                        <div
                          className={`inline-block max-w-xs sm:max-w-md px-4 py-2 rounded-lg ${
                            message.sender === "user"
                              ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {message.text}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {message.sender === "bot"
                            ? "Nova (TechShed Support)"
                            : "You"}{" "}
                          · Just now
                        </div>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleSendMessage}>
                    <div className="flex">
                      <input
                        type="text"
                        className="flex-grow border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-r-lg font-medium hover:from-blue-700 hover:to-cyan-600 transition-all duration-300"
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechShedHelpCenter;
