import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-custom mt-5">
      <div className="container-fluid py-4 d-flex flex-column flex-lg-row align-items-center justify-content-between">
        <div className="d-flex align-items-center mb-3 mb-lg-0">
          <Link to="/" className="navbar-brand me-auto">
            Chez Roy
          </Link>
        </div>
        <div className="d-flex align-items-center mb-3 mb-lg-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mx-2 text-decoration-none text-dark">
            <i className="bi bi-facebook fs-3"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mx-2 text-decoration-none text-dark">
            <i className="bi bi-instagram fs-3"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="mx-2 text-decoration-none text-dark">
            <i className="bi bi-twitter fs-3"></i>
          </a>
          <span className="footer-phone ms-3">
            <i className="bi bi-telephone"></i> +961 71237881
          </span>
        </div>
        <span className="navbar-text ms-lg-3 text-muted">
          &copy; {new Date().getFullYear()} Chez Roy. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;