import { Link } from 'react-router-dom';
<<<<<<< HEAD
// import { useState } from 'react';

function NavBar() {
  // const [isOpen,setIsOpen] = useState(true)
  return (
    <div className="navbar-container">
      <div className="top-navbar-container">
        <p>Ogmento</p>
      </div>
      <div className="left-navbar-container">
        <div className="navbar-links-container">
          <Link to="/home">Home</Link>

          <Link to="/pm">Product Management</Link>

          <Link to="/sales">Sales Management </Link>

          <Link to="/catalogue">Catalogue Management</Link>

          <Link to="/kiosk">Kiosk Management</Link>

          <Link to="/order">Order Management</Link>

          <Link to="/signage">Signage Management</Link>

          <Link to="/admin">Administration</Link>
        </div>
      </div>
=======

function NavBar() {
  return (
    <div>
      <Link to="/home">Home</Link>
>>>>>>> check1
    </div>
  );
}
export default NavBar;
