
import { formatMoney } from "../../utils/money";
function PaymentSummary({ countitem , priceSelected , multeplePrice }) {
  return (
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
  );
}

export default PaymentSummary;