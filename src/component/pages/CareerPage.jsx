import React, { useState } from "react";

const TechShedCareers = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const departments = [
    { id: "all", name: "All Departments" },
    { id: "tech", name: "Technology" },
    { id: "design", name: "Design" },
    { id: "marketing", name: "Marketing" },
    { id: "operations", name: "Operations" },
    { id: "support", name: "Customer Support" },
  ];

  const jobOpenings = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "tech",
      type: "Full-time",
      location: "San Francisco, CA",
      description:
        "Build innovative e-commerce experiences using React and modern web technologies.",
      responsibilities: [
        "Develop and maintain our customer-facing web applications",
        "Collaborate with UX designers to implement responsive interfaces",
        "Optimize frontend performance for maximum speed",
      ],
      requirements: [
        "5+ years experience with React and JavaScript",
        "Experience with state management libraries",
        "Strong understanding of responsive design",
      ],
    },
    {
      id: 2,
      title: "UX/UI Designer",
      department: "design",
      type: "Full-time",
      location: "Remote",
      description:
        "Create intuitive and beautiful user experiences for our e-commerce platform.",
      responsibilities: [
        "Design user flows and wireframes for new features",
        "Create high-fidelity mockups and prototypes",
        "Conduct user research and usability testing",
      ],
      requirements: [
        "Portfolio showcasing UX/UI design work",
        "Proficiency in Figma or similar tools",
        "Experience with design systems",
      ],
    },
    {
      id: 3,
      title: "Digital Marketing Manager",
      department: "marketing",
      type: "Full-time",
      location: "New York, NY",
      description:
        "Lead our digital marketing efforts to drive growth and customer acquisition.",
      responsibilities: [
        "Develop and execute digital marketing strategies",
        "Manage SEM, SEO, and social media campaigns",
        "Analyze campaign performance and optimize ROI",
      ],
      requirements: [
        "5+ years in digital marketing",
        "Experience with Google Analytics and AdWords",
        "Strong analytical skills",
      ],
    },
    {
      id: 4,
      title: "DevOps Engineer",
      department: "tech",
      type: "Full-time",
      location: "Seattle, WA",
      description:
        "Build and maintain our cloud infrastructure and CI/CD pipelines.",
      responsibilities: [
        "Manage AWS infrastructure with IaC tools",
        "Implement and maintain CI/CD pipelines",
        "Ensure system reliability and security",
      ],
      requirements: [
        "Experience with AWS, Docker, Kubernetes",
        "Knowledge of infrastructure as code (Terraform)",
        "Strong scripting skills",
      ],
    },
    {
      id: 5,
      title: "Customer Support Lead",
      department: "support",
      type: "Full-time",
      location: "Austin, TX",
      description:
        "Lead our customer support team to deliver exceptional service experiences.",
      responsibilities: [
        "Manage and mentor support team members",
        "Develop support processes and knowledge base",
        "Analyze customer feedback to improve service",
      ],
      requirements: [
        "3+ years in customer support leadership",
        "Experience with Zendesk or similar tools",
        "Excellent communication skills",
      ],
    },
    {
      id: 6,
      title: "Data Analyst",
      department: "tech",
      type: "Full-time",
      location: "Remote",
      description:
        "Transform data into insights that drive business decisions.",
      responsibilities: [
        "Analyze customer behavior and sales data",
        "Create dashboards and reports for stakeholders",
        "Identify trends and opportunities for growth",
      ],
      requirements: [
        "Experience with SQL and data visualization tools",
        "Strong analytical and problem-solving skills",
        "Knowledge of statistics and A/B testing",
      ],
    },
  ];

  const filteredJobs =
    activeTab === "all"
      ? jobOpenings
      : jobOpenings.filter((job) => job.department === activeTab);

  const benefits = [
    {
      title: "Competitive Compensation",
      description: "We offer above-market salaries and equity options",
      // icon: (
      // ),
    },
    {
      title: "Flexible Work",
      description: "Remote options and flexible hours to suit your lifestyle",
      // icon: (
      // ),
    },
    {
      title: "Learning & Growth",
      description: "$2,000 annual budget for professional development",
      // icon: (
      // ),
    },
    {
      title: "Health & Wellness",
      description: "Comprehensive medical, dental, and vision coverage",
      // icon: (
      // ),
    },
  ];

  const values = [
    {
      title: "Innovate Fearlessly",
      description:
        "We encourage experimentation and embrace failure as part of the learning process",
      color: "bg-blue-500",
    },
    {
      title: "Customer Obsession",
      description:
        "Everything we do starts and ends with creating value for our customers",
      color: "bg-cyan-500",
    },
    {
      title: "Ownership Mindset",
      description:
        "We take responsibility for outcomes and drive initiatives to completion",
      color: "bg-indigo-500",
    },
    {
      title: "Inclusive Collaboration",
      description: "We believe diverse perspectives create the best solutions",
      color: "bg-purple-500",
    },
  ];

  const openJobModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  return (
    <div className="mt-6 lg:mt-47">
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-900 to-cyan-800 text-white overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-r from-transparent to-blue-700/20"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-transparent to-cyan-600/10"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Build the Future of{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-300">
                    Tech Commerce
                  </span>
                </h1>
                <p className="mt-6 text-xl text-blue-100 max-w-2xl">
                  Join TechShed and help revolutionize how people discover and
                  buy technology. We're building the most customer-centric tech
                  marketplace on earth.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-bold text-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-blue-500/30">
                    Explore Opportunities
                  </button>
                  <button className="px-8 py-4 bg-transparent border-2 border-white rounded-xl font-bold text-lg hover:bg-white/10 transition-colors duration-300">
                    Our Culture
                  </button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl transform rotate-6"></div>
                  <div className="relative bg-white rounded-2xl shadow-2xl p-8 text-gray-800">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-bold">Life at TechShed</h3>
                        <p className="text-blue-500">Watch our culture video</p>
                      </div>
                    </div>
                    <div className="aspect-video bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="py-16 bg-gradient-to-br from-gray-900 to-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">
                Our{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                  Core Values
                </span>
              </h2>
              <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
                These principles guide everything we do at TechShed and define
                our culture
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700"
                >
                  <div className={`h-2 ${value.color}`}></div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-gray-400">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Perks &{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
                  Benefits
                </span>
              </h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                We invest in our team's well-being, growth, and success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    And So Much More...
                  </h3>
                  <ul className="grid grid-cols-2 gap-4">
                    {[
                      "Flexible PTO & holidays",
                      "401(k) with company match",
                      "Latest tech equipment",
                      "Parental leave",
                      "Team offsites",
                      "Stocked kitchens",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-cyan-500 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-center">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl p-1 w-full max-w-xs">
                    <div className="bg-white rounded-xl p-6 text-center">
                      <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
                        4.9
                      </div>
                      <div className="text-gray-700 mt-2">
                        Average rating on Glassdoor
                      </div>
                      <div className="flex justify-center mt-3">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-amber-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Openings Section */}
        <div className="py-16 bg-gradient-to-b from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Join Our{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
                  Team
                </span>
              </h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Explore opportunities to build the future of tech commerce with
                us
              </p>
            </div>

            {/* Department Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {departments.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => setActiveTab(dept.id)}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                    activeTab === dept.id
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {dept.name}
                </button>
              ))}
            </div>

            {/* Job Listings */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {job.title}
                        </h3>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            {job.type}
                          </span>
                          <span className="px-3 py-1 bg-cyan-100 text-cyan-800 text-xs font-medium rounded-full">
                            {job.location}
                          </span>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-12 h-12 rounded-xl flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="mt-4 text-gray-600">{job.description}</p>
                    <button
                      onClick={() => openJobModal(job)}
                      className="mt-6 w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-medium text-white hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <p className="text-gray-600 mb-6">
                Don't see the perfect role? We're always looking for exceptional
                talent.
              </p>
              <button className="px-8 py-3 bg-white border-2 border-blue-500 rounded-xl font-medium text-blue-500 hover:bg-blue-50 transition-colors duration-300">
                Submit General Application
              </button>
            </div>
          </div>
        </div>

        {/* Hiring Process */}
        <div className="py-16 bg-gradient-to-r from-blue-900 to-cyan-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">
                Our{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-300">
                  Hiring Process
                </span>
              </h2>
              <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
                We've designed a transparent and respectful process to get to
                know each other
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Initial Chat",
                  description:
                    "30-min conversation with our recruiting team to learn about your background and interests",
                },
                {
                  step: "2",
                  title: "Skills Assessment",
                  description:
                    "Practical exercise to demonstrate your approach to problem-solving",
                },
                {
                  step: "3",
                  title: "Team Interviews",
                  description:
                    "Meet potential colleagues to discuss technical skills and team fit",
                },
                {
                  step: "4",
                  title: "Final Conversation",
                  description:
                    "Meet with leadership to discuss vision, values, and expectations",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="bg-blue-800/30 backdrop-blur-sm rounded-2xl p-6 border border-blue-700"
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-blue-200">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Job Application Modal */}
        {isModalOpen && selectedJob && (
          <div className="fixed top-50 inset-0 z-50 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"
                onClick={() => setIsModalOpen(false)}
              >
                <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
              </div>

              <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-5xl relative z-10">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">
                      Apply to {selectedJob.title}
                    </h3>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="text-white hover:text-gray-200"
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
                  <div className="mt-2 text-blue-100">
                    {selectedJob.type} · {selectedJob.location}
                  </div>
                </div>
                <div className="bg-white px-6 py-8 sm:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-4">
                        About the Role
                      </h4>
                      <p className="text-gray-600 mb-6">
                        {selectedJob.description}
                      </p>

                      <h4 className="text-lg font-bold text-gray-900 mb-4">
                        Responsibilities
                      </h4>
                      <ul className="space-y-2 mb-6">
                        {selectedJob.responsibilities.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-cyan-500 mt-0.5 mr-2 flex-shrink-0"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>

                      <h4 className="text-lg font-bold text-gray-900 mb-4">
                        Requirements
                      </h4>
                      <ul className="space-y-2 mb-8">
                        {selectedJob.requirements.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-cyan-500 mt-0.5 mr-2 flex-shrink-0"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-4">
                        Apply Now
                      </h4>
                      <form className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                            placeholder="you@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Resume
                          </label>
                          <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-8 w-8 text-gray-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                  />
                                </svg>
                                <p className="text-sm text-gray-500 mt-2">
                                  Upload your resume
                                </p>
                              </div>
                              <input type="file" className="hidden" />
                            </label>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Cover Letter (Optional)
                          </label>
                          <textarea
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                            placeholder="Tell us why you're excited about this role..."
                          ></textarea>
                        </div>
                        <button
                          type="submit"
                          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-medium text-white hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 mt-4"
                        >
                          Submit Application
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default TechShedCareers;
