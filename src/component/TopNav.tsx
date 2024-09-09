import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  // IconButton,
  InputBase,
  Box,
  Avatar,
  useMediaQuery,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// import { AccountCircle } from '@mui/icons-material';

function TopNav({ currentPage }: { currentPage: string }) {
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${isSmallScreen ? 80 : 240}px)`,
        ml: `${isSmallScreen ? 80 : 240}px`,
        backgroundColor: '#333',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Current Page Text */}
        <Typography variant="h6" noWrap>
          {currentPage}
        </Typography>

        {/* Search Bar and Profile Section */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {!isSmallScreen && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#444',
                borderRadius: '5px',
                p: 1,
                mr: 2,
              }}
            >
              <SearchIcon />
              <InputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                sx={{ ml: 1, color: '#fff' }}
              />
            </Box>
          )}
          <Avatar alt="Profile Pic" src="/profile.jpg" sx={{ mr: 2 }} />
          {!isSmallScreen && (
            <Box>
              <Typography variant="body1">User Name</Typography>
              <Typography variant="body2" color="textSecondary">
                Developer
              </Typography>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopNav;
