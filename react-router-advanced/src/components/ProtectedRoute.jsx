import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, redirectTo = "/" }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

export default ProtectedRoute;
