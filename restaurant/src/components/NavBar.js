import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../styles/NavBar.css';

import { Link, useLocation } from 'react-router-dom';


const Navbar = () => {
  const location = useLocation();

  return (
    <nav>
      <div className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <a className="navbar-brand me-auto" href="#">
            Chez Roy
          </a>
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
                    Cart
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
          <a href="#" className="login-button"> Login </a>
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
