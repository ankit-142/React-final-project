import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  return (
    <div className="cartItem">
      <img src={item.image} alt={item.title} className="cartItemImage" />
      <div className="cartItemDetails">
        <h3 className="cartItemTitle">{item.title}</h3>
        <p className="cartItemPrice">₹{item.price}</p>
      </div>
      <div className="cartItemControls">
        <div className="quantityControls">
          <button 
            className="quantityBtn"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <i className="fas fa-minus"></i>
          </button>
          <span className="quantity">{item.quantity}</span>
          <button 
            className="quantityBtn"
            onClick={() => handleQuantityChange(item.quantity + 1)}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <p className="itemTotal">₹{item.totalPrice.toFixed(2)}</p>
        <button className="removeBtn" onClick={handleRemove}>
          <i className="fas fa-trash"></i>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;