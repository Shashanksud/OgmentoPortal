import { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import NavBar from './component/layout/NavBar';
import Administration from './pages/Administration/Administration';
import KioskManagement from './pages/KioskManagement/KioskManagement';
import LoginPage from './pages/Login/LoginPage';
import POS from './pages/POS/POS';
import ProductManagement from './pages/ProductManagement/ProductManagement';
import Signage from './pages/Signage/Signage';
import PrivateRoute from './routes/PrivateRoute';
import Home from './pages/Home/Home';
import Inventory from './pages/Inventory/Inventory';
import { getSignInUserDetailEndpoint } from './utils/Urls';
import { UserDetailsModal, UserRoles } from './Interfaces/Modals/modals';
import { getData } from './services/axiosWrapper/fetch';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem('authToken')
  );
  const [userDetail, setUserDetail] = useState<UserDetailsModal>({
    userName: 'User Name',
    emailId: 'email@filuet.com',
    roleId: UserRoles.Admin,
    validityDays: 365,
    city: '',
    phoneNumber: '',
    kioskName: '',
    salesCenters: {},
    userUid: '',
  });

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const theme = useTheme();

  useEffect(() => {
    const existedToken = localStorage.getItem('authToken');
    if (existedToken) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getData<UserDetailsModal>(getSignInUserDetailEndpoint).then(
        (user: UserDetailsModal) => {
          setUserDetail(user);
        }
      );
    }
  }, [isAuthenticated]);

  const onLogin = (status: boolean): void => {
    setIsAuthenticated(status);
  };

  const onCollapsed = (value: boolean): void => {
    setIsSidebarCollapsed(value);
  };

  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.secondary.main;
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [theme]);

  return (
    <div>
      {isAuthenticated && (
        <NavBar
          isSidebarCollapsed={isSidebarCollapsed}
          setIsSidebarCollapsed={onCollapsed}
          userDetail={userDetail}
          setIsAuthenticated={setIsAuthenticated}
        />
      )}
      <Box
        component="main"
        sx={
          isAuthenticated
            ? {
                marginTop: { xs: '55px', sm: '60px', md: '60px' },
                marginLeft: isSidebarCollapsed ? '55px' : '185px',
                transition: 'margin-left 0.3s',
                padding: '1rem',
                backgroundColor: theme.palette.secondary.main,
              }
            : undefined
        }
      >
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={onLogin} />} />

          <Route
            path="/home"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/product"
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

          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? '/home' : '/login'} />}
          />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
