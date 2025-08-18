import React, { useState } from 'react';
import axios from 'axios';

function TrackApplicationStatus() {
  const [application, setApplication] = useState(null);
  const [error, setError] = useState('');

  const handleCheckStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8080/gift-providers/giftprovider/track', {
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
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Track Your Application Status</h2>
      <button onClick={handleCheckStatus}>Check My Status</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {application && (
        <div style={{ marginTop: '20px' }}>
          <h3>Application Details</h3>
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Business Name</th>
                <th>Contact Person</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{application.businessName}</td>
                <td>{application.contactPerson}</td>
                <td>{application.email}</td>
                <td>{application.phoneNumber}</td>
                <td><strong>{application.status}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TrackApplicationStatus;
