import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { Theme } from '@mui/material/styles';

export default function componentStyleOverrides(
  theme: Theme,
  borderRadius: number
) {
  const menuSelectedBack = theme.palette.primaryHover;
  const menuSelected = theme.palette.secondaryHover;

  return {
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: theme.palette.text.primary,
          backgroundColor: 'transparent',
          '&::placeholder': {
            color: theme.palette.text.primary,
            fontSize: '0.875rem',
          },
          '&.Mui-disabled': {
            color: theme.palette.text.disabled,
            backgroundColor: theme.palette.action.disabledBackground,
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '--TextField-brandBorderColor': '#E0E3E7',
          '--TextField-brandBorderHoverColor': '#B2BAC2',
          '--TextField-brandBorderFocusedColor': 'white',
          '& label.Mui-focused': {
            color: 'var(--TextField-brandBorderFocusedColor)',
          },
          '& label': {
            color: 'var(--TextField-brandBorderFocusedColor)',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: 'var(--TextField-brandBorderColor)',
        },
        root: {
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: 'var(--TextField-brandBorderHoverColor)',
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: 'var(--TextField-brandBorderFocusedColor)',
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            color: 'var(--TextField-brandBorderFocusedColor)',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'white',
          '&.Mui-focused': { color: 'white' },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          fontWeight: 600,
          backgroundColor: 'transparent',
          color: theme.palette.primary.contrastText,
          borderRadius: '8.125rem',
          border: `1px solid ${theme.palette.text.primary}`,
          paddingLeft: '19px',
          paddingRight: '19px',
          height: '2.953125rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: theme.palette.primary.dark,
          },
        },
        outlined: {
          fontWeight: 600,
          backgroundColor: 'transparent',
          color: theme.palette.text.primary,
          borderRadius: '8.125rem',
          border: `1px solid ${theme.palette.text.primary}`,
          paddingLeft: '19px',
          paddingRight: '19px',
          height: '2.953125rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
            borderColor: theme.palette.primary.main,
          },
        },
        text: {
          color: theme.palette.text.primary,
        },
        startIcon: {
          marginRight: '0.5rem',
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.text.primary,
          fontSize: '1.15rem',
          borderRadius: '1rem',
        },
        endIcon: {
          marginLeft: '0.5rem',
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
            borderRadius: '2rem',
            width: '90%',
            marginLeft: '3px',
            '&:hover': {
              backgroundColor: menuSelectedBack,
              borderRadius: '2rem',
              width: '90%',
              marginLeft: '3px',
            },
            '& .MuiListItemIcon-root': {
              color: menuSelected,
            },
            '& .MuiListItemText-primary': {
              color: theme.palette.text.secondary,
            },
          },
          '&:hover': {
            backgroundColor: menuSelectedBack,
            '& .MuiListItemIcon-root': {
              color: menuSelected,
            },
            '& .MuiListItemText-primary': {
              color: theme.palette.text.secondary,
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
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: theme.palette.text.primary,
          opacity: 1,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {},
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          color: theme.palette.primary.main,
          background: theme.palette.text.primary,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: '0.7rem',
          marginBottom: '0.625rem',
          whiteSpace: 'noWrap',
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
          whiteSpace: 'nowrap',
          borderRadius: '9.25rem',
          marginTop: '0.5rem',
          marginLeft: '0.625rem',
          width: '7.5rem',
          height: '2.753125rem',
          padding: '0.4rem 1rem 0.4rem 1rem',
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
    MuiTabPanel: {
      styleOverrides: {
        root: {
          padding: 0,
          paddingLeft: '1.25rem',
          paddingTop: '1rem',
          paddingRight: '.8rem',
        },
      },
    },
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

    MuiDialog: {
      styleOverrides: {
        paper: {
          padding: '0.75rem 0 0.75rem 0',
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
    MuiTable: {
      styleOverrides: {
        root: {
          width: '100%',
          borderSpacing: 0,
          borderCollapse: 'collapse',
          // maxWidth: '67.5rem',
          variants: [],
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          height: '4.475rem',
          fontWeight: 700,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(even)': {
            backgroundColor: theme.palette.action.hover,
          },
          '&:hover': {
            backgroundColor: theme.palette.action.selected,
          },
          color: theme.palette.text.primary,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: theme.palette.text.primary,
          paddingLeft: '2.5rem',
          color: theme.palette.text.primary,

          '&.MuiTableCell-head': {
            fontSize: '0.975rem',
            color: theme.palette.text.primary,
            background: theme.palette.primary.main,
            fontWeight: 700,
            whiteSpace: 'nowrap',
          },
          '&.MuiTableCell-body': {
            fontSize: '0.875rem',
            fontWeight: 400,
            opacity: 0.9,
            paddingTop: '5px',
            paddingBottom: '5px',
            '&:hover': {
              opacity: 1,
            },
            '&:last-child': {
              textAlign: 'left',
              fontWeight: 600,
              opacity: 1,
            },
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          '& tr:last-child td': {
            borderBottom: 'none', // Remove border from the last row
          },
          '& td:last-child td': {
            opacity: 1,
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          opacity: 1,
        },
      },
    },
    // MuiTooltip: {
    //   styleOverrides: {
    //     tooltip: {
    //       color: theme.palette.background.paper,
    //       background: theme.palette.text.primary,
    //     },
    //   },
    // },

    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '1.25rem',
        },
      },
    },
  };
}
