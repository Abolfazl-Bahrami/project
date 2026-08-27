import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import './OrdersPage.css';
import OrdersGrid from './OrdersGrid';
function OrdersPage({ cart }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchOrders = async ()=>{
      const response = await axios.get('/api/orders?expand=products');
      setProducts(response.data);
    }
    
    fetchOrders();
  }, []);
  return (
    <>
      <title>Orders</title>
      <Header cart={cart} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <OrdersGrid products={products} />
      </div >
    </>
  )
}

export default OrdersPage;