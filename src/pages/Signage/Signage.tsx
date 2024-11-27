import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Typography,
  useTheme,
} from '@mui/material';
import { Add as AddIcon, AddPhotoAlternate } from '@mui/icons-material';

import { ClearIcon } from '@mui/x-date-pickers/icons';
import { Form, Formik } from 'formik';
import { CustomSelect, globalStyles } from '@/GlobalStyles/globalStyles';
import {
  Kiosk,
  SalesCenter,
  AdvertisementFormData,
  AdvertisementModal,
} from '@/Interfaces/Modals/modals';
import {
  addAdvertisementEndPoint,
  addVideoEndPoint,
  kioskEndpoint,
  salesCenterEndpoint,
} from '@/utils/Urls';
import { getData, postData } from '@/services/axiosWrapper/fetch';
import * as Yup from 'yup';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useEffect, useState } from 'react';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import BannerTab from './BannerTab/BannerTab';
import AdvertisementTab from './Advertisement/AdvertisementTab';
import { SignageFormStyles } from './signageStyles';

const validationSchema = Yup.object({
  adSchedules: Yup.array().of(Yup.string()),
  // .min(1, 'At least one  must be selected'),
  // FileName: Yup.string().required('File Name is required'),
  kioskName: Yup.array().of(Yup.string()).required(' is required'),
});

