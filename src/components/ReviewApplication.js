import React, { useEffect, useState } from "react";
import axios from "axios";

function ReviewApplications() {
  const [applications, setApplications] = useState([]);
  const [comments, setComments] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8080/gift-providers")
      .then(res => setApplications(res.data))
      .catch(err => console.error("Error fetching applications:", err));
  }, []);

  const handleDecision = (id, status) => {
    const comment = comments[id] || "";

    axios.put(`http://localhost:8080/gift-providers/review/${id}`, null, {
      params: {
        status: status,
        comments: comment
      }
    })
    .then(res => {
      alert(res.data);
      // Refresh data after approval/rejection
      return axios.get("http://localhost:8080/gift-providers");
    })
    .then(res => setApplications(res.data))
    .catch(err => alert("Error updating status"));
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2 style={{ textAlign: "center" }}>Review Applications</h2>
      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "1rem" }}>
        <thead style={{ backgroundColor: "#f0f0f0" }}>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Business</th>
            <th>Status</th>
            <th>Reviewer Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app.id}>
              <td>{app.id}</td>
              <td>{app.userId}</td>
              <td>{app.businessName}</td>
              <td>{app.status}</td>
              <td>
                <input
                  type="text"
                  placeholder="Enter comment"
                  value={comments[app.id] || ""}
                  onChange={(e) =>
                    setComments({ ...comments, [app.id]: e.target.value })
                  }
                  style={{ width: "90%" }}
                />
              </td>
              <td>
                <button onClick={() => handleDecision(app.id, "APPROVED")} style={{ marginRight: "5px" }}>
                  Approve
                </button>
                <button onClick={() => handleDecision(app.id, "REJECTED")}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReviewApplications;
