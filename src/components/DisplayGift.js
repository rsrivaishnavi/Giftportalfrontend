import React, { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import { FaWhatsapp, FaInstagram, FaExternalLinkAlt } from "react-icons/fa";
import "./DisplayGift.css";

import img1 from "../assets/gift-images/image1.jpeg";
import img2 from "../assets/gift-images/image6.jpg";
import img3 from "../assets/gift-images/image5.jpg";
import img4 from "../assets/gift-images/image4.webp";

const DisplayGift = () => {
  const [applications, setApplications] = useState([]);
  const images = [img1, img2, img3, img4];

  const fetchApplications = async () => {
    try {
      const { data } = await api.get("/gift-providers");
      setApplications(
        data.filter(app => ["APPROVED", "REJECTED", "PENDING"].includes(app.status))
      );
    } catch {
      toast.error("Error fetching applications");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Count applications by status for dashboard
  const statusCount = applications.reduce(
    (acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    },
    { APPROVED: 0, REJECTED: 0, PENDING: 0 }
  );

  return (
    <div className="display-gift-wrapper">
      

      {/* Main Content */}
      <div className="display-gift-container">
        <h2 className="display-gift-title">Applications Dashboard</h2>

        {/* Status Cards - full width */}
        <div className="status-cards">
          <div className="status-card approved">
            <h3>Approved</h3>
            <p>{statusCount.APPROVED}</p>
          </div>
          <div className="status-card pending">
            <h3>Pending</h3>
            <p>{statusCount.PENDING}</p>
          </div>
          <div className="status-card rejected">
            <h3>Rejected</h3>
            <p>{statusCount.REJECTED}</p>
          </div>
        </div>

        {/* Gift Cards - 2 per row */}
        <div className="gift-card-grid">
          {applications.length === 0 && <p className="no-apps">No applications found.</p>}
          {applications.map((app, index) => (
            <div key={app.id} className="gift-card">
              <div className="gift-card-img-wrapper">
                <img
                  src={images[index % images.length]}
                  alt={app.businessName}
                  className="gift-card-img"
                />
              </div>
              <div className="gift-card-content">
                <h3>{app.businessName}</h3>
                <p><strong>Contact:</strong> {app.contactPerson}</p>
                <p><strong>Email:</strong> {app.email}</p>
                <p><strong>Phone:</strong> {app.phoneNumber}</p>

                <div className="gift-card-icons">
                  {app.phoneNumber && (
                    <a
                      href={`https://wa.me/${app.phoneNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="icon whatsapp"
                    >
                      <FaWhatsapp size={20} />
                    </a>
                  )}
                  {app.instagramHandle && (
                    <a
                      href={`https://instagram.com/${app.instagramHandle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="icon instagram"
                    >
                      <FaInstagram size={20} />
                    </a>
                  )}
                  {app.portfolioLink && (
                    <a
                      href={app.portfolioLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="icon portfolio"
                    >
                      <FaExternalLinkAlt size={20} />
                    </a>
                  )}
                </div>

                <p className={`status-label ${app.status.toLowerCase()}`}>{app.status}</p>
                <p><strong>Reviewer Comments:</strong> {app.reviewerComments || "None"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayGift;
