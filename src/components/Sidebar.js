// src/components/Sidebar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Gift App</h2>
      </div>
      <ul>

        {role === "USER" && <li><Link to="/apply">Apply</Link></li>}
        {role === "USER" && <li><Link to="/track-status">Track Status</Link></li>}

        {role === "ADMIN" && <li><Link to="/review-application">Review Applications</Link></li>}
        {role === "ADMIN" && <li><Link to="/approved-providers">Approved Providers</Link></li>}


         <li><Link to="/profile">UserProfie</Link></li>

        <li><Link to="/getAllGifts">Gifts</Link></li>
      </ul>
        <div style={{marginTop:"200%"}} >
        {token && <button className="logout"  onClick={handleLogout}>Logout</button>}
        </div>
    </div>
  );
}

export default Sidebar;
