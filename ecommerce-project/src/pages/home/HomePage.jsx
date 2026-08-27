import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from '../../components/Header.jsx';
import './HomePage.css';
import ProductsGrid from './ProductsGrid.jsx';

function HomePage({ cart , loadPage }) {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const fatchProducts = async () => {
      const response = await axios.get('/api/products')
      setProducts(response.data);
    };

    fatchProducts();
  }, [])

  return (
    <>
      <title>Ecommerce Project</title>
      <Header cart={cart} />
      <div className="home-page">
        <ProductsGrid products={products} loadPage={loadPage} />
      </div>
    </>
  )
}

export default HomePage;