import {
  Search,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
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
  Card,
  CardContent,
  CardMedia,
  Grid,
} from '@mui/material';
import { userStyles } from '@/GlobalStyles/sharedStyles';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { getData } from '@/services/axiosWrapper/fetch';
import ProductImg from '../../../assets/Product/product-18.png';

interface ProductsModal {
  sku: number;
  img: string;
  productsName: string;
  price: number;
  weight: number;
  category: string;
  expiryDate: string; // Added expiry date based on image
  subCategory: string; // Added subcategory based on image
}

function ProductsTab() {
  const theme = useTheme();
  const [data, setData] = useState<ProductsModal[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [isCardView, setIsCardView] = useState<boolean>(false); // Toggle state for view

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: ProductsModal[] = await getData('/productData', false);

        setData(response);
      } catch (err) {
        setError('Error fetching product data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Toggle function to switch between table and card view
  const toggleView = () => {
    setIsCardView((prev) => !prev);
  };

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
      {/* Search Section */}
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

      {/* Toggle Button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '1.5rem',
        }}
      >
        <Typography variant="h4" sx={{ fontSize: '1.3rem' }}>
          Products List
        </Typography>
        <IconButton onClick={toggleView} sx={{ color: '#ffffff' }}>
          {isCardView ? <ViewListIcon /> : <ViewModuleIcon />}
        </IconButton>
      </Box>

      {/* Conditional Rendering for Views */}
      {isCardView ? (
        <Grid container spacing={2}>
          {data.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.sku}>
              <Card
                sx={{
                  display: 'flex',
                  padding: '1rem',
                  backgroundColor: '#2c2c2c',
                  color: 'white',
                }}
              >
                <CardMedia
                  component="img"
                  image={ProductImg}
                  alt={product.productsName}
                  sx={{ width: 120, height: 120, marginRight: '1rem' }}
                />
                <CardContent>
                  <Typography variant="h5">Product Name</Typography>
                  <Typography>SKU Code: {product.sku}</Typography>
                  <Typography>Price: ${product.price}</Typography>
                  <Typography>Product Expiry: {product.expiryDate}</Typography>
                  <Typography>Category: {product.category}</Typography>
                  <Typography>Sub-category: {product.subCategory}</Typography>
                </CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <IconButton>
                    <EditIcon sx={userStyles.editIcon(theme)} />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon sx={userStyles.deleteIcon(theme)} />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
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
      )}
    </>
  );
}

export default ProductsTab;
