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
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/Menu"
                    className={`nav-link mx-lg-2${location.pathname === '/Menu' ? ' active' : ''}`}
                  >
                    Menu
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/Cart"
                    className={`nav-link mx-lg-2${location.pathname === '/Cart' ? ' active' : ''}`}
                  >
                    🛒 Cart ({cartItems.length})
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/About"
                    className={`nav-link mx-lg-2${location.pathname === '/About' ? ' active' : ''}`}
                  >
                    About us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/Contact"
                    className={`nav-link mx-lg-2${location.pathname === '/Contact' ? ' active' : ''}`}
                  >
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Show user name and logout if logged in, otherwise show login button */}
          {isAuthenticated ? (
            <div className="d-flex align-items-center">
              <span className="user-name me-3">Welcome, {user.name}</span>
              <button onClick={logout} className="login-button">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="login-button">Login</Link>
          )}

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
