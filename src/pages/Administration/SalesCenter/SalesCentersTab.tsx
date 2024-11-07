import { useEffect, useState } from 'react';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search,
} from '@mui/icons-material';
import {
  useTheme,
  Box,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  CircularProgress,
  Modal,
  Button,
} from '@mui/material';
import { SalesCenter, Country } from '@/Interfaces/Modals/modals';
import { deleteData, getData } from '@/services/axiosWrapper/fetch';
import CancelIcon from '@mui/icons-material/Cancel';

import {
  deleteSalesCenterEndpoint,
  getSalesCenterEndpoint,
} from '@/utils/Urls';
import { globalStyles } from '../../../GlobalStyles/sharedStyles';
import SalesCenterForm from './SalesCenterForm/SalesCenterForm';
import DeleteModalImg from '../../../assets/Pana_Illustration/Inbox cleanup-pana 1.png';

interface UserFormOpenProps {
  onClose: () => void;
}
function SalesCentersTab(props: UserFormOpenProps) {
  const { onClose } = props;
  const [salesCenterData, setSalesCenter] = useState<SalesCenter[]>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [refetchTrigger, setRefetchTrigger] = useState<boolean>(false);
  const [selectedSale, setSelectedSale] = useState<SalesCenter | null>(null);
  const [selectedSalesCenterToDelete, setSelectedSalesCenterToDelete] =
    useState<string>('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const theme = useTheme();
  const styles = globalStyles(theme);
  console.log(selectedSalesCenterToDelete);
  const getCountryName = (countryId: Country): string => {
    return Country[countryId];
  };

  const handleEditClick = (sale: SalesCenter) => {
    setSelectedSale(sale);
    setIsEdit(true);
  };

  const fetchData = async () => {
    await getData<SalesCenter[]>(getSalesCenterEndpoint)
      .then((response: SalesCenter[]) => {
        setSalesCenter(response);
      })

      .catch((err) => {
        setError(`Error fetching SalesCenter data.${err}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onDeleteSalesCenter = async (salesCenterUid: string) => {
    await deleteData(deleteSalesCenterEndpoint, salesCenterUid)
      .then(() => {
        setOpenDeleteModal(false);
        setRefetchTrigger(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, [refetchTrigger]);
  const onRefetchTrigger = () => setRefetchTrigger(true);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }
  return !isEdit ? (
    <>
      <Box sx={styles.listHeaderBox}>
        <Typography variant="h3">Sales Center List</Typography>
        <TextField
          variant="outlined"
          sx={styles.searchTextField}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end" sx={styles.inputAdornment}>
                  <Search />
                </InputAdornment>
              ),
            },
          }}
          placeholder="Search by user name, role, sales center"
        />
      </Box>
      <Paper sx={styles.tablePaper}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sales Center Name</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salesCenterData.map((sale: SalesCenter) => (
                <TableRow hover key={sale.salesCenterName}>
                  <TableCell>{sale.salesCenterName}</TableCell>
                  <TableCell>{getCountryName(sale.countryId)}</TableCell>
                  <TableCell>{sale.city}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        handleEditClick(sale);
                      }}
                    >
                      <EditIcon sx={styles.editIcon} />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setSelectedSalesCenterToDelete(sale.salesCenterUid);
                        setOpenDeleteModal(true);
                      }}
                    >
                      <DeleteIcon sx={styles.deleteIcon} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <Box sx={styles.deleteModalContainer}>
          <CancelIcon
            sx={styles.deleteModalCancelIcon}
            onClick={() => setOpenDeleteModal(false)}
          />
          <Box component="img" src={DeleteModalImg} />

          <Typography
            variant="body1"
            gutterBottom
            sx={styles.deleteModalConfirmText}
          >
            Are you sure you want to delete this SalesCenter?
          </Typography>
          <Box sx={styles.deleteModalBtnContainer}>
            <Button
              variant="outlined"
              sx={styles.deleteModalCancelButton}
              onClick={() => setOpenDeleteModal(false)}
            >
              No
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={styles.deleteModalConfirmButton}
              onClick={() => onDeleteSalesCenter(selectedSalesCenterToDelete)}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  ) : (
    <SalesCenterForm
      sale={selectedSale}
      onRefetchTrigger={onRefetchTrigger}
      onClose={onClose}
      setIsEdit={setIsEdit}
    />
  );
}
export default SalesCentersTab;
