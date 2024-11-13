import { Theme } from '@mui/material';
import { CustomInput, globalStyles } from '@/GlobalStyles/globalStyles';

export const productTabStyles = (theme: Theme) => ({
  productSearchContainer: {
    height: '9rem',
    padding: '1rem',
    backgroundColor: '#2c2c2c',
    borderRadius: '0.8rem',
    paddingRight: '2rem',
    marginTop: '-1.2rem',
  },
  productSearchText: {
    marginBottom: '6px',
    marginLeft: '10px',
    fontSize: '1.1rem',
  },
  searchInputFieldContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchClearQueryIcon: {
    color: theme.palette.text.primary,
    cursor: 'pointer',
  },
  productHeaderContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1.5rem',
    marginBottom: 1,
  },
  productHeaderText: { fontSize: '1.4rem', marginLeft: '3px' },
  noImageText: { fontSize: '14px', color: '#666' },

  inputAdornment: {
    ...globalStyles(theme).inputAdornment,
  },
});
export const productFormStyles = (theme: Theme) => ({
  loaderContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    marginTop: '5rem',
  },
  loaderText: { marginTop: '1rem', color: 'text.secondary' },
  errorContainer: { display: 'flex', justifyContent: 'center', mt: 3 },
  formContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2,1fr)',
    columnGap: '1.5rem',
    rowGap: '1.5rem',
  },
  imagePreviewContainer: {
    position: 'relative',
    width: '60px',
    height: '60px',
    border: '1px solid #2c2c2c',
    borderRadius: '8px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageFormContainer: {
    width: '60px',
    height: '60px',
    border: '2px dashed #2c2c2c',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  inputFormIcon: { fontSize: 40, color: '#2c2c2c' },
  productDescriptionInputBox: {
    ...CustomInput(theme).light,
    width: '98.6%',
    marginTop: '1.5rem',
    color: theme.palette.primary.main,
    maxHeight: '70px',
    '& .MuiInputBase-input': {
      color: theme.palette.secondary.main,
    },
  },
  formFooterContainer: {
    width: '109%',
    marginLeft: '-1.5rem',
    borderTop: `0.6px solid ${'rgba(0,0,0,.2)'}`,
    marginTop: '1.9rem',
  },
  formButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginRight: '1.5rem',
    marginTop: '1rem',
  },
});
