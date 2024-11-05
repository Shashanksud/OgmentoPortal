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
} from '@mui/material';
import { SalesCenter, Country } from '@/Interfaces/Modals/modals';
import { getData } from '@/services/axiosWrapper/fetch';

import { getSalesCenterEndpoint } from '@/utils/Urls';
import { globalStyles } from '../../../GlobalStyles/sharedStyles';
import SalesCenterForm from './SalesCenterForm/SalesCenterForm';

interface UserFormOpenProps {
  onClose: () => void;
}
function SalesCentersTab(props: UserFormOpenProps) {
  const { onClose } = props;
  const [salesCenterData, setSalesCenter] = useState<SalesCenter[]>([]);
  const [refetchTrigger, setRefetchTrigger] = useState<boolean>(false);
  const [selectedSale, setSelectedSale] = useState<SalesCenter | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const theme = useTheme();
  const styles = globalStyles(theme);
  const getCountryName = (countryId: Country): string => {
    return Country[countryId];
  };

  const handleEditClick = (sale: SalesCenter) => {
    setSelectedSale(sale);
    setIsEdit(true);
  };

  const fetchData = async () => {
    try {
      const response: SalesCenter[] = await getData(getSalesCenterEndpoint);

      setSalesCenter(response);
    } catch (err) {
      setError('Error fetching user data.');
    } finally {
      setLoading(false);
    }
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

                    <IconButton>
                      <DeleteIcon sx={styles.deleteIcon} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
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
