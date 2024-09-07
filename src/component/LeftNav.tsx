import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import SellIcon from '@mui/icons-material/Sell';
import ViewListIcon from '@mui/icons-material/ViewList';
import KioskIcon from '@mui/icons-material/DragIndicator';
import OrderIcon from '@mui/icons-material/Assignment';
import SignageIcon from '@mui/icons-material/Tv';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';

const drawerWidth = 240;

const CustomDrawer = styled(Drawer)(() => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
}));

function SideBar() {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [open, setOpen] = useState(!isSmallScreen);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      {isSmallScreen && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleDrawer}
          sx={{ ml: 2 }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <CustomDrawer
        variant={isSmallScreen ? 'temporary' : 'permanent'}
        open={open}
        onClose={toggleDrawer}
      >
        <Toolbar>
          <Typography variant="h4" noWrap sx={{ ml: 2 }}>
            Ogmento
          </Typography>
        </Toolbar>
        <List>
          <ListItemButton component={Link} to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            {!isSmallScreen && <ListItemText primary="Home" />}
          </ListItemButton>
          <ListItemButton component={Link} to="/pm">
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            {!isSmallScreen && <ListItemText primary="Product Management" />}
          </ListItemButton>
          <ListItemButton component={Link} to="/sales">
            <ListItemIcon>
              <SellIcon />
            </ListItemIcon>
            {!isSmallScreen && <ListItemText primary="Sales Management" />}
          </ListItemButton>
          <ListItemButton component={Link} to="/catalogue">
            <ListItemIcon>
              <ViewListIcon />
            </ListItemIcon>
            {!isSmallScreen && <ListItemText primary="Catalogue Management" />}
          </ListItemButton>
          <ListItemButton component={Link} to="/kiosk">
            <ListItemIcon>
              <KioskIcon />
            </ListItemIcon>
            {!isSmallScreen && <ListItemText primary="Kiosk Management" />}
          </ListItemButton>
          <ListItemButton component={Link} to="/order">
            <ListItemIcon>
              <OrderIcon />
            </ListItemIcon>
            {!isSmallScreen && <ListItemText primary="Order Management" />}
          </ListItemButton>
          <ListItemButton component={Link} to="/signage">
            <ListItemIcon>
              <SignageIcon />
            </ListItemIcon>
            {!isSmallScreen && <ListItemText primary="Signage Management" />}
          </ListItemButton>
          <ListItemButton component={Link} to="/admin">
            <ListItemIcon>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            {!isSmallScreen && <ListItemText primary="Administration" />}
          </ListItemButton>
        </List>
      </CustomDrawer>
    </>
  );
}

export default SideBar;
