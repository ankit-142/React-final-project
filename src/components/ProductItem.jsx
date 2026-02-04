import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <div className="productItem">
      <Link to={`/product/${product.id}`} className="productLink">
        <div className="productImageContainer">
          {!imageLoaded && (
            <div className="imagePlaceholder">
              <div className="imageSpinner"></div>
            </div>
          )}
          <img
            src={imageError ? '/placeholder-image.svg' : product.thumbnail}
            alt={product.title}
            className={`productImage ${imageLoaded ? 'loaded' : ''}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        </div>
        <div className="productInfo">
          <h3 className="productTitle">{product.title}</h3>
          <p className="productPrice">₹{product.price}</p>
          <div className="productRating">
            <span className="rating"><i className="fas fa-star"></i> {product.rating}</span>
          </div>
        </div>
      </Link>
      <button 
        className="addToCartBtn"
        onClick={handleAddToCart}
      >
        <i className="fas fa-cart-plus"></i>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;