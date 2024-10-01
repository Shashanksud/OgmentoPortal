import { Theme } from '@mui/material/styles';

export const textFieldStyles = (theme: Theme) => ({
  InputProps: {
    style: {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.paper,
    },
  },
  InputLabelProps: {
    style: {
      color: theme.palette.text.secondary,
    },
  },
});

export const selectMenuItemStyles = (theme: Theme) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.text.primary,
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
});
