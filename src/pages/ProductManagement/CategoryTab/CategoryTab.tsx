import { getData, postData } from '@/services/axiosWrapper/fetch';
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
  parentCategoryUid: string | null;
  subCategories?: Category[];
}

interface CategoryPost {
  catName: string;
  parentCategoryUid: string | null;
}

function CategoryTab() {
  const [clicked, setClicked] = useState<boolean>(false);
  const [category, setCategory] = useState<Category[]>([]);
  const [subCategoryOne, setSubCategoryOne] = useState<Category[]>([]);
  const [subCategoryTwo, setSubCategoryTwo] = useState<Category[]>([]);

  const [activeCategory, setActiveCategory] = useState<string>('');
  const [activeSubCategoryOne, setActiveSubCategoryOne] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [categoryIdToAdd, setCategoryIdToAdd] = useState<string | null>(null);

  const addSection = () => {
    setClicked(true);
  };
  const handleOpenAddModal = (categoryUID: string | null) => {
    setCategoryIdToAdd(categoryUID);
    setOpenAddModal(true);
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: Category[] = await getData('/category', false);

        setCategory(response);

        if (response.length > 0) {
          setActiveCategory(response[0].categoryUid);
        }
      } catch (err) {
        console.error(err);
        setError('Error fetching category data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (activeCategory && category.length > 0) {
      const subCategoryLevel1: Category[] =
        category.find((cat) => cat.categoryUid === activeCategory)
          ?.subCategories ?? [];

      setSubCategoryOne(subCategoryLevel1);

      if (subCategoryLevel1.length > 0) {
        setActiveSubCategoryOne(subCategoryLevel1[0].categoryUid);
      }
    }
  }, [activeCategory, category]);

  useEffect(() => {
    if (activeSubCategoryOne && subCategoryOne.length > 0) {
      const subCategoryLevel2: Category[] =
        subCategoryOne.find((cat) => cat.categoryUid === activeSubCategoryOne)
          ?.subCategories ?? [];

      setSubCategoryTwo(subCategoryLevel2);
    }
  }, [activeSubCategoryOne, subCategoryOne]);

  const [categoryName, setCategoryName] = useState<string>('');

  const handleCreateCategory = async (
    catName: string,
    parentCategoryUid: string | null
  ) => {
    const newCategory: CategoryPost = {
      catName,
      parentCategoryUid,
    };

    const createdCategory = await postData<CategoryPost, Category>(
      '/category',
      newCategory,
      false
    ).catch((err) => {
      console.error('Error creating category:', err);
    });

    if (createdCategory) {
      console.log('Category created:', createdCategory);

      setCategory((prevCat) => [...prevCat, createdCategory]);
      setCategoryName('');
      handleCloseAddModal();
    }
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
                onClick={() => handleOpenAddModal(null)}
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
                onClick={() => {
                  setActiveCategory(cat.categoryUid);
                }}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                  padding: 1,
                  cursor: 'pointer',
                  border: '1px solid #ffffff',

                  borderRadius: 2,
                }}
              >
                <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>
                  {cat.categoryName}
                </Typography>
                <Box>
                  <Delete
                    onClick={() => handleOpenDeleteModal(cat.categoryUid)}
                    sx={{
                      cursor: 'pointer',
                    }}
                  />

                  <BorderColorIcon sx={{}} />

                  <ChevronRightIcon sx={{}} />
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
                  onClick={() => handleOpenAddModal(null)}
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
                      border: '1px solid #ffffff',
                      borderRadius: 2,
                    }}
                    onClick={() => {
                      setActiveSubCategoryOne(subCat.categoryUid);
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,

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
                          cursor: 'pointer',
                        }}
                      />

                      <BorderColorIcon sx={{}} />

                      <ChevronRightIcon sx={{}} />
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
                  onClick={() => handleOpenAddModal(categoryIdToAdd)}
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
                      border: '1px solid #ffffff',
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: '1rem',
                      }}
                    >
                      {cat.categoryName}
                    </Typography>
                    <Box>
                      <Delete
                        onClick={() => handleOpenDeleteModal(cat.categoryUid)}
                        sx={{
                          cursor: 'pointer',
                        }}
                      />

                      <BorderColorIcon sx={{}} />
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
            bgcolor: '#f3c3c3',
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
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)} // Update state when input changes
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
              onClick={() => {
                handleCreateCategory(categoryName, categoryIdToAdd);
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
