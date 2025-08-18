import React from 'react';
import '../App.css';
import { FaGift, FaTruck, FaSmile } from 'react-icons/fa';

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>🎁 Welcome to Smart Gift App</h1>
        <p>Plan and send personalized gifts to your loved ones — fast, easy, and memorable.</p>
        <button className="cta-btn">Get Started</button>
      </div>

      <div className="features">
        <div className="feature-card">
          <FaGift size={40} />
          <h3>Personalized Gifts</h3>
          <p>Choose from a variety of unique gift options.</p>
        </div>
        <div className="feature-card">
          <FaTruck size={40} />
          <h3>Fast Delivery</h3>
          <p>Deliver gifts quickly to any location.</p>
        </div>
        <div className="feature-card">
          <FaSmile size={40} />
          <h3>Make Them Smile</h3>
          <p>Create lasting memories with thoughtful presents.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
