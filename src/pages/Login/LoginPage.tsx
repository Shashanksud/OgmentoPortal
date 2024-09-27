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

interface LoginProps {
  onLogin(status: boolean): void;
}

function LoginPage({ onLogin }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
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
      navigate('/');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      onLogin(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
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
          opacity: 0.6,
          zIndex: -1,
        },
      }}
    >
      <Box
        sx={{
          marginLeft: '3rem',
        }}
      >
        <Box
          component="img"
          src={Logo}
          sx={{ marginBottom: '1rem', marginLeft: '2rem' }}
        />

        <Box
          sx={{
            width: '75%',
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[3],
            padding: '2rem',
            borderRadius: '8px',
            textAlign: 'center',
            color: theme.palette.common.black,
          }}
        >
          <Typography variant="h3" gutterBottom>
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
            />

            <TextField
              label="Password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '1rem',
              }}
            >
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
              sx={{
                marginTop: '1.5rem',
                background: theme.palette.common.black,
                color: theme.palette.common.white,
              }}
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </Box>
        <Typography
          variant="body2"
          sx={{ marginTop: '1rem', marginLeft: '2rem' }}
        >
          Subject to the Privacy Policy and Terms of Service.
        </Typography>
      </Box>
    </Box>
  );
}

export default LoginPage;
