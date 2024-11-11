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
    label: {
      color: theme.palette.text.primary,
      opacity: '0.6',
      fontSize: '14px',
      '&.Mui-focused': {
        color: theme.palette.text.primary,
        opacity: '1',
      },
      '&.Mui-error': {
        color: theme.palette.error.main,
      },
      '&.MuiInputLabel-shrink': {
        color: theme.palette.text.primary,
        fontSize: '12px',
      },
    },
    MenuProps: {
      PaperProps: {
        sx: {
          bgcolor: '#333',
          color: theme.palette.text.primary,
          '& .MuiCheckbox-root': {
            color: '#fff',
          },
          '& .MuiMenuItem-root': {
            '&.Mui-selected': {
              backgroundColor: '#666',
              color: '#fff',
            },
            '&.Mui-selected:hover': {
              backgroundColor: '#444',
            },
          },
        },
      },
    },
    select: {
      '.MuiSvgIcon-root': {
        color: theme.palette.text.primary,
      },
      '.MuiOutlinedInput-input': {
        color: theme.palette.text.primary,
        paddingTop: '15px',
        paddingBottom: '15px',
      },
      '.MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.background.default,
        borderRadius: '24px',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.focusBorder,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.focusBorder,
      },
      '& .MuiSelect-icon': {
        color: theme.palette.text.primary,
      },
      '& .MuiSelect-selectMenu': {
        color: theme.palette.text.primary,
      },
    },
  },

  light: {
    boxShadow:
      'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',

    label: {
      color: theme.palette.text.secondary,
      opacity: '0.6',
      fontSize: '14px',
      '&.Mui-focused': {
        color: theme.palette.text.primary,
        marginTop: '2px',
        opacity: '1',
      },
      '&.Mui-error': {
        color: theme.palette.error.main,
      },
      '&.MuiInputLabel-shrink': {
        color: theme.palette.text.secondary,
        fontSize: '14px',
      },
    },
    select: {
      '&.MuiSvgIcon-root': {},
      '.MuiOutlinedInput-input': {
        color: theme.palette.secondary.main,
        paddingTop: '10px',
        paddingBottom: '14px',
      },
      '.MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
        borderRadius: '24px',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.focusBorder,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.focusBorder,
      },
      '& .MuiSelect-icon': {
        color: theme.palette.primary.main,
      },
      '& .MuiSelect-selectMenu': {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.text.primary,
      },
    },
  },
});

export const CustomInput = (theme: Theme) => ({
  dark: {
    input: {
      fontSize: '14px',
      paddingTop: '15px',
      paddingBottom: '15px',
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
      borderRadius: '25px',
    },

    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.text.primary,
        borderRadius: '25px',
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
  light: {
    input: {
      color: theme.palette.secondary.main,
      fontSize: '14px',
      paddingTop: '12px',
      paddingBottom: '12px',
    },
    label: {
      color: theme.palette.secondary.main,
      opacity: '0.6',
      '&.Mui-focused': {
        opacity: '1',
        color: theme.palette.secondary.main,
      },
      '&.MuiInputLabel-shrink': {
        color: theme.palette.secondary.main,
      },
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.secondary.main,
        borderRadius: '25px',
      },
      '&:hover fieldset': {
        borderColor: theme.palette.focusBorder,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.focusBorder,
        opacity: '1',
      },
    },
    '& input:-webkit-autofill': {
      WebkitBoxShadow: `0 0 0 100px #f5f5f5 inset`,
      WebkitTextFillColor: theme.palette.secondary.main,
      transition: 'background-color 5000s ease-in-out 0s',
      fontSize: '0.8rem',
      borderRadius: '25px',
      '&.Mui-focused': {
        opacity: '1',
        color: theme.palette.secondary.main,
      },
    },
    '& .MuiFormHelperText-root': {
      color: theme.palette.error.main,
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
