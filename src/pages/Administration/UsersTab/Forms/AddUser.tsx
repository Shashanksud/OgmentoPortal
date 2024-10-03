import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { postData } from '@/services/axiosWrapper/fetch';
import { textFieldStyles, selectMenuItemStyles } from './addUserStyle';

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

  const theme = useTheme();

  const handleOnClose = (): void => {
    onClose(true);
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const response = await postData('/userDetails', values);
      console.log('Form submitted successfully:', response);
      onClose(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
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
              <TextField label="Outlined secondary" color="secondary" focused />
              <TextField
                name="name"
                label="Name"
                variant="outlined"
                fullWidth
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                InputProps={textFieldStyles(theme).InputProps}
                InputLabelProps={textFieldStyles(theme).InputLabelProps}
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
                InputProps={textFieldStyles(theme).InputProps}
                InputLabelProps={textFieldStyles(theme).InputLabelProps}
              />

              <FormControl fullWidth variant="outlined">
                <InputLabel sx={textFieldStyles(theme).InputLabelProps}>
                  Select Group
                </InputLabel>
                <Select
                  name="group"
                  value={values.group}
                  onChange={handleChange}
                  label="Select Group"
                  error={touched.group && Boolean(errors.group)}
                >
                  <MenuItem value="Admin" sx={selectMenuItemStyles(theme)}>
                    Admin
                  </MenuItem>
                  <MenuItem value="Manager" sx={selectMenuItemStyles(theme)}>
                    Manager
                  </MenuItem>
                  <MenuItem value="User" sx={selectMenuItemStyles(theme)}>
                    User
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth variant="outlined">
                <InputLabel sx={textFieldStyles(theme).InputLabelProps}>
                  Select Role
                </InputLabel>
                <Select
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  label="Select Role"
                  error={touched.role && Boolean(errors.role)}
                >
                  <MenuItem
                    value="Super Admin"
                    sx={selectMenuItemStyles(theme)}
                  >
                    Super Admin
                  </MenuItem>
                  <MenuItem value="Admin" sx={selectMenuItemStyles(theme)}>
                    Admin
                  </MenuItem>
                  <MenuItem value="User" sx={selectMenuItemStyles(theme)}>
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
                InputProps={textFieldStyles(theme).InputProps}
                InputLabelProps={textFieldStyles(theme).InputLabelProps}
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
                InputProps={textFieldStyles(theme).InputProps}
                InputLabelProps={textFieldStyles(theme).InputLabelProps}
              />

              <FormControl fullWidth variant="outlined">
                <InputLabel sx={textFieldStyles(theme).InputLabelProps}>
                  Select City
                </InputLabel>
                <Select
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  label="Select City"
                  error={touched.city && Boolean(errors.city)}
                >
                  <MenuItem value="Delhi" sx={selectMenuItemStyles(theme)}>
                    Delhi
                  </MenuItem>
                  <MenuItem value="Bangalore" sx={selectMenuItemStyles(theme)}>
                    Bangalore
                  </MenuItem>
                  <MenuItem value="Chandigarh" sx={selectMenuItemStyles(theme)}>
                    Chandigarh
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth variant="outlined">
                <InputLabel sx={textFieldStyles(theme).InputLabelProps}>
                  Select Sales Center
                </InputLabel>
                <Select
                  name="salesCenter"
                  value={values.salesCenter}
                  onChange={handleChange}
                  label="Select Sales Center"
                  error={touched.salesCenter && Boolean(errors.salesCenter)}
                >
                  <MenuItem value="Delhi" sx={selectMenuItemStyles(theme)}>
                    Delhi
                  </MenuItem>
                  <MenuItem value="Bangalore" sx={selectMenuItemStyles(theme)}>
                    Bangalore
                  </MenuItem>
                  <MenuItem value="Chandigarh" sx={selectMenuItemStyles(theme)}>
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