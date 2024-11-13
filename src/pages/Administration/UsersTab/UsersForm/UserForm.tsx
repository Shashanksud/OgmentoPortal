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
import useSnackbarUtils from '@/utils/Snackbar/useSnackbarUtils';

import { getData, postData, updateData } from '@/services/axiosWrapper/fetch';
import { useState, useEffect } from 'react';
import { SalesCenter, UserRoles } from '@/Interfaces/Modals/modals';
import {
  addUserEndpoint,
  salesCenterEndpoint,
  updateUserEndpoint,
} from '@/utils/Urls';
import { UserFormProps } from '@/Interfaces/Props/props';
import { CustomInput, CustomSelect } from '@/GlobalStyles/globalStyles';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  role: Yup.number().required('Role is required'),
  password: Yup.string().required('Password is required'),
  validityDays: Yup.number().required('Validity days are required'),
  city: Yup.string().required('City is required'),
  salesCenterId: Yup.string().required('Sales Center is required'),
  phoneNumber: Yup.number().required('Number is required'),
});
function UserForm(props: UserFormProps) {
  const { onClose, user, setIsEdit, onRefetchTrigger } = props;
  const { showSuccess, showError } = useSnackbarUtils();
  const theme = useTheme();
  const customInput = CustomInput(theme);
  const customSelect = CustomSelect(theme);
  const [salesCenters, setSalesCenters] = useState<SalesCenter[]>([]);
  const initialValues = {
    name: user?.userName || '',
    email: user?.emailId || '',
    role: user?.roleId || '',
    password: '',
    validityDays: user?.validityDays || '365',
    city: user?.city || '',
    salesCenterId: user?.salesCenters ? Object.keys(user.salesCenters)[0] : '',
    phoneNumber: user?.phoneNumber || '',
    kioskName: user?.kioskName,
    salesCenters: user?.salesCenters,
  };

  useEffect(() => {
    const fetchSalesCenters = async () => {
      await getData<SalesCenter[]>(salesCenterEndpoint)
        .then((response: SalesCenter[]) => {
          setSalesCenters(response);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchSalesCenters();
  }, []);

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      if (user) {
        const updateUserData = {
          userName: values.name,
          emailId: values.email,
          kioskName: values.kioskName,
          roleId: values.role,
          city: values.city,
          userUid: user.userUid,
          phoneNumber: values.phoneNumber,
          validityDays: values.validityDays,
          salesCenters: {
            [values.salesCenterId]: '',
          },
        };

        await updateData(updateUserEndpoint, updateUserData)
          .then(() => {
            setIsEdit?.(false);
            onRefetchTrigger?.();
            showSuccess('User updated successfully!');
          })
          .catch((error) => {
            showError('Failed to update user!');
            console.error('Update error:', error);
          });
      } else {
        const addUserData = {
          userName: values.name,
          emailId: values.email,
          password: values.password,
          roleId: values.role,
          city: values.city,
          phoneNumber: values.phoneNumber,
          validityDays: values.validityDays,
          salesCenterId: values.salesCenterId,
          kioskName: '',
          salesCenters: {
            [values.salesCenterId]: '',
          },
        };
        await postData(addUserEndpoint, addUserData).then(() => {
          onClose();
          showSuccess('User added successfully!');
        });
      }
    } catch (err) {
      showError('Failed to add user.');
      console.error('Error adding/updating user:', err);
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
        <Typography variant="h3">{user ? 'Edit User' : 'Add User'}</Typography>
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnBlur
        validateOnChange
        enableReinitialize
      >
        {({ values, errors, touched, handleChange }) => (
          <Form>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                gap: 4,
              }}
            >
              <TextField
                name="name"
                label="Name"
                variant="outlined"
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                sx={customInput.dark}
              />
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={customInput.dark}
              />
              <TextField
                name="phoneNumber"
                label="Phone Number"
                variant="outlined"
                value={values.phoneNumber}
                onChange={handleChange}
                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
                sx={customInput.dark}
              />
              <FormControl
                variant="outlined"
                error={touched.role && Boolean(errors.role)}
                fullWidth
              >
                <InputLabel sx={customSelect.dark.label}>
                  Select Role
                </InputLabel>
                <Select
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  label="Select Role"
                  sx={customSelect.dark.select}
                >
                  <MenuItem value={UserRoles.Admin}>Admin</MenuItem>
                  <MenuItem value={UserRoles.Support}>Support</MenuItem>
                  <MenuItem value={UserRoles.Marketing}>Marketing</MenuItem>
                </Select>
                {touched.role && errors.role && (
                  <div style={{ color: 'red' }}>{errors.role}</div>
                )}
              </FormControl>

              <FormControl variant="outlined">
                <InputLabel sx={customSelect.dark.label}>
                  Select City
                </InputLabel>
                <Select
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  label="Select City"
                  error={touched.city && Boolean(errors.city)}
                  sx={customSelect.dark.select}
                >
                  <MenuItem value="Delhi">Delhi</MenuItem>
                  <MenuItem value="Bangalore">Bangalore</MenuItem>
                  <MenuItem value="Chandigarh">Chandigarh</MenuItem>
                </Select>
              </FormControl>

              <FormControl variant="outlined">
                <InputLabel sx={customSelect.dark.label}>
                  Select Sales Center
                </InputLabel>
                <Select
                  name="salesCenterId"
                  value={values.salesCenterId}
                  onChange={handleChange}
                  label="Select Sales Center"
                  error={touched.salesCenterId && Boolean(errors.salesCenterId)}
                  sx={customSelect.dark.select}
                >
                  {salesCenters.map((center) => (
                    <MenuItem
                      key={center.salesCenterUid}
                      value={center.salesCenterUid}
                    >
                      {center.salesCenterName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                name="validityDays"
                label="Validity Days"
                variant="outlined"
                value={values.validityDays}
                onChange={handleChange}
                error={touched.validityDays && Boolean(errors.validityDays)}
                helperText={touched.validityDays && errors.validityDays}
                sx={customInput.dark}
              />

              {!user && (
                <TextField
                  name="password"
                  label="Password"
                  variant="outlined"
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  type="password"
                  sx={customInput.dark}
                />
              )}
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mt: 3,
                gap: 1,
              }}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  if (user === null) {
                    onClose();
                  } else {
                    setIsEdit?.(false);
                  }
                }}
              >
                Cancel
              </Button>

              <Button type="submit" variant="contained" color="primary">
                {user ? 'Update' : 'Save'}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default UserForm;
