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

  if (loading) return <p>Loading approved providers...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Approved Gift Providers</h2>
      <table style={{ border: "1px solid black", width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((provider) => (
            <tr key={provider.id}>
              <td>{provider.businessName}</td>
              <td>{provider.email}</td>
              <td>{provider.phoneNumber}</td>
              <td>{provider.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovedProvidersList;
