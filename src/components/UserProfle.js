import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserProfile.css";

function UserProfile() {
  const [userData, setUserData] = useState({ name: "", email: "", password: "", role: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("https://giftportalbackend-fyjm.onrender.com/users/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(data);
      } catch {
        alert("User not found");
      } finally {
        
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("https://giftportalbackend-fyjm.onrender.com/users/profile", userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Profile updated successfully!");
    } catch {
      alert("Failed to update profile.");
    }
  };

  if (loading) return <p>Loading user profile...</p>;

  return (
    <div className="page-wrapper">
      <div className="user-profile-container">
        <h2>User Profile</h2>
        <div className="profile-field">
          <label>Name:</label>
          <input type="text" name="name" value={userData.name} onChange={handleChange} />
        </div>
        <div className="profile-field">
          <label>Email:</label>
          <input type="email" name="email" value={userData.email} onChange={handleChange} />
        </div>
        <div className="profile-field">
          <label>Password:</label>
          <input type="password" name="password" value={userData.password} onChange={handleChange} />
        </div>
        <div className="profile-field">
          <label>Role:</label>
          <input type="text" name="role" value={userData.role} onChange={handleChange} />
        </div>
        <button className="update-button" onClick={handleUpdate}>Update Profile</button>
      </div>
    </div>
  );
}

export default UserProfile;
