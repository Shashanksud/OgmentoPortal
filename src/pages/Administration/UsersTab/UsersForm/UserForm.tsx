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
} from '@mui/material';
import { getData, postData } from '@/services/axiosWrapper/fetch';
import { useState, useEffect } from 'react';
import {
  SalesCenter,
  UserRoles,
  UserFormProps,
} from '@/Interfaces/Modals/modals';
import { addUser, getSalesCenterEndpoint, updateUser } from '@/utils/Urls';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  role: Yup.number().required('Role is required'),
  // password: Yup.string().required('Password is required'),
  validityDays: Yup.number().required('Validity days are required'),
  city: Yup.string().required('City is required'),
  salesCenterId: Yup.string().required('Sales Center is required'),
  phoneNumber: Yup.number().required('Number is required'),
});
function UserForm(props: UserFormProps) {
  const { onClose, user, setIsEdit, setRefetchTrigger } = props;
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
      try {
        const salesCenterData: SalesCenter[] = await getData(
          getSalesCenterEndpoint
        );
        setSalesCenters(salesCenterData);
      } catch (err) {
        console.error('Error fetching sales centers:', err);
      }
    };
    fetchSalesCenters();
  }, []);

  const handleOnClose = () => {
    onClose();
  };

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

        await postData(updateUser, updateUserData);
        setIsEdit?.(false);
        setRefetchTrigger?.(true);
      } else {
        const addUserData = {
          userName: values.name,
          emailId: values.email,
          password: '',
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
        await postData(addUser, addUserData);
        handleOnClose();
      }
    } catch (err) {
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
        enableReinitialize
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
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                name="phoneNumber"
                label="Phone Number"
                variant="outlined"
                value={values.phoneNumber}
                onChange={handleChange}
                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
              />
              <FormControl
                variant="outlined"
                error={touched.role && Boolean(errors.role)}
                fullWidth
              >
                <InputLabel>Select Role</InputLabel>
                <Select
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  label="Select Role"
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
                <InputLabel>Select City</InputLabel>
                <Select
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  label="Select City"
                  error={touched.city && Boolean(errors.city)}
                >
                  <MenuItem value="Delhi">Delhi</MenuItem>
                  <MenuItem value="Bangalore">Bangalore</MenuItem>
                  <MenuItem value="Chandigarh">Chandigarh</MenuItem>
                </Select>
              </FormControl>

              <FormControl variant="outlined">
                <InputLabel>Select Sales Center</InputLabel>
                <Select
                  name="salesCenterId"
                  value={values.salesCenterId}
                  onChange={handleChange}
                  label="Select Sales Center"
                  error={touched.salesCenterId && Boolean(errors.salesCenterId)}
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
                />
              )}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button
                variant="outlined"
                onClick={() => {
                  if (user === null) {
                    handleOnClose();
                  } else {
                    setIsEdit?.(false);
                  }
                }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => handleSubmit}
              >
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
