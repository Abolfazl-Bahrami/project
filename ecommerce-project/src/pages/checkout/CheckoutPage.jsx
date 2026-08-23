import axios from 'axios';
import { useState, useEffect } from 'react';
import './checkout.css';
import './checkout-header.css';
import { formatMoney } from '../../utils/money';
import CheckoutHeader from './CheckoutHeader';
import OrderSummary from './OrderSummary';
import PaymentSummary from './PaymentSummary';
function CheckoutPage({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [selection, setSelection] = useState({});
  const countitem = cart.reduce((sum, item) => sum + item.quantity, 0)
  const multeplePrice = cart.reduce((sum, item) => sum + (item.product.priceCents * item.quantity), 0);
  const priceSelected = cart.reduce((sum, item) => {
    const selectionOption = deliveryOptions.find((option) => option.id === selection[item.id]);
    return sum + (selectionOption ? selectionOption.priceCents : 0);
  }, 0);
  
  useEffect(() => {
    const fetchDeliveryOption = async () => {
      const response = await axios.get('http://localhost:3000/api/delivery-options?expand=estimatedDeliveryTime');
      setDeliveryOptions(response.data);
    }
    fetchDeliveryOption();
  }, []);

  return (
    <>
      <title>Chockout Page</title>
      <CheckoutHeader countitem={countitem} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} selection={selection} />
          {(countitem > 0) &&
            <>
              <PaymentSummary countitem={countitem} priceSelected={priceSelected} multeplePrice={multeplePrice} />
            </>
          }
        </div>
      </div>
    </>
  )
}

export default CheckoutPage;