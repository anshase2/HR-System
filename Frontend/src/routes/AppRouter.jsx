import { BrowserRouter, Routes, Route } from "react-router-dom";
import ApplicationForm from "../pages/applicant/ApplicationForm";
import ForgotPassword from "../pages/auth/ForgotPassword";
import SetPassword from "../pages/auth/SetPassword";
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
import Employees from "../pages/hr/Employees";
import ProtectedRoute from "../components/auth/ProtectedRoute";

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
        <Route
          path="/application/:jobId"
          element={
            <ProtectedRoute roles={["Applicant"]}>
              <ApplicationForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/apply/:id"
          element={
            <ProtectedRoute roles={["Applicant"]}>
              <ApplicationForm />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
        

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route
  path="/forgot-password"
  element={<ForgotPassword />}
         />
        <Route path="/set-password" element={<SetPassword />} />


        {/* HR (Admin or Employee) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={["Admin", "Employee"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applicants"
          element={
            <ProtectedRoute roles={["Admin", "Employee"]}>
              <Applicants />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute roles={["Admin", "Employee"]}>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/edit/:id"
          element={
            <ProtectedRoute roles={["Admin", "Employee"]}>
              <EditJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/candidates"
          element={
            <ProtectedRoute roles={["Admin", "Employee"]}>
              <Candidates />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute roles={["Admin", "Employee"]}>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-job"
          element={
            <ProtectedRoute roles={["Admin", "Employee"]}>
              <CreateJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoute roles={["Admin"]}>
              <Employees />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
