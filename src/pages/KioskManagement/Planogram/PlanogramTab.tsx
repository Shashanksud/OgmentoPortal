/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CustomInput,
  CustomSelect,
  globalStyles,
} from '@/GlobalStyles/globalStyles';
import {
  Clear,
  Search,
  Add as AddIcon,
  ChevronRight,
  ChevronLeft,
  DeleteOutline,
} from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import { Box } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import { getData } from '@/services/axiosWrapper/fetch';
import { planogramDataEndpoint } from '@/utils/Urls';
import { Belt, PlanogramDataModal, Tray } from '@/Interfaces/Modals/modals';
import { Formik, Form } from 'formik';
import ProductImg from '../../../assets/Product/product-13.png';
import { planogramStyles } from './planogramStyles';

function PlanogramTab() {
  const theme = useTheme();
  const styles = planogramStyles(theme);
  const customSelect = CustomSelect(theme);
  const customInput = CustomInput(theme);
  const globalStyle = globalStyles(theme);
  const [searchText, setSearchText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [selectedMachine, setSelectedMachine] = useState<string>('');
  const [planogramData, setPlanogramData] = useState<PlanogramDataModal>();
  const [refetchTrigger, setRefetchTrigger] = useState<boolean>(false);
  const [trays, setTrays] = useState<Tray[]>([]);
  const [previewProduct, setPreviewProduct] = useState<Belt>({
    beltId: -1,
    beltIsActive: true,
    product: {
      maxQuantity: 0,
      productName: '',
      quantity: 0,
      scannable: true,
      skuCode: '',
    },
  });
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [productQuantity, setProductQuantity] = useState<number>(5);
  const [showProductViewDialog, setShowProductViewDialog] =
    useState<boolean>(false);
  const initialValues: Belt = {
    beltId: -1,
    beltIsActive: true,
    product: {
      maxQuantity: 0,
      productName: '',
      quantity: 0,
      scannable: true,
      skuCode: '',
    },
  };
  const onBeltFormSubmit = () => {};
  useEffect(() => {
    containerRefs.current = containerRefs.current.slice(0, trays.length);
  }, [trays]);

  const handleScroll = (index: number, direction: 'left' | 'right') => {
    const container: HTMLDivElement | null = containerRefs.current[
      index
    ] as HTMLDivElement;
    if (container != null) {
      const scrollAmount = direction === 'left' ? -100 : 100;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  const fetchPlanogramData = async () => {
    setLoading(true);
    try {
      const response = await getData<PlanogramDataModal>(
        `${planogramDataEndpoint}/Test kiosk name 2`
      );

      setPlanogramData(response);

      const firstMachineId = String(response?.machines[0]?.machineId || '');
      setSelectedMachine(firstMachineId);

      const firstMachineTrays = response?.machines[0]?.trays || [];
      setTrays(firstMachineTrays);
    } catch (err) {
      setError(`Error fetching the data. ${err}`);
    } finally {
      setLoading(false);
    }
  };
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setProductQuantity(newValue as number);
  };

  const handleMachineChange = (event: SelectChangeEvent<string>) => {
    const selectedId = event.target.value as string;
    setSelectedMachine(selectedId);

    const selectedMachineData = planogramData?.machines.find(
      (machine) => String(machine.machineId) === selectedId
    );

    setTrays(selectedMachineData?.trays || []);
  };

  useEffect(() => {
    fetchPlanogramData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchTrigger]);

  return (
    <>
      <Box sx={styles.headerContainer}>
        <Box sx={styles.searchAndMachineContainer}>
          <Box>
            <Typography variant="body1" sx={styles.machineText}>
              Select Machine
            </Typography>

            <Select
              name="machine"
              value={selectedMachine}
              onChange={handleMachineChange}
              sx={{ ...customSelect.dark.select, width: '13rem' }}
            >
              {planogramData?.machines.map((machine) => (
                <MenuItem key={machine.machineId} value={machine.machineId}>
                  {`Machine ${machine.machineId}`}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box>
            <Typography variant="body1" sx={styles.searchText}>
              Search Product
            </Typography>
            <TextField
              variant="outlined"
              sx={{ ...customInput.dark, padding: 0, marginBottom: '1.2rem' }}
              value={searchText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchText(e.target.value)
              }
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      {searchText ? (
                        <Clear
                          onClick={() => {
                            setSearchText('');
                          }}
                          sx={{
                            color: theme.palette.text.primary,
                            cursor: 'pointer',
                          }}
                        />
                      ) : (
                        <Search
                          sx={{
                            color: theme.palette.text.primary,
                            cursor: 'pointer',
                          }}
                        />
                      )}
                    </InputAdornment>
                  ),
                },
              }}
              placeholder="Search by category"
            />
          </Box>
        </Box>
        <Box sx={styles.addMachineButtonContainer}>
          <IconButton>
            <PrintOutlinedIcon sx={styles.printerIcon} />
          </IconButton>
          <Button variant="contained" startIcon={<AddIcon />}>
            New Machine
          </Button>
        </Box>
      </Box>

      <Box sx={styles.planogramMainContainer}>
        {loading && (
          <Box sx={styles.loadingIndicatorContainer}>
            <CircularProgress color="inherit" />
            <Typography variant="body2">Loading, please wait...</Typography>
          </Box>
        )}
        {!loading && error && (
          <Box>
            <Typography variant="h6" color="error">
              {error}
            </Typography>
          </Box>
        )}

        {!loading && !error && (
          <Box>
            <Button variant="contained" startIcon={<AddIcon />}>
              ADD TRAY
            </Button>
            <Box
              sx={{
                width: '100%',
              }}
            >
              {trays.map((tray, index) => (
                <Box key={tray.trayId} sx={styles.traysDataContainer}>
                  <Box sx={styles.trayHeaderContainer}>
                    <Typography
                      variant="body1"
                      sx={styles.trayHeaderText}
                    >{`TRAY ${tray.trayId}`}</Typography>
                    <Button
                      variant="contained"
                      sx={styles.trayHeaderDeactivateButton}
                    >
                      Deactivate
                    </Button>
                  </Box>

                  <Box sx={styles.trayDataParentContainer}>
                    <Box sx={styles.trayDataChild1Container}>
                      <Box sx={styles.trayDataChild2Container}>
                        <IconButton
                          onClick={() => handleScroll(index, 'left')}
                          sx={styles.leftScrollIcon}
                        >
                          <ChevronLeft sx={styles.scrollIconFont} />
                        </IconButton>
                      </Box>

                      <Box
                        ref={(el: HTMLDivElement) => {
                          containerRefs.current[index] = el;
                        }}
                        sx={styles.trayScrollContainer}
                      >
                        {tray.belts.map((belt) => (
                          <Box
                            key={belt.beltId}
                            onClick={() => {
                              setShowProductViewDialog(true);
                              setPreviewProduct(belt);
                            }}
                            sx={styles.beltContainer}
                          >
                            <Typography sx={styles.beltSkuCodeText}>
                              {belt.product.skuCode}
                            </Typography>
                            <Box
                              component="img"
                              src={ProductImg}
                              alt="Images not found"
                              sx={styles.productImage}
                            />

                            <Box sx={styles.progressContainer}>
                              <LinearProgress
                                variant="determinate"
                                value={
                                  (belt.product.quantity /
                                    belt.product.maxQuantity) *
                                  100
                                }
                                sx={styles.progressBar}
                              />
                            </Box>

                            <Box sx={styles.quantityShowContainer}>
                              <Typography
                                variant="body1"
                                color="inherit"
                                fontWeight={500}
                              >{`${belt.product.quantity} / ${belt.product.maxQuantity}`}</Typography>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                      <Box sx={styles.rightIconButtonContainer}>
                        <IconButton
                          onClick={() => handleScroll(index, 'right')}
                          sx={styles.rightIconButton}
                        >
                          <ChevronRight sx={styles.scrollIconFont} />
                        </IconButton>
                      </Box>
                    </Box>
                    <IconButton sx={styles.addBeltIconButton}>
                      <AddIcon sx={styles.addIcon} />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
      <Dialog
        open={showProductViewDialog}
        onClose={() => setShowProductViewDialog(false)}
        sx={styles.dialog}
      >
        <Box sx={styles.dialogHeaderContainer}>
          <DialogTitle color="inherit" sx={styles.dialogTitle}>
            Edit belt
          </DialogTitle>
          <IconButton
            color="inherit"
            onClick={() => setShowProductViewDialog(false)}
          >
            <ClearIcon color="inherit" />
          </IconButton>
        </Box>
        <Formik initialValues={initialValues} onSubmit={onBeltFormSubmit}>
          {({ values, setFieldValue }) => (
            <Form>
              <DialogContent
                dividers
                sx={{
                  '&.MuiDialogContent-root': {
                    width: '25rem',
                  },
                  scrollbarWidth: 'none',
                  padding: '0.5rem 0.7rem 0.3rem 0.7rem',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    backgroundColor: theme.palette.secondary.main,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '0rem 0.5rem 0.5rem 0.5rem',
                    borderRadius: '0.8rem',
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1rem',
                    }}
                  >
                    <Typography>
                      {previewProduct.product.productName}
                    </Typography>
                    <IconButton>
                      <DeleteOutline />
                    </IconButton>
                  </Box>
                  <Box
                    component="img"
                    src={ProductImg}
                    sx={{ width: '3rem', marginTop: '-2rem' }}
                  />
                </Box>
                <Box sx={{ width: '100%', marginTop: '1rem' }}>
                  <Select
                    name="machine"
                    value={selectedMachine}
                    onChange={handleMachineChange}
                    sx={{ ...customSelect.light.select, width: '100%' }}
                  >
                    {planogramData?.machines.map((machine) => (
                      <MenuItem
                        key={machine.machineId}
                        value={machine.machineId}
                      >
                        {`Machine ${machine.machineId}`}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'start',
                    marginTop: '0.8rem',
                    color: theme.palette.primary.main,
                  }}
                >
                  <Typography
                    color="inherit"
                    variant="h5"
                    sx={{ marginLeft: '0.3rem', fontSize: '0.9rem' }}
                  >
                    Quantity
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      width: '100%',
                    }}
                  >
                    <IconButton disabled={productQuantity <= 0}>
                      <RemoveIcon
                        sx={{
                          borderRadius: '50%',
                          fontSize: '1.4rem',
                          color: theme.palette.text.primary,
                          backgroundColor:
                            productQuantity > 0
                              ? theme.palette.primary.main
                              : 'gray',
                        }}
                      />
                    </IconButton>
                    <Slider
                      value={
                        typeof productQuantity === 'number'
                          ? productQuantity
                          : 0
                      }
                      onChange={handleSliderChange}
                      onChangeCommitted={(e, newValue) => {
                        if (typeof newValue === 'number') {
                          setProductQuantity(newValue);
                        }
                      }}
                      sx={{
                        width: '80%',
                        '&.MuiSlider-root': {
                          color: theme.palette.primary.main,
                        },
                        '& .MuiSlider-rail': {
                          backgroundColor: theme.palette.primary.main,
                          height: '1.2rem',
                          borderRadius: '2rem',
                        },
                        '& .MuiSlider-track': {
                          backgroundColor: theme.palette.primary.main,
                          height: '1.2rem',
                          borderRadius: '2rem',
                        },
                        '& .MuiSlider-thumb': {
                          height: '1.5rem',
                          width: '1.5rem',
                          boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                          backgroundColor: theme.palette.text.primary,
                          '&:hover': {
                            boxShadow: 'none',
                          },
                          '&:active': {
                            boxShadow: 'none',
                          },
                        },
                      }}
                    />
                    <IconButton disabled={productQuantity >= 100}>
                      <AddIcon
                        sx={{
                          borderRadius: '50%',
                          fontSize: '1.4rem',
                          color: theme.palette.text.primary,

                          backgroundColor:
                            productQuantity > 0
                              ? theme.palette.primary.main
                              : 'gray',
                        }}
                      />
                    </IconButton>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'start',
                    marginTop: '0.8rem',
                    color: theme.palette.primary.main,
                  }}
                >
                  <Typography
                    color="inherit"
                    variant="h5"
                    sx={{ marginLeft: '0.3rem', fontSize: '0.9rem' }}
                  >
                    Max Quantity
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      width: '100%',
                    }}
                  >
                    <IconButton disabled={productQuantity <= 0}>
                      <RemoveIcon
                        sx={{
                          borderRadius: '50%',
                          fontSize: '1.4rem',
                          color: theme.palette.text.primary,

                          backgroundColor:
                            productQuantity > 0
                              ? theme.palette.primary.main
                              : 'gray',
                        }}
                      />
                    </IconButton>
                    <Slider
                      value={
                        typeof productQuantity === 'number'
                          ? productQuantity
                          : 0
                      }
                      onChange={handleSliderChange}
                      onChangeCommitted={(e, newValue) => {
                        if (typeof newValue === 'number') {
                          setProductQuantity(newValue);
                        }
                      }}
                      sx={{
                        width: '80%',
                        '&.MuiSlider-root': {
                          color: theme.palette.primary.main,
                        },
                        '& .MuiSlider-rail': {
                          backgroundColor: theme.palette.primary.main,
                          height: '1.2rem',
                          borderRadius: '2rem',
                        },
                        '& .MuiSlider-track': {
                          backgroundColor: theme.palette.primary.main,
                          height: '1.2rem',
                          borderRadius: '2rem',
                        },
                        '& .MuiSlider-thumb': {
                          height: '1.5rem',
                          width: '1.5rem',
                          boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',

                          backgroundColor: theme.palette.text.primary,
                          '&:hover': {
                            boxShadow: 'none',
                          },
                          '&:active': {
                            boxShadow: 'none',
                          },
                        },
                      }}
                    />
                    <IconButton disabled={productQuantity >= 100}>
                      <AddIcon
                        sx={{
                          borderRadius: '50%',
                          fontSize: '1.4rem',
                          color: theme.palette.text.primary,

                          backgroundColor:
                            productQuantity > 0
                              ? theme.palette.primary.main
                              : 'gray',
                        }}
                      />
                    </IconButton>
                  </Box>
                </Box>

                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    gap: 2,
                    justifyContent: 'flex-end',
                    marginTop: '0.5rem',
                  }}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      width: '6.2rem',
                      padding: 0,
                      height: '2.6rem',
                      color: theme.palette.text.primary,
                      backgroundColor: theme.palette.error.dark,
                      border: 'none',
                    }}
                  >
                    Deactivate
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      width: '6.2rem',
                      padding: 0,
                      height: '2.6rem',
                      color: theme.palette.primary.main,
                      backgroundColor: theme.palette.text.hint,
                    }}
                  >
                    Fill To Max
                  </Button>
                </Box>
              </DialogContent>
              <DialogActions sx={styles.dialogAction}>
                <Button
                  variant="contained"
                  onClick={() => setShowProductViewDialog(false)}
                  sx={globalStyle.deleteModalCancelButton}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  sx={globalStyle.deleteModalConfirmButton}
                >
                  Save
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
}
export default PlanogramTab;
