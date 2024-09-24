import { useState, useRef, useEffect } from 'react';
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
} from '@mui/material';
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
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Logo from '../../assets/Logo/OgmentOlogo.svg';

const routes = [
  { path: '/', label: 'Home', icon: <HomeIcon /> },
  { path: '/pm', label: 'Product', icon: <InventoryIcon /> },
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
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    setIsSidebarCollapsed(isSmallScreen);
  }, [isSmallScreen, setIsSidebarCollapsed]);

  const handleSearchClick = () => setIsSearchOpen(true);
  const handleSearchBlur = () => setIsSearchOpen(false);

  const handleProfileClick = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: '100%',
          height: { xs: '55px', sm: '60px', md: '60px' },
        }}
      >
        <Toolbar
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                maxWidth: '22em',
                marginLeft: { sm: 1, md: -2.8 },
                marginTop: '1',
              }}
            >
              <Box
                component="img"
                src={Logo}
                sx={{
                  margin: 0,
                  padding: 0,
                  width: { xs: '2.7rem', sm: '3.8rem' },
                  height: 'auto',
                }}
                alt="Logo"
              />
              <Typography
                sx={{
                  fontSize: { xs: '1rem', sm: '1.3rem', md: '1.4rem' },
                  margin: 0,
                  padding: 0,
                  whiteSpace: 'nowrap',
                  marginLeft: -1.2,
                }}
              >
                OgmentO
              </Typography>
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
              onClick={handleProfileClick}
              ref={profileRef}
            >
              <Avatar alt="Profile Pic" src="/profile.jpg" />
              <Box sx={{ ml: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  User Name
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Developer
                </Typography>
              </Box>

              {isProfileMenuOpen && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '110%',
                    right: 0,

                    boxShadow: 3,
                    borderRadius: '5px',
                    width: '200px',
                    zIndex: 10,
                  }}
                >
                  <List>
                    <ListItemButton>
                      <ListItemIcon>
                        <SettingsIcon />
                      </ListItemIcon>
                      <ListItemText primary="Settings" />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemIcon>
                        <LogoutIcon />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </ListItemButton>
                  </List>
                </Box>
              )}
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
          },
        }}
      >
        <List>
          {routes.map((route) => (
            <ListItemButton
              key={route.path}
              component={Link}
              to={route.path}
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
