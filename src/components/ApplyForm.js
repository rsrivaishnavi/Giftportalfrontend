import React, { useState } from 'react';
import './ApplyForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ApplyForm() {
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phoneNumber: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Get JWT from storage
      const response = await axios.post(
        'http://localhost:8080/gift-providers/giftprovider/apply',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Submitted:', response.data);
      alert('Application submitted successfully!');
      setFormData({
        businessName: '',
        contactPerson: '',
        email: '',
        phoneNumber: '',
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    }
  };

  return (
    <div className="apply-form">
      <button onClick={() => navigate(-1)} className="back-button">← Back</button>
      <h2>Apply to Become a Gift Provider</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
          placeholder="Business Name"
          required
        />
        <input
          name="contactPerson"
          value={formData.contactPerson}
          onChange={handleChange}
          placeholder="Contact Person"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number (e.g., +911234567890)"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ApplyForm;
