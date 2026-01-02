import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Footer from './components/Footer'
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './components/login';
import OrderTracking from './pages/OrderTracking';
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";

import { ToastContainer } from 'react-toastify'; //for notifications
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="app-container">
      <UserProvider>
        <CartProvider>
          <Router>
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Menu" element={<Menu />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/About" element={<About />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/order-tracking" element={<OrderTracking />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </CartProvider>
    </UserProvider>
    <ToastContainer position="top-right" autoClose={2000} /> {/* Toast container for notifications. 2 seconds and it closes */}
  </div>
);
}

export default App;
