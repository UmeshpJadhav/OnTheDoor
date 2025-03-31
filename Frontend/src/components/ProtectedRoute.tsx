import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isAdmin = false }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  // For admin routes
  if (isAdmin) {
    if (!token || userRole !== 'admin') {
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
  }
  // For user routes
  else if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 