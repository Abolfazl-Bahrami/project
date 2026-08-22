import axios from 'axios';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import './checkout.css';
import './checkout-header.css';
import { formatMoney } from '../utils/money.js';

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
    axios.get('http://localhost:3000/api/delivery-options?expand=estimatedDeliveryTime').then((response) => {
      setDeliveryOptions(response.data);
    })
  }, []);

  return (
    <>
      <title>Chockout Page</title>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <a href="/">
              <img className="logo" src="images/logo.png" />
              <img className="mobile-logo" src="images/mobile-logo.png" />
            </a>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (<a className="return-to-home-link"
              href="/">{countitem} items</a>)
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {cart.map((cartitem) => {
              const selectiondelivery = (productId, optionId) => {
                setSelection((prev) => ({
                  ...prev,
                  [productId]: optionId
                }))
              }
              const selectdDeliveryOption = deliveryOptions.find((deliveryOption) => {
                return deliveryOption.id === selection[cartitem.id];
              });
              return (
                <div key={cartitem.productId} className="cart-item-container">
                  <div className="delivery-date">
                    {selectdDeliveryOption && `Delivery date : ${dayjs(selectdDeliveryOption.estimatedDeliveryTimeMs).format('dddd , MMMM D')}`}
                  </div>

                  <div className="cart-item-details-grid">
                    <img className="product-image"
                      src={cartitem.product.image} />

                    <div className="cart-item-details">
                      <div className="product-name">
                        {cartitem.product.name}
                      </div>
                      <div className="product-price">
                        {formatMoney(cartitem.product.priceCents)}
                      </div>
                      <div className="product-quantity">
                        <span>
                          Quantity: <span className="quantity-label">{cartitem.quantity}</span>
                        </span>
                        <span className="update-quantity-link link-primary">
                          Update
                        </span>
                        <span className="delete-quantity-link link-primary">
                          Delete
                        </span>
                      </div>
                    </div>

                    <div className="delivery-options">
                      <div className="delivery-options-title">
                        Choose a delivery option:
                      </div>
                      {deliveryOptions.map((deliveryOption) => {
                        let priceString = ((deliveryOption.priceCents === 0) ? 'FREE Shipping' : `${formatMoney(deliveryOption.priceCents)} - Shipping`);
                        return (
                          <div key={deliveryOption.id} className="delivery-option">
                            <input type="radio"
                              checked={selection[cartitem.id] === deliveryOption.id}
                              onChange={() => selectiondelivery(cartitem.id, deliveryOption.id)}
                              className="delivery-option-input"
                              name={`delivery-option-${cartitem.productId}`} />
                            <div>
                              <div className="delivery-option-date">
                                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                              </div>
                              <div className="delivery-option-price">
                                {priceString}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          {(countitem > 0) &&
            <>
              <div className="payment-summary">
                <div className="payment-summary-title">
                  Payment Summary
                </div>

                <div className="payment-summary-row">
                  <div>Items ({countitem}):</div>
                  <div className="payment-summary-money">{formatMoney(multeplePrice)}</div>
                </div>

                <div className="payment-summary-row">
                  <div>Shipping &amp; handling:</div>
                  <div className="payment-summary-money">{formatMoney(priceSelected)}</div>
                </div>

                <div className="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div className="payment-summary-money">{formatMoney(priceSelected + multeplePrice)}</div>
                </div>

                <div className="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div className="payment-summary-money">{formatMoney((priceSelected + multeplePrice) / 10)}</div>
                </div>

                <div className="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div className="payment-summary-money">{formatMoney(((priceSelected + multeplePrice) / 10) + priceSelected + multeplePrice)}</div>
                </div>

                <button className="place-order-button button-primary">
                  Place your order
                </button>
              </div>
            </>
          }
        </div>
      </div>
    </>
  )
}

export default CheckoutPage;