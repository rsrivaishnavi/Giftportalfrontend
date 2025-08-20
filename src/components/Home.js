import React from 'react';
import '../App.css';
import { FaGift, FaTruck, FaSmile } from 'react-icons/fa';

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Smart Gift Application</h1>
        <p>
          A trusted platform where <strong>gift providers</strong> can apply to
          become partners, and shop owners manage approvals seamlessly.
        </p>
      </div>
      <div className="flex justify-center gap-6 flex-wrap px-4 py-6">
        <img 
          src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?fm=jpg&q=40&w=300&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2lmdHxlbnwwfHwwfHx8MA%3D%3D" 
          alt="Gift" 
          className="w-72 h-48 object-cover rounded-xl shadow-lg"
        />
      
      </div>
      <div style={{marginTop:"2%"}}></div>
      <div className="features">
        <div className="feature-card">
          <FaGift size={35} className="feature-icon" />
          <h3>Apply as a Provider</h3>
          <p>Join the platform and showcase your gift collections.</p>
        </div>
        <div className="feature-card">
          <FaTruck size={35} className="feature-icon" />
          <h3>Approval System</h3>
          <p>Shop owners review and approve providers with ease.</p>
        </div>
        <div className="feature-card">
          <FaSmile size={35} className="feature-icon" />
          <h3>Delight Customers</h3>
          <p>Deliver thoughtful, quality gifts that create memories.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
