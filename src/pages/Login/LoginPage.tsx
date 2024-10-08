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
import { loginStyles } from './login';
import Logo from '../../assets/Login/WebsiteLogo.svg';

interface LoginProps {
  onLogin(status: boolean): void;
}
interface LoginResponseModel {
  token: string;
}

export interface LoginRequestModel {
  email: string;
  password: string;
}
function LoginPage({ onLogin }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await postData<LoginRequestModel, LoginResponseModel>(
        '/api/Auth/login',
        {
          email,
          password,
        },
        false
      ).then((data: LoginResponseModel) => {
        const { token } = data;
        localStorage.setItem('authToken', token);
      });
      onLogin(true);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      onLogin(false);
    } finally {
      setLoading(false);
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

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email address"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={loginStyles.textField}
            />

            <TextField
              label="Password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={loginStyles.textField}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handlePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
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
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </Box>
        <Typography variant="body2" sx={loginStyles.footerText}>
          Subject to the Privacy Policy and Terms of Service.
        </Typography>
      </Box>
    </Box>
  );
}

export default LoginPage;
