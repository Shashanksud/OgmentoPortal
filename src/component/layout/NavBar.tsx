import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
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
  InputAdornment,
  TextField,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Home as HomeIcon,
  Inventory as InventoryIcon,
  Sell as SellIcon,
  DragIndicator as KioskIcon,
  Tv as SignageIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  EventNoteRounded as EventNoteRoundedIcon,
  Menu as MenuIcon,
  Search,
  Clear,
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import { NavbarProps } from '@/Interfaces/Props/props';
import { UserRoles } from '@/Interfaces/Modals/modals';
import { postData } from '@/services/axiosWrapper/fetch';
import { logOutEndpoint } from '@/utils/Urls';
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

function NavBar(props: NavbarProps) {
  const {
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    userDetail,
    setIsAuthenticated,
  } = props;
  const theme = useTheme();
  const navBarStyle = navBarStyles(theme);
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchText, setSearchText] = useState<string>('');
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    setIsSidebarCollapsed(isSmallScreen);
  }, [isSmallScreen, setIsSidebarCollapsed]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  const onLogout = () => {
    postData(logOutEndpoint, {}).then(() => {
      localStorage.removeItem('authToken');
      navigate('/login');
      setIsAuthenticated(false);
    });
  };

  return (
    <>
      <AppBar position="fixed" sx={navBarStyle.appBar} elevation={0}>
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
            <TextField
              variant="outlined"
              sx={navBarStyle.navBarSearchInput}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      {searchText ? (
                        <Clear
                          onClick={() => setSearchText('')}
                          sx={{
                            cursor: 'pointer',
                            color: theme.palette.text.hint,
                          }}
                        />
                      ) : (
                        <Search sx={{ color: theme.palette.text.hint }} />
                      )}
                    </InputAdornment>
                  ),
                },
              }}
              placeholder="Search...."
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                position: 'relative',
                marginLeft: '1.6rem',
              }}
              onClick={(event) => handleClick(event)}
            >
              <Tooltip title="Profile" arrow>
                <Avatar alt={userDetail.userName} src="/profile.jpg" />
              </Tooltip>

              <Box sx={{ ml: 1 }}>
                <Typography variant="h5">{userDetail.userName}</Typography>
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.hint }}
                >
                  {UserRoles[userDetail.roleId]}
                </Typography>
              </Box>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    backgroundColor: theme.palette.text.primary,
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
                      backgroundColor: theme.palette.text.primary,
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
                      {userDetail.emailId}
                    </Typography>
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon sx={{ color: theme.palette.text.secondary }}>
                      <LogoutIcon color="inherit" />
                    </ListItemIcon>
                    <ListItemText secondary="Logout" onClick={onLogout} />
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
                marginBottom: '0.5rem',
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
