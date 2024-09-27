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

interface KioskDataType {
  kioskName: string;
  salesCenter: string;
}

const kioskData: KioskDataType[] = [
  { kioskName: 'mamaEarth', salesCenter: 'Banglore' },
  { kioskName: 'mamaEarth', salesCenter: 'Gurugram' },
];

function KioskTab() {
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
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Kiosk Name</TableCell>
                <TableCell>Sales Center</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {kioskData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((kiosk) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={kiosk.kioskName}
                  >
                    <TableCell>{kiosk.kioskName}</TableCell>
                    <TableCell>{kiosk.salesCenter}</TableCell>
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
          count={kioskData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export default KioskTab;
