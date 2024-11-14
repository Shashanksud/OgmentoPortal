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
  useTheme,
} from '@mui/material';
import { postData } from '@/services/axiosWrapper/fetch';
import {
  addSalesCenterEndpoint,
  updateSalesCenterEndpoint,
} from '@/utils/Urls';
import { City, Country } from '@/Interfaces/Modals/modals';
import { SalesCenterFormProps } from '@/Interfaces/Props/props';
import { CustomInput, CustomSelect } from '@/GlobalStyles/globalStyles';
import useSnackbarUtils from '@/utils/Snackbar/useSnackbarUtils';

const getCityNameById = (id: number): string => {
  return (
    Object.keys(City).find((key) => City[key as keyof typeof City] === id) || ''
  );
};

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
  city: Yup.number().required('City is required'),
  salesCenterName: Yup.string().required('Sales Center Name is required'),
});

function SalesCenterForm(props: SalesCenterFormProps) {
  const { onClose, sale, setIsEdit, onRefetchTrigger } = props;
  const { showSuccess, showError } = useSnackbarUtils();
  const theme = useTheme();
  const customInput = CustomInput(theme);
  const customSelect = CustomSelect(theme);
  const [cities] = useState<{ id: number, name: string }[]>(getCityList());
  const [countries] =
    useState<{ id: number, name: string }[]>(getCountryList());
  const getCityIdByName = (cityName: string): number => {
    const cityKey = cityName as keyof typeof City; // Cast the string to the enum key type
    return City[cityKey] ?? -1; // Get the corresponding ID from the enum
  };
  let initialValues = {
    salesCenterName: '',
    countryId: 1,
    city: 1,
  };
  if (sale) {
    initialValues = {
      salesCenterName: sale.salesCenterName || '',
      countryId: 1,
      city: getCityIdByName(sale.city),
    };
  }

  const handleSubmit = async (values: typeof initialValues) => {
    const addSaleData = {
      salesCenterName: values.salesCenterName || '',
      countryId: 1,
      city: getCityNameById(values.city),
    };
    const updateSaleData = {
      salesCenterName: values.salesCenterName || '',
      countryId: 1,
      salesCenterUid: sale?.salesCenterUid,
      city: getCityNameById(values.city),
    };
    try {
      if (sale) {
        await postData(updateSalesCenterEndpoint, updateSaleData)
          .then(() => {
            setIsEdit?.(false);
            onRefetchTrigger?.();
            showSuccess('SalesCenter updated Successfully!');
          })
          .catch((error) => {
            showError('Failed to update user!');
            console.error('Update error:', error);
          });
      } else {
        await postData(addSalesCenterEndpoint, addSaleData).then(() => {
          onClose();
          showSuccess('SalesCenter added successfully!');
        });
      }
    } catch (err) {
      showError('Failed to add SalesCenter.');
      console.error('Error adding user:', err);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 5,
        }}
      >
        {sale ? (
          <Typography variant="h3">Edit Sales Center</Typography>
        ) : (
          <Typography variant="h3">Add Sales Center</Typography>
        )}
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
                gap: 4,
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
                  sx={customSelect.dark.select}
                >
                  {countries.map((country) => (
                    <MenuItem key={country.id} value={country.id}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
                {touched.countryId && errors.countryId && (
                  <div style={{ color: theme.palette.error.main }}>
                    {errors.countryId}
                  </div>
                )}
              </FormControl>

              {/* Select City Dropdown */}
              <FormControl variant="outlined" disabled={!values.city}>
                <InputLabel>Select City</InputLabel>
                <Select
                  name="city"
                  value={values.city}
                  onChange={(e) => setFieldValue('city', e.target.value)}
                  label="Select City"
                  error={touched.city && Boolean(errors.city)}
                  sx={customSelect.dark.select}
                >
                  {cities.map((city) => (
                    <MenuItem key={city.id} value={city.id}>
                      {city.name}
                    </MenuItem>
                  ))}
                </Select>
                {touched.city && errors.city && (
                  <div style={{ color: theme.palette.error.main }}>
                    {errors.city}
                  </div>
                )}
              </FormControl>

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
                sx={customInput.dark}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mt: 3,
                gap: 2,
              }}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  if (sale === null) {
                    onClose();
                  } else {
                    setIsEdit?.(false);
                  }
                }}
                sx={{ width: '7rem' }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => handleSubmit}
                sx={{ width: '7rem' }}
              >
                {sale ? 'Update' : 'Save'}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default SalesCenterForm;
