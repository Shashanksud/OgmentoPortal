import React, { useState } from 'react';
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
import { postData } from '@/services/axiosWrapper/fetch';
import { addSalesCenter } from '@/utils/Urls';
import {
  City,
  Country,
  AddSalesCenterRequest,
} from '@/Interfaces/Modals/modals';

const getCityList = (): { id: number, name: string }[] => {
  return Object.keys(City)
    .filter((key) => Number.isNaN(Number(key)))
    .map((key) => ({
      id: City[key as keyof typeof City],
      name: key,
    }));
};

const getCountryList = (): { id: number, name: string }[] => {
  return Object.keys(Country)
    .filter((key) => Number.isNaN(Number(key)))
    .map((key) => ({
      id: Country[key as keyof typeof Country],
      name: key,
    }));
};

const validationSchema = Yup.object({
  countryId: Yup.number().required('Country is required'),
  city: Yup.string().required('City is required'),
  salesCenterName: Yup.string().required('Sales Center Name is required'),
});

interface AddSalesCenterProps {
  onClose: (value: boolean) => void;
}

function AddSalesCenter({ onClose }: AddSalesCenterProps) {
  const [cities] = useState<{ id: number, name: string }[]>(getCityList());
  const [countries] =
    useState<{ id: number, name: string }[]>(getCountryList());

  const initialValues = {
    countryId: 1,
    city: '',
    salesCenterName: '',
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const response = await postData<AddSalesCenterRequest, number>(
        addSalesCenter,
        {
          salesCenterName: values.salesCenterName,
          city: values.city,
          countryId: values.countryId,
        }
      );

      if (response) {
        console.log('Sales Center added successfully');
        onClose(true); // Close the form
      }
    } catch (error) {
      console.error('Error adding Sales Center:', error);
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
        <Typography variant="h3">Add Sales Center</Typography>
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, setFieldValue }) => (
          <Form>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                gap: 2,
              }}
            >
              {/* Select Country Dropdown */}
              <FormControl variant="outlined">
                <InputLabel>Select Country</InputLabel>
                <Select
                  name="countryId"
                  value={values.countryId}
                  onChange={(e) => setFieldValue('countryId', e.target.value)}
                  label="Select Country"
                  error={touched.countryId && Boolean(errors.countryId)}
                >
                  {countries.map((country) => (
                    <MenuItem key={country.id} value={country.id}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Select City Dropdown */}
              <FormControl variant="outlined" disabled={!values.countryId}>
                <InputLabel>Select City</InputLabel>
                <Select
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  label="Select City"
                  error={touched.city && Boolean(errors.city)}
                >
                  {cities.map((city) => (
                    <MenuItem key={city.id} value={city.name}>
                      {city.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Sales Center Name Input */}
              <TextField
                name="salesCenterName"
                label="Sales Center Name"
                variant="outlined"
                value={values.salesCenterName}
                onChange={handleChange}
                error={
                  touched.salesCenterName && Boolean(errors.salesCenterName)
                }
                helperText={touched.salesCenterName && errors.salesCenterName}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button variant="outlined" onClick={() => onClose(false)}>
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

export default AddSalesCenter;
