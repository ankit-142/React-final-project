import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  if (loading) {
    return (
      <div className="loadingContainer">
        <div className="spinner"></div>
        <p>Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="errorContainer">
        <h2>Error Loading Product</h2>
        <p>{error}</p>
        <Link to="/" className="backLink">Back to Home</Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="errorContainer">
        <h2>Product Not Found</h2>
        <Link to="/" className="backLink">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="productDetail">
      <Link to="/" className="backLink"><i className="fas fa-arrow-left"></i> Back to Products</Link>
      
      <div className="productDetailContent">
        <div className="productImages">
          <img
            src={product.images?.[selectedImage] || product.thumbnail}
            alt={product.title}
            className="mainImage"
          />
          {product.images && product.images.length > 1 && (
            <div className="imageThumbnails">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="productInfo">
          <h1>{product.title}</h1>
          <p className="productBrand">{product.brand}</p>
          <div className="productRating">
            <span className="rating"><i className="fas fa-star"></i> {product.rating}</span>
            <span className="stock"><i className="fas fa-box"></i> Stock: {product.stock}</span>
          </div>
          <p className="productPrice">₹{product.price}</p>
          <p className="productDescription">{product.description}</p>
          
          <div className="productActions">
            <button 
              className="addToCartBtn large"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <i className="fas fa-cart-plus"></i>
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;