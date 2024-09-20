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
import { Edit as EditIcon } from '@mui/icons-material';
import { Box } from '@mui/system';

interface SalesCenterDataType {
  salesCenter: string;
  country: string;
  city: string;
}

const SalesCenterData: SalesCenterDataType[] = [
  { salesCenter: 'Banglore', country: 'India', city: 'Banglore' },
  { salesCenter: 'Gurugram', country: 'India', city: 'Gurugram' },
];

function SalesCenters() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignContent: 'center',
        }}
      >
        <Typography variant="h5">Sales Center Name</Typography>
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
          '&.MuiTableContainer-root': {},
        }}
      >
        <Table
          sx={{
            '&.MuiTable-root': {
              marginTop: '2rem',
            },
          }}
        >
          <TableHead
            sx={{
              '&.MuiTableHead-root': {},
            }}
          >
            <TableRow
              sx={{
                '&.MuiTableRow-root': {},
              }}
            >
              <TableCell
                sx={{
                  '&.MuiTableCell-root': {},
                }}
              >
                Sales Center Name
              </TableCell>
              <TableCell
                sx={{
                  '&.MuiTableCell-root': {},
                }}
              >
                Country
              </TableCell>
              <TableCell
                sx={{
                  '&.MuiTableCell-root': {},
                }}
              >
                City
              </TableCell>
              <TableCell
                sx={{
                  '&.MuiTableCell-root': {},
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              '&.MuiTableBody-root': {},
            }}
          >
            {SalesCenterData.map((center) => (
              <TableRow
                key={center.salesCenter}
                sx={{
                  '&.MuiTableRow-root': {},
                }}
              >
                <TableCell
                  sx={{
                    '&.MuiTableCell-root': {},
                  }}
                >
                  {center.salesCenter}
                </TableCell>
                <TableCell
                  sx={{
                    '&.MuiTableCell-root': {
                      // Add your custom CSS overrides here
                    },
                  }}
                >
                  {center.country}
                </TableCell>
                <TableCell
                  sx={{
                    '&.MuiTableCell-root': {
                      // Add your custom CSS overrides here
                    },
                  }}
                >
                  {center.city}
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default SalesCenters;
