import React, { useState } from "react";
import { subscribeNewsletter } from "../api";

const Newsletter = () => {
  const [formData, setFormData] = useState({
    email: "",
    newsletter: false,
  });
  const [submitMessage, setSubmitMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }

    if (!formData.newsletter) {
      newErrors.newsletter = "Check the box to continue";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitMessage("Subscribing...");
      try {
        await subscribeNewsletter(formData.email);
        setSubmitMessage("Subscribed successfully! We will get back to you soon.");

        // Reset the entire form data after success.
        setFormData({ email: "", newsletter: false });
        setErrors({});

        // Timeout to clear the success message.
        setTimeout(() => {
          setSubmitMessage("");
        }, 3000);
      } catch (error) {
        setSubmitMessage("Failed to subscribe. Please try again.");
        setTimeout(() => {
          setSubmitMessage("");
        }, 3000);
      }
    } else {
      setSubmitMessage("Please correct the errors in the form.");
      // Timeout to clear the error message.
      setTimeout(() => {
        setSubmitMessage("");
      }, 2000);
    }
  };

  return (
    <div className="mt-12 lg:mt-0 lg:w-[92%] xl:w-[94%] mx-auto flex justify-center items-center text-white bg-violet-600 antialiased p-4 sm:p-6 lg:p-8">
      <div className="p-4 lg:p-8 flex flex-col justify-center items-center">
        <h2 className="text-3xl font-semibold text-center mb-4 tracking-tight">
          Newsletter
        </h2>
        <p className="text-xl text-center md:text-start mb-4 md:mb-0">Sign up to receive updates on new arrivals and special offers</p>

        {submitMessage && (
          <div
            className={`mb-4 mt-4 p-3 rounded-lg text-center ${
              submitMessage.includes("successfully")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {submitMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 flex flex-col md:flex-row gap-6">
          <div>
            {/* Email Input */}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="block text-[1.3rem] text-white mb-4"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`block md:w-[33rem] lg:w-[40rem] px-4 py-3 border rounded-3xl text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500
              ${errors.email ? "border-red-500" : "border-white"}`}
                placeholder="you@example.com"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby="email-error"
              />
              {errors.email && (
                <p className="mt-2 text-yellow-300" id="email-error">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <div>
                <input
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleChange}
                  className={`mr-2 leading-tight ${
                    errors.newsletter ? "border-yellow-300" : "border-white"
                  }`}
                  aria-invalid={errors.newsletter ? "true" : "false"}
                  aria-describedby="newsletter-error"
                />
                <label htmlFor="newsletter" className="text-xl md:ml-2">
                  Yes, subscribe me to your newsletter *
                </label>
              </div>
              <div>
                {errors.newsletter && (
                  <p className="text-yellow-300" id="newsletter-error">
                    {errors.newsletter}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="-mt-10 md:mt-11">
            <button
              type="submit"
              className="w-full px-4 py-3 lg:px-15 border border-transparent rounded-3xl shadow-sm text-base font-medium text-white bg-black hover:bg-gray-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
              disabled={submitMessage.includes("Sending")}
            >
              {submitMessage.includes("Sending") ? "Sending..." : "Subscribe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
