import { BrowserRouter, Routes, Route } from "react-router-dom";
import ApplicationForm from "../pages/applicant/ApplicationForm";
import ForgotPassword from "../pages/auth/ForgotPassword";
import SetPassword from "../pages/auth/SetPassword";
import VerifyEmail from "../pages/auth/VerifyEmail";
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
import MyAcceptedApplications from "../pages/hr/MyAcceptedApplications";
import Analytics from "../pages/hr/Analytics";
import Candidates from "../pages/hr/Candidates";
import Settings from "../pages/hr/Settings";
import CreateJob from "../pages/hr/CreateJob";
import Employees from "../pages/hr/Employees";
import DashboardLayout from "../components/layout/DashboardLayout";
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
        <Route
          path="/profile"
          element={
            <ProtectedRoute roles={["Applicant"]}>
              <Profile />
            </ProtectedRoute>
          }
        />
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
        <Route path="/verify-email" element={<VerifyEmail />} />


        {/* HR (Admin or Employee) */}
        <Route
          element={
            <ProtectedRoute roles={["Admin", "Employee"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="applicants" element={<Applicants />} />
          <Route
            path="my-accepted-applications"
            element={<MyAcceptedApplications />}
          />
          <Route path="analytics" element={<Analytics />} />
          <Route path="dashboard/edit/:id" element={<EditJob />} />
          <Route path="candidates" element={<Candidates />} />
          <Route path="settings" element={<Settings />} />
          <Route path="create-job" element={<CreateJob />} />
          <Route
            path="employees"
            element={
              <ProtectedRoute roles={["Admin"]}>
                <Employees />
              </ProtectedRoute>
            }
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
