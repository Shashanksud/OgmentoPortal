import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import Home from '../pages/Home';
import Administration from '../pages/Administration';
import KioskManagement from '../pages/KioskManagement';
import POS from '../pages/POS';
import ProductManagement from '../pages/ProductManagement';
import Signage from '../pages/Signage';
import Inventory from '../pages/Inventory';
import PrivateRoute from './PrivateRoute';

interface AllRoutesProps {
  isAuthenticated: boolean;
  onLogin(status: boolean): void;
}

function AllRoutes(props: AllRoutesProps) {
  const { isAuthenticated, onLogin } = props;
  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />
        }
      />

      {/* Protected Home Route */}
      <Route
        path="/home"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Home />
          </PrivateRoute>
        }
      />

      {/* Login Route */}
      <Route path="/login" element={<LoginPage onLogin={onLogin} />} />

      {/* Protected Routes */}
      <Route
        path="/pm"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <ProductManagement />
          </PrivateRoute>
        }
      />

      <Route
        path="/pos"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <POS />
          </PrivateRoute>
        }
      />

      <Route
        path="/kiosk"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <KioskManagement />
          </PrivateRoute>
        }
      />

      <Route
        path="/signage"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Signage />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Administration />
          </PrivateRoute>
        }
      />

      <Route
        path="/inventory"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Inventory />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default AllRoutes;
