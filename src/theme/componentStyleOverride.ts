import { Theme } from '@mui/material/styles';

export default function componentStyleOverrides(
  theme: Theme,
  borderRadius: number
) {
  const menuSelectedBack = theme.palette.text.primary;
  const menuSelected = theme.palette.primary.main;

  return {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          backgroundColor: 'transparent',
          color: theme.palette.text.primaryTextMain,
          borderRadius: '9.25rem',
          border: `1px solid ${theme.palette.divider}`,
          height: '2.853125rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: `${borderRadius}px`,
        },
      },
    },
    // MuiCardHeader: {
    //   styleOverrides: {
    //     root: {
    //       color: theme.palette.text.dark,
    //       padding: '24px',
    //     },
    //     title: {
    //       fontSize: '1.125rem',
    //     },
    //   },
    // },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '24px',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          alignItems: 'center',
        },
        outlined: {
          border: '1px dashed',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
          paddingTop: '10px',
          paddingBottom: '10px',
          '&.Mui-selected': {
            color: menuSelected,
            backgroundColor: menuSelectedBack,
            '&:hover': {
              backgroundColor: menuSelectedBack,
            },
            '& .MuiListItemIcon-root': {
              color: menuSelected,
            },
          },
          '&:hover': {
            backgroundColor: menuSelectedBack,
            color: menuSelected,
            '& .MuiListItemIcon-root': {
              color: menuSelected,
            },
            '& .MuiListItemText-primary': {
              color: theme.palette.text.primary,
            },
          },
        },
      },
    },

    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
          minWidth: '36px',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: theme.palette.text.primary,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: theme.palette.text.primary,
          backgroundColor: 'transparent',
          '&::placeholder': {
            color: theme.palette.text.primary,
            fontSize: '0.875rem',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          border: `1px solid ${theme.palette.primary.light}`,
          backgroundColor: 'transparent',
          borderRadius: '1.5rem',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.text.primary,
            border: `1px solid ${theme.palette.text.primary}`,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
          },
          '&.MuiInputBase-multiline': {
            padding: 1,
          },
        },
        input: {
          fontWeight: 500,
          backgroundColor: 'transparent',
          padding: '15.5px 14px',
          '&.MuiInputBase-inputSizeSmall': {
            padding: '10px 14px',
            '&.MuiInputBase-inputAdornedStart': {
              paddingLeft: 0,
            },
          },
        },
        inputAdornedStart: {
          paddingLeft: 4,
        },
        notchedOutline: {
          borderRadius: '5rem',
        },
      },
    },

    MuiSlider: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: theme.palette.grey[300],
          },
        },
        mark: {
          backgroundColor: theme.palette.background.paper,
          width: '4px',
        },
        valueLabel: {
          color: theme.palette.primary.light,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiAutocomplete-tag': {
            background: theme.palette.secondary.light,
            borderRadius: 4,
            color: theme.palette.text.primary,
            '.MuiChip-deleteIcon': {
              color: theme.palette.secondary.light,
            },
          },
        },
        popper: {
          borderRadius: `${borderRadius}px`,
          boxShadow:
            '0px 8px 10px -5px rgb(0 0 0 / 20%), 0px 16px 24px 2px rgb(0 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 12%)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: theme.palette.divider,
          opacity: 1,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          '&:focus': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          /** checked not prop
           *"&.Mui-checked": {
           *    fontSize: "28px"
           *}
           */
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          color: theme.palette.primary.dark,
          background: theme.palette.primary.light,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-deletable .MuiChip-deleteIcon': {
            color: 'inherit',
          },
        },
      },
    },
    MuiTimelineContent: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
          fontSize: '1rem',
        },
      },
    },
    MuiTreeItem: {
      styleOverrides: {
        label: {
          marginTop: 14,
          marginBottom: 14,
        },
      },
    },
    MuiTimelineDot: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiInternalDateTimePickerTabs: {
      styleOverrides: {
        tabs: {
          backgroundColor: theme.palette.text.primary,
          '& .MuiTab-root': {
            textTransform: 'none',
            '&.Mui-selected': {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.primary.main,
              fontWeight: '900',
            },
            '&.Mui-disabled': {
              backgroundColor: theme.palette.primary.dark,
            },
          },
          '& .Mui-selected': {
            color: theme.palette.primaryHover,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: '0.7rem',
          marginBottom: '0.625rem',
        },
        indicator: {
          display: 'none',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            background: theme.palette.text.primary,
          },
          borderRadius: '9.25rem',
          border: '0.03125rem 0.03125rem 0rem 0.03125rem',
          marginTop: '0.5rem',
          marginLeft: '0.625rem',
          width: '7.5rem',
          height: '2.753125rem',
          marginBottom: '0.5rem',
          color: theme.palette.text.primary,
          fontSize: '1rem',
          backgroundColor: theme.palette.primary.main,
        },
        wrapper: {
          flexDirection: 'row',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          padding: '0.75rem 0 0.75rem 0',
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.secondary.main,
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          width: '67.5rem',
          height: '4.475rem',
          marginTop: '16.75rem',
          marginLeft: '19rem',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: theme.palette.grey[300],
          height: '1rem',
          width: '60.4375rem',
          marginTop: '19.3125rem',
          marginLeft: '21.8125rem',
          paddingLeft: '2.5rem',

          '&.MuiTableCell-head': {
            fontSize: '0.875rem',
            color: theme.palette.text.primary,
            background: theme.palette.primary.main,
            fontWeight: 600,
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: theme.palette.background.paper,
          background: theme.palette.text.primary,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '1.25rem',
        },
      },
    },
  };
}
