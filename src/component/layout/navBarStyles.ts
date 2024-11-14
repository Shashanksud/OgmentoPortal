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
  navBarSearchInput: {
    width: '12.68rem',

    input: {
      fontSize: '14px',
      paddingTop: '8px',
      paddingBottom: '8px',
    },
    label: {
      color: theme.palette.text.primary,
      opacity: '0.6',
      '&.Mui-focused': { opacity: '1' },
      '&.MuiInputLabel-shrink': {
        color: theme.palette.text.primary,
      },
    },
    '& input:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px #2c2c2c inset',
      WebkitTextFillColor: '#ffffff',
      transition: 'background-color 5000s ease-in-out 0s',
      fontSize: '0.8rem',
      borderRadius: '24px',
    },

    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.text.primary,
        borderRadius: '24px',
        boxShadow:
          'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',
      },
      '&:hover fieldset': {
        borderColor: theme.palette.focusBorder,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.focusBorder,
        opacity: '1',
      },
    },
    '& .MuiFormHelperText-root': {
      color: theme.palette.error.main,
    },
  },
});
export { navBarStyles };
