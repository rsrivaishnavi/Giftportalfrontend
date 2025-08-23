import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1️⃣ Send login request
      const response = await axios.post("https://giftportalbackend-fyjm.onrender.com/auth/login", {
        email,
        password,
      });

      // 2️⃣ Store token in localStorage
      localStorage.setItem("token", response.data.accessToken);

      // 3️⃣ Store role if backend sends it directly
      if (response.data.role) {
        localStorage.setItem("role", response.data.role);
      } else {
        // If role not returned, fetch user profile to get it
        const { data: userProfile } = await axios.get(
          "http://localhost:8080/users/profile",
          {
            headers: { Authorization: `Bearer ${response.data.accessToken}` },
          }
        );
        localStorage.setItem("role", userProfile.role);
      }

      navigate("/"); // redirect to home after login
    } catch (err) {
      setError(err.response?.data || "Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-layout">
        <div className="auth-card">
          <h2>Login</h2>
          {error && <p className="auth-error">{error}</p>}
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
          <p className="auth-switch">
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
