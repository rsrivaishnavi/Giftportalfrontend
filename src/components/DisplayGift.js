import React, { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import "./DisplayGift.css";

const DisplayGift = () => {
  const [applications, setApplications] = useState([]);
  const [commentMap, setCommentMap] = useState({});

  const fetchApplications = async () => {
    try {
      const { data } = await api.get("/gift-providers");
      setApplications(data);
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
        reviewerComments
      });
      toast.success(`Application ${decision.toLowerCase()} successfully.`);
      fetchApplications();
    } catch {
      toast.error("Failed to update application");
    }
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f5f5f5" }}>
      <h2 style={{ textAlign: "center" }}>Submitted Applications</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
        {applications.map((app) => (
          <div
            key={app.id}
            style={{
              backgroundColor: "#ffffff",
              padding: "1.5rem",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              width: "300px"
            }}
          >
            <h3>{app.businessName || "N/A"}</h3>
            <p><strong>Contact Person:</strong> {app.contactPerson || "N/A"}</p>
            <p><strong>Email:</strong> {app.email || "N/A"}</p>
            <p><strong>Phone:</strong> {app.phoneNumber || "N/A"}</p>
            <p><strong>Status:</strong> {app.status || "N/A"}</p>
            <p><strong>Reviewer Comments:</strong> {app.reviewerComments || "None"}</p>

            {app.status === "PENDING" && (
              <>
                <textarea
                  placeholder="Add reviewer comments"
                  value={commentMap[app.id] || ""}
                  onChange={(e) =>
                    setCommentMap({ ...commentMap, [app.id]: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    marginTop: "0.5rem",
                    borderRadius: "5px",
                    border: "1px solid #ccc"
                  }}
                />
                <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between" }}>
                  <button
                    onClick={() => handleDecision(app.id, "APPROVED")}
                    style={{
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      padding: "0.5rem 1rem",
                      borderRadius: "5px",
                      cursor: "pointer"
                    }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDecision(app.id, "REJECTED")}
                    style={{
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      padding: "0.5rem 1rem",
                      borderRadius: "5px",
                      cursor: "pointer"
                    }}
                  >
                    Reject
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayGift;
