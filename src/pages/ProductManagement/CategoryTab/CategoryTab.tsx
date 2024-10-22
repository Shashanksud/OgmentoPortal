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
import { Delete, Search } from '@mui/icons-material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  CategoryTypes,
  Category,
  UpdateCategoryType,
} from '@/Interfaces/Modals/modals';
import { useNotifications } from '@toolpad/core/useNotifications';
import { categoryEndpoint } from '@/utils/Urls';
import { CustomSelect, CustomInput } from '@/GlobalStyles/sharedStyles';

import DefaultHomeImg from '../../../assets/Pana_Illustration/Add tasks-pana 1.png';
import DeleteModalImg from '../../../assets/Pana_Illustration/Inbox cleanup-pana 1.png';
import { categoryStyles } from './categoryStyle';

function CategoryTab() {
  const EMPTY_GUID = '00000000-0000-0000-0000-000000000000';
  const theme = useTheme();
  const styles = categoryStyles(theme);

  const notifications = useNotifications();
  const [category, setCategory] = useState<Category[]>([]);
  const [subCategoryOne, setSubCategoryOne] = useState<Category[]>([]);
  const [subCategoryTwo, setSubCategoryTwo] = useState<Category[]>([]);

  const [filteredCategories, setFilteredCategories] = useState(category);
  const [filteredCategoriesOne, setFilteredCategoriesOne] =
    useState(subCategoryOne);
  const [filteredCategoriesTwo, setFilteredCategoriesTwo] =
    useState(subCategoryTwo);

  const [categoryLevel, setCategoryLevel] = useState<CategoryTypes>(
    CategoryTypes.ParentCategory
  );
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

  const [addSection, setAddSection] = useState<boolean>(false);
  const [addSectionOne, setAddSectionOne] = useState<boolean>(false);
  const [addSectionTwo, setAddSectionTwo] = useState<boolean>(false);

  const [searchTerm1, setSearchTerm1] = useState<string>('');
  const [searchTerm2, setSearchTerm2] = useState<string>('');
  const [searchTerm3, setSearchTerm3] = useState<string>('');
  const [categoryUidToUpdate, setCategoryUidToUpdate] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const handleAddSection = () => {
    if (category.length === 0) {
      setAddSection(true);
    } else if (subCategoryOne.length === 0) {
      setAddSectionOne(true);
    } else if (subCategoryTwo.length === 0) {
      setAddSectionTwo(true);
    } else {
      setAddSection(false);
      setAddSectionOne(false);
      setAddSectionTwo(false);
    }
  };

  // useEffect(() => {
  //   if (category.length === 0) {
  //     setAddSection(true);
  //   } else if (subCategoryOne.length === 0) {
  //     setAddSectionOne(true);
  //   } else if (subCategoryTwo.length === 0) {
  //     setAddSectionTwo(true);
  //   } else {
  //     setAddSection(false);
  //     setAddSectionOne(false);
  //     setAddSectionTwo(false);
  //   }
  // }, [category, subCategoryOne, subCategoryTwo]);
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

  useEffect(() => {
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
    parentCategoryUid: string,
    catLevel: CategoryTypes
  ) => {
    const newCategory: Category = {
      categoryUid: EMPTY_GUID,
      categoryName: catName,
      parentCategoryUid,
      subCategories: [],
    };

    await postData<Category, Category>(categoryEndpoint, newCategory)
      .then((createdCategory: Category) => {
        switch (catLevel) {
          case CategoryTypes.ParentCategory:
            setCategory((prevCat) => [...prevCat, createdCategory]);
            break;
          case CategoryTypes.SubCategory1:
            setSubCategoryOne((prevCat) => [...prevCat, createdCategory]);
            break;
          default:
            setSubCategoryTwo((prevCat) => [...prevCat, createdCategory]);
        }

        setCategoryName('');
        setShowAddCategoryModal(false);
      })
      .catch((err) => {
        console.error('Error creating category:', err);
      });
  };

  const handleUpdateCategory = async (
    catName: string,
    categoryUID: string,
    catLevel: CategoryTypes
  ) => {
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
          switch (catLevel) {
            case CategoryTypes.ParentCategory:
              setCategory((prevCat) =>
                prevCat.map((cat) =>
                  cat.categoryUid === categoryUID
                    ? { ...cat, categoryName: catName }
                    : cat
                )
              );
              break;
            case CategoryTypes.SubCategory1:
              setSubCategoryOne((prevCat) =>
                prevCat.map((cat) =>
                  cat.categoryUid === categoryUID
                    ? { ...cat, categoryName: catName }
                    : cat
                )
              );
              break;
            default:
              setSubCategoryTwo((prevCat) =>
                prevCat.map((cat) =>
                  cat.categoryUid === categoryUID
                    ? { ...cat, categoryName: catName }
                    : cat
                )
              );
          }
        }

        setCategoryName('');
        setShowUpdateCategoryModal(false);
      })
      .catch((err) => {
        console.error('Error creating category:', err);
      });
  };

  const handleDeleteCategory = async (
    categoryUid: string,
    catLevel: CategoryTypes
  ) => {
    await deleteData(categoryEndpoint, categoryUid)
      .then(() => {
        switch (catLevel) {
          case CategoryTypes.ParentCategory:
            setCategory(
              category.filter((cat) => cat.categoryUid !== categoryUid)
            );
            if (category.length === 0) {
              setAddSection(false);
            }
            break;
          case CategoryTypes.SubCategory1:
            setSubCategoryOne(
              subCategoryOne.filter((cat) => cat.categoryUid !== categoryUid)
            );
            break;
          default:
            setSubCategoryTwo(
              subCategoryTwo.filter((cat) => cat.categoryUid !== categoryUid)
            );
            break;
        }

        setOpenDeleteModal(false);
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
                  handleOpenAddModal();
                  setCategoryAddModalTitle('Add a new category');
                  setCategoryLevel(CategoryTypes.ParentCategory);
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
            <Button
              onClick={() => {
                notifications.show('Consider yourself notified!', {
                  autoHideDuration: 3000,
                });
              }}
            >
              Notify me
            </Button>
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
                        setCategoryLevel(CategoryTypes.ParentCategory);
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
                        setCategoryLevel(CategoryTypes.ParentCategory);
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
            ) : (
              <Typography sx={styles.noCategoryAvailableText}>
                No category available...
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
                      handleAddSubCategoryOne();
                      setCategoryAddModalTitle('Add a new sub-category');
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
                          onClick={() => {
                            handleOpenDeleteModal(subCat.categoryUid);
                            setCategoryLevel(CategoryTypes.SubCategory1);
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
                            setCategoryLevel(CategoryTypes.SubCategory1);
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
                ) : (
                  <Typography sx={styles.noCategoryAvailableText}>
                    No category available...
                  </Typography>
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
                      setParentCategoryIdOfNewSubCategory(activeSubCategoryOne);
                      setShowAddCategoryModal(true);
                      setCategoryAddModalTitle('Add a new sub-category two');
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
                          onClick={() => {
                            handleOpenDeleteModal(cat.categoryUid);
                            setCategoryLevel(CategoryTypes.SubCategory2);
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
                            setCategoryLevel(CategoryTypes.SubCategory2);
                            setCategoryName(cat.categoryName);
                          }}
                        />
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Typography sx={styles.noCategoryAvailableText}>
                    No category available...
                  </Typography>
                )}
              </Box>
            ))}

          <Button
            variant="outlined"
            sx={styles.addSectionButton}
            onClick={handleAddSection}
            startIcon={<AddIcon sx={styles.categoryAddIcon} />}
          >
            ADD SECTION
          </Button>
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
            <CancelIcon
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
              ...CustomSelect(theme).light,
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
      <Modal
        open={showUpdateCategoryModal}
        onClose={() => setShowUpdateCategoryModal(false)}
      >
        <Box sx={styles.addCategoryModalContainer}>
          <Box sx={styles.addCategoryModalContentContainer}>
            <Typography variant="h6" sx={styles.addModalTitle}>
              {categoryUpdateModalTitle}
            </Typography>
            <CancelIcon
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
              ...CustomSelect(theme).light,
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
                handleUpdateCategory(
                  categoryName,
                  categoryUidToUpdate,
                  categoryLevel
                );
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <Box sx={styles.deleteModalContainer}>
          <CancelIcon
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
