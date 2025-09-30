import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom"

const Footer = () => {
  const footerData = [
    {
      title: "Shop",
      links: [
        { name: "Shop All", to: "/ShopAll" },
        { name: "Computers", to: "/Computer" },
        { name: "Tablets", to: "/Tablets" },
        { name: "Drones & Cameras", to: "/Drones" },
        { name: "Audio", to: "/Audio" },
        { name: "Mobile", to: "/Mobile" },
        { name: "T.V & Home Cinema", to: "HomeCinema" },
        { name: "Wearable Tech", to: "/WearableTech" },
        { name: "Sale", to: "/OnSale" },
      ],
    },
    {
      title: "Customer Support",
      links: [
        { name: "Contact Us", to: "/Contact" },
        { name: "Help Center", to: "/HelpCenter" },
        { name: "About Us", to: "/About" },
        { name: "Careers", to: "/Career" },
      ],
    },
    {
      title: "Policy",
      links: [
        { name: "Shipping & Returns", to: "/ShippingReturns" },
        { name: "Terms & Conditions", to: "/TermsAndConditions" },
        { name: "Payment Methods", to: "/PaymentMethods" },
        { name: "FAQ", to: "/FAQ" },
      ],
    },
  ];
  return (
    <footer className="bg-white text-black pt-20 py-6 text-center md:text-start">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Section 1: Store Location & Contact Info */}
          <div className="mb-8 lg:mb-0">
            <h3 className="text-xl font-semibold text-black mb-8">
              Store Location
            </h3>
            <div className="text-base space-y-2">
              <p>500 Terry Francine Street</p>
              <p>San Francisco, CA 94158</p>
              <a
                href="partners@techshed.com"
                className="block hover:text-blue-500 transition-colors duration-200"
              >
                partners@techshed.com
              </a>
              <a
                href="tel:+1 (800) TECH-BIZ"
                className="block hover:text-blue-500 transition-colors duration-200"
              >
                +1 (800) TECH-BIZ
              </a>
              <div className="flex gap-4 mt-8 items-center justify-center md:justify-start">
                <FontAwesomeIcon icon={faFacebook} className="text-xl" />
                <FontAwesomeIcon icon={faInstagram} className="text-xl" />
                <FontAwesomeIcon icon={faTwitter} className="text-xl" />
                <FontAwesomeIcon icon={faYoutube} className="text-xl" />
              </div>
            </div>
          </div>

          {/* Section 2, 3, 4: Dynamic link columns */}
          {footerData.map((section, idx) => (
            <div key={idx} className="mb-8 md:mb-0">
              <h3 className="text-xl font-semibold text-black mb-8">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.to}
                      className="hover:text-blue-700 transition-colors duration-200 block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t-2 border-gray-300 mt-8 md:mt-12 pt-8">
          <p className="text-center">We accept the following paying methods</p>
          <div className="mt-8 flex flex-wrap mb-6 gap-6 ml-1 justify-center items-center md:flex-row md:gap-10 md:mb-12 md:ml-0 lg:gap-12">
            <img src="/images/Visa.avif" alt="visa" />
            <img src="/images/brand-mastercard@3x.png" alt="mastercard" />
            <img src="/images/brand-amex@3x.avif" alt="amex" />
            <img src="/images/brand-chinaunionpay@3x.avif" alt="union" />
            <img src="/images/brand-jcb@3x.avif" alt="jcb" />
            <img src="/images/Diners.avif" alt="diners" />
            <img src="/images/Discover.avif" alt="discovery" />
            <img src="/images/PayPal.avif" alt="paypal" />
          </div>
        </div>
      </div>

      {/* Copyright notice */}
      <p className="text-center p-4 bg-gray-200 text-black">
        &copy; 2025 by TechShed. Powered and Secured by <span className="border-b">Steven Tariah</span>. All
        rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
