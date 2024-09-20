import { Navigate } from 'react-router-dom';

interface Props {
  isAuthenticated: boolean;
  children: JSX.Element;
}
function PrivateRoute({ isAuthenticated, children }: Props) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
