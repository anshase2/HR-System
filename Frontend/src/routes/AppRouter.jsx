import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../pages/auth/Register";
// Auth
import Login from "../pages/auth/Login";

// Applicant Pages
import Home from "../pages/applicant/Home";
import Jobs from "../pages/applicant/Jobs";
import JobDetails from "../pages/applicant/JobDetails";
import Profile from "../pages/applicant/Profile";

// HR Pages
import Dashboard from "../pages/hr/Dashboard";
import Applicants from "../pages/hr/Applicants";
import Analytics from "../pages/hr/Analytics";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Applicant */}
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/profile" element={<Profile />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* HR */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/applicants" element={<Applicants />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;