import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { useCart } from "../context/CartContext";
export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart, updateQuantity, getQuantity } = useCart();
    const currentQuantity = getQuantity(id);
  
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`https://dummyjson.com/products/${id}`);
          const data = await response.json();
          setProduct(data);
        } catch (error) {
          console.error('Error fetching product:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }, [id]);
  
    const handleQuantityChange = (newQuantity) => {
      if (newQuantity < 1) return;
      if (currentQuantity === 0) {
        addToCart(product, newQuantity);
      } else {
        updateQuantity(id, newQuantity);
      }
    };
  
    if (loading) return <div>Loading...</div>;
    if (!product) return <div>Product not found</div>;
  
    const discount = product.discountPercentage || 0;
    const discountedPrice = (product.price * (1 - discount / 100)).toFixed(2);
  
    return (
      <div className="product-detail">
        <img src={product.thumbnail} alt={product.title} />
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>
          <span style={{ textDecoration: 'line-through', marginRight: '8px' }}>
            ${product.price.toFixed(2)}
          </span>
          <span style={{ color: 'red' }}>Discount: {discount}% OFF</span>
        </p>
        <p>Discounted Price: ${discountedPrice}</p>
      </div>
    );
  }
  