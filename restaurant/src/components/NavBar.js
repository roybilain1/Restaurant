import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../styles/NavBar.css';

import { Link, useLocation } from 'react-router-dom';

import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";



const Navbar = () => {
  const location = useLocation();

  const { cartItems } = useContext(CartContext);
  const { user, logout, isAuthenticated } = useContext(UserContext);

  // Function to close the offcanvas menu after a short delay to allow navigation
  const handleNavClick = () => {
    // Small delay to ensure navigation happens first
    setTimeout(() => {
      const offcanvasElement = document.getElementById('offcanvasNavbar');
      if (offcanvasElement && window.bootstrap && window.bootstrap.Offcanvas) {
        const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasElement);
        if (bsOffcanvas) {
          bsOffcanvas.hide();
        }
      }
    }, 150);
  };

  return (
    <nav>
      <div className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand me-auto">
            Chez Roy
          </Link>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Chez Roy
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link
                    to="/"
                    className={`nav-link mx-lg-2${location.pathname === '/' ? ' active' : ''}`}
                    onClick={handleNavClick}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/Menu"
                    className={`nav-link mx-lg-2${location.pathname === '/Menu' ? ' active' : ''}`}
                    onClick={handleNavClick}
                  >
                    Menu
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/Cart"
                    className={`nav-link mx-lg-2${location.pathname === '/Cart' ? ' active' : ''}`}
                    onClick={handleNavClick}
                  >
                    🛒 Cart ({cartItems.length})
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/About"
                    className={`nav-link mx-lg-2${location.pathname === '/About' ? ' active' : ''}`}
                    onClick={handleNavClick}
                  >
                    About us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/Contact"
                    className={`nav-link mx-lg-2${location.pathname === '/Contact' ? ' active' : ''}`}
                    onClick={handleNavClick}
                  >
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Show user name and logout if logged in, otherwise show login button */}
          <div className="user-section">
            {isAuthenticated ? (
              <div className="d-flex align-items-center">
                <div className="user-avatar me-2">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="user-name me-2">Welcome, {user.name}</span>
                <button onClick={logout} className="login-button">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="login-button">Login</Link>
            )}
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
