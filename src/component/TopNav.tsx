import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
  InputBase,
  Avatar,
} from '@mui/material';
import { Search } from '@mui/icons-material';

function TopBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 1201,
        width: '83%',
        height: '65px',
        right: 0,
        top: 0,
      }}
    >
      {/* Search Icon */}
      <Box>
        <Toolbar sx={{ ml: 130 }}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', marginLeft: '40px' }}
          >
            <IconButton sx={{ p: '10px' }} aria-label="search">
              <Search />
            </IconButton>
            <InputBase placeholder="Search…" sx={{ ml: 1 }} />
          </Box>

          {/* Profile Section */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleMenuOpen} color="inherit">
              <Avatar
                alt="User Profile Picture"
                src="/path/to/profile-pic.jpg"
              />
            </IconButton>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                ml: 1,
              }}
            >
              <Typography variant="body1">Siya Dhabhai</Typography>
              <Typography variant="caption">Designer</Typography>
            </Box>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}

export default TopBar;
