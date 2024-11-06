import {
  Search,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AddPhotoAlternate,
  Clear,
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
  // Avatar,
  Modal,
  CardMedia,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { deleteData, getData, postData } from '@/services/axiosWrapper/fetch';
import { ProductDataModal } from '@/Interfaces/Modals/modals';
import { productDataEndpoint } from '@/utils/Urls';
import { CustomInput, globalStyles } from '@/GlobalStyles/sharedStyles';
import DeleteModalImg from '../../../assets/Pana_Illustration/Inbox cleanup-pana 1.png';
import AddProduct from './ProductForm';
import { productStyles } from './productStyles';

interface UploadResponse {
  success: boolean;
  message: string;
}

function ProductsTab() {
  const theme = useTheme();
  const styles = productStyles(theme);
  const globalStyle = globalStyles(theme);
  const customInput = CustomInput(theme);

  const [productFormTitle, setProductFormTitle] =
    useState<string>('Add product');
  const [productData, setProductData] = useState<ProductDataModal[]>([]);
  const [refetch, setRefetch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [openFileUploadModal, setOpenFileUploadModal] =
    useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [productIdToDelete, setProductIdToDelete] = useState<string>('');
  const [showAddProductModal, setShowAddProductModal] =
    useState<boolean>(false);
  const [selectedProductData, setSelectedProductData] =
    useState<ProductDataModal | null>(null);
  const refetchTrigger = () => {
    setRefetch(true);
  };
  const fetchData = async () => {
    try {
      const response: ProductDataModal[] = await getData(productDataEndpoint);
      setProductData(response);
    } catch (err) {
      setError('Error fetching product data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refetch]);

  const filteredProducts = productData.filter(
    (product) =>
      product.skuCode
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase()) ||
      product.productName
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase())
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await postData<FormData, UploadResponse>(
          '/api/upload',
          formData
        );

        if (response) {
          console.log('File uploaded successfully:', response);
          setFile(null);
          setOpenFileUploadModal(false);
        }
      } catch (err) {
        console.error('Error uploading file:', err);
      }
    } else {
      console.log('No file selected');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    await deleteData(productDataEndpoint, productId).then(() => {
      setProductData(
        productData.filter((product) => product.skuCode !== productId)
      );
    });
  };

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
            sx={customInput.dark}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end" sx={styles.inputAdornment}>
                    {searchQuery ? (
                      <Clear
                        onClick={() => setSearchQuery('')}
                        sx={{
                          color: theme.palette.text.primary,
                          cursor: 'pointer',
                        }}
                      />
                    ) : (
                      <Search />
                    )}
                  </InputAdornment>
                ),
              },
            }}
            placeholder="Search by product/sku"
          />

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setShowAddProductModal(true);
              setProductFormTitle('Add product');
              setSelectedProductData(null);
            }}
          >
            Add Product
          </Button>
        </Box>
      </Box>

      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1.5rem',
            marginBottom: 1,
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontSize: '1.4rem', marginLeft: '3px' }}
          >
            Products List
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setOpenFileUploadModal(true)}
          >
            Upload CSV
          </Button>
        </Box>

        <Paper sx={globalStyle.tablePaper}>
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
                {loading && (
                  <TableRow>
                    <TableCell colSpan={7} sx={{ textAlign: 'center' }}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                )}

                {!loading && error && (
                  <TableRow>
                    <TableCell colSpan={7} sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" color="error">
                        {error}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}

                {!loading && !error && productData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} sx={{ textAlign: 'center' }}>
                      <Typography variant="body1">
                        No product data available
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}

                {!loading &&
                  !error &&
                  productData.length > 0 &&
                  filteredProducts.map((product) => (
                    <TableRow hover key={product.skuCode}>
                      <TableCell>{product.skuCode}</TableCell>
                      <TableCell>
                        {(() => {
                          const image = product.images?.find(
                            (img) => img?.base64Encoded
                          );
                          return image ? (
                            <CardMedia
                              component="img"
                              src={`data:${image.mimeType};base64,${image.base64Encoded}`}
                              alt={image.fileName || 'Product Image'}
                            />
                          ) : (
                            <Typography
                              sx={{ fontSize: '14px', color: '#666' }}
                            >
                              No image available
                            </Typography>
                          );
                        })()}
                      </TableCell>

                      <TableCell>{product.productName}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.weight}</TableCell>
                      <TableCell>{product.category.categoryName}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => {
                            setSelectedProductData(product);
                            setShowAddProductModal(true);
                            setProductFormTitle('Edit product');
                          }}
                        >
                          <EditIcon sx={globalStyle.editIcon} />
                        </IconButton>
                        <IconButton>
                          <DeleteIcon
                            sx={globalStyle.deleteIcon}
                            onClick={() => {
                              setOpenDeleteModal(true);
                              setProductIdToDelete(product.skuCode);
                            }}
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      <Modal
        open={openFileUploadModal}
        onClose={() => setOpenFileUploadModal(false)}
        aria-labelledby="modal-title"
      >
        <Box
          sx={{
            ...globalStyle.modalContainerStyles,
            backgroundColor: '#ffffff',
            padding: '1.5rem',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#2c2c2c',
              marginBottom: '1.5rem',
              width: '100%',
              textAlign: 'center',
            }}
          >
            <Typography
              id="modal-title"
              variant="h5"
              sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}
            >
              Upload CSV File
            </Typography>
            <IconButton
              color="inherit"
              onClick={() => setOpenFileUploadModal(false)}
            >
              <CancelIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              padding: '1.5rem',
              border: '2px dashed #2c2c2c',
              borderRadius: '8px',
              color: '#2c2c2c',
              mb: '1.5rem',
              width: '100%',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            <AddPhotoAlternate fontSize="large" />
            <Typography variant="body1" sx={{ mt: '0.5rem', mb: '1rem' }}>
              Drag and drop your file here or click to upload
            </Typography>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              style={{
                opacity: 0,
                position: 'absolute',
                width: '100%',
                height: '100%',
                cursor: 'pointer',
              }}
            />
          </Box>

          <Typography variant="body2" sx={{ color: '#2c2c2c', mb: '1rem' }}>
            {file ? `Selected file: ${file.name}` : 'No file selected'}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setOpenFileUploadModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              disabled={!file}
            >
              Upload File
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={showAddProductModal}
        onClose={() => setShowAddProductModal(false)}
      >
        <Box
          sx={{
            ...globalStyle.modalContainerStyles,
            padding: '0.3rem 1.4rem 0rem 1.4rem',
            width: '40rem',
            height: '97%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              color: theme.palette.primary.main,
              marginTop: '0.4rem',
              marginBottom: '0.5rem',
            }}
          >
            <Typography variant="h4" sx={styles.productModalTitle}>
              {productFormTitle}
            </Typography>
            <CancelIcon
              color="inherit"
              onClick={() => setShowAddProductModal(false)}
            />
          </Box>

          <AddProduct
            setShowAddProductModal={setShowAddProductModal}
            refetchTrigger={refetchTrigger}
            productData={selectedProductData}
          />
        </Box>
      </Modal>
      <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <Box sx={globalStyle.deleteModalContainer}>
          <CancelIcon
            sx={globalStyle.deleteModalCancelIcon}
            onClick={() => setOpenDeleteModal(false)}
          />
          <Box component="img" src={DeleteModalImg} />

          <Typography
            variant="body1"
            gutterBottom
            sx={globalStyle.deleteModalConfirmText}
          >
            Are you sure you want to delete this product?
          </Typography>
          <Box sx={globalStyle.deleteModalBtnContainer}>
            <Button
              variant="outlined"
              sx={globalStyle.deleteModalCancelButton}
              onClick={() => setOpenDeleteModal(false)}
            >
              No
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={globalStyle.deleteModalConfirmButton}
              onClick={() => {
                handleDeleteProduct(productIdToDelete);
                setOpenDeleteModal(false);
              }}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default ProductsTab;
