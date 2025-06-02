import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  role: string;
  exp?: number; 
  [key: string]: any;
}

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps): JSX.Element => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const userRole = decoded?.role;

    if (!allowedRoles.includes(userRole)) {
      switch (userRole) {
        case 'admin':
          return <Navigate to="/dashboard/admin" replace />;
        case 'instructor':
          return <Navigate to="/dashboard/instructor" replace />;
        case 'student':
          return <Navigate to="/dashboard/student" replace />;
        default:
          return <Navigate to="/login" replace />;
      }
    }

    return children;
  } catch (error) {
    console.log(error);
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
