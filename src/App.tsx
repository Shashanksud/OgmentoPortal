import { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material';
import AllRoutes from '@/routes/AllRoutes';
import NavBar from './component/layout/NavBar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const theme = useTheme();

  const handleLogin = (status: boolean): void => {
    setIsAuthenticated(status);
  };

  const handleCollapsed = (value: boolean): void => {
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
          setIsSidebarCollapsed={handleCollapsed}
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
        <AllRoutes isAuthenticated={isAuthenticated} onLogin={handleLogin} />
      </Box>
    </div>
  );
}

export default App;
