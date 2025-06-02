import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProtectedRoute from './landingPageComponents/ProtectedRoute';
const ParticleBackground = React.lazy(() => import('./landingPageComponents/ParticleBackground'));

import DashboardLayout from './pages/Dashboard/DashboardLayout';

import AdminDashboard from './pages/Dashboard/admin/adminDashboard';
import UsersPage from './pages/Dashboard/admin/UsersPage';
import AnalyticsPage from './pages/Dashboard/admin/AnalyticsPage';
import Reports from './pages/Dashboard/admin/Reports';

import InstructorDashboard from './pages/Dashboard/Instructor/instructorDashboard';
import MyCourses from './pages/Dashboard/Instructor/MyCourses';
import UploadCourse from './pages/Dashboard/Instructor/UploadCourse';
import Earnings from './pages/Dashboard/Instructor/Earnings';

import StudentDashboard from './pages/Dashboard/Student/studentDashboard';
import MyCoursesStudent from './pages/Dashboard/Student/MyCoursesStudent';
import Progress from './pages/Dashboard/Student/Progress';
import Payments from './pages/Dashboard/Student/Payments';

function App() {
  return (
    <Router>
      <div className="font-poppins text-white bg-background-dark min-h-screen overflow-hidden relative">
        <ParticleBackground />
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Dashboard */}
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardLayout role="admin" />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="reports" element={<Reports />} />
          </Route>

          {/* Instructor Dashboard */}
          <Route
            path="/dashboard/instructor"
            element={
              <ProtectedRoute allowedRoles={['instructor']}>
                <DashboardLayout role="instructor" />
              </ProtectedRoute>
            }
          >
            <Route index element={<InstructorDashboard />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="upload-course" element={<UploadCourse />} />
            <Route path="earnings" element={<Earnings />} />
          </Route>

          {/* Student Dashboard */}
          <Route
            path="/dashboard/student"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <DashboardLayout role="student" />
              </ProtectedRoute>
            }
          >
            <Route index element={<StudentDashboard />} />
            <Route path="my-courses" element={<MyCoursesStudent />} />
            <Route path="progress" element={<Progress />} />
            <Route path="payments" element={<Payments />} />
          </Route>

          {/* Redirect Unknown Routes */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;