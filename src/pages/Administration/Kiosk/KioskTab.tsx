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
import { Kiosk } from '@/Interfaces/Modals/modals';
// import { getData } from '@/services/axiosWrapper/fetch';
import userStyles from '../UsersTab/userStyles';

const kioskData: Kiosk[] = [
  { kioskName: 'mamaEarth', country: 'India', salesCenter: 'Banglore' },
  { kioskName: 'mamaEarth', country: 'India', salesCenter: 'Gurugram' },
];
function KioskTab() {
  const theme = useTheme();
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
                <TableCell>Sales Center Name</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {kioskData.map((user) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={user.kioskName}
                >
                  <TableCell>{user.kioskName}</TableCell>
                  <TableCell>{user.country}</TableCell>
                  <TableCell>{user.salesCenter}</TableCell>

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
