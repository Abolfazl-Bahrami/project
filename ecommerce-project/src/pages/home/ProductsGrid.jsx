import axios from 'axios';
import { formatMoney } from '../../utils/money.js';
import { useState } from 'react';
import Product from './Prudoct.jsx';
function ProductsGrid({ products , loadPage }) {
  return (
    <div className="products-grid">
      {products.map((product) => {
        return (
          <Product product={product} loadPage={loadPage} key={product.id} />
        );
      })}
    </div>
  );
}

export default ProductsGrid;