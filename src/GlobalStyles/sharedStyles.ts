import { TextFieldVariants, Theme } from '@mui/material';

const buttonStyles = {
  width: '6.2rem',
  padding: 0,
  height: '2.6rem',
};
export const globalStyles = (theme: Theme) => ({
  listHeaderBox: {
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

  tablePaper: {
    width: '100%',
    overflow: 'hidden',
  },

  editIcon: {
    color: theme.palette.text.primary,
  },
  deleteIcon: {
    color: theme.palette.text.primary,
  },

  modalContainerStyles: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: 1,
    backgroundColor: theme.palette.text.primary,
  },
  deleteModalContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    borderRadius: 1,
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
});

export const CustomSelect = (theme: Theme) => ({
  dark: {
    borderRadius: '25px',
    boxShadow:
      'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',

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
    borderRadius: '25px',
    boxShadow:
      'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',

    label: {
      color: '#0000008a', // ? Initial label color
      fontSize: '14px',
      height: '0.8rem',
      padding: '0px',
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
    '& input:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px #ffffff9e inset', // Background color on autofill
      WebkitTextFillColor: '#000000', // Text color on autofill
      transition: 'background-color 5000s ease-in-out 0s', // Prevents flashing effect
      fontSize: '0.8rem',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#fff', // ? Default border color
        borderRadius: '25px',
        boxShadow:
          'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',
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
      height: '0.8rem',
      fontSize: '0.7rem',
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
        borderRadius: '25px',
        boxShadow:
          'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',
      },
      '&:hover fieldset': {
        borderColor: '#90caf9', // ? Border color on hover
      },
      '&.Mui-focused fieldset': {
        borderColor: '#90caf9', // ? Border color when focused
      },
    },
    '& input:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px #f5f5f5 inset', // Background color on autofill
      WebkitTextFillColor: '#000', // Text color on autofill
      transition: 'background-color 5000s ease-in-out 0s', // Prevents flashing effect
      fontSize: '0.8rem',
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
        height: '0.8rem',
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
  light: {
    sx: {
      input: {
        color: theme.palette.primary.main,
      },
      label: {
        color: theme.palette.primary.main,
        '&.MuiInputLabel-shrink': {
          color: theme.palette.primary.main,
        },
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: theme.palette.primary.main,
        },
        '&:hover fieldset': {
          borderColor: theme.palette.primary.light,
        },
        '&.Mui-focused fieldset': {
          borderColor: theme.palette.primary.light,
        },
      },
      '& .MuiFormHelperText-root': {
        color: theme.palette.error.main,
      },
    },
    slotProps: {
      textField: {
        variant: 'outlined' as TextFieldVariants,
        input: {
          color: theme.palette.primary.main,
        },
        InputProps: {
          sx: {
            '& .MuiSvgIcon-root': {
              color: theme.palette.primary.main, // Icon color for date picker trigger icon
            },
          },
        },
      },
      layout: {
        sx: {
          backgroundColor: theme.palette.primary.main, // Primary background color for calendar popup
          color: theme.palette.common.white, // Default text color in calendar
          '& .MuiDayCalendar-weekDayLabel': {
            color: theme.palette.common.white, // White color for weekday labels
          },
          '& .MuiPickersDay-root': {
            color: theme.palette.common.white, // White text for day numbers
            backgroundColor: theme.palette.primary.main, // Primary background for calendar days
            '&.Mui-selected': {
              backgroundColor: theme.palette.primary.light, // Lighter background for selected day
              color: theme.palette.common.white, // White text for selected day
            },
            '&:hover': {
              backgroundColor: theme.palette.primary.dark, // Darker hover color for days
              color: theme.palette.common.white, // White text on hover
            },
          },
          '& .MuiPickersCalendarHeader-label': {
            color: theme.palette.common.white, // White color for month/year header
          },
          '& .MuiPickersCalendarHeader-iconButton': {
            color: theme.palette.common.white, // White color for navigation arrows
            '&:hover': {
              backgroundColor: theme.palette.primary.light, // Light background on hover for navigation icons
            },
          },
          '& .MuiPickersYear-yearButton, & .MuiPickersMonth-root': {
            color: theme.palette.common.white, // White color for year/month selection
            '&.Mui-selected': {
              backgroundColor: theme.palette.primary.light, // Selected background color for year/month
              color: theme.palette.common.white, // White text for selected year/month
            },
          },
        },
      },
    },
  },
});
