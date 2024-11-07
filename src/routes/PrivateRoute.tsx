import { PrivateRoutesProp } from '@/Interfaces/Props/props';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ isAuthenticated, children }: PrivateRoutesProp) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
