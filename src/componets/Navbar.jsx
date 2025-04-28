import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cartCount } = useCart(); // Get cartCount from CartContext

  return (
    <nav style={{ display: 'flex', gap: '20px', padding: '10px' }}>
      <Link to="/">Home</Link>
      <Link to="/cart">
        Cart ({cartCount} {cartCount === 0 ? 'item' : 'items'})
      </Link>
    </nav>
  );
}
