import React, { useEffect, useState } from "react";
import api from "../api";

const ApprovedProvidersList = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const { data } = await api.get("/gift-providers/providers/approved");
        setProviders(data);
      } catch (err) {
        setError("Error fetching approved providers");
      } finally {
        setLoading(false);
      }
    };
    fetchProviders();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading approved providers...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <div
      style={{
        backgroundColor: "#f3e8ff", // light yellow
        minHeight: "100vh",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        Approved Gift Providers
      </h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "white",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#9370db", color: "white" }}>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Contact</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((provider, index) => (
            <tr
              key={provider.id}
              style={{
                backgroundColor: index % 2 === 0 ? "#f3e8ff" : "#ffffff",
              }}
            >
              <td style={tdStyle}>{provider.businessName}</td>
              <td style={tdStyle}>{provider.email}</td>
              <td style={tdStyle}>{provider.phoneNumber}</td>
              <td style={tdStyle}>{provider.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Reusable styles
const thStyle = {
  padding: "12px",
  textAlign: "left",
  fontWeight: "bold",
  borderBottom: "2px solid #f57f17",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
  color: "#333",
};

export default ApprovedProvidersList;