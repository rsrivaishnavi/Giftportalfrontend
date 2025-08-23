import React, { useState } from 'react';
import axios from 'axios';

function TrackApplicationStatus() {
  const [application, setApplication] = useState(null);
  const [error, setError] = useState('');

  const handleCheckStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://giftportalbackend-fyjm.onrender.com/giftprovider/track', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplication(res.data);
      setError('');
    } catch (err) {
      setApplication(null);
      setError('Application not found.');
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "40px",
      fontFamily: "Segoe UI, sans-serif",
      background: "#f3e8ff"  // light violet background
    }}>
      <h2 style={{ color: "#333", marginBottom: "20px" }}>📌 Track Your Application Status</h2>

      <button 
        onClick={handleCheckStatus} 
        style={{
          padding: "10px 20px",
          background: "#9370db",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
          transition: "0.3s"
        }}
        onMouseOver={(e) => e.target.style.background = "#9370db"}
        onMouseOut={(e) => e.target.style.background = "#9370db"}
      >
        Check My Status
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "20px", fontWeight: "bold" }}>
          {error}
        </p>
      )}

      {application && (
        <div style={{
          marginTop: "30px",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          padding: "20px",
          width: "80%",
          maxWidth: "700px"
        }}>
          <h3 style={{ marginBottom: "15px", color: "#4a4a4a" }}>Application Details</h3>
          
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left"
          }}>
            <thead>
              <tr style={{ background: "#f0f4f8" }}>
                <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Business Name</th>
                <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Contact Person</th>
                <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Email</th>
                <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Phone Number</th>
                <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ background: "#fff" }}>
                <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>{application.businessName}</td>
                <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>{application.contactPerson}</td>
                <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>{application.email}</td>
                <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>{application.phoneNumber}</td>
                <td style={{ 
                  padding: "12px", 
                  borderBottom: "1px solid #eee", 
                  fontWeight: "bold", 
                  color: application.status === "Approved" ? "green" : application.status === "Pending" ? "orange" : "red" 
                }}>
                  {application.status}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TrackApplicationStatus;
