import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./pages/Layout";
import StudentDashboard from "./Components/StudentDashboard";
import MyCourses from "./Components/CourseList";
import AdminPanel from "./Components/AdminPanel";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminLogin from "./Components/AdminLogin"; // Admin Login Page
import AdminForm from "./Components/AdminForm"; // Admin Register Page
import "bootstrap/dist/css/bootstrap.min.css";
import About from "./Components/About";
import TrainerLogin from "./Components/TrainerLogin";
import TrainerPanel from "./pages/TrainerPanel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/courses"
            element={
              <ProtectedRoute allowedRoles={["student", "admin"]}>
                <MyCourses />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-register"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminForm />
            </ProtectedRoute>
          }
        />

        <Route path="/trainer" element={<TrainerLogin />} />
        <Route
          path="/trainer-panel"
          element={
            <ProtectedRoute allowedRoles={["trainer"]}>
              <TrainerPanel />
            </ProtectedRoute>
          }
        />

        {/* Unauthorized Route */}
        <Route path="/unauthorized" element={<h1>403 - Unauthorized</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
