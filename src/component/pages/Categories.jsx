import React from "react";
import { Link } from "react-router-dom";

// Static category images mapping
const categoryImages = {
  "Computers": "/images/c22c23_3ab3d3acd73843deba1dece7b2254e2f~mv2.avif",
  "Drones & Cameras": "/images/c22c23_77a52a8e6f8b4879a6548e11a3df3613~mv2.avif",
  "Headphones": "/images/c22c23_9ff1bd93e19f48b19670b5f6b19e874d~mv2.avif",
  "Mobile": "/images/c22c23_527e6c6f3d944fb88c80907c2f754afb~mv2.avif",
  "Speakers": "/images/c22c23_75b7c7a737a0437f8998a42d8a345a85~mv2.avif",
  "Sale": "/images/sale-label-purple-metallic-logo-J33VPk6-600.jpg",
  "Tablets": "/images/c22c23_5357f93228bc4548ba664ea0b8d91f27~mv2.avif",
  "Wearables": "/images/c22c23_ee8bc28108d44d34b0ed1b312845667f~mv2.avif",
  "HomeCinema": "/images/c22c23_6df363bec6fc43dd9d47ed2d34335417~mv2.avif",
  "TVs": "/images/c22c23_77c2b89535374768bec1d6337dcdbddc~mv2.avif",
  "BestSellers": "/images/Premium-badge-icon.jpg",
};

// Static category routes mapping
const categoryRoutes = {
  "Computers": "/Computer",
  "Mobile": "/Mobile",
  "Drones & Cameras": "/Drones",
  "Sale": "/Sale",
  "Tablets": "/Tablets",
  "T.V & Home Cinema": "/HomeCinema",
  "Wearables": "/WearableTech",
  "Speakers": "/Speakers",
  "Headphones": "/Headphones",
  "BestSellers": "/ShopAll",
};

// CategoryCard Component
const ShopByCategoryCard = ({ category }) => {
  const { name, img, to } = category;
  return (
    <div>
      <Link
        to={to}
        aria-label={`Shop ${name}`} className="block bg-white rounded-full shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
        <div className="transition-shadow cursor-pointer flex flex-col h-full">
          <img
            src={img}
            alt={name} loading="lazy" decoding="async" sizes="(min-width: 1024px) 220px, (min-width: 640px) 180px, 140px"
            className="mx-auto object-cover transition-transform duration-1000 hover:scale-110"
            onError={(e) => {
              e.target.onerror = null; e.target.src = 'https://placehold.co/300x300/CCCCCC/666666?text=Image+Unavailable';
            }}
          />
        </div>
      </Link>
      <div className="p-4">
        <h3 className="text-xl text-center mt-4 font-bold text-gray-800">{name}</h3>
      </div>
    </div>
  );
};

const ShopByCategory = () => {
  const categories = [
    { name: "Computers", img: categoryImages["Computers"], to: categoryRoutes["Computers"] },
    { name: "Drones & Cameras", img: categoryImages["Drones & Cameras"], to: categoryRoutes["Drones & Cameras"] },
    { name: "Headphones", img: categoryImages["Headphones"], to: categoryRoutes["Headphones"] },
    { name: "Mobile", img: categoryImages["Mobile"], to: categoryRoutes["Mobile"] },
    { name: "Speakers", img: categoryImages["Speakers"], to: categoryRoutes["Speakers"] },
    { name: "Sale", img: categoryImages["Sale"], to: categoryRoutes["Sale"] },
    { name: "Tablets", img: categoryImages["Tablets"], to: categoryRoutes["Tablets"] },
    { name: "Wearables", img: categoryImages["Wearables"], to: categoryRoutes["Wearables"] },
    { name: "T.V & Home Cinema", img: categoryImages["HomeCinema"], to: categoryRoutes["T.V & Home Cinema"] },
    { name: "BestSellers", img: categoryImages["BestSellers"], to: categoryRoutes["ShopAll"] },
  ];

  return (
    <section className="py-12 bg-gray-200">
      <div className="px-4 sm:px-6 lg:px-10">
        {/* Section title */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10 tracking-tight">
          Shop by Category
        </h2>

        <div className="md:hidden">
          <div className="flex space-x-4 overflow-x-auto no-scrollbar px-1 snap-x snap-mandatory">
            {categories.map((category) => (
              <div key={category.to} className="flex-none w-40 sm:w-48 snap-start">
                <ShopByCategoryCard category={category} />
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-5 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <ShopByCategoryCard key={category.to} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
