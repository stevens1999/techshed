import React from "react";
import { useNavigate } from "react-router-dom";

import garageImage2 from "/images/download.jpeg";
import FirstProductTexting from "/images/96335118-b845-45a7-b5be-0992ebafd50d.jpeg";
import garageImage3 from "/images/download_1.jpeg";
import ultraSonicFlawDectector from "/images/Ultrasonic Flaw Detector NOVOTEST UD2301.jpeg";


const TechShedAbout = () => {
  const navigate = useNavigate();
  const teamMembers = [
    {
      id: 1,
      img: "/images/352cfd62-fcea-4f4a-bafe-5c89861cf7f2.jpeg",
      name: "Steven Tariah",
      role: "Founder & CEO",
      funFact: "Built first PC at age 12",
    },
    {
      id: 2,
      img: "/images/88fa5b9a-322e-4508-ac0a-5c0ba7b535c2.jpeg",
      name: "Samira Chen",
      role: "CTO",
      funFact: "Competitive coding champion",
    },
    {
      id: 3,
      img: "/images/8caf6827-f683-4373-a531-12d597bccb2d.jpeg",
      name: "Marcus Rivera",
      role: "Head of Support",
      funFact: "Retro tech collector",
    },
    {
      id: 4,
      img: "/images/4000bd16-4de7-46a0-9215-e63162a2cb39.jpeg",
      name: "Taylor Kim",
      role: "Product Curator",
      funFact: "VR enthusiast",
    },
  ];

  const stats = [
    { value: "10M+", label: "Tech Products" },
    { value: "24/7", label: "Expert Support" },
    { value: "150+", label: "Brand Partners" },
    { value: "2-Day", label: "Avg. Delivery" },
  ];

  const originImages = [
    { id: 1, src: garageImage2, alt: "Our early garage workspace" },
    { id: 2, src: FirstProductTexting, alt: "First product prototypes" },
    { id: 3, src: garageImage3, alt: "Team working in garage" },
    { id: 4, src: ultraSonicFlawDectector, alt: "Early product testing" },
  ];

  return (
    <div className="mt-6 lg:mt-47">
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-blue-500 opacity-20 blur-xl"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 92}%`,
                width: `${Math.random() * 70 + 20}px`,
                height: `${Math.random() * 100 + 20}px`,
              }}
            />
          ))}
        </div>

        <div className="mt-40 md:mt-39 lg:mt-5 container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="text-center mb-28 mt-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                TechShed
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Where innovation meets accessibility. We're revolutionizing tech
              retail one gadget at a time.
            </p>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-700 hover:border-cyan-400 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-3xl font-bold text-cyan-400">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Our Story */}
          <section className="mb-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                Our Origin
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Founded in 2015 in a garage filled with spare parts and big
                dreams, TechShed started as a passion project between four
                college friends. We were frustrated by overpriced tech and
                impersonal shopping experiences.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Today, we've grown into a global platform serving millions of
                customers, but we've kept our hacker ethos alive. Every product
                is still personally tested by our team before it hits our
                virtual shelves.
              </p>
              <div className="pt-6">
                <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full font-medium hover:scale-105 transition-transform duration-300 cursor-pointer">
                  Explore Our Journey
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4">
                <div className="w-full h-full rotate-6 bg-gradient-to-tr from-blue-500/20 to-cyan-400/20 rounded-xl"></div>
              </div>
              <div className="bg-gray-800 p-8 rounded-xl relative z-10 border border-gray-700 cursor-pointer">
                <div className="grid grid-cols-2 gap-4">
                  {originImages.map((image) => (
                    <div
                      key={Image.id}
                      className="aspect-square bg-gray-700/50 rounded-lg flex items-center justify-center"
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-50 h-50 border-2 border-dashed rounded-xl object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center text-gray-400 italic">
                  Our humble beginnings (2015)
                </div>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="mb-28">
            <h2 className="text-4xl font-bold text-center mb-16">
              Meet Our <span className="text-cyan-400">Tech Wizards</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-gray-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-400 transition-all duration-300 group"
                >
                  <div className="flex justify-center relative overflow-hidden mt-8">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="border-2 border-dashed border-cyan-400 rounded-full w-25 h-25 mb-4 z-10"
                      onError={(e) => {
                        e.target.onerror = null; // Prevents infinite loop if placeholder also fails
                        e.target.src = `https://placehold.co/300x300/CCCCCC/666666?text=Image+Error`;
                      }}
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-center">
                      {member.name}
                    </h3>
                    <p className="text-cyan-400 text-center mb-2">
                      {member.role}
                    </p>
                    <div className="mt-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm text-gray-400">
                        Fun fact: {member.funFact}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Mission Section */}
          <section className="mb-28 bg-gradient-to-r from-blue-900/30 to-cyan-800/30 rounded-2xl p-8 border border-gray-700">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-cyan-500/10 px-4 py-2 rounded-full mb-6">
                <span className="text-cyan-400 font-medium">Our Promise</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Demystifying Technology for Everyone
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
                At TechShed, we believe cutting-edge technology shouldn't
                require a computer science degree to use. We carefully test
                every product, create beginner-friendly guides, and maintain a
                no-jargon policy so you can find the perfect tech solution.
              </p>
              <div className="mt-10 bg-gray-900/80 backdrop-blur rounded-xl p-6 border border-gray-700 text-left">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className="text-cyan-400 mr-2">✓</span> The TechShed
                  Difference
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Real human support 24/7",
                    "90-day no-questions returns",
                    "Price match guarantee",
                    "Ethical recycling program",
                    "Community tech workshops",
                    "Hands-on product testing",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-cyan-400 mr-2">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Tech Different?
            </h2>
            <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto">
              Join millions of satisfied customers who've discovered their
              perfect tech match at TechShed
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full font-bold hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => navigate("/ShopAll")}
              >
                Shop New Arrivals
              </button>
              <button 
              className="px-8 py-4 bg-gray-800 border border-gray-700 rounded-full font-bold hover:bg-gray-700/50 transition-colors duration-300 cursor-pointer"
              onClick={() => navigate("/Contact")}
              >
                Contact Our Experts
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TechShedAbout;
