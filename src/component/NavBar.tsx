import { Box } from '@mui/material';
import LeftNav from './LeftNav';
import TopNav from './TopNav';
import AllRoutes from '../routes/AllRoutes';

function NavBar({ currentPage }: { currentPage: string }) {
  return (
    <>
      <LeftNav />
      <TopNav currentPage={currentPage} />
      {/* Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: `calc(100% - 240px)`, // Adjust for small screen if needed
          ml: { sm: '80px', md: '240px' }, // Adjust for small screen if needed
          mt: '64px', // Height of the top navbar
        }}
      >
        {/* Page Content */}
        <AllRoutes />
      </Box>
    </>
  );
}

export default NavBar;
