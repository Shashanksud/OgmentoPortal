import outlinedInputClasses from '@mui/material/OutlinedInput/outlinedInputClasses';
import { selectClasses } from '@mui/material/Select';
import { Theme } from '@mui/material/styles';

export const textFieldStyles = (theme: Theme) => ({
  InputProps: {
    style: {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.default,
    },
  },
  InputLabelProps: {
    style: {
      color: theme.palette.text.primary,
    },
  },
});

export const selectMenuItemStyles = (theme: Theme) => ({
  mt: 2.5,
  [`& .${selectClasses.outlined}`]: {
    minWidth: '200px',
    background: theme.palette.text.hover,
    color: 'grey.700',
    borderRadius: '4px',
    paddingLeft: '12px',
    paddingTop: '14px',
    paddingBottom: '15px',
    // Opacity: 1,
  },
  [`& .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: 'grey.300',
    borderStyle: 'solid',
    borderWidth: '2px',
  },
  '&:hover': {
    [`& .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: 'grey.400',
    },
  },
});
