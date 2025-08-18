import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import './App.css';
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ApplyForm from "./components/ApplyForm";
import DisplayGift from "./components/DisplayGift";
import TrackApplicationStatus from "./components/TrackApplicationStatus";
import ReviewApplications from "./components/ReviewApplication";
import ApprovedProvidersList from "./components/ApprovedProvidersList";
import UserProfile from "./components/UserProfle";
import Login from "./components/Login";
import Signup from "./components/SignUp";

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* All public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/apply" element={<ApplyForm />} />
        <Route path="/getAllGifts" element={<DisplayGift />} />
        <Route path="/track-status" element={<TrackApplicationStatus />} />
        <Route path="/review-application" element={<ReviewApplications />} />
        <Route path="/approved-providers" element={<ApprovedProvidersList />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
