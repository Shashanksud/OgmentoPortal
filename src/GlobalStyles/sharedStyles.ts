import { Theme } from '@mui/material';

export const userStyles = {
  userListHeaderBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: '1rem',
  },
  searchTextField: {
    '& .MuiOutlinedInput-root': {
      width: '22rem',
    },
  },
  inputAdornment: {
    color: 'inherit',
  },

  userTablePaper: {
    width: '100%',
    overflow: 'hidden',
  },

  editIcon: (theme: Theme) => ({
    color: theme.palette.text.primary,
  }),
  deleteIcon: (theme: Theme) => ({
    color: theme.palette.text.primary,
  }),
};

export const lightSelect = (theme: Theme) => ({
  label: {
    color: '#ffffff9e',
    '&.Mui-focused': {
      color: theme.palette.text.primary,
    },
    '&.Mui-error': {
      color: theme.palette.error.main,
    },
  },
  MenuProps: {
    PaperProps: {
      sx: {
        color: theme.palette.secondary.main,
      },
    },
  },
});

export const darkSelect = (theme: Theme) => ({
  label: {
    color: '#ffffff9e',
    '&.Mui-focused': {
      color: theme.palette.secondary.main,
    },
    '&.Mui-error': {
      color: theme.palette.error.main,
    },
  },
  MenuProps: {
    PaperProps: {
      sx: {
        color: theme.palette.secondary.main,
      },
    },
  },
});
