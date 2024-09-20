import { useState } from 'react';
import AllRoutes from '@/routes/AllRoutes';
import { Box } from '@mui/system';
import NavBar from './component/NavBar';

function App() {
<<<<<<< HEAD
  return <NavBar />;
=======
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  const handleLogin = (status: boolean): void => {
    setIsAuthenticated(status);
  };
  const handleCollapsed = (value: boolean): void => {
    setIsSidebarCollapsed(value);
  };

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
        sx={{
          marginTop: { xs: '55px', sm: '60px', md: '60px' },
          marginLeft: isSidebarCollapsed ? '55px' : '185px',
          transition: 'margin-left 0.3s',
          padding: '1rem',
        }}
      >
        <AllRoutes isAuthenticated={isAuthenticated} onLogin={handleLogin} />
      </Box>
    </div>
  );
>>>>>>> 723509c (feat: Add login functionality)
}

export default App;
