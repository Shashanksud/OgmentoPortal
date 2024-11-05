import React, { useState, useEffect } from 'react';
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
import { postData, getData, updateData } from '@/services/axiosWrapper/fetch'; // Assuming getData is available for GET requests
import {
  addKioskEndpoint,
  getSalesCenterEndpoint,
  updateKioskEndpoint,
} from '@/utils/Urls';
import { KioskFormProps, SalesCenter } from '@/Interfaces/Modals/modals';

// Validation schema using Yup
const validationSchema = Yup.object({
  salesCenterId: Yup.string().required('Sales Center is required'),
  kioskName: Yup.string().required('Kiosk Name is required'),
});

function KioskForm(props: KioskFormProps) {
  const { onClose, kiosk, setIsEdit, onRefetchTrigger } = props;
  const [salesCenters, setSalesCenters] = useState<SalesCenter[]>([]);

  // Fetch sales center data when the component is mounted
  useEffect(() => {
    const fetchSalesCenters = async () => {
      try {
        const response = await getData<SalesCenter[]>(getSalesCenterEndpoint);
        if (response) {
          setSalesCenters(response);
        }
      } catch (error) {
        console.error('Error fetching sales centers:', error);
      }
    };

    fetchSalesCenters();
  }, []);

  const initialValues = {
    salesCenterId: kiosk?.salesCenter.item1 || '',
    kioskName: kiosk?.kioskName,
  };
  const handleOnClose = () => {
    onClose();
  };

  // Handle form submission
  // const handleSubmit = async (values: typeof initialValues) => {
  //   await postData<AddKioskRequest, number>(addKioskEndpoint, {
  //     kioskName: values.kioskName,
  //     salesCenter: {
  //       item1: values.salesCenterId,
  //       item2: '',
  //     },
  //   })
  //     .then(() => {
  //       onClose();
  //     })
  //     .catch((error) => {
  //       console.error('Error adding Kiosk:', error);
  //     });
  // };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      if (kiosk) {
        const updateKioskData = {
          kioskName: values.kioskName,
          salesCenter: {
            item1: values.salesCenterId,
            item2: '',
          },
        };
        const endpoint = `${updateKioskEndpoint}/${updateKioskData.kioskName}/${updateKioskData.salesCenter.item1}`;

        await updateData(endpoint, null);
        setIsEdit?.(false);
        onRefetchTrigger?.();
      } else {
        const addKioskData = {
          kioskName: values.kioskName,
          salesCenter: {
            item1: values.salesCenterId,
            item2: '',
          },
        };
        await postData(addKioskEndpoint, addKioskData);
        handleOnClose();
      }
    } catch (err) {
      console.error('Error adding/updating Sales:', err);
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
        {kiosk ? (
          <Typography variant="h3">Edit Kiosk</Typography>
        ) : (
          <Typography variant="h3">Add Kiosk</Typography>
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
                gap: 2,
              }}
            >
              <FormControl variant="outlined">
                <InputLabel>Select Sales Center</InputLabel>
                <Select
                  name="salesCenterId"
                  value={values.salesCenterId}
                  onChange={(e) =>
                    setFieldValue('salesCenterId', e.target.value)
                  }
                  label="Select Sales Center"
                  error={touched.salesCenterId && Boolean(errors.salesCenterId)}
                >
                  {salesCenters.length > 0 ? (
                    salesCenters.map((salesCenter) => (
                      <MenuItem
                        key={salesCenter.salesCenterUid}
                        value={salesCenter.salesCenterUid}
                      >
                        {salesCenter.salesCenterName}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No Sales Centers Available</MenuItem>
                  )}
                </Select>
              </FormControl>

              {/* Kiosk Name Input */}
              <TextField
                name="kioskName"
                label="Kiosk Name"
                variant="outlined"
                value={values.kioskName}
                onChange={handleChange}
                error={touched.kioskName && Boolean(errors.kioskName)}
                helperText={touched.kioskName && errors.kioskName}
                disabled={!!kiosk}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button
                variant="outlined"
                onClick={() => {
                  if (kiosk === null) {
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
                {kiosk ? 'Update' : 'Save'}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default KioskForm;
