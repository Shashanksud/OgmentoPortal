import { Theme } from '@mui/material';
import {
  CustomInput,
  CustomSelect,
  globalStyles,
} from '@/GlobalStyles/sharedStyles';

export const productStyles = (theme: Theme) => ({
  modalContainerStyles: {
    ...globalStyles(theme).modalContainerStyles,
  },
  inputBox: {
    ...CustomInput(theme),
  },
  inputSelectBox: {
    ...CustomSelect(theme).light,
  },
  productModalTitle: {
    color: theme.palette.primary.main,
    fontSize: '1.5rem',
  },
  inputAdornment: {
    ...globalStyles(theme).inputAdornment,
  },
  tablePaper: {
    ...globalStyles(theme).tablePaper,
  },
  editIcon: {
    ...globalStyles(theme).editIcon,
  },
  deleteIcon: {
    ...globalStyles(theme).deleteIcon,
  },
  deleteModalContainer: {
    ...globalStyles(theme).deleteModalBtnContainer,
  },
  deleteModalCancelIcon: {
    ...globalStyles(theme).deleteModalCancelIcon,
  },
  deleteModalConfirmText: {
    ...globalStyles(theme).deleteModalConfirmText,
  },
  deleteModalBtnContainer: {
    ...globalStyles(theme).deleteModalBtnContainer,
  },
  deleteModalCancelButton: {
    ...globalStyles(theme).deleteModalCancelButton,
  },
  deleteModalConfirmButton: {
    ...globalStyles(theme).deleteModalConfirmButton,
  },
});
