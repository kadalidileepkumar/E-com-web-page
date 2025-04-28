import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { CartItem } from './CartItem';

export const Cart = () => {
  const { cart, totalItems, totalPrice, couponCode, couponDiscount, applyCoupon, cartDiscountTotal } = useCart();
  const [enteredCoupon, setEnteredCoupon] = useState('');

  const handleCouponSubmit = () => {
    applyCoupon(enteredCoupon);
  };

  return (
    <div className="cart">
      <h2>Your Cart ({totalItems} items)</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => {
              const discountAmount = (item.discountPercentage / 100) * item.price * item.quantity;
              const discountedPrice = (item.price * item.quantity) - discountAmount;

              return (
                <CartItem key={item.id} item={item}>
                  <div>
                    <p>Discount Applied: ${discountAmount.toFixed(2)}</p>
                    <p>Discounted Price: ${discountedPrice.toFixed(2)}</p>
                  </div>
                </CartItem>
              );
            })}
          </div>

          <div className="cart-summary">
            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
            <h3>Total Discount from Items: ${cartDiscountTotal.toFixed(2)}</h3>
            <h3>Total After Item Discount: ${(totalPrice - cartDiscountTotal).toFixed(2)}</h3>
          </div>

          <div className="coupon-section">
            <input
              type="text"
              placeholder="Enter Coupon Code"
              value={enteredCoupon}
              onChange={(e) => setEnteredCoupon(e.target.value)}
            />
            <button onClick={handleCouponSubmit}>Apply Coupon</button>
            {couponCode && <p>Coupon Applied: {couponCode} ({couponDiscount}% off)</p>}
          </div>

          <div className="cart-summary">
            <h3>Coupon Discount: ${couponDiscount > 0 ? (totalPrice * couponDiscount / 100).toFixed(2) : 0}</h3>
            <h3>Total After Coupon Discount: ${(totalPrice - cartDiscountTotal - (couponDiscount > 0 ? totalPrice * couponDiscount / 100 : 0)).toFixed(2)}</h3>
          </div>

          <button className="checkout-btn">Proceed to Checkout</button>
        </>
      )}
    </div>
  );
};
