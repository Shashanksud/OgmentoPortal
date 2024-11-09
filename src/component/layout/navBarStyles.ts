import { Theme } from '@mui/material';

const navBarStyles = (theme: Theme) => ({
  appBar: {
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    height: { xs: '55px', sm: '60px', md: '60px' },
    '&.MuiAppBar-root': {
      boxShadow: 'none', // Ensures shadow is removed from root class
    },
  },
  toolBar: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    boxShadow: 'none',
  },
  navBarIconContainer: { display: 'flex', alignItems: 'center' },
  navBarLogoContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: '22em',
    marginLeft: { sm: 1, md: -2.8 },
    marginTop: '1',
  },
  navBarLogo: {
    margin: 0,
    padding: 0,
    width: { xs: '2.7rem', sm: '3.8rem' },
    height: 'auto',
  },
  navBarLogoText: {
    fontSize: { xs: '1rem', sm: '1.3rem', md: '1.4rem' },
    margin: 0,
    padding: 0,
    whiteSpace: 'nowrap',
    marginLeft: -1.2,
  },
});
export { navBarStyles };
