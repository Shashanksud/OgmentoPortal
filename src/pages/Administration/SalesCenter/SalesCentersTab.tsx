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

import { userStyles } from '../../../GlobalStyles/sharedStyles';

function SalesCentersTab() {
  const [salesCenter, setSalesCenter] = useState<SalesCenter[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const theme = useTheme();
  const getCountryName = (countryId: Country): string => {
    return Country[countryId];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: SalesCenter[] = await getData('api/SalesCenter');

        setSalesCenter(response);
      } catch (err) {
        setError('Error fetching user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
  return (
    <>
      <Box sx={userStyles.userListHeaderBox}>
        <Typography variant="h3">Sales Center List</Typography>
        <TextField
          variant="outlined"
          sx={userStyles.searchTextField}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end" sx={userStyles.inputAdornment}>
                  <Search />
                </InputAdornment>
              ),
            },
          }}
          placeholder="Search by user name, role, sales center"
        />
      </Box>
      <Paper sx={userStyles.userTablePaper}>
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
              {salesCenter.map((user: SalesCenter) => (
                <TableRow hover key={user.salesCenter}>
                  <TableCell>{user.salesCenterName}</TableCell>
                  <TableCell>{getCountryName(user.countryId)}</TableCell>
                  <TableCell>{user.city}</TableCell>
                  <TableCell>
                    <IconButton>
                      <EditIcon sx={userStyles.editIcon(theme)} />
                    </IconButton>

                    <IconButton>
                      <DeleteIcon sx={userStyles.deleteIcon(theme)} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}

export default SalesCentersTab;
