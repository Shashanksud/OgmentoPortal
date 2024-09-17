import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  TextField,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Box } from '@mui/system';

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
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignContent: 'center',
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
      <TableContainer
        sx={{
          minWidth: 650,
          width: '100%',
          '&.MuiTableContainer-root': {
            // Add your custom CSS overrides here
          },
        }}
      >
        <Table
          sx={{
            '&.MuiTable-root': {
              // Add your custom CSS overrides here
              marginTop: '2rem',
            },
          }}
        >
          <TableHead
            sx={{
              '&.MuiTableHead-root': {
                // Add your custom CSS overrides here
              },
            }}
          >
            <TableRow
              sx={{
                '&.MuiTableRow-root': {
                  // Add your custom CSS overrides here
                },
              }}
            >
              <TableCell
                sx={{
                  '&.MuiTableCell-root': {
                    // Add your custom CSS overrides here
                  },
                }}
              >
                User Name
              </TableCell>
              <TableCell
                sx={{
                  '&.MuiTableCell-root': {
                    // Add your custom CSS overrides here
                  },
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  '&.MuiTableCell-root': {
                    // Add your custom CSS overrides here
                  },
                }}
              >
                Role
              </TableCell>
              <TableCell
                sx={{
                  '&.MuiTableCell-root': {
                    // Add your custom CSS overrides here
                  },
                }}
              >
                Sales Center
              </TableCell>
              <TableCell
                sx={{
                  '&.MuiTableCell-root': {
                    // Add your custom CSS overrides here
                  },
                }}
              >
                Kiosk Name
              </TableCell>
              <TableCell
                sx={{
                  '&.MuiTableCell-root': {
                    // Add your custom CSS overrides here
                  },
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              '&.MuiTableBody-root': {
                // Add your custom CSS overrides here
              },
            }}
          >
            {users.map((user) => (
              <TableRow
                key={user.email}
                sx={{
                  '&.MuiTableRow-root': {
                    // Add your custom CSS overrides here
                  },
                }}
              >
                <TableCell
                  sx={{
                    '&.MuiTableCell-root': {
                      // Add your custom CSS overrides here
                    },
                  }}
                >
                  {user.name}
                </TableCell>
                <TableCell
                  sx={{
                    '&.MuiTableCell-root': {
                      // Add your custom CSS overrides here
                    },
                  }}
                >
                  {user.email}
                </TableCell>
                <TableCell
                  sx={{
                    '&.MuiTableCell-root': {
                      // Add your custom CSS overrides here
                    },
                  }}
                >
                  {user.role}
                </TableCell>
                <TableCell
                  sx={{
                    '&.MuiTableCell-root': {
                      // Add your custom CSS overrides here
                    },
                  }}
                >
                  {user.salesCenter}
                </TableCell>
                <TableCell
                  sx={{
                    '&.MuiTableCell-root': {
                      // Add your custom CSS overrides here
                    },
                  }}
                >
                  {user.kiosk}
                </TableCell>
                <TableCell
                  sx={{
                    '&.MuiTableCell-root': {
                      // Add your custom CSS overrides here
                    },
                  }}
                >
                  <IconButton
                    sx={{
                      '&.MuiIconButton-root': {
                        // Add your custom CSS overrides here
                      },
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    sx={{
                      '&.MuiIconButton-root': {
                        // Add your custom CSS overrides here
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default UsersTab;
