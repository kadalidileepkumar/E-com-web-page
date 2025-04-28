import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');

  const handleApplyCoupon = () => {
    const validCoupons = {
      'DISCOUNT10': 10,
      'DISCOUNT20': 20,
      'DD123':50,
    };

    if (validCoupons[coupon.toUpperCase()]) {
      setDiscount(validCoupons[coupon.toUpperCase()]);
      setError('');
    } else {
      setError('Invalid coupon code');
    }
  };

  const totalAfterDiscount = cartTotal - (cartTotal * discount / 100);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map(item => {
            const discountedPrice = (item.price * (1 - (item.discountPercentage || 0) / 100)).toFixed(2);
            return (
              <div key={item.id} className="cart-item">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  style={{ width: '50px', height: '50px' }}
                />
                <div>
                  <p>{item.title}</p>
                  <p>
                    <span style={{ textDecoration: 'line-through', marginRight: '8px' }}>
                      ${item.price.toFixed(2)}
                    </span>
                    <span style={{ color: 'red' }}>Discount: {item.discountPercentage}% OFF</span>
                  </p>
                  <p>Discounted Price: ${discountedPrice}</p>
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            );
          })}
          <div className="cart-total">
            <h3>Total: ${cartTotal.toFixed(2)}</h3>
            {discount > 0 && (
              <>
                <p>Discount Applied: {discount}%</p>
                <h3>Discounted Total: ${totalAfterDiscount.toFixed(2)}</h3>
              </>
            )}
          </div>
        </div>
      )}

      <div className="coupon-container">
        <input
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Enter coupon code"
        />
        <button onClick={handleApplyCoupon}>Apply Coupon</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
}
