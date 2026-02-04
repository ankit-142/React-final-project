import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../store/cartSlice';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalAmount } = useSelector(state => state.cart);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
  });
  
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    
    // Clear cart and redirect after 3 seconds
    setTimeout(() => {
      dispatch(clearCart());
      navigate('/');
    }, 3000);
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="checkoutEmpty">
        <i className="fas fa-exclamation-triangle" style={{fontSize: '3rem', marginBottom: '1rem', color: '#ffc107'}}></i>
        <h2>No items in cart</h2>
        <p>Add some products before checkout</p>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="orderSuccess">
        <div className="successMessage">
          <h2><i className="fas fa-check-circle"></i> Order Placed Successfully!</h2>
          <p>Thank you for your purchase. You will be redirected to the home page shortly.</p>
          <div className="successSpinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      
      <div className="checkoutContent">
        <div className="checkoutForm">
          <h3>Shipping Information</h3>
          <form onSubmit={handleSubmit}>
            <div className="formRow">
              <div className="formGroup">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="formGroup">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="formGroup">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="formGroup">
              <label htmlFor="phone">Phone *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="formGroup">
              <label htmlFor="address">Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="formRow">
              <div className="formGroup">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="formGroup">
                <label htmlFor="zipCode">ZIP Code *</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="formGroup">
              <label htmlFor="country">Country *</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <button type="submit" className="placeOrderBtn">
              <i className="fas fa-credit-card"></i>
              Place Order
            </button>
          </form>
        </div>
        
        <div className="orderSummary">
          <h3>Order Summary</h3>
          <div className="orderItems">
            {items.map(item => (
              <div key={item.id} className="orderItem">
                <img src={item.image} alt={item.title} />
                <div className="itemDetails">
                  <p className="itemName">{item.title}</p>
                  <p className="itemQuantity">Qty: {item.quantity}</p>
                  <p className="itemPrice">₹{item.totalPrice.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="orderTotal">
            <div className="totalRow">
              <span>Subtotal:</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
            <div className="totalRow">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="totalRow finalTotal">
              <span>Total:</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;