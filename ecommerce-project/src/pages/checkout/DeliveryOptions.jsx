import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";
function DeliveryOptions({ deliveryOptions , selection , cartitem }) {
  return (
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
  );
}

export default DeliveryOptions;