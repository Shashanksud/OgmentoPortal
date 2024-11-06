import { Theme } from '@mui/material';

const commonFlexCenter = {
  display: 'flex',
  alignItems: 'center',
};

const commonButtonStyles = {
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

const categoryStyles = (theme: Theme) => ({
  categoryBox1: {
    ...commonFlexCenter,
    flexDirection: 'column',
  },
  categoryBox1ChildImg: {
    width: '100%',
    maxWidth: 400,
  },
  mainCategoryAddButton: {
    border: '3px dashed',
    marginTop: theme.spacing(2),
  },
  categoryParentContainer: {
    width: '64rem',
    maxWidth: '64rem',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 0,
    padding: 0,
  },
  sectionContainer: {
    width: '19.5rem',
    maxWidth: '19.5rem',
    height: '38rem',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '0.8rem',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: theme.shadows[3],
    overflowY: 'auto',
    marginRight: '2rem',
  },
  categoryContainerItem: {
    ...commonFlexCenter,
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    cursor: 'pointer',
    borderRadius: '0.6rem',
  },
  categoryContainerItemText: {
    fontWeight: 600,
    fontSize: '1rem',
  },
  sectionContainerChild: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },

  categoryAddIcon: {
    borderRadius: '1rem',
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.primary.main,
    marginBottom: '0.5rem',
    marginLeft: '0.5rem',
    cursor: 'pointer',
  },
  addCategoryModalContainer: {
    ...modalContainerStyles,
    width: '450px',
    backgroundColor: '#ffffff',
    padding: theme.spacing(3),
  },
  addCategoryModalContentContainer: {
    ...commonFlexCenter,
    justifyContent: 'space-between',
    color: theme.palette.primary.main,
    marginBottom: '2rem',
  },
  addModalSubmitButton: {
    ...commonButtonStyles,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.primary.main,
  },
  addModalCancelBtn: {
    ...commonButtonStyles,
    color: theme.palette.primary.main,
    backgroundColor: '#DBDBDB',
  },
  addModalBtnContainer: {
    width: '46%',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(3),
    marginLeft: '50%',
  },
  addModalTitle: {
    color: theme.palette.primary.main,
    fontSize: '1.4rem',
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
    ...commonButtonStyles,
    color: theme.palette.primary.main,
    backgroundColor: '#DBDBDB',
  },
  deleteModalConfirmButton: {
    ...commonButtonStyles,
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
  addSectionButton: {
    border: '3px dashed',

    writingMode: 'vertical-rl',
    wordOrientation: 'upright',
    height: '9rem',
    width: 'auto',
  },
});

export { categoryStyles };
