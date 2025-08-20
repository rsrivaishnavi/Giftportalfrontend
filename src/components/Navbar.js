import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // ADMIN / USER

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 onClick={() => navigate("/")}>Gift Application</h2>
      <ul>
        <li><Link to="/">Home</Link></li>

        {/* User-specific links */}
        {role === "USER" && <li><Link to="/apply">Apply</Link></li>}
        {role === "USER" && <li><Link to="/track-status">Track Application</Link></li>}

        {/* Admin-specific links */}
        {role === "ADMIN" && <li><Link to="/review-application">Review Applications</Link></li>}
        {role === "ADMIN" && <li><Link to="/approved-providers">Approved Providers</Link></li>}

        {/* Common link */}
        <li><Link to="/getAllGifts">Gifts</Link></li>

        {/* Auth Links */}
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
