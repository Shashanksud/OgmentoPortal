import { getData } from '@/services/axiosWrapper/fetch';
import {
  Button,
  CircularProgress,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Delete, Search } from '@mui/icons-material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CancelIcon from '@mui/icons-material/Cancel';
import DefaultPanaImg from '../../../assets/Pana_Illustration/Add tasks-pana 1.png';
import DeletePanaImg from '../../../assets/Pana_Illustration/Inbox cleanup-pana 1.png';

interface Category {
  categoryUid: string;
  categoryName: string;
  parentCategoryUid: string;
  subCategories: Category[];
}

function CategoryTab() {
  const [clicked, setClicked] = useState<boolean>(false);
  const [category, setCategory] = useState<Category[]>([]);
  const [subCategoryOne, setSubCategoryOne] = useState<Category[]>([]);
  const [subCategoryTwo, setSubCategoryTwo] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  // const [newCategoryName, setNewCategoryName] = useState<string>('');

  const addSection = () => {
    setClicked(true);
  };

  const handleCategoryOneClick = (
    subCategoriesOne: Category[],
    categoryName: string
  ) => {
    setSubCategoryOne(subCategoriesOne);
    setSelectedCategory(categoryName);
  };

  const handleCategoryTwoClick = (
    subCategoriesTwo: Category[],
    categoryName: string
  ) => {
    setSubCategoryTwo(subCategoriesTwo);
    setSelectedCategory(categoryName);
  };

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);
  const handleOpenDeleteModal = (categoryUid: string) => {
    setCategoryToDelete(categoryUid);
    setOpenDeleteModal(true);
  };
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleDeleteCategory = () => {
    if (categoryToDelete) {
      setCategory(
        category.filter((cat) => cat.categoryUid !== categoryToDelete)
      );
      handleCloseDeleteModal();
    }
  };

  console.log(selectedCategory);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: Category[] = await getData('/category', false);
        setCategory(response);
      } catch (err) {
        console.error(err);
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
  console.log(subCategoryTwo);
  return (
    <Box>
      {!clicked ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Box
            component="img"
            src={DefaultPanaImg}
            alt="Default Illustration"
            sx={{ width: '100%', maxWidth: 400 }}
          />
          <Button
            variant="outlined"
            onClick={addSection}
            sx={{ border: '3px dashed', mt: 2 }}
            startIcon={
              <AddIcon
                sx={{
                  borderRadius: '1rem',
                  backgroundColor: '#ffffff',
                  color: '#2c2c2c',
                }}
              />
            }
          >
            ADD CATEGORY
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            mt: 0,
            padding: 0,
          }}
        >
          <Box
            sx={{
              width: '300px',
              height: '600px',
              backgroundColor: '#2c2c2c',
              borderRadius: 3,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 3,
              overflowY: 'auto',
              marginRight: '2rem',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '1rem',
              }}
            >
              <Typography variant="h3">Catgory</Typography>
              <AddIcon
                sx={{
                  borderRadius: '1rem',
                  backgroundColor: '#ffffff',
                  color: '#2c2c2c',
                }}
                onClick={handleOpenAddModal}
              />
            </Box>
            <TextField
              variant="outlined"
              sx={{
                padding: 0,
                marginBottom: '1.2rem',

                '& .MuiOutlinedInput-input::placeholder': {
                  color: '#ffffff', // Placeholder color
                  opacity: 1, // Adjust opacity for placeholder if needed
                },
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Search sx={{ color: '#ffffff' }} />
                    </InputAdornment>
                  ),
                },
              }}
              placeholder="Search by category"
            />

            {category.map((cat) => (
              <Box
                key={cat.categoryUid}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                  padding: 1,
                  cursor: 'pointer',
                  backgroundColor: '#ffffff',
                  borderRadius: 2,
                }}
                onClick={() =>
                  handleCategoryOneClick(cat.subCategories, cat.categoryName)
                }
              >
                <Typography
                  sx={{ fontWeight: 600, fontSize: '1rem', color: '#2c2c2c' }}
                >
                  {cat.categoryName}
                </Typography>
                <Box>
                  <Delete
                    onClick={() => handleOpenDeleteModal(cat.categoryUid)}
                    sx={{
                      color: '#2c2c2c',
                      cursor: 'pointer',
                    }}
                  />

                  <BorderColorIcon
                    sx={{
                      color: '#2c2c2c',
                    }}
                  />

                  <ChevronRightIcon sx={{ color: '#2c2c2c' }} />
                </Box>
              </Box>
            ))}
          </Box>

          {subCategoryOne.length > 0 ? (
            <Box
              sx={{
                width: '300px',
                height: '600px',
                backgroundColor: '#2c2c2c',
                borderRadius: 3,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 3,
                overflowY: 'auto',
                marginRight: '2rem',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                }}
              >
                <Typography variant="h3">Sub-Catgory One</Typography>
                <AddIcon
                  sx={{
                    borderRadius: '1rem',
                    backgroundColor: '#ffffff',
                    color: '#2c2c2c',
                  }}
                  onClick={handleOpenAddModal}
                />
              </Box>
              <TextField
                variant="outlined"
                sx={{
                  padding: 0,
                  marginBottom: '1.2rem',

                  '& .MuiOutlinedInput-input::placeholder': {
                    color: '#ffffff',
                    opacity: 1,
                  },
                }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <Search sx={{ color: '#ffffff' }} />
                      </InputAdornment>
                    ),
                  },
                }}
                placeholder="Search by category"
              />
              {subCategoryOne.length > 0 ? (
                subCategoryOne.map((subCat) => (
                  <Box
                    key={subCat.categoryUid}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 2,
                      padding: 1,
                      cursor: 'pointer',
                      backgroundColor: '#ffffff',
                      borderRadius: 2,
                    }}
                    onClick={() =>
                      handleCategoryTwoClick(
                        subCat.subCategories,
                        subCat.categoryName
                      )
                    }
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: '#2c2c2c',
                        fontSize: '1rem',
                      }}
                    >
                      {subCat.categoryName}
                    </Typography>
                    <Box>
                      <Delete
                        onClick={() =>
                          handleOpenDeleteModal(subCat.categoryUid)
                        }
                        sx={{
                          color: '#2c2c2c',
                          cursor: 'pointer',
                        }}
                      />

                      <BorderColorIcon
                        sx={{
                          color: '#2c2c2c',
                        }}
                      />

                      <ChevronRightIcon sx={{ color: '#2c2c2c' }} />
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography>No subcategories available</Typography>
              )}
            </Box>
          ) : (
            ''
          )}
          {subCategoryTwo.length > 0 ? (
            <Box
              sx={{
                width: '300px',
                height: '600px',
                backgroundColor: '#2c2c2c',
                borderRadius: 3,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 3,
                overflowY: 'auto',
                marginRight: '2rem',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                }}
              >
                <Typography variant="h3">Sub-Category Two</Typography>
                <AddIcon
                  sx={{
                    borderRadius: '1rem',
                    backgroundColor: '#ffffff',
                    color: '#2c2c2c',
                  }}
                  onClick={handleOpenAddModal}
                />
              </Box>
              <TextField
                variant="outlined"
                sx={{
                  padding: 0,
                  marginBottom: '1.2rem',

                  '& .MuiOutlinedInput-input::placeholder': {
                    color: '#ffffff',
                    opacity: 1,
                  },
                }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <Search sx={{ color: '#ffffff' }} />
                      </InputAdornment>
                    ),
                  },
                }}
                placeholder="Search by category"
              />
              {subCategoryTwo.length > 0 ? (
                subCategoryTwo.map((cat) => (
                  <Box
                    key={cat.categoryUid}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 2,
                      padding: 1,
                      cursor: 'pointer',
                      backgroundColor: '#ffffff',
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: '1rem',
                        color: '#2c2c2c',
                      }}
                    >
                      {cat.categoryName}
                    </Typography>
                    <Box>
                      <Delete
                        onClick={() => handleOpenDeleteModal(cat.categoryUid)}
                        sx={{
                          color: '#2c2c2c',
                          cursor: 'pointer',
                        }}
                      />

                      <BorderColorIcon
                        sx={{
                          color: '#2c2c2c',
                        }}
                      />

                      <ChevronRightIcon sx={{ color: '#2c2c2c' }} />
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography>No categories available</Typography>
              )}
            </Box>
          ) : (
            ''
          )}

          <Button
            variant="outlined"
            sx={{ border: '3px dashed', mt: 2 }}
            startIcon={
              <AddIcon
                sx={{
                  borderRadius: '1rem',
                  backgroundColor: '#ffffff',
                  color: '#2c2c2c',
                }}
              />
            }
          >
            ADD Section
          </Button>
        </Box>
      )}

      <Modal open={openAddModal} onClose={handleCloseAddModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '500px',
            bgcolor: '#ffffff',
            boxShadow: 24,
            p: 3,
            borderRadius: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              color: '#2c2c2c',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: '#2c2c2c', fontSize: '1.3rem' }}
            >
              Add New Category
            </Typography>
            <CancelIcon color="inherit" onClick={handleCloseAddModal} />
          </Box>

          <TextField
            fullWidth
            label="Category Name"
            variant="outlined"
            sx={{ marginTop: '2rem', fontWeight: '600' }}
          />
          <Box
            sx={{
              width: '46%',
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '1rem',
              marginLeft: '50%',
            }}
          >
            <Button
              variant="outlined"
              sx={{
                width: '6.2rem',
                color: '#2c2c2c',
                backgroundColor: '#DBDBDB',
                padding: 0,
                height: '2.6rem',
              }}
              onClick={handleCloseAddModal}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{
                width: '6.2rem',
                color: '#ffffff',
                backgroundColor: '#2c2c2c',
                padding: 0,
                height: '2.6rem',
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '450px',
            bgcolor: '#ffffff',
            boxShadow: 24,
            borderRadius: 1,
            paddingBottom: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <CancelIcon
            sx={{ color: '#2c2c2c', marginLeft: '85%', marginTop: '1rem' }}
            onClick={handleCloseDeleteModal}
          />
          <Box component="img" src={DeletePanaImg} />

          <Typography
            variant="body1"
            gutterBottom
            sx={{ color: '#2c2c2c', fontWeight: 600, fontSize: '1.1rem' }}
          >
            Are you sure you want to delete this category?
          </Typography>
          <Box
            sx={{
              width: '50%',
              display: 'flex',
              justifyContent: 'space-between',
              mt: 2,
            }}
          >
            <Button
              variant="outlined"
              sx={{
                width: '6.2rem',
                color: '#2c2c2c',
                backgroundColor: '#DBDBDB',
                padding: 0,
                height: '2.6rem',
              }}
              onClick={handleCloseDeleteModal}
            >
              No
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{
                width: '6.2rem',
                color: '#ffffff',
                backgroundColor: '#2c2c2c',
                padding: 0,
                height: '2.6rem',
              }}
              onClick={handleDeleteCategory}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default CategoryTab;
