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

interface KioskDataType {
  kioskName: string;
  salesCenter: string;
}

const kioskData: KioskDataType[] = [
  { kioskName: 'mamaEarth', salesCenter: 'Banglore' },
  { kioskName: 'mamaEarth', salesCenter: 'Gurugram' },
];

function KioskTab() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignContent: 'center',
        }}
      >
        <Typography variant="h5">Kiosk</Typography>
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
                Kiosk Name
              </TableCell>
              <TableCell
                sx={{
                  '&.MuiTableCell-root': {},
                }}
              >
                Sales Center
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
            {kioskData.map((kiosk) => (
              <TableRow
                key={kiosk.kioskName}
                sx={{
                  '&.MuiTableRow-root': {},
                }}
              >
                <TableCell
                  sx={{
                    '&.MuiTableCell-root': {},
                  }}
                >
                  {kiosk.kioskName}
                </TableCell>

                <TableCell
                  sx={{
                    '&.MuiTableCell-root': {},
                  }}
                >
                  {kiosk.salesCenter}
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

export default KioskTab;
