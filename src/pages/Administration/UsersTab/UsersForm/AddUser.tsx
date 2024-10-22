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
import React, { useState, useEffect } from 'react';
import { AddUserRequest, SalesCenter } from '@/Interfaces/Modals/modals';
import { addUser, salesCentersApi } from '@/utils/Urls';

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  role: Yup.string().required('Role is required'),
  password: Yup.string().required('Password is required'),
  validityDays: Yup.number().required('Validity days are required'),
  city: Yup.string().required('City is required'),
  salesCenterId: Yup.string().required('Sales Center is required'),
});

// Interface for AddBtn props
interface AddBtn {
  onClose: (value: boolean) => void;
}

function AddUser(props: AddBtn) {
  const { onClose } = props;
  const [salesCenters, setSalesCenters] = useState<SalesCenter[]>([]);

  const initialValues = {
    name: '',
    email: '',
    role: '',
    password: '',
    validityDays: '365',
    city: '',
    salesCenterId: '',
  };

  useEffect(() => {
    const fetchSalesCenters = async () => {
      try {
        const salesCenterData: SalesCenter[] = await getData(salesCentersApi);

        setSalesCenters(salesCenterData);
      } catch (err) {
        console.error('Error fetching sales centers:', err);
      }
    };

    fetchSalesCenters();
  }, []);

  const handleOnClose = (): void => {
    onClose(true);
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const response = await postData<AddUserRequest, number>(addUser, {
        userName: values.name,
        emailId: values.email,
        password: values.password,
        userRole: values.role,
        city: values.city,
        kioskName: '',
        phoneNumber: '',
        validityDays: values.validityDays,
        salesCenters: {
          [values.salesCenterId]: '', // Send selected sales center ID
        },
      });
      if (response) {
        console.log('User added successfully');
        handleOnClose();
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };
  // const handleSubmit = (values) => {
  //   console.log('Form Submitted with values: ', values);
  //   // Your submission logic here
  // };
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

              <FormControl variant="outlined">
                <InputLabel>Select Role</InputLabel>
                <Select
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  label="Select Role"
                  error={touched.role && Boolean(errors.role)}
                >
                  <MenuItem value="Super Admin">Super Admin</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="User">User</MenuItem>
                </Select>
              </FormControl>

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

              <TextField
                name="validityDays"
                label="Validity Days"
                variant="outlined"
                value={values.validityDays}
                onChange={handleChange}
                error={touched.validityDays && Boolean(errors.validityDays)}
                helperText={touched.validityDays && errors.validityDays}
              />

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
