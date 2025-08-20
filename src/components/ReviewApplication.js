import React, { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import { FaWhatsapp, FaInstagram, FaExternalLinkAlt } from "react-icons/fa";
import "./ReviewApplications.css"; // new css file

// Import local images for card thumbnails
import img1 from "../assets/gift-images/image1.jpeg";
import img2 from "../assets/gift-images/image6.jpg";
import img3 from "../assets/gift-images/image5.jpg";
import img4 from "../assets/gift-images/image4.webp";

const ReviewApplications = () => {
  const [applications, setApplications] = useState([]);
  const [commentMap, setCommentMap] = useState({});

  const images = [img1, img2, img3, img4];

  const fetchApplications = async () => {
    try {
      const { data } = await api.get("/gift-providers");
      // Filter only PENDING applications
      setApplications(data.filter((app) => app.status === "PENDING"));
    } catch {
      toast.error("Error fetching applications");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleDecision = async (id, decision) => {
    const reviewerComments = commentMap[id] || "";
    try {
      await api.put(`/gift-providers/review/${id}`, {
        status: decision,
        reviewerComments,
      });
      toast.success(`Application ${decision.toLowerCase()} successfully.`);
      fetchApplications();
    } catch {
      toast.error("Failed to update application");
    }
  };

  return (
    <div className="review-wrapper">
      <h2 className="review-title">Review Applications</h2>

      <div className="gift-card-grid">
        {applications.length === 0 && (
          <p className="no-apps">No pending applications.</p>
        )}
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
              <p>
                <strong>Contact:</strong> {app.contactPerson}
              </p>
              <p>
                <strong>Email:</strong> {app.email}
              </p>
              <p>
                <strong>Phone:</strong> {app.phoneNumber}
              </p>

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

              <textarea
                placeholder="Add reviewer comments"
                value={commentMap[app.id] || ""}
                onChange={(e) =>
                  setCommentMap({ ...commentMap, [app.id]: e.target.value })
                }
                className="review-textarea"
              />

              <div className="review-buttons">
                <button
                  onClick={() => handleDecision(app.id, "APPROVED")}
                  className="approve-btn"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDecision(app.id, "REJECTED")}
                  className="reject-btn"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewApplications;
