import ProductList from '../components/ProductList';

const Home = () => {
  return (
    <div className="home">
      <div className="heroSection">
        <h1><i className="fas fa-globe"></i> Welcome to ShoppyGlobe</h1>
        <p>Discover premium products with unbeatable prices and quality</p>
      </div>
      <ProductList />
    </div>
  );
};

export default Home;