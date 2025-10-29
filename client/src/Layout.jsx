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


function Layout() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 bg-gray-100">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/gifts" element={<Gifts />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            <Route path="/party-supplies/themed" element={<ThemedPartySupplies />} />
             <Route path="/party-supplies/customized" element={<CustomizedPartySupplies />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default Layout;
