import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBusinessTime,
  faCheckCircle,
  faEnvelope,
  faLocation,
  faMessage,
  faQuestion,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { sendContactMessage } from "../../api";

const TechShedContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Validate form
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
      isValid = false;
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        await sendContactMessage(formData.name, formData.email, formData.message);
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });

        setTimeout(() => setSubmitSuccess(false), 5000);
      } catch (error) {
        console.error('Error sending contact message:', error);
        setIsSubmitting(false);
        // You could add error handling here if needed
      }
    }
  };
  const contactOptions = [
    {
      title: "Customer Support",
      description: "Get help with orders, returns, or product questions",
      icon: (
        <FontAwesomeIcon icon={faQuestion} className="text-2xl text-blue-400" />
      ),
      details: [
        "support@techshed.com",
        "+1 (800) TECH-SHD",
        "24/7 availability",
      ],
    },
    {
      title: "Business Inquiries",
      description: "Partnerships, wholesale, and corporate sales",
      icon: (
        <FontAwesomeIcon
          icon={faBusinessTime}
          className="text-2xl text-blue-400"
        />
      ),
      details: [
        "partners@techshed.com",
        "+1 (800) TECH-BIZ",
        "Mon-Fri: 9AM-6PM PST",
      ],
    },
    {
      title: "Visit Our HQ",
      description: "Schedule a tour of our innovation center",
      icon: (
        <FontAwesomeIcon
          icon={faLocation}
          className="text-2xl text-purple-400"
        />
      ),
      details: [
        "500 Terry Francine Street",
        "San Francisco, CA 94158",
        "By appointment only",
      ],
    },
  ];

  return (
    <div className="mt-40 md:mt-39 lg:mt-47">
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-blue-500/10 animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 92}%`,
                width: `${Math.random() * 70 + 50}px`,
                height: `${Math.random() * 200 + 50}px`,
              }}
            />
          ))}

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(100,100,100,0.1)_0%,rgba(0,0,0,0)_70%)]"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                Contact TechShed
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We're here to help with any tech questions, support needs, or
              partnership inquiries. Our team of experts is ready to assist you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Options */}
            <div>
              <div className="space-y-8">
                {contactOptions.map((option, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 hover:border-cyan-400 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-gray-900/50 p-3 rounded-xl border border-gray-700">
                        {option.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-100 mb-2">
                          {option.title}
                        </h3>
                        <p className="text-gray-400 mb-4">
                          {option.description}
                        </p>
                        <ul className="space-y-2">
                          {option.details.map((detail, i) => (
                            <li key={i} className="flex gap-2 items-center">
                              <FontAwesomeIcon
                                icon={faCheckCircle}
                                className="text-blue-400"
                              />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div className="mt-12 bg-gradient-to-r from-blue-900/30 to-cyan-800/30 rounded-2xl p-8 border border-gray-700">
                <h3 className="text-2xl font-bold mb-4">Connect With Us</h3>
                <p className="text-gray-400 mb-6">
                  Follow TechShed for the latest tech news, deals, and
                  innovations
                </p>
                <div className="flex space-x-4">
                  {[
                    {
                      name: "Twitter",
                      icon: (
                        <FontAwesomeIcon
                          icon={faTwitter}
                          className="text-xl text-blue-400"
                        />
                      ),
                    },
                    {
                      name: "Facebook",
                      icon: (
                        <FontAwesomeIcon
                          icon={faFacebook}
                          className="text-xl text-blue-400"
                        />
                      ),
                    },
                    {
                      name: "Instagram",
                      icon: (
                        <FontAwesomeIcon
                          icon={faInstagram}
                          className="text-xl text-blue-400"
                        />
                      ),
                    },
                    {
                      name: "YouTube",
                      icon: (
                        <FontAwesomeIcon
                          icon={faYoutube}
                          className="text-xl text-blue-400"
                        />
                      ),
                    },
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="bg-gray-900/50 p-3 rounded-lg border border-gray-700 hover:bg-cyan-900/30 hover:border-cyan-400 transition-all duration-300 flex items-center justify-center"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
                <p className="text-gray-400">
                  Our team typically responds within 1 business day
                </p>
              </div>

              {submitSuccess && (
                <div className="bg-green-900/30 border border-green-700 rounded-xl p-6 mb-6">
                  <div className="flex gap-4 items-center">
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="text-2xl text-green-400"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-green-300">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-green-200">
                        We'll get back to you within 24 hours. Thanks for
                        contacting TechShed!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-400 mb-1"
                    >
                      Your Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full bg-gray-900/50 border ${
                          errors.name ? "border-red-500" : "border-gray-700"
                        } rounded-lg py-3 px-4 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                        placeholder="John Doe"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="text-gray-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-400 mb-1"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-gray-900/50 border ${
                          errors.email ? "border-red-500" : "border-gray-700"
                        } rounded-lg py-3 px-4 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                        placeholder="john@example.com"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className="text-gray-400"
                        />
                      </div>
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    Subject
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full bg-gray-900/50 border ${
                        errors.subject ? "border-red-500" : "border-gray-700"
                      } rounded-lg py-3 px-4 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                      placeholder="How can we help?"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <FontAwesomeIcon
                        icon={faMessage}
                        className="text-gray-400"
                      />
                    </div>
                  </div>
                  {errors.subject && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div className="mb-8">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className={`w-full bg-gray-900/50 border ${
                      errors.message ? "border-red-500" : "border-gray-700"
                    } rounded-lg py-3 px-4 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                    placeholder="Tell us about your inquiry..."
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-xl font-bold transition-all duration-300 cursor-pointer ${
                    isSubmitting
                      ? "bg-gray-700 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 hover:shadow-lg hover:shadow-cyan-500/20"
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending Message...
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-24">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked <span className="text-cyan-400">Questions</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  question: "How long does shipping take?",
                  answer:
                    "Most orders ship within 24 hours and arrive in 2-4 business days. Expedited shipping options are available at checkout.",
                },
                {
                  question: "What is your return policy?",
                  answer:
                    "We offer a 30-day hassle-free return policy. Items must be in original condition with packaging.",
                },
                {
                  question: "Do you offer technical support?",
                  answer:
                    "Yes! All TechShed products come with free lifetime technical support from our expert team.",
                },
                {
                  question: "Can I cancel or modify my order?",
                  answer:
                    "You can modify or cancel your order within 1 hour of placement. After that, orders are processed for shipping.",
                },
                {
                  question: "Do you ship internationally?",
                  answer:
                    "Yes, we ship to over 100 countries worldwide. International shipping rates apply.",
                },
                {
                  question: "How do I track my order?",
                  answer:
                    "Once your order ships, you'll receive a tracking number via email. You can also check order status in your account.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 hover:border-cyan-400 transition-all duration-300"
                >
                  <h3 className="text-lg font-bold text-gray-100 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechShedContactPage;
