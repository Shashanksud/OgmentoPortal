import { Search } from '@mui/icons-material';
import {
  //   Button,
  useTheme,
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
  Button,
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { globalStyles } from '@/GlobalStyles/sharedStyles';
import { Box, Grid } from '@mui/system';
import { useEffect, useState } from 'react';
import { getData } from '@/services/axiosWrapper/fetch';

interface OrdersModal {
  orderID: string;
  customerName: string;
  date: string;
  paymentMode: string;
  totolUnit: number;
  status: string;
  kioskName: string;
  totalAmount: string;
}

function OrdersTab() {
  const theme = useTheme();
  const styles = globalStyles(theme);
  const [data, setData] = useState<OrdersModal[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: OrdersModal[] = await getData('/orderData');

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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '2rem',
        }}
      >
        <TextField
          variant="outlined"
          sx={styles.searchTextField}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start" sx={styles.inputAdornment}>
                  <Search />
                </InputAdornment>
              ),
            },
          }}
          placeholder="Search by product/sku"
        />
        <Button>Date by dropdown</Button>
      </Box>
      <Box
        flexGrow={1}
        sx={{
          display: 'flex',
          border: '1px solid red',
          justifyContent: 'space-between',
        }}
      >
        <Grid container>hiii</Grid>
        <Grid container>meee</Grid>
        <Grid container>meee</Grid>
        <Grid container>this</Grid>
      </Box>
      <Typography
        variant="h4"
        sx={{ fontSize: '1.3rem', marginTop: '1.5rem', marginBottom: '1rem' }}
      >
        Order List
      </Typography>
      <Paper sx={styles.userTablePaper}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Payment Mode</TableCell>
                <TableCell>Total units</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Kiosk Name</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Invoice</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((user) => (
                <TableRow hover key={user.orderID}>
                  <TableCell>{user.orderID}</TableCell>
                  <TableCell>{user.customerName}</TableCell>
                  <TableCell>{user.date}</TableCell>

                  <TableCell>{user.paymentMode}</TableCell>
                  <TableCell> {user.totolUnit} </TableCell>
                  <TableCell> {user.status} </TableCell>
                  <TableCell> {user.kioskName} </TableCell>
                  <TableCell> {user.totalAmount} </TableCell>

                  <TableCell>
                    <FileDownloadIcon />
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
export default OrdersTab;
