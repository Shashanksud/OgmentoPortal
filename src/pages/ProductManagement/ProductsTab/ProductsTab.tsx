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
  Tooltip,
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

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '1.5rem',
          marginBottom: 1,
        }}
      >
        <Typography variant="h4" sx={{ fontSize: '1.4rem', marginLeft: '3px' }}>
          Products List
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            padding: '4px',
            color: '#2c2c2c',
            borderRadius: 8,
          }}
        >
          <Typography variant="h4" sx={{ color: '#2c2c2c', marginLeft: '4px' }}>
            View As:
          </Typography>
          {isCardView ? (
            <Tooltip title="View as list">
              <IconButton onClick={() => setIsCardView(false)} sx={{}}>
                <ViewListIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="View as card">
              <IconButton onClick={() => setIsCardView(true)}>
                <ViewModuleIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>

      {/* Conditional Rendering for Views */}
      {isCardView ? (
        <Grid container sx={{ width: '70%' }} spacing={2}>
          {data.map((product) => (
            <Grid item xs={12} sm={8} md={6} key={product.sku}>
              <Card
                sx={{
                  width: '29rem',
                  display: 'flex',
                  padding: '1rem',
                  backgroundColor: '#2c2c2c',
                  color: 'white',
                  justifyContent: 'space-between',
                }}
              >
                <Box
                  sx={{
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    width: '30%',
                    borderRadius: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={ProductImg}
                    alt={product.productsName}
                    sx={{
                      width: '65%',
                      height: 120,
                      marginRight: '1rem',
                      margin: 'auto',
                      padding: 1.4,
                    }}
                  />
                </Box>
                <CardContent
                  sx={{
                    width: '65%',
                    padding: 0,
                    marginLeft: '2rem',
                    marginTop: '1rem',
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}
                  >
                    {product.productsName}
                  </Typography>

                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 2fr',
                      rowGap: '0.2rem',
                      columnGap: '3.5rem',
                    }}
                  >
                    <Typography sx={{ fontWeight: 'bold', color: '#b0bec5' }}>
                      SKU Code:
                    </Typography>
                    <Typography>{product.sku}</Typography>

                    <Typography sx={{ fontWeight: 'bold', color: '#b0bec5' }}>
                      Price:
                    </Typography>
                    <Typography>${product.price}</Typography>

                    <Typography
                      sx={{
                        fontWeight: 'bold',
                        color: '#b0bec5',
                      }}
                    >
                      ProductExpiry:
                    </Typography>
                    <Typography>{product.expiryDate}</Typography>

                    <Typography sx={{ fontWeight: 'bold', color: '#b0bec5' }}>
                      Category:
                    </Typography>
                    <Typography>{product.category}</Typography>

                    <Typography sx={{ fontWeight: 'bold', color: '#b0bec5' }}>
                      Sub-category:
                    </Typography>
                    <Typography>{product.subCategory}</Typography>
                  </Box>
                </CardContent>
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
