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

import InstructorDashboard from './pages/Dashboard/instructor/instructorDashboard';
import MyCourses from './pages/Dashboard/instructor/MyCourses';
import UploadCourse from './pages/Dashboard/instructor/UploadCourse';
import Earnings from './pages/Dashboard/instructor/Earnings';

import StudentDashboard from './pages/Dashboard/student/studentDashboard';
import MyCoursesStudent from './pages/Dashboard/student/MyCoursesStudent';
import BrowseCourses from './pages/Dashboard/student/BrowseCourses';
import Progress from './pages/Dashboard/student/Progress';
import Payments from './pages/Dashboard/student/Payments';
import Settings from './pages/Dashboard/Settings';
import { UserContextProvider } from './components/context/UserContext';
import CourseDetail from './pages/Dashboard/student/CourseDetail';

function App() {
  return (
    <UserContextProvider>
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
              <Route path="edit-course/:id" element={<UploadCourse />} />
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
              {/* <Route path="my-courses" element={<MyCoursesStudent />} /> */}
              <Route path="browse-courses" element={<BrowseCourses />} />
              <Route path="course/:id" element={<CourseDetail />} />
              <Route path="my-course/:id" element={<MyCoursesStudent />} />
              <Route path="progress" element={<Progress />} />
              <Route path="payments" element={<Payments />} />
            </Route>

            {/* Settings Route - Common for all roles */}
            <Route
              path="/dashboard/settings"
              element={
                <ProtectedRoute allowedRoles={['admin', 'instructor', 'student']}>
                  <DashboardLayout role="admin" /> {/* or use the appropriate role */}
                </ProtectedRoute>
              }
            >
              <Route index element={<Settings />} />
            </Route>

            {/* Redirect Unknown Routes */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </UserContextProvider>
  );
}

export default App;