function Signage() {
  const theme = useTheme();

  const globalStyle = globalStyles(theme);
  const formStyles = SignageFormStyles(theme);

  const customSelect = CustomSelect(theme);
  const [activeTabValue, setActiveTabValue] = useState<string>('1');

  const [modalPopupTitle, setModalPopupTitle] = useState<string>('Add Video');
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [close, onClose] = useState(false);
  const [salesCenter, setSalesCenter] = useState<SalesCenter[]>([]);
  const [activeSalesCenter, setActiveSalesCenter] = useState<string[] | null>(
    []
  );
  const [activeKiosk, setActiveKiosk] = useState<string[]>([]);
  const [kiosk, setKiosk] = useState<Kiosk[]>([]);
  const [filteredKiosks, setFilteredKiosks] = useState<Kiosk[]>([]);
  const [videoFileObject, setVideoFileObject] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  // const [isAlwaysOnChecked, setIsAlwaysOnChecked] = useState<boolean>(false);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedfileObject = event.target.files[0];
      setVideoFileObject(selectedfileObject);
    }
  };
  console.log(error);
  console.log(videoFileObject);
  console.log(close);
  console.log(activeSalesCenter);
  console.log(activeKiosk);
  const onTabButtonClick = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTabValue(newValue);

    switch (newValue) {
      case '1':
        setModalPopupTitle('Add Video');
        break;
      case '2':
        setModalPopupTitle('Add Banner');
        break;
      default:
        setModalPopupTitle('Add Video');
    }
  };
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    onClose(true);
  };

  function getInitialValues(): AdvertisementFormData {
    return {
      adSchedules: [],
      kioskName: [],
      salesCenterUid: [],
      fileName: '',
      isActive: true,
      isAlwaysOn: true,
    };
  }
  useEffect(() => {
    getData<Kiosk[]>(kioskEndpoint)
      .then((response: Kiosk[]) => {
        setKiosk(response);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    try {
      getData<SalesCenter[]>(salesCenterEndpoint).then(
        (response: SalesCenter[]) => {
          setSalesCenter(response);
        }
      );
    } catch (err) {
      setError(`Error fetching SalesCenter data. ${err}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = async (value: AdvertisementFormData): Promise<void> => {
    if (!videoFileObject) {
      console.error('No file selected for upload');
      return;
    }

    const chunkSize = 2 * 1024 * 1024; // 2MB chunks
    const totalChunks = Math.ceil(videoFileObject.size / chunkSize);
    const uploadPromises = [];

    for (let i = 0; i < totalChunks; i += 1) {
      const chunk = videoFileObject.slice(i * chunkSize, (i + 1) * chunkSize);
      const formData = new FormData();
      formData.append('chunk', chunk);
      formData.append('chunkNumber', i.toString());
      formData.append('totalChunks', totalChunks.toString());
      formData.append('fileName', videoFileObject.name);

      uploadPromises.push(
        postData(addVideoEndPoint, formData, {
          'Content-Type': 'multipart/form-data',
        })
      );
    }

    await Promise.all(uploadPromises)
      .then(() => {
        if (videoFileObject) {
          const addAdvertisementData: AdvertisementModal = {
            isActive: value.isActive,
            kioskNames: value.kioskName,
            // salesCenterUid: value.salesCenterUid,
            isAlwaysOn: value.isAlwaysOn,
            adSchedules: value.adSchedules,
            fileName: videoFileObject.name,
          };
          postData<AdvertisementModal, Response>(
            addAdvertisementEndPoint,
            addAdvertisementData
          ).catch((err) => {
            console.error('Error updating advertisment data:', err);
          });
        }
      })
      .catch((err) => {
        console.error('Error uploading file chunks:', err);
      });
  };

  if (loading) {
    return (
      <Box sx={formStyles.loaderContainer}>
        <CircularProgress />
        <Typography variant="body2" sx={formStyles.loaderText}>
          Loading, please wait...
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <TabContext value={activeTabValue}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '97.8%',
            alignItems: 'center',
          }}
        >
          <TabList onChange={onTabButtonClick} aria-label="Custom tabs example">
            <Tab label="Advertisement" value="1" />
            <Tab label="Banner" value="2" />
          </TabList>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleDialogOpen}
          >
            {modalPopupTitle}
          </Button>
        </Box>

        <TabPanel value="1">
          <AdvertisementTab />
        </TabPanel>

        <TabPanel value="2">
          <BannerTab />
        </TabPanel>
      </TabContext>
      <Dialog
        onClose={handleDialogClose}
        aria-labelledby="customized-dialog-title"
        open={dialogOpen}
        sx={{
          paddingTop: 0,
          marginTop: 0,
          '& .MuiDialog-paper': {
            backgroundColor: '#fff',
            borderRadius: '8px',
          },
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {modalPopupTitle === '1' ? 'Add Video' : 'Add Banner'}
          <IconButton
            aria-label="close"
            onClick={() => setDialogOpen(false)}
            // eslint-disable-next-line @typescript-eslint/no-shadow
            sx={(theme) => ({
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <ClearIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={getInitialValues()}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <Form>
                <Box>
                  <Box sx={formStyles.formContainer}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1.5rem',
                        border: '2px dashed #2c2c2c',
                        borderRadius: '8px',
                        color: '#2c2c2c',
                        mb: '1.5rem',
                        width: '40%',
                        cursor: 'pointer',
                        textAlign: 'left',
                        position: 'relative',
                        margin: 'auto',
                        '&:hover': { backgroundColor: '#f9f9f9' },
                      }}
                    >
                      <AddPhotoAlternate fontSize="large" />
                      <Typography
                        variant="body1"
                        sx={{ mt: '0.5rem', mb: '1rem' }}
                      >
                        Drag and drop your file here or click to upload
                      </Typography>
                      <input
                        id="fileInput"
                        type="file"
                        accept=".mp4"
                        onChange={handleFileChange}
                        style={{
                          opacity: 0,
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          cursor: 'pointer',
                        }}
                      />
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#2c2c2c',
                        margin: 'auto',
                        mb: '1rem',
                        mt: '1rem',
                      }}
                    >
                      {videoFileObject
                        ? `Selected file: ${videoFileObject.name}`
                        : 'No file selected'}
                    </Typography>
                    <FormControl fullWidth>
                      <InputLabel sx={customSelect.light.label}>
                        Select Sales Center
                      </InputLabel>
                      <Select
                        name="salesCenterUid"
                        value={values.salesCenterUid}
                        multiple
                        label="Select Sales Center"
                        onChange={(event) => {
                          const selectSalesCenterUid = event.target
                            .value as string[];
                          setFieldValue('salesCenterUid', selectSalesCenterUid);
                          setActiveSalesCenter(selectSalesCenterUid);
                          // Filter kiosks based on the selected Sales Center
                          const filteredKiosk = kiosk.filter((kio) =>
                            Object.values(kio.salesCenter).some((centerUId) =>
                              selectSalesCenterUid.includes(centerUId)
                            )
                          );

                          setFilteredKiosks(filteredKiosk); // Update the state for kiosks
                        }}
                        error={
                          touched.salesCenterUid &&
                          Boolean(errors.salesCenterUid)
                        }
                        sx={customSelect.light.select}
                      >
                        {salesCenter.map((sales: SalesCenter) => (
                          <MenuItem
                            key={sales.salesCenterUid}
                            value={sales.salesCenterUid}
                          >
                            <Checkbox
                              checked={values.salesCenterUid?.includes(
                                sales.salesCenterUid
                              )}
                            />
                            {sales.salesCenterName}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.salesCenterUid && errors.salesCenterUid && (
                        <div style={{ color: 'red' }}>
                          {errors.salesCenterUid}
                        </div>
                      )}
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel sx={customSelect.light.label}>
                        Select Kiosk Name
                      </InputLabel>
                      <Select
                        multiple
                        name="kioskName"
                        value={values.kioskName || []}
                        label="Select Kiosk Name"
                        onChange={(event) => {
                          const kioskNameSlected = event.target.value;
                          const selectedKiosk: string[] =
                            typeof kioskNameSlected === 'string'
                              ? [kioskNameSlected]
                              : kioskNameSlected;
                          setFieldValue('kioskName', selectedKiosk);
                          setActiveKiosk(selectedKiosk);
                        }}
                        error={touched.kioskName && Boolean(errors.kioskName)}
                        sx={customSelect.light.select}
                        renderValue={(selected) => selected.join(', ')}
                      >
                        {filteredKiosks.map((kio: Kiosk) => (
                          <MenuItem key={kio.kioskName} value={kio.kioskName}>
                            <Checkbox
                              checked={values.kioskName?.includes(
                                kio.kioskName
                              )}
                            />
                            {kio.kioskName}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.kioskName && errors.kioskName && (
                        <div style={{ color: 'red' }}>{errors.kioskName}</div>
                      )}
                    </FormControl>
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        defaultValue="Choose 24/7"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="Choose 24/7"
                          control={<Radio />}
                          defaultValue="Choose 24/7"
                          label="Choose 24/7"
                          sx={{
                            color: 'black',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                          }}
                        />
                        <FormControlLabel
                          value="Choose Per Day"
                          control={<Radio />}
                          label="Choose Per Day"
                          sx={{
                            color: 'black',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                          }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </Box>
                <DialogActions>
                  <Box sx={formStyles.formFooterContainer}>
                    <Box sx={formStyles.formButtonContainer}>
                      <Button
                        variant="contained"
                        onClick={() => setDialogOpen(false)}
                        sx={globalStyle.deleteModalCancelButton}
                      >
                        Cancel
                      </Button>

                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={globalStyle.deleteModalConfirmButton}
                      >
                        Save
                      </Button>
                    </Box>
                  </Box>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Signage;
