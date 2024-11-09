import {
  deleteData,
  getData,
  postData,
  updateData,
} from '@/services/axiosWrapper/fetch';
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
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Clear, Delete, Search } from '@mui/icons-material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ClearIcon from '@mui/icons-material/Clear';
import { Category, UpdateCategoryType } from '@/Interfaces/Modals/modals';
import { categoryEndpoint } from '@/utils/Urls';
import { CustomInput } from '@/GlobalStyles/globalStyles';

import DefaultHomeImg from '../../../assets/Pana_Illustration/Add tasks-pana 1.png';
import DeleteModalImg from '../../../assets/Pana_Illustration/Inbox cleanup-pana 1.png';
import { categoryStyles } from './categoryStyle';

function CategoryTab() {
  const EMPTY_GUID = '00000000-0000-0000-0000-000000000000';
  const theme = useTheme();
  const styles = categoryStyles(theme);
  const customInput = CustomInput(theme);

  const [category, setCategory] = useState<Category[]>([]);
  const [subCategoryOne, setSubCategoryOne] = useState<Category[]>([]);
  const [subCategoryTwo, setSubCategoryTwo] = useState<Category[]>([]);

  const [filteredCategories, setFilteredCategories] = useState(category);
  const [filteredCategoriesOne, setFilteredCategoriesOne] =
    useState(subCategoryOne);
  const [filteredCategoriesTwo, setFilteredCategoriesTwo] =
    useState(subCategoryTwo);

  const [categoryName, setCategoryName] = useState<string>('');

  const [activeCategory, setActiveCategory] = useState<string>('');
  const [activeSubCategoryOne, setActiveSubCategoryOne] = useState<string>('');

  const [showAddCategoryModal, setShowAddCategoryModal] =
    useState<boolean>(false);
  const [showUpdateCategoryModal, setShowUpdateCategoryModal] =
    useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState<string>('');
  const [categoryAddModalTitle, setCategoryAddModalTitle] =
    useState('Add new category');
  const [categoryUpdateModalTitle, setCategoryUpdateModalTitle] =
    useState('Edit category');
  const [
    parentCategoryIdOfNewSubCategory,
    setParentCategoryIdOfNewSubCategory,
  ] = useState<string>(EMPTY_GUID);

  const [hideAddCategoryIcon, setHideAddCategoryIcon] =
    useState<boolean>(false);
  const [hideAddSectionLevel1, setHideAddSectionLevel1] =
    useState<boolean>(false);
  const [hideAddSectionLevel2, setHideAddSectionLevel2] =
    useState<boolean>(false);

  const [parentCategorySearchText, setParentCategorySearchText] =
    useState<string>('');
  const [subCategory1SearchText, setSubCategory1SearchText] =
    useState<string>('');
  const [subCategory2SearchText, setSubCategory2SearchText] =
    useState<string>('');
  const [categoryUidToUpdate, setCategoryUidToUpdate] = useState<string>('');
  const [refetchTrigger, setRefetchTrigger] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const handleAddSection = () => {
    if (category.length === 0) {
      setHideAddCategoryIcon(true);
    } else if (subCategoryOne.length === 0) {
      setHideAddSectionLevel1(true);
    } else if (subCategoryTwo.length === 0) {
      setHideAddSectionLevel2(true);
    } else {
      setHideAddCategoryIcon(false);
      setHideAddSectionLevel1(false);
      setHideAddSectionLevel2(false);
    }
    console.log(hideAddSectionLevel1);
    console.log(hideAddSectionLevel2);
  };

  const handleOpenAddModal = () => {
    setShowAddCategoryModal(true);
    setParentCategoryIdOfNewSubCategory(EMPTY_GUID);
  };
  const handleAddSubCategoryOne = () => {
    setParentCategoryIdOfNewSubCategory(activeCategory);
    setShowAddCategoryModal(true);
  };

  const handleOpenDeleteModal = (categoryUid: string) => {
    setCategoryIdToDelete(categoryUid);
    setOpenDeleteModal(true);
  };
  const fetchData = async () => {
    getData(categoryEndpoint)
      .then((response) => {
        const categoryResponse = response as Category[];
        setCategory(categoryResponse);

        if (categoryResponse.length > 0) {
          setActiveCategory(categoryResponse[0].categoryUid);
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Error fetching category data.');
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, [refetchTrigger]);

  useEffect(() => {
    const subCategoryLevel1: Category[] =
      category.find((cat) => cat.categoryUid === activeCategory)
        ?.subCategories ?? [];

    setSubCategoryOne(subCategoryLevel1);

    if (subCategoryLevel1.length > 0) {
      setActiveSubCategoryOne(subCategoryLevel1[0].categoryUid);
    }
  }, [activeCategory, category]);

  useEffect(() => {
    const subCategoryLevel2: Category[] =
      subCategoryOne.find((cat) => cat.categoryUid === activeSubCategoryOne)
        ?.subCategories ?? [];

    setSubCategoryTwo(subCategoryLevel2);
  }, [activeSubCategoryOne, subCategoryOne]);

  const handleCreateCategory = async (
    catName: string,
    parentCategoryUid: string
  ) => {
    const newCategory: Category = {
      categoryUid: EMPTY_GUID,
      categoryName: catName,
      parentCategoryUid,
      subCategories: [],
    };

    await postData<Category, Category>(categoryEndpoint, newCategory)
      .then(() => {
        setRefetchTrigger((prev) => !prev);
        setCategoryName('');
        setShowAddCategoryModal(false);
      })
      .catch((err) => {
        console.error('Error creating category:', err);
      });
  };

  const handleUpdateCategory = async (catName: string, categoryUID: string) => {
    const updateCategory: UpdateCategoryType = {
      categoryUid: categoryUID,
      categoryName: catName,
    };
    const urlParams = new URLSearchParams(
      updateCategory as unknown as Record<string, string>
    ).toString();
    const fullUrl = `${categoryEndpoint}?${urlParams}`;
    await updateData<UpdateCategoryType, Category>(`${fullUrl}`, updateCategory)
      .then((response) => {
        if (!response) {
          setRefetchTrigger((prev) => !prev);
        }

        setCategoryName('');
        setShowUpdateCategoryModal(false);
      })
      .catch((err) => {
        console.error('Error creating category:', err);
      });
  };

  const handleDeleteCategory = async (categoryUid: string) => {
    await deleteData(categoryEndpoint, categoryUid)
      .then(() => {
        setRefetchTrigger((prev) => !prev);
        setOpenDeleteModal(false);
      })
      .catch((err) => {
        console.error('Error while deleting the category', err);
      });
  };
  useEffect(() => {
    const filterCategory = category.filter((cat) =>
      cat.categoryName
        .toLowerCase()
        .includes(parentCategorySearchText.trim().toLowerCase())
    );
    setFilteredCategories(filterCategory);
  }, [category, parentCategorySearchText]);

  useEffect(() => {
    const filterCategory = subCategoryOne.filter((cat) =>
      cat.categoryName
        .toLowerCase()
        .includes(subCategory1SearchText.trim().toLowerCase())
    );
    setFilteredCategoriesOne(filterCategory);
  }, [subCategoryOne, subCategory1SearchText]);

  useEffect(() => {
    const filterCategory = subCategoryTwo.filter((cat) =>
      cat.categoryName
        .toLowerCase()
        .includes(subCategory2SearchText.trim().toLowerCase())
    );
    setFilteredCategoriesTwo(filterCategory);
  }, [subCategoryTwo, subCategory2SearchText]);

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
  const renderNoCategoriesAvailableSection = (title: string): JSX.Element => (
    <Typography sx={styles.noCategoryAvailableText}>{title}</Typography>
  );

  return (
    <Box>
      {!hideAddCategoryIcon && category.length === 0 ? (
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
                  handleOpenAddModal();
                  setCategoryAddModalTitle('Add a new category');
                }}
              />
            </Box>
            <TextField
              variant="outlined"
              sx={{ ...customInput.dark, padding: 0, marginBottom: '1.2rem' }}
              value={parentCategorySearchText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setParentCategorySearchText(e.target.value)
              }
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      {parentCategorySearchText ? (
                        <Clear
                          onClick={() => {
                            setParentCategorySearchText('');
                          }}
                          sx={{
                            color: theme.palette.text.primary,
                            cursor: 'pointer',
                          }}
                        />
                      ) : (
                        <Search
                          sx={{
                            color: theme.palette.text.primary,
                            cursor: 'pointer',
                          }}
                        />
                      )}
                    </InputAdornment>
                  ),
                },
              }}
              placeholder="Search by category"
            />

            {category.length > 0
              ? filteredCategories.map((cat) => (
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
                        ...styles.categoryContainerItemText,
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
                        onClick={() => {
                          handleOpenDeleteModal(cat.categoryUid);
                        }}
                        sx={{
                          cursor: 'pointer',
                          color:
                            cat.categoryUid === activeCategory
                              ? theme.palette.primary.main
                              : theme.palette.text.primary,
                        }}
                      />

                      <BorderColorIcon
                        onClick={() => {
                          setShowUpdateCategoryModal(true);
                          setCategoryUidToUpdate(cat.categoryUid);

                          setCategoryName(cat.categoryName);
                          setCategoryUpdateModalTitle('Edit category');
                        }}
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
              : renderNoCategoriesAvailableSection(
                  'No categories available...'
                )}
          </Box>

          {(hideAddSectionLevel1 || subCategoryOne.length > 0) && (
            <Box sx={styles.sectionContainer}>
              <Box sx={styles.sectionContainerChild}>
                <Typography variant="h3">Sub-Category One</Typography>
                <AddIcon
                  sx={styles.categoryAddIcon}
                  onClick={() => {
                    handleAddSubCategoryOne();
                    setCategoryAddModalTitle('Add a new sub-category');
                  }}
                />
              </Box>
              <TextField
                variant="outlined"
                sx={{ ...customInput.dark, padding: 0, marginBottom: '1.2rem' }}
                value={subCategory1SearchText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSubCategory1SearchText(e.target.value)
                }
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        {subCategory1SearchText ? (
                          <Clear
                            onClick={() => setSubCategory1SearchText('')}
                            sx={{
                              color: theme.palette.text.primary,
                              cursor: 'pointer',
                            }}
                          />
                        ) : (
                          <Search
                            sx={{
                              color: theme.palette.text.primary,
                              cursor: 'pointer',
                            }}
                          />
                        )}
                      </InputAdornment>
                    ),
                  },
                }}
                placeholder="Search by category"
              />
              {subCategoryOne.length > 0
                ? filteredCategoriesOne.map((subCat) => (
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
                          onClick={() => {
                            handleOpenDeleteModal(subCat.categoryUid);
                          }}
                          sx={{
                            cursor: 'pointer',
                            color:
                              subCat.categoryUid === activeSubCategoryOne
                                ? theme.palette.primary.main
                                : theme.palette.text.primary,
                          }}
                        />

                        <BorderColorIcon
                          onClick={() => {
                            setShowUpdateCategoryModal(true);
                            setCategoryUpdateModalTitle(
                              'Edit sub-category two'
                            );
                            setCategoryUidToUpdate(subCat.categoryUid);

                            setCategoryName(subCat.categoryName);
                          }}
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
                : renderNoCategoriesAvailableSection(
                    'No sub-categories available...'
                  )}
            </Box>
          )}
          {(hideAddSectionLevel2 || subCategoryTwo.length > 0) && (
            <Box sx={styles.sectionContainer}>
              <Box sx={styles.sectionContainerChild}>
                <Typography variant="h3">Sub-Category Two</Typography>
                <AddIcon
                  sx={styles.categoryAddIcon}
                  onClick={() => {
                    setParentCategoryIdOfNewSubCategory(activeSubCategoryOne);
                    setShowAddCategoryModal(true);
                    setCategoryAddModalTitle('Add a new sub-category two');
                  }}
                />
              </Box>
              <TextField
                variant="outlined"
                sx={{ ...customInput.dark, padding: 0, marginBottom: '1.2rem' }}
                value={subCategory2SearchText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSubCategory2SearchText(e.target.value)
                }
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        {subCategory2SearchText ? (
                          <Clear
                            onClick={() => {
                              setSubCategory2SearchText('');
                            }}
                            sx={{
                              cursor: 'pointer',
                              color: theme.palette.text.primary,
                            }}
                          />
                        ) : (
                          <Search
                            sx={{
                              color: theme.palette.text.primary,
                              cursor: 'pointer',
                            }}
                          />
                        )}
                      </InputAdornment>
                    ),
                  },
                }}
                placeholder="Search by category"
              />
              {subCategoryTwo.length > 0
                ? filteredCategoriesTwo.map((cat) => (
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
                          onClick={() => {
                            handleOpenDeleteModal(cat.categoryUid);
                          }}
                          sx={{
                            cursor: 'pointer',
                          }}
                        />

                        <BorderColorIcon
                          onClick={() => {
                            setShowUpdateCategoryModal(true);
                            setCategoryUpdateModalTitle(
                              'Edit sub-category two'
                            );
                            setCategoryUidToUpdate(cat.categoryUid);

                            setCategoryName(cat.categoryName);
                          }}
                        />
                      </Box>
                    </Box>
                  ))
                : renderNoCategoriesAvailableSection(
                    'No sub-categories available...'
                  )}
            </Box>
          )}
          {((!hideAddSectionLevel1 && subCategoryOne.length === 0) ||
            (!hideAddSectionLevel2 && subCategoryTwo.length === 0)) && (
            <Button
              variant="outlined"
              sx={styles.addSectionButton}
              onClick={handleAddSection}
              startIcon={<AddIcon sx={styles.categoryAddIcon} />}
            >
              ADD SECTION
            </Button>
          )}
        </Box>
      )}

      <Modal
        open={showAddCategoryModal}
        onClose={() => setShowAddCategoryModal(false)}
      >
        <Box sx={styles.addCategoryModalContainer}>
          <Box sx={styles.addCategoryModalContentContainer}>
            <Typography variant="h4" sx={styles.addModalTitle}>
              {categoryAddModalTitle}
            </Typography>
            <ClearIcon
              color="inherit"
              onClick={() => setShowAddCategoryModal(false)}
            />
          </Box>

          <TextField
            fullWidth
            label="Category Name"
            variant="outlined"
            value={categoryName}
            onChange={(e) => {
              const inputValue = e.target.value;

              if (!inputValue.includes(',')) {
                setCategoryName(inputValue);
              }
            }}
            helperText={
              categoryName.includes(',') ? 'Commas are not allowed' : ''
            }
            sx={{
              ...CustomInput(theme).light,
            }}
          />

          <Box sx={styles.addModalBtnContainer}>
            <Button
              variant="outlined"
              sx={styles.addModalCancelBtn}
              onClick={() => setShowAddCategoryModal(false)}
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
                  parentCategoryIdOfNewSubCategory
                );
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={showUpdateCategoryModal}
        onClose={() => setShowUpdateCategoryModal(false)}
      >
        <Box sx={styles.addCategoryModalContainer}>
          <Box sx={styles.addCategoryModalContentContainer}>
            <Typography variant="h6" sx={styles.addModalTitle}>
              {categoryUpdateModalTitle}
            </Typography>
            <ClearIcon
              color="inherit"
              onClick={() => setShowUpdateCategoryModal(false)}
            />
          </Box>

          <TextField
            fullWidth
            label="Category Name"
            variant="outlined"
            value={categoryName}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (!inputValue.includes(',')) {
                setCategoryName(inputValue);
              }
            }}
            helperText={
              categoryName.includes(',') ? 'Commas are not allowed' : ''
            }
            sx={{
              ...CustomInput(theme).light,
            }}
          />

          <Box sx={styles.addModalBtnContainer}>
            <Button
              variant="outlined"
              sx={styles.addModalCancelBtn}
              onClick={() => setShowUpdateCategoryModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={styles.addModalSubmitButton}
              onClick={() => {
                handleUpdateCategory(categoryName, categoryUidToUpdate);
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <Box sx={styles.deleteModalContainer}>
          <ClearIcon
            sx={styles.deleteModalCancelIcon}
            onClick={() => setOpenDeleteModal(false)}
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
              onClick={() => setOpenDeleteModal(false)}
            >
              No
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={styles.deleteModalConfirmButton}
              onClick={() => handleDeleteCategory(categoryIdToDelete)}
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
