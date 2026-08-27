import { formatMoney } from "../../utils/money";
import dayjs from "dayjs";
import DeliveryOptions from "./DeliveryOptions";
function OrderSummary({ cart , deliveryOptions , selection , setSelection }) {
  return (
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

              <DeliveryOptions deliveryOptions={deliveryOptions} selection={selection} cartitem={cartitem} selectiondelivery={selectiondelivery} />
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default OrderSummary;