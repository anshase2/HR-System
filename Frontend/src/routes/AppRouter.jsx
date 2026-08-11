import { BrowserRouter, Routes, Route } from "react-router-dom";
import ApplicationForm from "../pages/applicant/ApplicationForm";
import ForgotPassword from "../pages/auth/ForgotPassword";
import EditJob from "../pages/hr/EditJob";
// Auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Applicant Pages
import Home from "../pages/applicant/Home";
import Jobs from "../pages/applicant/Jobs";
import JobDetails from "../pages/applicant/JobDetails";
import Profile from "../pages/applicant/Profile";
import About from "../pages/applicant/About";


// HR Pages
import Dashboard from "../pages/hr/Dashboard";
import Applicants from "../pages/hr/Applicants";
import Analytics from "../pages/hr/Analytics";
import Candidates from "../pages/hr/Candidates";
import Settings from "../pages/hr/Settings";
import CreateJob from "../pages/hr/CreateJob";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* Applicant */}
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/profile" element={<Profile />} />
       <Route path="/apply/:id" element={<ApplicationForm />} />
       <Route path="/about" element={<About />} />
        

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route
  path="/forgot-password"
  element={<ForgotPassword />}
         />


        {/* HR */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/applicants" element={<Applicants />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/dashboard/edit/:id" element={<EditJob />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/create-job" element={<CreateJob />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;