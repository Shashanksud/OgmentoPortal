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

export const CustomSelect = (theme: Theme) => ({
  dark: {
    label: {
      color: '#ffffff9e', // ? initial label color
      '&.Mui-focused': {
        color: theme.palette.text.primary, // ? label focused color
      },
      '&.Mui-error': {
        color: theme.palette.error.main, // ? label error color
      },
      '&.MuiInputLabel-shrink': {
        color: theme.palette.text.primary, // ? label color when Select is clicked/focused
      },
    },
    MenuProps: {
      PaperProps: {
        sx: {
          bgcolor: '#333', // ? Dropdown menu background
          color: theme.palette.text.primary, // ?  menu items text color
        },
      },
    },
    select: {
      '.MuiSvgIcon-root': {
        color: theme.palette.text.primary, // ? arrow icon color
      },
      '.MuiOutlinedInput-input': {
        color: theme.palette.text.primary, // ? selected item color
      },
      '.MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.background.default, // ? Dropdown border color
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#90caf9', // ? Dropdown hover color
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#90caf9', // ? Dropdown icon color
      },
      '& .MuiSelect-icon': {
        color: '#fff', // ? Dropdown icon color
      },
      '& .MuiSelect-selectMenu': {
        color: '#000', // ? Selected value color
      },
    },
  },
  light: {
    label: {
      color: '#0000008a', // ? Initial label color
      '&.Mui-focused': {
        color: theme.palette.text.primary, // ? label color when focused
      },
      '&.Mui-error': {
        color: theme.palette.error.main, // ? label error color
      },
      '&.MuiInputLabel-shrink': {
        color: '#000000de', // ? label color when Select is clicked/focused
      },
    },
    MenuProps: {
      PaperProps: {
        sx: {
          bgcolor: '#fff', // ? Background for dropdown menu
          color: '#000000de', // ? Dropdown menu item color
        },
      },
    },
    select: {
      '.MuiSvgIcon-root': {
        color: '#000', // ? arrow icon color
      },
      '.MuiOutlinedInput-input': {
        color: '#000', // ? selected item color
      },
      '.MuiOutlinedInput-notchedOutline': {
        borderColor: '#000', // ? Dropdown border color
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#90caf9', // ? Dropdown hover color
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#90caf9', // ? Dropdown icon color
      },
      '& .MuiSelect-icon': {
        color: '#000', // ? Dropdown icon color
      },
      '& .MuiSelect-selectMenu': {
        color: '#000', // ? Selected value color
      },
    },
  },
});

export const CustomInput = (theme: Theme) => ({
  dark: {
    input: {
      color: theme.palette.text.primary, // ? Text color
    },
    label: {
      color: '#ffffff9e', // ? Label color
      '&.MuiInputLabel-shrink': {
        color: theme.palette.text.primary, // ? label color when Select is clicked/focused
      },
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#fff', // ? Default border color
      },
      '&:hover fieldset': {
        borderColor: '#90caf9', // ? Border color on hover
      },
      '&.Mui-focused fieldset': {
        borderColor: '#90caf9', // ? Border color when focused
      },
    },
    '& .MuiFormHelperText-root': {
      color: theme.palette.error.main, // ? Helper text (error) color
    },
  },
  light: {
    input: {
      color: '#000', // ? Text color
    },
    label: {
      color: '#0000008a', // ? Label color
      '&.MuiInputLabel-shrink': {
        color: '#000000de', // ? label color when Select is clicked/focused
      },
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#000', // ? Default border color (dark for contrast)
      },
      '&:hover fieldset': {
        borderColor: '#90caf9', // ? Border color on hover
      },
      '&.Mui-focused fieldset': {
        borderColor: '#90caf9', // ? Border color when focused
      },
    },
    '& .MuiFormHelperText-root': {
      color: theme.palette.error.main, // ? Error/helper text color
    },
  },
});
