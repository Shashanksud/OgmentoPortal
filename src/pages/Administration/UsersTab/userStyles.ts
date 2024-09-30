import { Theme } from '@mui/material';

const userStyles = {
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

export default userStyles;
