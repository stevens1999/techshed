import React from "react";
import { useNavigate } from "react-router-dom";

const HelpCenterCTA = () => {
  const navigate = useNavigate();
  return (
    <section className="container md:w-[94%] lg:w-full lg:mt-12 xl:mt-15 flex flex-col md:flex-row">
      <div
        className="md:absolute md:w-[60%] lg:w-[55%] bg-black text-white flex flex-col lg:h-[28rem] xl:h-[27.8rem] bg-opacity-80 p-8 px-4 sm:px-6 lg:px-10 z-10 xl-clip-path"
      >
        <h4 className="text-[2rem] lg:w-[70%] xl:w-[50%] mb-4 font-bold my-check xl:mt-10 z-10">
          Need Help? Check Out Our Help Center
        </h4>
        <p className="text-xl lg:w-[95%] xl:w-[90%]">
          Having a little trouble? Don't worry, we've got your back! Our Help
          Center is designed to quickly provide you with the answers you need,
          whenever you need them. From order tracking to returns, product
          information to payment queries, find everything you're looking for
          right here. Let's get you sorted!
        </p>
        <div className="mt-6 mr-35 w-full">
          <button
            type="button"
            className="mx-auto bg-blue-900 text-white hover:bg-blue-800 cursor-pointer rounded-full px-8 py-3 transition-colors duration-300 shadow-lg"
            onClick={() => navigate("/HelpCenter")}
          >
            Go to Help Center
          </button>
        </div>
      </div>
      <img
        className="h-[15rem] md:h-[27.78rem] md:left-101.5 md:w-[50%] my-help lg:h-[28rem] lg:w-[53%] xl:w-[60%] xl:h-[27.8rem] relative lg:left-120 xl:left-145.5"
        src="/images/c22c23_de5cbbefa9104fc1a1604ea146ea523a~mv2.jpg"
        alt="badge"
      />
    </section>
  );
};

export default HelpCenterCTA;
