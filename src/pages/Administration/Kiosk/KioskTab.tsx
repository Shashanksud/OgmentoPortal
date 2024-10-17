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
import { Kiosk } from '@/Interfaces/Modals/modals';
import { getData } from '@/services/axiosWrapper/fetch';
import { userStyles } from '../../../GlobalStyles/sharedStyles';

function KioskTab() {
  const [kiosk, setKiosk] = useState<Kiosk[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: Kiosk[] = await getData('/api/Kiosk/GetKioskDetails');

        setKiosk(response);
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
        <Box sx={userStyles.userListHeaderBox}>
          <Typography variant="h3">Kiosk List</Typography>
        </Box>
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
        <Typography variant="h3">Kiosk List</Typography>
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
                <TableCell>Kiosk Name</TableCell>
                <TableCell>Sales Center</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {kiosk.map((user: Kiosk) => (
                <TableRow hover key={user.kioskName}>
                  <TableCell>{user.kioskName}</TableCell>
                  <TableCell>{user.salesCenter.item2}</TableCell>
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

export default KioskTab;
