import { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { postData } from '@/services/axiosWrapper/fetch';
import {
  LoginProps,
  LoginRequestModel,
  LoginResponseModel,
} from '@/Interfaces/Props/props';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { loginStyles } from './loginStyles';
import Logo from '../../assets/Login/WebsiteLogo.svg';

function LoginPage({ onLogin }: LoginProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
    // .min(6, 'Password must be at least 6 characters'),
  });

  const handleSubmit = async (values: LoginRequestModel) => {
    setLoading(true);
    setError('');
    const existedToken = localStorage.getItem('authToken');
    if (existedToken) {
      onLogin(true);
      navigate('/');
    } else {
      try {
        await postData<LoginRequestModel, LoginResponseModel>(
          '/api/Auth/login',
          values,
          {
            'Content-Type': 'application/json',
          },
          false
        ).then((data: LoginResponseModel) => {
          const { token } = data;
          if (token) {
            localStorage.setItem('authToken', token);
            onLogin(true);
          } else {
            setError('Invalid credentials. Please try again.');
          }
        });
        navigate('/');
      } catch (err) {
        setError('Invalid credentials. Please try again.');
        onLogin(false);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box sx={loginStyles.container}>
      <Box sx={loginStyles.innerContainer}>
        <Box component="img" src={Logo} sx={loginStyles.logo} />

        <Box sx={loginStyles.formWrapper}>
          <Typography variant="h3" sx={loginStyles.heading} gutterBottom>
            Sign In
          </Typography>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur, errors, touched }) => (
              <Form>
                <Field
                  as={TextField}
                  name="email"
                  label="Email address"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={loginStyles.textField}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />

                <Field
                  as={TextField}
                  name="password"
                  label="Password"
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  margin="normal"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={loginStyles.textField}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handlePasswordVisibility}>
                          {showPassword ? (
                            <VisibilityOff
                              sx={loginStyles.visibilityIconColor}
                            />
                          ) : (
                            <Visibility sx={loginStyles.visibilityIconColor} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />

                {error && (
                  <Typography color="error" variant="body2" align="center">
                    {error}
                  </Typography>
                )}

                <Box sx={loginStyles.formControlLabel}>
                  <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label="Remember me"
                  />
                  <Typography variant="body2" color="primary">
                    Forgot Password?
                  </Typography>
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={loginStyles.submitButton}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>

        <Typography variant="body2" sx={loginStyles.footerText}>
          Subject to the Privacy Policy and Terms of Service.
        </Typography>
      </Box>
    </Box>
  );
}

export default LoginPage;
