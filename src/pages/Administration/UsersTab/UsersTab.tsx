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
} from '@mui/material';
import { UserDetailsModal } from '@/Interfaces/Modals/modals';

import userStyles from './userStyles';

const users: UserDetailsModal[] = [
  {
    name: 'John Doe',
    email: 'johndoe123@gmail.com',
    role: 'Super Admin',
    salesCenter: 'Bangalore',
    kiosk: 'Lorem Ipsum',
  },
  {
    name: 'John Doe',
    email: 'johndoe123@gmail.com',
    role: 'Super Admin',
    salesCenter: 'Bangalore',
    kiosk: 'Lorem Ipsum',
  },
];

function UsersTab() {
  const theme = useTheme();
  return (
    <>
      <Box sx={userStyles.userListHeaderBox}>
        <Typography variant="h3">User List</Typography>
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
                <TableCell>User Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Sales Center</TableCell>
                <TableCell>Kiosk Name</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={user.email}>
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
