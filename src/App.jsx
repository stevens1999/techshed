import Navbar from "./component/Navbar";
import Home from "./component/pages/Home";
import About from "./component/pages/About";
import Contact from "./component/pages/Contact";
import HelpCenter from "./component/pages/HelpCenter";
import ShopAll from "./component/Product-Pages/ShopAll";
import Computer from "./component/Product-Pages/Computer";
import Audio from "./component/Product-Pages/Audio";
import Drones from "./component/Product-Pages/Drones";
import Headphones from "./component/Product-Pages/Headphones";
import Mobile from "./component/Product-Pages/Mobile";
import OnSale from "./component/Product-Pages/OnSale";
import Speakers from "./component/Product-Pages/Speakers";
import Tablets from "./component/Product-Pages/Tablets";
import WearableTech from "./component/Product-Pages/WearableTech";
import HomeCinema from "./component/Product-Pages/HomeCinema";
import Login from "./component/pages/Login";
import SignUp from "./component/pages/SignUp";
import { Route, Routes } from "react-router-dom";
import Scroll from "./component/Scroll";
import HelpCenterCTA from "./component/HelpCenterCTA";
import { CartProvider } from "./component/CartContext";
import Footer from "./component/Footer";
import { FavoritesProvider } from "./component/FavoritesContext";
import { AuthProvider } from "./component/AuthContext";
import CareerPage from "./component/pages/CareerPage";
import ScrollToTop from "./component/ScrollToTop";
import ProductDetail from "./component/pages/ProductDetail";
import ShopByCategory from "./component/pages/Categories";
import ShippingReturns from "./component/pages/ShippingReturns";
import TermsAndConditions from "./component/pages/TermsAndConditions";
import PaymentMethods from "./component/pages/PaymentMethods";
import FAQ from "./component/pages/FAQ";
import Profile from "./component/pages/Profile";
import Checkout from "./component/pages/Checkout";
import ShippingForm from "./component/pages/ShippingFrom";
import PaymentPage from "./component/pages/PaymentPage";
import Ordersummary from "./component/pages/Ordersummary";

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
          <FavoritesProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/About" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/HelpCenter" element={<HelpCenter />} />
              <Route path="/ShopAll" element={<ShopAll />} />
              <Route path="/Computer" element={<Computer />} />
              <Route path="/Audio" element={<Audio />} />
              <Route path="/Drones" element={<Drones />} />
              <Route path="/Headphones" element={<Headphones />} />
              <Route path="/Mobile" element={<Mobile />} />
              <Route path="/OnSale" element={<OnSale />} />
              <Route path="/Speakers" element={<Speakers />} />
              <Route path="/Tablets" element={<Tablets />} />
              <Route path="/WearableTech" element={<WearableTech />} />
              <Route path="/HomeCinema" element={<HomeCinema />} />
              <Route path="/Career" element={<CareerPage />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/categories" element={<ShopByCategory />} />
              <Route path="/ShippingReturns" element={<ShippingReturns />} />
              <Route
                path="/TermsAndConditions"
                element={<TermsAndConditions />}
              />
              <Route path="/PaymentMethods" element={<PaymentMethods />} />
              <Route path="/FAQ" element={<FAQ />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Checkout" element={<Checkout />} />
              <Route path="/ShippingForm" element={<ShippingForm />} />
              <Route path="/Ordersummary" element={<Ordersummary />} />
              <Route path="/PaymentPage" element={<PaymentPage />} />
            </Routes>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
      <Scroll />
      <HelpCenterCTA />
      <Footer />
    </>
  );
}

export default App;
