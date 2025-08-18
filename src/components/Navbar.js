import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>Gift Application</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        {token && <li><Link to="/apply">Apply</Link></li>}
        <li><Link to="/getAllGifts">Gifts</Link></li>
        {token && <li><Link to="/track-status">Track Application</Link></li>}
        {token && <li><Link to="/approved-providers">Approved Providers</Link></li>}
        {token ? (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
