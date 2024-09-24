import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/Login/LoginPage';
import Home from '../pages/Home/Home';
import Administration from '../pages/Administration/Administration';
import KioskManagement from '../pages/KioskManagement/KioskManagement';
import POS from '../pages/POS/POS';
import ProductManagement from '../pages/ProductManagement/ProductManagement';
import Signage from '../pages/Signage/Signage';
import Inventory from '../pages/Inventory/Inventory';
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
