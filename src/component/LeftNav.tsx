import React from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
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

const drawerWidthLarge = 240;
const drawerWidthSmall = 80;

function LeftNav() {
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isSmallScreen ? drawerWidthSmall : drawerWidthLarge,
        [`& .MuiDrawer-paper`]: {
          width: isSmallScreen ? drawerWidthSmall : drawerWidthLarge,
          backgroundColor: '#333',
          color: '#fff',
          height: '100vh',
        },
      }}
    >
      {/* Logo Section */}
      <Toolbar>
        <Typography
          variant="h4"
          noWrap
          sx={{
            textAlign: isSmallScreen ? 'center' : 'left',
            ml: isSmallScreen ? 0 : 2,
          }}
        >
          Ogmento
        </Typography>
      </Toolbar>

      {/* Links Section */}
      <List>
        <ListItemButton component={Link} to="/">
          <ListItemIcon>
            <HomeIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          {!isSmallScreen && <ListItemText primary="Home" />}
        </ListItemButton>
        <ListItemButton component={Link} to="/pm">
          <ListItemIcon>
            <InventoryIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          {!isSmallScreen && <ListItemText primary="Product Management" />}
        </ListItemButton>
        <ListItemButton component={Link} to="/sales">
          <ListItemIcon>
            <SellIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          {!isSmallScreen && <ListItemText primary="Sales Management" />}
        </ListItemButton>
        <ListItemButton component={Link} to="/catalogue">
          <ListItemIcon>
            <ViewListIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          {!isSmallScreen && <ListItemText primary="Catalogue Management" />}
        </ListItemButton>
        <ListItemButton component={Link} to="/kiosk">
          <ListItemIcon>
            <KioskIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          {!isSmallScreen && <ListItemText primary="Kiosk Management" />}
        </ListItemButton>
        <ListItemButton component={Link} to="/order">
          <ListItemIcon>
            <OrderIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          {!isSmallScreen && <ListItemText primary="Order Management" />}
        </ListItemButton>
        <ListItemButton component={Link} to="/signage">
          <ListItemIcon>
            <SignageIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          {!isSmallScreen && <ListItemText primary="Signage Management" />}
        </ListItemButton>
        <ListItemButton component={Link} to="/admin">
          <ListItemIcon>
            <AdminPanelSettingsIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          {!isSmallScreen && <ListItemText primary="Administration" />}
        </ListItemButton>
      </List>
    </Drawer>
  );
}

export default LeftNav;
