import BackgroundImg from '../../assets/Login/BackgroundImageForLoginPage.png';

const loginStyles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    '::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `url(${BackgroundImg})`,
      backgroundSize: 'cover',
      opacity: 0.5,
      zIndex: -1,
    },
  },
  innerContainer: {
    marginLeft: '3rem',
  },
  logo: {
    marginLeft: '4.9em',
    marginBottom: '1rem',
  },
  formWrapper: {
    width: '75%',
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '8px',
    textAlign: 'center',
    color: '#000000',
  },
  heading: {
    color: '#000000',
    margin: 'auto',
    fontSize: '1.9rem',
    marginBottom: '1rem',
  },
  textField: {
    input: {
      color: '#333',
      padding: '12px',
      fontSize: '1rem',
    },
    '.MuiOutlinedInput-root': {
      '& fieldset': {
        border: '1.5px solid #2c2c2c',
      },
      '&:hover fieldset': {
        borderColor: '#2c2c2c',
      },
      '&.Mui-focused fieldset': {
        border: '1px solid #2c2c2c',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#2c2c2c',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#2c2c2c',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#2c2c2c',
      },
      '&:hover fieldset': {
        borderColor: '#2c2c2c',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#2c2c2c',
      },
    },
  },

  formControlLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1rem',
  },
  submitButton: {
    marginTop: '1rem',
    background: '#000000',
    color: '#ffffff',
    fontSize: '1.2rem',
  },
  footerText: {
    marginTop: '1rem',
    marginLeft: '2rem',
  },
};
export { loginStyles };
