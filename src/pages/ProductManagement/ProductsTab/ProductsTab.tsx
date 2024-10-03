import {
  Search,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import {
  Button,
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
  IconButton,
  CircularProgress,
  Avatar,
} from '@mui/material';
import userStyles from '@/pages/Administration/UsersTab/userStyles';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { getData } from '@/services/axiosWrapper/fetch';

interface ProductsModal {
  sku: number;
  img: string;
  productsName: string;
  price: number;
  weight: number;
  category: string;
}

function ProductsTab() {
  const theme = useTheme();
  const [data, setData] = useState<ProductsModal[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: ProductsModal[] = await getData('/productData');

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
          height: '9rem',
          padding: '1rem',
          backgroundColor: '#2c2c2c',
          borderRadius: '0.8rem',
          paddingRight: '2rem',
          marginTop: '-1.2rem',
        }}
      >
        <Typography
          variant="body1"
          sx={{ marginBottom: '6px', marginLeft: '10px', fontSize: '1.1rem' }}
        >
          Search Product
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TextField
            variant="outlined"
            sx={userStyles.searchTextField}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={userStyles.inputAdornment}
                  >
                    <Search />
                  </InputAdornment>
                ),
              },
            }}
            placeholder="Search by product/sku"
          />

          <Button variant="contained" startIcon={<AddIcon />}>
            Add Product
          </Button>
        </Box>
      </Box>
      <Typography
        variant="h4"
        sx={{ fontSize: '1.3rem', marginTop: '1.5rem', marginBottom: '1rem' }}
      >
        List of products
      </Typography>
      <Paper sx={userStyles.userTablePaper}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sku</TableCell>
                <TableCell>Img</TableCell>
                <TableCell>Products Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((user) => (
                <TableRow hover key={user.sku}>
                  <TableCell>{user.sku}</TableCell>
                  <TableCell>
                    <Avatar src={user.img} />
                  </TableCell>
                  <TableCell>{user.productsName}</TableCell>

                  <TableCell>{user.price}</TableCell>
                  <TableCell> {user.weight} </TableCell>
                  <TableCell> {user.category} </TableCell>

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
export default ProductsTab;
