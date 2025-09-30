import Button from "../Button";
import { useNavigate } from "react-router-dom";
import BackgroundSlider from "../BackgroundSlider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruckFast,
  faGift,
  faClockFour,
  faPercentage,
} from "@fortawesome/free-solid-svg-icons";
import BestSellers from "./BestSellers";
import ShopByCategory from "./Categories";
import Sale from "./Sale";
import Newsletter from "../Newsletter";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-35 lg:mt-47">
      <BackgroundSlider />
      <div className=" bg-gray-200 flex flex-col md:flex-row gap-4 items-center justify-center mt-12 lg:mt-0 lg:p-6">
        <section className="relative">
          <div className="lg:p-4">
            <img
              src="/images/c22c23_e140bfa8cd6f4cb2ac5ee6e204f64073~mv2.avif"
              alt="img"
              className="w-full h-[30rem] lg:h-auto object-cover rounded-lg shadow-lg"
            />

            <div className="absolute inset-0 flex p-4 sm:p-8 text-white">
              <div className="ml-7 xl:ml-14 mt-5">
                <h4 className="text-sm sm:text-base md:text-lg lg:text-xl inline-block px-2 py-1 font-semibold mb-2 rounded bg-blue-700 bg-opacity-80">
                  Holiday Deals
                </h4>
                <h2 className="text-5xl w-[70%] lg:w-[60%] font-bold mb-4 drop-shadow-lg leading-15">
                  Up to 30% off
                </h2>
                <p className="text-xl drop-shadow-md mb-6">
                  Selected Smartphone Brands
                </p>
                <button
                  type="button"
                  className="bg-white text-blue-900 hover:bg-blue-100 font-bold cursor-pointer rounded-full px-6 py-2 sm:px-8 sm:py-3 transition-colors duration-300 shadow-lg text-sm sm:text-base"
                  onClick={() => navigate("/Mobile")}
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="relative">
          <section className="lg:p-4">
            <img
              src="/images/c837a6_d84a631864a442a496670bc2d787c6a0~mv2.jpg"
              alt="img"
              className="w-full h-[30rem] lg:h-auto rounded-lg shadow-lg"
            />

            <div className="absolute inset-0 flex p-4 sm:p-8 text-white">
              <div className="ml-7 xl:ml-14 mt-5">
                <h4 className="text-sm sm:text-base md:text-lg lg:text-xl inline-block px-2 py-1 font-semibold mb-2 rounded bg-purple-700 bg-opacity-80">
                  Just In
                </h4>
                <h2 className="text-5xl w-[80%] lg:w-full xl:w-[50%] font-bold mb-4 drop-shadow-lg leading-15">
                  Take Your Sound Anywhere
                </h2>
                <p className="text-xl drop-shadow-md mb-4 sm:mb-6">
                  Top Headphone Brands
                </p>
                <button
                  type="button"
                  className="bg-white text-purple-900 hover:bg-purple-100 font-bold cursor-pointer rounded-full px-6 py-2 sm:px-8 sm:py-3 transition-colors duration-300 shadow-lg text-sm sm:text-base"
                  onClick={() => navigate("/Headphones")}
                >
                  Shop Now
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      <section className="bg-gray-200">
        <div className="mx-auto mt-12 lg:-mt-6 lg:p-10">
          <div className="bg-white grid grid-cols-2 lg:grid-cols-4 justify-center gap-4 p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
              <FontAwesomeIcon
                icon={faTruckFast}
                className="text-4xl text-black cursor-pointer"
              />
              <p className="text-xl font-semibold text-center lg:text-start lg:w-[50%]">
                Curb-side pickup
              </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
              <FontAwesomeIcon
                icon={faGift}
                className="text-4xl text-black cursor-pointer"
              />
              <p className="text-xl font-semibold text-center lg:text-start lg:w-[70%]">
                Free shipping on orders over $200
              </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
              <FontAwesomeIcon
                icon={faPercentage}
                className="text-4xl text-black cursor-pointer"
              />
              <p className="text-xl font-semibold text-center lg:text-start lg:w-[50%]">
                Low prices guaranteed
              </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
              <FontAwesomeIcon
                icon={faClockFour}
                className="text-4xl text-black cursor-pointer"
              />
              <p className="text-xl font-semibold text-center lg:text-start lg:w-[50%]">
                Available to you 24/7
              </p>
            </div>
          </div>
        </div>
      </section>

      <BestSellers />
      <ShopByCategory />

      <section className="container mt-12 md:mt-0 md:w-[94%] mx-auto flex flex-col md:flex-row lg:px-[0.5rem] xl:px-0">
        <img
          className=" w-full h-[12rem] md:h-full relative"
          src="/images/c837a6_42dd66a436e846648736f4bc9546bf14~mv2.png"
          alt="badge"
        />
        <div className="relative -top-35 md:-left-115 md:top-5 lg:-left-140 xl:-left-170 xl:top-15 z-20">
          <h3 className="bg-red-700 text-center p-4 w-25 h-25 font-semibold text-white text-3xl md:text-4xl md:p-8 md:w-40 md:h-40 rounded-full tramsform rotate-20">
            Best Price
          </h3>
        </div>
        <div
          className="md:absolute -mt-[8rem] bg-white md:-mt-[0.1rem] md:left-87 md:h-[21.7rem] md:w-[52%] my-element lg:-mt-0 lg:left-124 lg:h-[28.25rem] lg:w-[48%] xl:left-166 xl:h-[37.5rem] bg-opacity-80 p-8 px-4 sm:px-6 xl:px-10 md-clip-path"
        >
          <h4 className="text-[1.5rem] font-bold md:w-[55%] md:text-center md:ml-20 lg:text-[1.7rem] lg:mt-3 lg:ml-25 leading-13 xl:mt-20 xl:ml-35 xl:w-[45%] xl:leading-15 z-10">
            Save up to <span className="text-5xl lg:text-8xl">$150</span> on selected laptop
            & tablet brands
          </h4>
          <p className="xl:ml-36 xl:text-start md:text-center text-xl">Terms and conditions apply</p>
          <div className="md:flex md:justify-center mt-6">
            <button
              type="button"
              className="mx-auto bg-blue-900 text-white hover:bg-blue-800 cursor-pointer rounded-full px-8 py-3 transition-colors duration-300 shadow-lg"
              onClick={() => navigate("/Computer")}
            >
              Shop Now
            </button>
          </div>
        </div>
      </section>

      <Sale />

      <section className="container mt-12 lg:mt-10 md:w-[94%] mx-auto flex flex-col md:flex-row lg:px-[0.5rem] xl:px-0">
        <div
          className="md:absolute w-50% lg:w-[50%] md:mr-1 my-special bg-white h-[25rem] lg:h-[28.3rem] xl:h-[37.5rem] bg-opacity-80 p-8 px-4 sm:px-6 lg:px-10 z-10 xl-clip-path"
        >
          <h3 className="bg-red-700 w-[50%] xl:w-[30%] text-center xl:mt-10 sm:text-base md:text-lg lg:text-xl text-white z-10">
            Today's Special
          </h3>
          <h4 className="text-2xl md:text-[1.7rem] font-bold mt-2 leading-15 z-10">
            Best Arial View in Town
          </h4>
          <h4 className="text-5xl lg:text-8xl text-purple-700 font-bold">
            30% <span className="text-black">OFF</span>
          </h4>
          <h4 className="text-[1.1rem] md:text-[1.4rem] font-bold mt-4 md:mt-0 md:leading-15 z-10">
            on professional camera drones.
          </h4>
          <p className="text-[1.2rem] md:text-xl mt-4 md:mt-0">
            Limited quantities. <br /> See product detail pages for
            availability.
          </p>
          <div className="mt-6">
            <button
              type="button"
              className="mx-auto bg-blue-900 text-white hover:bg-blue-800 cursor-pointer rounded-full px-8 py-3 transition-colors duration-300 shadow-lg"
              onClick={() => navigate("/Drones")}
            >
              Shop Now
            </button>
          </div>
        </div>
        <img
          className="h-[12rem] md:h-[25rem] lg:h-full md:relative xl:left-4"
          src="/images/c837a6_ecf32c7284d4430582fcc90f60a1b4e6~mv2.avif"
          alt="badge"
        />
      </section>

      <section>
        <div className="mx-auto mt-12 lg:mt-0 lg:p-10">
          <div className="bg-white text-center p-4 lg:p-15">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">
              Brands
            </h2>

            <div className=" grid grid-cols-1 md:grid-cols-5 justify-center p-4 lg:p-6">
              <div className="flex justify-center border border-gray-300 p-4 lg:p-10">
                <p className="text-2xl font-bold font-libre text-gray-500 text-center lg:text-start">
                  ZODIAC
                </p>
              </div>

              <div className="flex justify-center border border-gray-300 p-4 lg:p-10">
                <p className="text-2xl font-bold font-major-mono-display text-gray-500 text-center lg:text-start">
                  ZOrO
                </p>
              </div>

              <div className="flex justify-center border border-gray-300 p-4 lg:p-10">
                <p className="text-2xl font-bold font-exile text-gray-500 text-center lg:text-start">
                  P.J.K
                </p>
              </div>

              <div className="flex justify-center border border-gray-300 p-4 lg:p-10">
                <p className="text-2xl font-bold font-train-one border-b-4 text-gray-500 text-center lg:text-start">
                  GXL
                </p>
              </div>

              <div className="flex justify-center border border-gray-300 p-4 lg:p-10">
                <p className="text-2xl font-extrabold font-sankofa text-gray-500 text-center lg:text-start">
                  HORIZON
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
};

export default Home;
