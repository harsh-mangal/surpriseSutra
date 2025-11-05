import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
import Footer from "./components/Footer";
import AboutUs from "./pages/About";
import ThemedPartySupplies from "./services/ThemedParty";
import CustomizedPartySupplies from "./services/Customized";
import Gifts from "./pages/Gifts";
import ContactUs from "./pages/ContactUs";
import ProductList from "./pages/Products";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckOut";
import { LogIn } from "lucide-react";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/Profile";
import MyOrdersPage from "./pages/MyOrders";
import ScrollToTop from "./components/ScrollToTop";
import ProductDetails from "./pages/ProductDetails";
import RegisterForm from "./pages/Register";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import RefundPolicy from "./pages/RefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import Faqs from "./pages/Faqs";

function Layout() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 bg-gray-100">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsConditions />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/faqs" element={<Faqs />} />;
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/gifts" element={<Gifts />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/my-orders" element={<MyOrdersPage />} />
            <Route path="/productdetails/:id" element={<ProductDetails />} />
            <Route path="/diy-kits" element={<ProductList />} />
            <Route
              path="/party-supplies/themed"
              element={<ThemedPartySupplies />}
            />
            <Route
              path="/party-supplies/customized"
              element={<CustomizedPartySupplies />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default Layout;
