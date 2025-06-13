import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Components/Redux/Store";
import App from "./App";
import Home from "./Components/Home";
import Cart from "./Components/Cart";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import Item from "./Components/Item.jsx";
import Signup from "./Components/Signup";
import ProductDetail from "./Components/ProductDetail";
import StripeCheckoutPage from "./Components/StripeCheckoutPage";
import MultiProductCheckout from "./Components/MultipleStripeCheckout";
import OTP from "./Components/OTP";
import ResetPassword from "./Components/ResetPassword";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<OTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/signup" element={ <Signup/>} />
          <Route path="/" element={<Navigate to="/app/home" />} />
            <Route path="/app" element={<App />}>
            <Route path="item" element={<Item />} />
            <Route path="home" element={<Home />} />
            <Route
              path="contact" element={<Contact />} />
            <Route path="cart"  element={<Cart />} />
            <Route
              path="product/:id" element={<ProductDetail  />} />
            <Route path="about" element={<About />} />
            <Route path="payment/:id" element={<StripeCheckoutPage />} />
            <Route path="add-to-cart-payment" element={<MultiProductCheckout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
