// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import './App.css';
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import ApplyForm from "./components/ApplyForm";
import DisplayGift from "./components/DisplayGift";
import TrackApplicationStatus from "./components/TrackApplicationStatus";
import ReviewApplications from "./components/ReviewApplication";
import ApprovedProvidersList from "./components/ApprovedProvidersList";
import UserProfile from "./components/UserProfle";
import Login from "./components/Login";
import Signup from "./components/SignUp";

function ProtectedRoute({ children, allowedRoles }) {
  const role = localStorage.getItem("role");
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }
  return children;
}

function Layout() {
  const location = useLocation();
  const hideSidebar = ["/login", "/signup"].includes(location.pathname);

  return (
    <div style={{ display: "flex" }}>
      {!hideSidebar && <Sidebar />}
      <div style={{ flex: 1, marginLeft: hideSidebar ? 0 : "220px", minHeight: "100vh" }}>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          {/* Auth routes */}
          <Route path='/' element={<Home/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

         

          {/* Public routes */}
          <Route path="/getAllGifts" element={<DisplayGift />} />
          <Route path="/profile" element={<UserProfile />} />

          {/* User routes */}
          <Route 
            path="/apply" 
            element={
              <ProtectedRoute allowedRoles={["USER"]}>
                <ApplyForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/track-status" 
            element={
              <ProtectedRoute allowedRoles={["USER"]}>
                <TrackApplicationStatus />
              </ProtectedRoute>
            } 
          />

          {/* Admin routes */}
          <Route 
            path="/review-application" 
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <ReviewApplications />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/approved-providers" 
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <ApprovedProvidersList />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
