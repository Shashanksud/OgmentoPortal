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
  {
    name: 'John Doe',
    email: 'johndoe123@gmail.com',
    role: 'Super Admin',
    salesCenter: 'Bangalore',
    kiosk: 'Lorem Ipsum',
  },
];

function UsersTab() {
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
        <Typography variant="h4">User List</Typography>
        <TextField placeholder="Search by user name, role, sales center" />
      </Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
      </Paper>
    </>
  );
}

export default UsersTab;
