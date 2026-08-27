import HomePage from "./pages/home/HomePage.jsx";
import CheckoutPage from "./pages/checkout/CheckoutPage.jsx";
import OrdersPage from "./pages/orders/OrdersPage.jsx";
import TrackingPage from "./pages/TrackingPage.jsx";
import { Routes, Route, resolvePath } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const loadPage = async () => {
    const response = await axios.get('http://localhost:3000/api/cart-items?expand=product');
    setCart(response.data);
  }
  const [cart, setCart] = useState([]);
  useEffect(() => {
    loadPage();
  }, []);
  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadPage={loadPage} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="orders" element={<OrdersPage cart={cart} />} />
      <Route path="tracking" element={<TrackingPage />} />
    </Routes>
  )
}

export default App;
