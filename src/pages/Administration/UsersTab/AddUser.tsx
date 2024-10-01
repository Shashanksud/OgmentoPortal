import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  useTheme,
  Box,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
  Typography,
} from '@mui/material';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  group: Yup.string().required('Group is required'),
  role: Yup.string().required('Role is required'),
  password: Yup.string().required('Password is required'),
  validityDays: Yup.number().required('Validity days are required'),
  city: Yup.string().required('City is required'),
  salesCenter: Yup.string().required('Sales Center is required'),
});

interface AddBtn {
  onClose: (value: boolean) => void;
}

function AddUser(props: AddBtn) {
  const { onClose } = props;
  const theme = useTheme();

  const initialValues = {
    name: '',
    email: '',
    group: '',
    role: '',
    password: '',
    validityDays: '365',
    city: '',
    salesCenter: '',
  };

  const textFieldStyles = {
    InputProps: {
      sx: {
        '& input::placeholder': {
          color: theme.palette.text.primary, // Default placeholder color
        },
        '&.Mui-focused input::placeholder': {
          color: theme.palette.text.primary, // Placeholder color on focus
        },
      },
    },
    InputLabelProps: {
      sx: {
        color: theme.palette.text.primary, // Default label color
        '&.Mui-focused': {
          color: theme.palette.text.primary, // Label color on focus
          fontSize: '1.2rem', // Slightly larger font on focus
        },
      },
    },
  };

  const selectMenuItemStyles = {
    '& .MuiSelect-select': {
      backgroundColor: '#000',
      color: '#fff',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#fff',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#fff',
    },

    '& .MuiMenuItem-root': {
      backgroundColor: '#000',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#333',
        color: '#fff',
      },
    },

    '& .Mui-selected': {
      backgroundColor: '#000',
      color: '#fff',
    },
    '& .Mui-selected:hover': {
      backgroundColor: '#333',
      color: '#fff',
    },

    '&:hover .MuiSelect-select': {
      backgroundColor: '#000',
      color: '#fff',
    },
  };

  const handleOnClose = (): void => {
    onClose(true);
  };

  const handleSubmit = (values: typeof initialValues) => {
    console.log('Form data:', values);
    onClose(true);
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h3">Add/Edit User</Typography>
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange }) => (
          <Form>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                gap: 2,
              }}
            >
              <TextField
                name="name"
                label="Name"
                variant="outlined"
                fullWidth
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                InputProps={textFieldStyles.InputProps}
                InputLabelProps={textFieldStyles.InputLabelProps}
              />

              <TextField
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                InputProps={textFieldStyles.InputProps}
                InputLabelProps={textFieldStyles.InputLabelProps}
              />

              <FormControl fullWidth variant="outlined">
                <InputLabel sx={textFieldStyles.InputLabelProps}>
                  Select Group
                </InputLabel>
                <Select
                  name="group"
                  value={values.group}
                  onChange={handleChange}
                  label="Select Group"
                  error={touched.group && Boolean(errors.group)}
                >
                  <MenuItem value="Admin" sx={selectMenuItemStyles}>
                    Admin
                  </MenuItem>
                  <MenuItem value="Manager" sx={selectMenuItemStyles}>
                    Manager
                  </MenuItem>
                  <MenuItem value="User" sx={selectMenuItemStyles}>
                    User
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth variant="outlined">
                <InputLabel sx={textFieldStyles.InputLabelProps}>
                  Select Role
                </InputLabel>
                <Select
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  label="Select Role"
                  error={touched.role && Boolean(errors.role)}
                >
                  <MenuItem value="Super Admin" sx={selectMenuItemStyles}>
                    Super Admin
                  </MenuItem>
                  <MenuItem value="Admin" sx={selectMenuItemStyles}>
                    Admin
                  </MenuItem>
                  <MenuItem value="User" sx={selectMenuItemStyles}>
                    User
                  </MenuItem>
                </Select>
              </FormControl>

              <TextField
                name="password"
                label="Password"
                variant="outlined"
                fullWidth
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                type="password"
                InputProps={textFieldStyles.InputProps}
                InputLabelProps={textFieldStyles.InputLabelProps}
              />

              <TextField
                name="validityDays"
                label="Validity days"
                variant="outlined"
                fullWidth
                value={values.validityDays}
                onChange={handleChange}
                error={touched.validityDays && Boolean(errors.validityDays)}
                helperText={touched.validityDays && errors.validityDays}
                InputProps={textFieldStyles.InputProps}
                InputLabelProps={textFieldStyles.InputLabelProps}
              />

              <FormControl fullWidth variant="outlined">
                <InputLabel sx={textFieldStyles.InputLabelProps}>
                  Select City
                </InputLabel>
                <Select
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  label="Select City"
                  error={touched.city && Boolean(errors.city)}
                >
                  <MenuItem value="Delhi" sx={selectMenuItemStyles}>
                    Delhi
                  </MenuItem>
                  <MenuItem value="Bangalore" sx={selectMenuItemStyles}>
                    Bangalore
                  </MenuItem>
                  <MenuItem value="Chandigarh" sx={selectMenuItemStyles}>
                    Chandigarh
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth variant="outlined">
                <InputLabel sx={textFieldStyles.InputLabelProps}>
                  Select Sales Center
                </InputLabel>
                <Select
                  name="salesCenter"
                  value={values.salesCenter}
                  onChange={handleChange}
                  label="Select Sales Center"
                  error={touched.salesCenter && Boolean(errors.salesCenter)}
                >
                  <MenuItem value="Delhi" sx={selectMenuItemStyles}>
                    Delhi
                  </MenuItem>
                  <MenuItem value="Bangalore" sx={selectMenuItemStyles}>
                    Bangalore
                  </MenuItem>
                  <MenuItem value="Chandigarh" sx={selectMenuItemStyles}>
                    Chandigarh
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button variant="outlined" onClick={handleOnClose}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default AddUser;
