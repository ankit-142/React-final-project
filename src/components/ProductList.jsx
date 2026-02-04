import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useProducts } from '../hooks/useProducts';
import ProductItem from './ProductItem';

const ProductList = () => {
  const { products, loading, error } = useProducts();
  const { query } = useSelector(state => state.search);

  const filteredProducts = useMemo(() => {
    if (!query) return products;
    return products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
  }, [products, query]);

  if (loading) {
    return (
      <div className="loadingContainer">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="errorContainer">
        <h2>Error Loading Products</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="productList">
      <h2><i className="fas fa-store"></i> Featured Products {query && `(${filteredProducts.length} results for "${query}")`}</h2>
      <div className="productsGrid">
        {filteredProducts.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      {filteredProducts.length === 0 && query && (
        <div className="noResults">
          <i className="fas fa-search" style={{fontSize: '3rem', marginBottom: '1rem', opacity: 0.5}}></i>
          <p>No products found for "{query}"</p>
          <p>Try searching with different keywords</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;