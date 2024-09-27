import { Theme } from '@mui/material';

const userStyles = {
  userListHeaderBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: '16px',
  },
  userListContentBox: {
    padding: '16px',
    backgroundColor: '#f5f5f5',
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
