import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import './OrdersPage.css';
import OrdersGrid from './OrdersGrid';
function OrdersPage({ cart }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/api/orders?expand=products').then((response) => {
      setProducts(response.data);
    })
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