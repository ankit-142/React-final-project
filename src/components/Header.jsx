import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery } from '../store/searchSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { totalQuantity } = useSelector(state => state.cart);
  const { query } = useSelector(state => state.search);

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <header className="header">
      <div className="headerContainer">
        <Link to="/" className="logo">
          <h1><i className="fas fa-shopping-bag"></i> ShoppyGlobe</h1>
        </Link>
        
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={handleSearchChange}
            className="searchInput"
          />
        </div>

        <nav className="nav">
          <Link to="/" className="navLink">
            <i className="fas fa-home"></i>
            Home
          </Link>
          <Link to="/cart" className="navLink cartLink">
            <i className="fas fa-shopping-cart"></i>
            Cart
            {totalQuantity > 0 && (
              <span className="cartBadge">{totalQuantity}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;