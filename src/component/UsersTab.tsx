import * as React from 'react';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';

interface User {
  name: string;
  email: string;
  role: string;
  salesCenter: string;
  kiosk: string;
}

const users: User[] = [
  {
    name: 'John Doe',
    email: 'johndoe123@gmail.com',
    role: 'Super Admin',
    salesCenter: 'Bangalore',
    kiosk: 'Lorem Ipsum',
  },
  {
    name: 'Jane Smith',
    email: 'janesmith456@gmail.com',
    role: 'Admin',
    salesCenter: 'Mumbai',
    kiosk: 'Dolor Sit',
  },
];

function UsersTab() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignContent: 'center',
          marginBottom: '16px',
        }}
      >
        <Typography variant="h5">User List</Typography>
        <TextField
          placeholder="Search by user name, role, sales center"
          sx={{
            width: '300px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '2rem',
              '& fieldset': {},
              '&:hover fieldset': {},
              '&.Mui-focused fieldset': {},
            },
            '& .MuiInputBase-input': {
              padding: '10px',
            },
            '& .MuiInputBase-input::placeholder': {},
          }}
        />
      </Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
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
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={user.email}
                  >
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.salesCenter}</TableCell>
                    <TableCell>{user.kiosk}</TableCell>
                    <TableCell>
                      <span className="icon-edit">
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                      </span>
                      <span className="icon-delete">
                        <IconButton>
                          <DeleteIcon />
                        </IconButton>
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={users.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
export default UsersTab;
