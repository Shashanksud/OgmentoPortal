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
  useTheme,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { postData } from '@/services/axiosWrapper/fetch';
import BackgroundImg from '../../assets/Login/BackgroundImageForLoginPage.png';
import Logo from '../../assets/Login/WebsiteLogo.svg';
import { loginStyles } from './login';

interface LoginProps {
  onLogin(status: boolean): void;
}

function LoginPage({ onLogin }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigate();
  const theme = useTheme();

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await postData('/login', { email, password });
      onLogin(true);
      navigation('/');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      onLogin(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        component="img"
        src={BackgroundImg}
        sx={loginStyles.backgroundImageStyles}
      />
      <Box
        sx={{
          border: '3px solid red',
          width: '400px',
          position: 'relative',
          backgroundColor: theme.palette.primary.light,
        }}
      >
        <Box component="img" src={Logo} />
        <Box>
          <Typography variant="h5">Sign In</Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email address"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handlePasswordVisibility}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {error && (
              <Typography color="error" variant="body2" align="center">
                {error}
              </Typography>
            )}

            <Box>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Remember me"
              />
              <Typography>Forget Password</Typography>
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </Box>

        <Typography variant="body2" align="center" sx={{ marginTop: '1rem' }}>
          Protected by reCAPTCHA and subject to the Privacy Policy and Terms of
          Service.
        </Typography>
      </Box>
    </>
  );
}

export default LoginPage;
