import { deleteData, getData, postData } from '@/services/axiosWrapper/fetch';
import {
  useTheme,
  Button,
  CircularProgress,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Delete, Search } from '@mui/icons-material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CancelIcon from '@mui/icons-material/Cancel';
import { CategoryTypes } from '@/Interfaces/Modals/modals';
import { addCategory, deleteCategory, getAllCategories } from '@/utils/Urls';
import DefaultHomeImg from '../../../assets/Pana_Illustration/Add tasks-pana 1.png';
import DeleteModalImg from '../../../assets/Pana_Illustration/Inbox cleanup-pana 1.png';
import { categoryStyles } from './categoryStyle';

interface Category {
  categoryUid: string;
  categoryName: string;
  parentCategoryUid: string | null;
  subCategories?: Category[];
}

function CategoryTab() {
  const EMPTY_GUID = '00000000-0000-0000-0000-000000000000';
  const theme = useTheme();
  const styles = categoryStyles(theme);

  const [category, setCategory] = useState<Category[]>([]);
  const [subCategoryOne, setSubCategoryOne] = useState<Category[]>([]);
  const [subCategoryTwo, setSubCategoryTwo] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState(category);
  const [filteredCategoriesOne, setFilteredCategoriesOne] =
    useState(subCategoryOne);
  const [filteredCategoriesTwo, setFilteredCategoriesTwo] =
    useState(subCategoryTwo);
  const [categoryLevel, setCategoryLevel] = useState<CategoryTypes>(1);
  const [categoryName, setCategoryName] = useState<string>('');

  const [activeCategory, setActiveCategory] = useState<string>('');
  const [activeSubCategoryOne, setActiveSubCategoryOne] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [categoryIdToAdd, setCategoryIdToAdd] = useState<string | null>(null);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState<string>('');
  const [categoryModalTitle, setCategoryModalTitle] =
    useState('Add new category');

  const [
    parentCategoryIdOfNewSubCategory,
    setParentCategoryIdOfNewSubCategory,
  ] = useState<string | null>(null);
  const [addSection, setAddSection] = useState<boolean>(false);
  const [addSectionOne, setAddSectionOne] = useState<boolean>(false);
  const [addSectionTwo, setAddSectionTwo] = useState<boolean>(false);

  const [searchTerm1, setSearchTerm1] = useState<string>('');
  const [searchTerm2, setSearchTerm2] = useState<string>('');
  const [searchTerm3, setSearchTerm3] = useState<string>('');

  const searchInputRef1 = useRef<HTMLInputElement | null>(null);
  const searchInputRef2 = useRef<HTMLInputElement | null>(null);
  const searchInputRef3 = useRef<HTMLInputElement | null>(null);

  const handleAddSection = () => {
    if (category.length === 0) {
      setAddSection(true);
    } else if (subCategoryOne.length === 0) {
      setAddSectionOne(true);
    } else if (subCategoryTwo.length === 0) {
      setAddSectionTwo(true);
    }
  };

  const handleOpenAddModal = (categoryUID: string | null) => {
    setCategoryIdToAdd(categoryUID);
    setOpenAddModal(true);
  };
  const handleAddSubCategoryOne = (categoryUID: string | null) => {
    setCategoryIdToAdd(categoryUID);
    setParentCategoryIdOfNewSubCategory(activeCategory);
    setOpenAddModal(true);
  };
  const handleAddSubCategoryTwo = (categoryUID: string | null) => {
    setCategoryIdToAdd(categoryUID);
    setParentCategoryIdOfNewSubCategory(activeSubCategoryOne);
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => setOpenAddModal(false);
  const handleOpenDeleteModal = (categoryUid: string) => {
    setCategoryIdToDelete(categoryUid);
    setOpenDeleteModal(true);
  };
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: Category[] = await getData(getAllCategories);

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

  const handleCreateCategory = async (
    catName: string,
    parentCategoryUid: string | null,
    catLevel: CategoryTypes
  ) => {
    const newCategory: Category = {
      categoryUid: EMPTY_GUID,
      categoryName: catName,
      parentCategoryUid: parentCategoryUid ?? EMPTY_GUID,
      subCategories: [],
    };

    await postData<Category, Category>(addCategory, newCategory)
      .then((createdCategory: Category) => {
        if (catLevel === CategoryTypes.ParentCategory) {
          setCategory((prevCat) => [...prevCat, createdCategory]);
        } else if (catLevel === CategoryTypes.SubCategory1) {
          setSubCategoryOne((prevCat) => [...prevCat, createdCategory]);
        } else {
          setSubCategoryTwo((prevCat) => [...prevCat, createdCategory]);
        }
        setCategoryName('');
        handleCloseAddModal();
      })
      .catch((err) => {
        console.error('Error creating category:', err);
      });
  };

  const handleDeleteCategory = async (
    catUID: string,
    catLevel: CategoryTypes
  ) => {
    await deleteData(deleteCategory, catUID)
      .then(() => {
        if (catLevel === CategoryTypes.ParentCategory) {
          setCategory(category.filter((cat) => cat.categoryUid !== catUID));
          if (category.length === 0) {
            setAddSection(false);
          }
        } else if (catLevel === CategoryTypes.SubCategory1) {
          setSubCategoryOne(
            subCategoryOne.filter((cat) => cat.categoryUid !== catUID)
          );
        } else {
          setSubCategoryTwo(
            subCategoryTwo.filter((cat) => cat.categoryUid !== catUID)
          );
        }

        handleCloseDeleteModal();
      })
      .catch((err) => {
        console.error('Error while deleting the category', err);
      });
  };
  useEffect(() => {
    const filterCategory = category.filter((cat) =>
      cat.categoryName.toLowerCase().includes(searchTerm1.toLowerCase())
    );
    setFilteredCategories(filterCategory);
  }, [category, searchTerm1]);

  useEffect(() => {
    const filterCategory = subCategoryOne.filter((cat) =>
      cat.categoryName.toLowerCase().includes(searchTerm2.toLowerCase())
    );
    setFilteredCategoriesOne(filterCategory);
  }, [subCategoryOne, searchTerm2]);

  useEffect(() => {
    const filterCategory = subCategoryTwo.filter((cat) =>
      cat.categoryName.toLowerCase().includes(searchTerm3.toLowerCase())
    );
    setFilteredCategoriesTwo(filterCategory);
  }, [subCategoryTwo, searchTerm3]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputRef1.current &&
        !searchInputRef1.current.contains(event.target as Node) &&
        searchInputRef2.current &&
        !searchInputRef2.current.contains(event.target as Node) &&
        searchInputRef3.current &&
        !searchInputRef3.current.contains(event.target as Node)
      ) {
        // setSearchTerm1('');
        // setSearchTerm2('');
        // setSearchTerm3('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
      {!(addSection || category.length !== 0) ? (
        <Box sx={styles.categoryBox1}>
          <Box
            component="img"
            src={DefaultHomeImg}
            alt="Default Illustration"
            sx={styles.categoryBox1ChildImg}
          />
          <Button
            variant="outlined"
            onClick={handleAddSection}
            sx={styles.mainCategoryAddButton}
            startIcon={<AddIcon sx={styles.categoryAddIcon} />}
          >
            ADD CATEGORY
          </Button>
        </Box>
      ) : (
        <Box sx={styles.categoryParentContainer}>
          <Box sx={styles.sectionContainer}>
            <Box sx={styles.sectionContainerChild}>
              <Typography variant="h3">Category</Typography>
              <AddIcon
                sx={styles.categoryAddIcon}
                onClick={() => {
                  handleOpenAddModal(null);
                  setCategoryModalTitle('Add a new category');
                }}
              />
            </Box>
            <TextField
              variant="outlined"
              sx={styles.categorySearchInputBox}
              value={searchTerm1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm1(e.target.value)
              }
              inputRef={searchInputRef1}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Search sx={{ color: theme.palette.text.primary }} />
                    </InputAdornment>
                  ),
                },
              }}
              placeholder="Search by category"
            />
            {category.length > 0 ? (
              filteredCategories.map((cat) => (
                <Box
                  key={cat.categoryUid}
                  onClick={() => {
                    setActiveCategory(cat.categoryUid);
                  }}
                  sx={{
                    ...styles.categoryContainerItem,
                    border:
                      cat.categoryUid === activeCategory
                        ? ''
                        : `1px solid ${theme.palette.text.primary}`,
                    backgroundColor:
                      cat.categoryUid === activeCategory
                        ? theme.palette.text.primary
                        : theme.palette.primary.main,
                  }}
                >
                  <Typography
                    sx={{
                      color:
                        cat.categoryUid === activeCategory
                          ? theme.palette.primary.main
                          : theme.palette.text.primary,
                    }}
                  >
                    {cat.categoryName}
                  </Typography>
                  <Box>
                    <Delete
                      onClick={() => handleOpenDeleteModal(cat.categoryUid)}
                      sx={{
                        cursor: 'pointer',
                        color:
                          cat.categoryUid === activeCategory
                            ? theme.palette.primary.main
                            : theme.palette.text.primary,
                      }}
                    />

                    <BorderColorIcon
                      sx={{
                        color:
                          cat.categoryUid === activeCategory
                            ? theme.palette.primary.main
                            : theme.palette.text.primary,
                      }}
                    />

                    <ChevronRightIcon
                      sx={{
                        color:
                          cat.categoryUid === activeCategory
                            ? theme.palette.primary.main
                            : theme.palette.text.primary,
                      }}
                    />
                  </Box>
                </Box>
              ))
            ) : (
              <Typography
                sx={{
                  color: theme.palette.text.primary,
                  textAlign: 'center',
                  marginTop: 2,
                }}
              >
                No category available
              </Typography>
            )}
          </Box>

          {addSectionOne ||
            (subCategoryOne.length > 0 && (
              <Box sx={styles.sectionContainer}>
                <Box sx={styles.sectionContainerChild}>
                  <Typography variant="h3">Sub-Category One</Typography>
                  <AddIcon
                    sx={styles.categoryAddIcon}
                    onClick={() => {
                      handleAddSubCategoryOne(categoryIdToAdd);
                      setCategoryModalTitle('Add a new sub-category');
                      setCategoryLevel(CategoryTypes.SubCategory1);
                    }}
                  />
                </Box>
                <TextField
                  variant="outlined"
                  sx={styles.categorySearchInputBox}
                  value={searchTerm2}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchTerm2(e.target.value)
                  }
                  inputRef={searchInputRef2}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <Search sx={{ color: theme.palette.text.primary }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                  placeholder="Search by category"
                />
                {subCategoryOne.length > 0 ? (
                  filteredCategoriesOne.map((subCat) => (
                    <Box
                      key={subCat.categoryUid}
                      sx={{
                        ...styles.categoryContainerItem,
                        border:
                          subCat.categoryUid === activeSubCategoryOne
                            ? ''
                            : `1px solid ${theme.palette.text.primary}`,
                        backgroundColor:
                          subCat.categoryUid === activeSubCategoryOne
                            ? theme.palette.text.primary
                            : theme.palette.primary.main,
                      }}
                      onClick={() => {
                        setActiveSubCategoryOne(subCat.categoryUid);
                      }}
                    >
                      <Typography
                        sx={{
                          ...styles.categoryContainerItemText,
                          color:
                            subCat.categoryUid === activeSubCategoryOne
                              ? theme.palette.primary.main
                              : theme.palette.text.primary,
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
                            color:
                              subCat.categoryUid === activeSubCategoryOne
                                ? theme.palette.primary.main
                                : theme.palette.text.primary,
                          }}
                        />

                        <BorderColorIcon
                          sx={{
                            color:
                              subCat.categoryUid === activeSubCategoryOne
                                ? theme.palette.primary.main
                                : theme.palette.text.primary,
                          }}
                        />

                        <ChevronRightIcon
                          sx={{
                            color:
                              subCat.categoryUid === activeSubCategoryOne
                                ? theme.palette.primary.main
                                : theme.palette.text.primary,
                          }}
                        />
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Typography>No subcategories available</Typography>
                )}
              </Box>
            ))}
          {addSectionTwo ||
            (subCategoryOne.length > 0 && (
              <Box sx={styles.sectionContainer}>
                <Box sx={styles.sectionContainerChild}>
                  <Typography variant="h3">Sub-Category Two</Typography>
                  <AddIcon
                    sx={styles.categoryAddIcon}
                    onClick={() => {
                      handleAddSubCategoryTwo(categoryIdToAdd);
                      setCategoryModalTitle('Add a new sub-category two');
                      setCategoryLevel(CategoryTypes.SubCategory2);
                    }}
                  />
                </Box>
                <TextField
                  variant="outlined"
                  sx={styles.categorySearchInputBox}
                  value={searchTerm3}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchTerm3(e.target.value)
                  }
                  inputRef={searchInputRef3}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <Search sx={{ color: theme.palette.text.primary }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                  placeholder="Search by category"
                />
                {subCategoryTwo.length > 0 ? (
                  filteredCategoriesTwo.map((cat) => (
                    <Box
                      key={cat.categoryUid}
                      sx={{
                        ...styles.categoryContainerItem,
                        border: `1px solid ${theme.palette.text.primary}`,
                      }}
                    >
                      <Typography sx={styles.categoryContainerItemText}>
                        {cat.categoryName}
                      </Typography>
                      <Box>
                        <Delete
                          onClick={() => handleOpenDeleteModal(cat.categoryUid)}
                          sx={{
                            cursor: 'pointer',
                          }}
                        />

                        <BorderColorIcon />
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Typography>No categories available</Typography>
                )}
              </Box>
            ))}

          <Button
            variant="outlined"
            sx={{ border: '3px dashed', mt: 2 }}
            onClick={handleAddSection}
            startIcon={<AddIcon sx={styles.categoryAddIcon} />}
          >
            ADD Section
          </Button>
        </Box>
      )}

      <Modal open={openAddModal} onClose={handleCloseAddModal}>
        <Box sx={styles.addCategoryModalContainer}>
          <Box sx={styles.addCategoryModalContentContainer}>
            <Typography variant="h6" sx={styles.addModalTitle}>
              {categoryModalTitle}
            </Typography>
            <CancelIcon color="inherit" onClick={handleCloseAddModal} />
          </Box>

          <TextField
            fullWidth
            label="Category Name"
            variant="outlined"
            sx={{ marginTop: '2rem', fontWeight: '600' }}
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />

          <Box sx={styles.addModalBtnContainer}>
            <Button
              variant="outlined"
              sx={styles.addModalCancelBtn}
              onClick={handleCloseAddModal}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={styles.addModalSubmitButton}
              onClick={() => {
                handleCreateCategory(
                  categoryName,
                  parentCategoryIdOfNewSubCategory,
                  categoryLevel
                );
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <Box sx={styles.deleteModalContainer}>
          <CancelIcon
            sx={styles.deleteModalCancelIcon}
            onClick={handleCloseDeleteModal}
          />
          <Box component="img" src={DeleteModalImg} />

          <Typography
            variant="body1"
            gutterBottom
            sx={styles.deleteModalConfirmText}
          >
            Are you sure you want to delete this category?
          </Typography>
          <Box sx={styles.deleteModalBtnContainer}>
            <Button
              variant="outlined"
              sx={styles.deleteModalCancelButton}
              onClick={handleCloseDeleteModal}
            >
              No
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={styles.deleteModalConfirmButton}
              onClick={() =>
                handleDeleteCategory(categoryIdToDelete, categoryLevel)
              }
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
