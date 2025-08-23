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
    businessDetails: '',   // ✅ NEW
    portfolioLink: ''      // ✅ NEW
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // JWT from storage (if required)
      const response = await axios.post(
        'https://giftportalbackend-fyjm.onrender.com/gift-providers/giftprovider/apply',
        formData,
        {
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
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
        businessDetails: '',
        portfolioLink: ''
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      const msg =
        error?.response?.data
          ? String(error.response.data)
          : 'Failed to submit application. Please try again.';
      alert(msg);
    }
  };

  return (
    <div className="apply-form">
      <div className="apply-card">
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
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />

          <input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number (10–20 digits)"
            required
          />

          <textarea
            name="businessDetails"
            value={formData.businessDetails}
            onChange={handleChange}
            placeholder="Describe your business (services, experience, specialties, etc.)"
            rows={5}
            required
          />

          <input
            type="url"
            name="portfolioLink"
            value={formData.portfolioLink}
            onChange={handleChange}
            placeholder="Portfolio link (website, Google Drive, Instagram, etc.)"
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );

}

export default ApplyForm;
