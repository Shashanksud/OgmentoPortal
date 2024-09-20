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
import BackgroundImg from '../assets/Login/BackgroundImageForLoginPage.png';
import Logo from '../assets/Login/WebsiteLogo.svg';

interface LoginProps {
  onLogin(status: boolean): void;
}

function LoginPage({ onLogin }: LoginProps) {
  // const { onLogin } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigate();

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === 'admin@example.com' && password === 'password') {
      onLogin(true);
      navigation('/');
    } else {
      onLogin(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          height: '100vh',
          backgroundImage: `url(${BackgroundImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <Box
        position="absolute"
        top="5%"
        left="5%"
        sx={{
          width: { xs: '200px', sm: '300px', md: '300px' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px solid black',
          backgroundColor: 'white',
          padding: '3rem',
        }}
      >
        <Box component="img" sx={{ width: '130px' }} src={Logo} />
        <Typography variant="h5" align="center" gutterBottom>
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

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Remember me"
            />
            <Typography>Forget Password</Typography>
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: '1rem' }}
          >
            Sign In
          </Button>
        </form>

        <Typography variant="body2" align="center" sx={{ marginTop: '1rem' }}>
          Protected by reCAPTCHA and subject to the Privacy Policy and Terms of
          Service.
        </Typography>
      </Box>
    </>
  );
}

export default LoginPage;
