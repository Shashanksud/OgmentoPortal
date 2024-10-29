import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Typography } from '@mui/material';
import { updateData } from '@/services/axiosWrapper/fetch';

import {
  UpdateUserRequest,
  UserDetailsModal,
} from '@/Interfaces/Modals/modals';
import { addUser } from '@/utils/Urls';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),

  password: Yup.string().required('Password is required'),
  validityDays: Yup.number().required('Validity days are required'),

  phoneNumber: Yup.number().required('Number is required'),
});
interface UpdateFormProps {
  onClose: () => void;
  user: UserDetailsModal;
}

function UpdateUser(props: UpdateFormProps) {
  const { onClose, user } = props;

  const initialValues = {
    name: user.userName,
    email: user.emailId,
    password: '',
    validityDays: '365',
    city: '',
    phoneNumber: '',
  };

  const handleOnClose = () => {
    onClose();
  };

  const handleSubmit = async (values: typeof initialValues) => {
    await updateData<UpdateUserRequest, number>(addUser, {
      userName: values.name,
      userUId: 'df',
      emailId: values.email,
      password: values.password,
      phoneNumber: '',
      validityDays: values.validityDays,
    })
      .then(() => {
        handleOnClose();
      })
      .catch((error) => {
        console.error('Error adding user:', error);
      });
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
        <Typography variant="h3">Edit User</Typography>
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
              <TextField
                name="phoneNumber"
                label="Phone Number"
                variant="outlined"
                value={values.phoneNumber}
                onChange={handleChange}
                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
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

export default UpdateUser;
