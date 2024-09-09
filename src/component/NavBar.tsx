import { CssBaseline, Box } from '@mui/material';
import TopBar from './TopNav';
import SideBar from './LeftNav';
import AllRoutes from '../routes/AllRoutes';

function NavBar() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <SideBar />
      <TopBar />
      <Box component="main" sx={{ p: 3, mt: `${50}px` }}>
        {/* Content goes here */}
        <AllRoutes />
      </Box>
    </Box>
  );
}

export default NavBar;
