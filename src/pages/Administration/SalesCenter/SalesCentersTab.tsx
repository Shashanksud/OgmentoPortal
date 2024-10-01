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
import userStyles from '../UsersTab/userStyles';

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
  const theme = useTheme();

  return (
    <>
      <Box sx={userStyles.userListHeaderBox}>
        <Typography variant="h3">Sales Center</Typography>
        <TextField
          placeholder="Search by user name, role, sales center"
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
        />
      </Box>
      <Paper sx={userStyles.userTablePaper}>
        <TableContainer>
          <Table aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Sales Center Name</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {SalesCenterData.map((SalesCenter) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={SalesCenter.salesCenter}
                >
                  <TableCell>{SalesCenter.salesCenter}</TableCell>
                  <TableCell>{SalesCenter.country}</TableCell>
                  <TableCell>{SalesCenter.city}</TableCell>
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

export default SalesCenters;
