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
import userStyles from './userStyles';

function UsersTab() {
  const [data, setData] = useState<UserDetailsModal[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: UserDetailsModal[] = await getData('/userDetails');

        setData(response);
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
        <Typography variant="h3">User List</Typography>
        <TextField
          variant="outlined"
          sx={userStyles.searchTextField}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={userStyles.inputAdornment}>
                <Search />
              </InputAdornment>
            ),
          }}
          placeholder="Search by user name, role, sales center"
        />
      </Box>
      <Paper sx={userStyles.userTablePaper}>
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
              {data.map((user) => (
                <TableRow hover key={user.email}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.salesCenter}</TableCell>
                  <TableCell>{user.kiosk}</TableCell>
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

export default UsersTab;
