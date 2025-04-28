import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart, updateQuantity, getQuantity } = useCart();
  const currentQuantity = getQuantity(product.id);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    if (currentQuantity === 0) {
      addToCart(product, newQuantity);
    } else {
      updateQuantity(product.id, newQuantity);
    }
  };

  const discount = product.discountPercentage || 0;
  const discountedPrice = (product.price * (1 - discount / 100)).toFixed(2);

  return (
    <div className="product-card">
      <img 
        src={product.thumbnail} 
        alt={product.title}
        onClick={() => navigate(`/product/${product.id}`)}
        style={{ cursor: 'pointer' }}
      />
      <h3>{product.title}</h3>
      
      <div className="pricing">
        <span style={{ textDecoration: 'line-through', marginRight: '8px' }}>
          ${product.price.toFixed(2)}
        </span>
        {discount > 0 && (
          <span style={{ color: 'red' }}>
            ${discountedPrice} (Discount: {discount}% OFF)
          </span>
        )}
      </div>
      
      <div className="quantity-controls">
        <button onClick={() => handleQuantityChange(currentQuantity - 1)}>-</button>
        <span>{currentQuantity || 0}</span>
        <button onClick={() => handleQuantityChange(currentQuantity + 1)}>+</button>
      </div>
      
      <div className="product-card-buttons">
        <button 
          onClick={() => {
            if (currentQuantity === 0) {
              addToCart(product, 1);
            }
          }}
          disabled={currentQuantity > 0}
        >
          {currentQuantity > 0 ? 'In Cart' : 'Add to Cart'}
        </button>

        <button 
          onClick={() => navigate(`/product/${product.id}`)}
          style={{ marginLeft: '8px' }}
        >
          View
        </button>
      </div>
    </div>
  );
}
