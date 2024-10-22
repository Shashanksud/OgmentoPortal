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
