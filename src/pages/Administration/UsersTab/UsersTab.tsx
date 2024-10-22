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
import { UserDetailsModal } from '@/Interfaces/Modals/modals';
import { getData } from '@/services/axiosWrapper/fetch';
import { getUserDetails } from '@/utils/Urls';
import { globalStyles } from '../../../GlobalStyles/sharedStyles';

function UsersTab() {
  const theme = useTheme();
  const styles = globalStyles(theme);
  const [userDetail, setUserDetail] = useState<UserDetailsModal[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const getSalesCenterNames = (salesCenterNames: { [key: string]: string }) => {
    const allSalesCenterNames = Object.values(salesCenterNames).join(', ');
    return <div>{allSalesCenterNames}</div>;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: UserDetailsModal[] = await getData(getUserDetails);

        setUserDetail(response);
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
      <Box sx={styles.userListHeaderBox}>
        <Typography variant="h3">User List</Typography>
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
      <Paper sx={styles.userTablePaper}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Sales Center</TableCell>
                <TableCell>Kiosk Name</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userDetail.map((user: UserDetailsModal) => (
                <TableRow key={user.userName}>
                  <TableCell>{user.userName}</TableCell>
                  <TableCell>{user.emailId}</TableCell>
                  <TableCell>{user.userRole}</TableCell>
                  <TableCell>
                    {user.salesCenters == null ||
                    Object.keys(user.salesCenters).length === 0
                      ? '-'
                      : getSalesCenterNames(user.salesCenters)}{' '}
                  </TableCell>
                  <TableCell>{user.kioskName}</TableCell>
                  <TableCell>
                    <IconButton>
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
  );
}

export default UsersTab;
