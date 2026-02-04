import { Link, useLocation } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="notFound">
      <div className="notFoundContent">
        <div className="errorCode">404</div>
        <h1>Page Not Found</h1>
        <div className="errorDetails">
          <p className="errorMessage">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <div className="errorInfo">
            <p><strong>Requested URL:</strong> {location.pathname}</p>
            <p><strong>Error Code:</strong> 404 - Not Found</p>
            <p><strong>Timestamp:</strong> {new Date().toLocaleString()}</p>
          </div>
        </div>
        
        <div className="notFoundActions">
          <Link to="/" className="homeBtn">
            <i className="fas fa-home"></i>
            Go to Home
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="backBtn"
          >
            <i className="fas fa-arrow-left"></i>
            Go Back
          </button>
        </div>
        
        <div className="helpSection">
          <h3>What can you do?</h3>
          <ul>
            <li>Check the URL for typos</li>
            <li>Go back to the previous page</li>
            <li>Visit our homepage</li>
            <li>Browse our products</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;