import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  Avatar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
  useMediaQuery,
  Drawer,
  Menu,
  Tooltip,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Home as HomeIcon,
  Inventory as InventoryIcon,
  Sell as SellIcon,
  DragIndicator as KioskIcon,
  Tv as SignageIcon,
  Settings as SettingsIcon,
  Search as SearchIcon,
  Logout as LogoutIcon,
  EventNoteRounded as EventNoteRoundedIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import Logo from '../../assets/Logo/OgmentOlogo.svg';
import { navBarStyles } from './navBarStyles';

const routes = [
  { path: '/', label: 'Home', icon: <HomeIcon /> },
  { path: '/product', label: 'Product', icon: <InventoryIcon /> },
  { path: '/pos', label: 'POS', icon: <SellIcon /> },
  { path: '/kiosk', label: 'Kiosk', icon: <EventNoteRoundedIcon /> },
  { path: '/signage', label: 'Signage', icon: <KioskIcon /> },
  { path: '/inventory', label: 'Inventory', icon: <SignageIcon /> },
  { path: '/admin', label: 'Administration', icon: <SettingsIcon /> },
];

interface Props {
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed(value: boolean): void;
}

function NavBar({ isSidebarCollapsed, setIsSidebarCollapsed }: Props) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const theme = useTheme();
  const navBarStyle = navBarStyles(theme);
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    setIsSidebarCollapsed(isSmallScreen);
  }, [isSmallScreen, setIsSidebarCollapsed]);

  const handleSearchClick = () => setIsSearchOpen(true);
  const handleSearchBlur = () => setIsSearchOpen(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  return (
    <>
      <AppBar position="fixed" sx={navBarStyle.appBar}>
        <Toolbar sx={navBarStyle.toolBar}>
          <Box sx={navBarStyle.navBarIconContainer}>
            <IconButton
              color="inherit"
              onClick={toggleSidebar}
              sx={{
                display: { sm: 'block', md: 'none' },
                marginLeft: { sm: -1, md: -1 },
              }}
            >
              <MenuIcon />
            </IconButton>

            <Box sx={navBarStyle.navBarLogoContainer}>
              <Box
                component="img"
                src={Logo}
                sx={navBarStyle.navBarLogo}
                alt="Logo"
              />
              <Typography sx={navBarStyle.navBarLogoText}>OgmentO</Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginRight: '1rem',
            }}
          >
            {!isSearchOpen && (
              <IconButton color="inherit" onClick={handleSearchClick}>
                <SearchIcon />
              </IconButton>
            )}
            {isSearchOpen && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '5px',
                  p: 1,
                }}
              >
                <SearchIcon />
                <InputBase
                  placeholder="Search..."
                  onBlur={handleSearchBlur}
                  sx={{
                    ml: 1,
                    width: { xs: '2rem', sm: '5rem', md: '13rem' },
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  autoFocus
                />
              </Box>
            )}

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                ml: 2,
                position: 'relative',
              }}
              onClick={(event) => handleClick(event)}
            >
              <Tooltip title="Profile" arrow>
                <Avatar alt="Profile Pic" src="/profile.jpg" />
              </Tooltip>

              <Box sx={{ ml: 1 }}>
                <Typography variant="h5">User Name</Typography>
                <Typography variant="body1">Developer</Typography>
              </Box>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.text.secondary,
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.2))',
                    mt: 2,
                    padding: 0,
                    paddingRight: 2.5,
                    paddingLeft: 2.5,
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 34,
                      width: 10,
                      height: 10,
                      bgcolor: theme.palette.background.paper,
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <List>
                  <ListItemButton
                    sx={{
                      borderBottom: `1px solid${theme.palette.text.secondary}`,
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      sia@filuet.com
                    </Typography>
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon sx={{ color: theme.palette.text.secondary }}>
                      <LogoutIcon color="inherit" />
                    </ListItemIcon>
                    <ListItemText secondary="Logout" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon sx={{ color: theme.palette.text.secondary }}>
                      <LockOutlinedIcon color="inherit" />
                    </ListItemIcon>
                    <ListItemText secondary="Change password" />
                  </ListItemButton>
                </List>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open
        sx={{
          width: isSidebarCollapsed ? '70px' : '200px',
          flexShrink: 0,
          margin: 0,
          padding: 0,
          [`& .MuiDrawer-paper`]: {
            width: isSidebarCollapsed ? '70px' : '200px',
            marginTop: { xs: '55px', sm: '60px', md: '60px' },
            overflowX: 'hidden',
            transition: 'width 0.3s',
            background: theme.palette.primary.main,
          },
        }}
      >
        <List>
          {routes.map((route) => (
            <ListItemButton
              key={route.path}
              component={Link}
              to={route.path}
              selected={location.pathname === route.path}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: isSidebarCollapsed ? 'center' : 'flex-start',
                '&:hover': {},
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 'unset',
                  justifyContent: 'center',
                }}
              >
                {route.icon}
              </ListItemIcon>
              <Collapse in={!isSidebarCollapsed} orientation="horizontal">
                <ListItemText
                  primary={route.label}
                  sx={{
                    ml: 2,
                    whiteSpace: 'nowrap',
                    opacity: isSidebarCollapsed ? 0 : 1,
                    transition: 'opacity 0.3s',
                  }}
                />
              </Collapse>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default NavBar;
