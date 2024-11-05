import { Theme } from '@mui/material';

const buttonStyles = {
  width: '6.2rem',
  padding: 0,
  height: '2.6rem',
};

const modalContainerStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: 24,
  borderRadius: 1,
};

export const globalStyles = (theme: Theme) => ({
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

  editIcon: {
    color: theme.palette.text.primary,
  },
  deleteIcon: {
    color: theme.palette.text.primary,
  },
  fileUploadModal: {
    ...modalContainerStyles,
  },
  deleteModalContainer: {
    ...modalContainerStyles,
    width: '450px',
    backgroundColor: theme.palette.text.primary,
    paddingBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  deleteModalConfirmText: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontSize: '1.1rem',
  },
  deleteModalBtnContainer: {
    width: '50%',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
  },
  deleteModalCancelButton: {
    ...buttonStyles,
    color: theme.palette.primary.main,
    backgroundColor: '#DBDBDB',
  },
  deleteModalConfirmButton: {
    ...buttonStyles,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.primary.main,
  },
  deleteModalCancelIcon: {
    color: theme.palette.primary.main,
    marginLeft: '85%',
    marginTop: theme.spacing(1),
  },
  noCategoryAvailableText: {
    color: theme.palette.text.primary,
    textAlign: 'center',
    marginTop: 2,
  },
});

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

export const CustomDatePicker = (theme: Theme) => ({
  dark: {
    sx: {
      input: {
        color: theme.palette.text.primary, // ? Text color in dark theme
      },
      label: {
        color: '#ffffff9e', // ? Label color in dark theme
        '&.MuiInputLabel-shrink': {
          color: theme.palette.text.primary, // ? Label color when focused
        },
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#fff', // ? Default border color in dark theme
        },
        '&:hover fieldset': {
          borderColor: '#90caf9', // ? Border color on hover
        },
        '&.Mui-focused fieldset': {
          borderColor: '#90caf9', // ? Border color when focused
        },
      },
      '& .MuiFormHelperText-root': {
        color: theme.palette.error.main, // ? error color
      },
    },
    slotProps: {
      yearButton: {
        sx: {
          color: theme.palette.text.primary, // ? year list font color
        },
      },
      layout: {
        sx: {
          '& .MuiDayCalendar-weekDayLabel': {
            color: theme.palette.text.primary, // ? week day label font color
          },
        },
      },
    },
  },
  light: {},
});
