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
    marginBottom: '10px',
    ...CustomInput(theme).light,
  },
  productDescriptionInputBox: {
    ...CustomInput(theme).light,
    width: '98.6%',
    marginTop: '15px',
    color: theme.palette.primary.main,
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

  deleteModalCancelIcon: {
    ...globalStyles(theme).deleteModalCancelIcon,
  },
});
