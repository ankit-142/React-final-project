import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { items, totalAmount, totalQuantity } = useSelector(state => state.cart);

  if (items.length === 0) {
    return (
      <div className="cartEmpty">
        <i className="fas fa-shopping-cart" style={{fontSize: '4rem', marginBottom: '2rem', opacity: 0.3}}></i>
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added any items to your cart yet.</p>
        <p>Start shopping to fill it up!</p>
        <Link to="/" className="continueShoppingBtn">
          <i className="fas fa-arrow-left"></i>
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Shopping Cart ({totalQuantity} items)</h2>
      
      <div className="cartContent">
        <div className="cartItems">
          {items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        
        <div className="cartSummary">
          <h3>Order Summary</h3>
          <div className="summaryRow">
            <span>Subtotal ({totalQuantity} items):</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
          <div className="summaryRow">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="summaryRow total">
            <span>Total:</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
          
          <div className="cartActions">
            <Link to="/checkout" className="checkoutBtn">
              <i className="fas fa-credit-card"></i>
              Proceed to Checkout
            </Link>
            <Link to="/" className="continueShoppingLink">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;