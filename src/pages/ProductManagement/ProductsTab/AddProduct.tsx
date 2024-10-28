import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  InputLabel,
  FormControl,
  OutlinedInput,
  CircularProgress,
  Typography,
  useTheme,
  IconButton,
  Tooltip,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { format } from 'date-fns';
import {
  Category,
  ImageObject,
  ProductRequestModal,
} from '@/Interfaces/Modals/modals';
import { categoryEndpoint, productDataEndpoint } from '@/utils/Urls';
import { getData, postData } from '@/services/axiosWrapper/fetch';
import { Box } from '@mui/system';
import { AddPhotoAlternate } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import { globalStyles } from '@/GlobalStyles/sharedStyles';
import { productStyles } from './productStyles';

const validationSchema = Yup.object({
  productName: Yup.string().required('Product name is required'),
  skuCode: Yup.string().required('SKU Code is required'),
  price: Yup.number()
    .required('Price is required')
    .positive('Price must be positive'),
  loyaltyPoint: Yup.number()
    .required('Loyalty point is required')
    .min(0, 'Loyalty point must be 0 or greater'),
  weight: Yup.number()
    .required('Weight is required')
    .min(0, 'Weight must be 0 or greater'),
  parentCategoryUid: Yup.string().required('Category is required'),
  subCategoryUidOne: Yup.array().min(
    1,
    'At least one subcategory must be selected'
  ),
  subCategoryUidTwo: Yup.array().min(
    1,
    'At least one subcategory must be selected'
  ),
  expiryDate: Yup.date().required('Expiry date is required'),
  productDescription: Yup.string().required('Product description is required'),
  images: Yup.array()
    .min(1, 'At least one image is required')
    .max(3, 'Only 3 images allowed'),
});

const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result as string;

      const trimmedBase64 = base64String.split(',')[1];
      resolve(trimmedBase64);
    };
    reader.onerror = (error) => reject(error);
  });
};

interface AddProductProps {
  setShowAddProductModal(showAddProductModal: boolean): void;
  refetchTrigger: () => void;
}

function AddProduct(props: AddProductProps) {
  const { setShowAddProductModal, refetchTrigger } = props;
  const theme = useTheme();
  const styles = productStyles(theme);
  const globalStyle = globalStyles(theme);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategoriesOne, setSubCategoriesOne] = useState<Category[]>([]);
  const [subCategoriesTwo, setSubCategoriesTwo] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [activeSubCategoryOne, setActiveSubCategoryOne] = useState<string[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const initialValues = {
    productName: '',
    skuCode: '',
    price: '',
    loyaltyPoint: '',
    weight: '',
    parentCategoryUid: '',
    subCategoryUidOne: [] as string[],
    subCategoryUidTwo: [] as string[],
    expiryDate: new Date() as Date | null,
    productDescription: '',
    images: [] as ImageObject[],
  };

  useEffect(() => {
    getData(categoryEndpoint)
      .then((response) => {
        const categoryResponse = response as Category[];
        setCategories(categoryResponse);

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
    if (activeCategory && categories.length > 0) {
      const subCategoryLevel1: Category[] =
        categories.find((cat) => cat.categoryUid === activeCategory)
          ?.subCategories ?? [];

      setSubCategoriesOne(subCategoryLevel1);

      if (subCategoryLevel1.length > 0) {
        setActiveSubCategoryOne([subCategoryLevel1[0].categoryUid]);
      }
    }
  }, [activeCategory, categories]);

  useEffect(() => {
    if (activeSubCategoryOne && subCategoriesOne.length > 0) {
      const subCategoryLevel2: Category[] = activeSubCategoryOne.flatMap(
        (categoryUid) =>
          subCategoriesOne.find((cat) => cat.categoryUid === categoryUid)
            ?.subCategories ?? []
      );
      setSubCategoriesTwo(subCategoryLevel2);
    }
  }, [activeSubCategoryOne, subCategoriesOne]);

  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([
    null,
    null,
    null,
  ]);
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    setFieldValue: (field: string, value: unknown) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      convertToBase64(file)
        .then((base64String) => {
          const imageObject: ImageObject = {
            fileName: file.name,
            mimeType: file.type,
            base64Encoded: base64String,
            isNew: true,
            hash: null,
            toBeDeleted: false,
          };
          setFieldValue(`images[${index}]`, imageObject);

          const previewUrl = URL.createObjectURL(file);
          setImagePreviews((prev) => {
            const updatedPreviews = [...prev];
            updatedPreviews[index] = previewUrl;
            return updatedPreviews;
          });
        })
        .catch((err) => console.error('Failed to read file', err));
    }
  };

  const handleRemoveImage = (
    index: number,
    setFieldValue: (field: string, value: unknown) => void
  ) => {
    setImagePreviews((prev) => {
      const updatedPreviews = [...prev];
      if (updatedPreviews[index]) {
        URL.revokeObjectURL(updatedPreviews[index] as string);
      }
      updatedPreviews[index] = null;
      return updatedPreviews;
    });
    setFieldValue(`images[${index}]`, null);
  };
  const handleSubmit = async (values: typeof initialValues) => {
    const addProductData: ProductRequestModal = {
      skuCode: values.skuCode,
      productName: values.productName,
      productDescription: values.productDescription,
      price: Number(values.price),
      weight: Number(values.weight),
      loyaltyPoints: Number(values.loyaltyPoint),
      productExpiry: format(values.expiryDate ?? new Date(), 'yyyy-MM-dd'),
      categories: [
        values.parentCategoryUid,
        ...values.subCategoryUidOne,
        ...values.subCategoryUidTwo,
      ],
      images: values.images,
    };
    await postData(productDataEndpoint, addProductData)
      .then((response) => {
        if (response) {
          setShowAddProductModal(false);
          refetchTrigger();
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, setFieldValue }) => (
        <Form>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2,1fr)',
              columnGap: '1rem',
            }}
          >
            <TextField
              fullWidth
              name="productName"
              label="Product Name"
              value={values.productName}
              onChange={handleChange}
              error={touched.productName && Boolean(errors.productName)}
              helperText={touched.productName && errors.productName}
              sx={{ ...styles.inputBox }}
            />

            <TextField
              fullWidth
              name="skuCode"
              label="SKU Code"
              value={values.skuCode}
              onChange={handleChange}
              error={touched.skuCode && Boolean(errors.skuCode)}
              helperText={touched.skuCode && errors.skuCode}
              sx={{ ...styles.inputBox }}
            />

            <TextField
              fullWidth
              name="price"
              label="Price"
              type="number"
              value={values.price}
              onChange={handleChange}
              error={touched.price && Boolean(errors.price)}
              helperText={touched.price && errors.price}
              sx={{ ...styles.inputBox }}
            />

            <TextField
              fullWidth
              name="loyaltyPoint"
              label="Loyalty Point"
              type="number"
              value={values.loyaltyPoint}
              onChange={handleChange}
              sx={{ ...styles.inputBox }}
              error={touched.loyaltyPoint && Boolean(errors.loyaltyPoint)}
              helperText={touched.loyaltyPoint && errors.loyaltyPoint}
            />

            <TextField
              fullWidth
              name="weight"
              label="Weight"
              type="number"
              value={values.weight}
              sx={{ ...styles.inputBox }}
              onChange={handleChange}
              error={touched.weight && Boolean(errors.weight)}
              helperText={touched.weight && errors.weight}
            />
            <FormControl fullWidth>
              <InputLabel sx={styles.inputSelectBox.label}>Category</InputLabel>
              <Select
                name="parentCategoryUid"
                value={values.parentCategoryUid}
                onChange={(event) => {
                  const selectedCategoryUid = event.target.value;
                  setFieldValue('parentCategoryUid', selectedCategoryUid);
                  setActiveCategory(selectedCategoryUid);
                }}
                error={
                  touched.parentCategoryUid && Boolean(errors.parentCategoryUid)
                }
                sx={styles.inputSelectBox.select}
              >
                {categories.map((category) => (
                  <MenuItem
                    key={category.categoryUid}
                    value={category.categoryUid}
                  >
                    {category.categoryName}
                  </MenuItem>
                ))}
              </Select>
              {touched.parentCategoryUid && errors.parentCategoryUid && (
                <div style={{ color: 'red' }}>{errors.parentCategoryUid}</div>
              )}
            </FormControl>

            <FormControl fullWidth>
              <InputLabel sx={styles.inputSelectBox.label}>
                Sub-category one
              </InputLabel>
              <Select
                name="subCategory"
                multiple
                value={values.subCategoryUidOne}
                sx={styles.inputSelectBox.select}
                onChange={(event) => {
                  const { value } = event.target;
                  const selectedSubCategoryOne: string[] =
                    typeof value === 'string' ? [value] : value;
                  setFieldValue('subCategoryUidOne', selectedSubCategoryOne);
                  setActiveSubCategoryOne(selectedSubCategoryOne);
                }}
                input={<OutlinedInput label="Sub-category one" />}
                renderValue={(selected) => {
                  return selected
                    .map(
                      (uid) =>
                        subCategoriesOne.find(
                          (subCategory) => subCategory.categoryUid === uid
                        )?.categoryName || ''
                    )
                    .join(', ');
                }}
              >
                {subCategoriesOne.map((subCategory: Category) => (
                  <MenuItem
                    key={subCategory.categoryUid}
                    value={subCategory.categoryUid}
                  >
                    <Checkbox
                      checked={values.subCategoryUidOne.includes(
                        subCategory.categoryUid
                      )}
                    />
                    <ListItemText primary={subCategory.categoryName} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel sx={styles.inputSelectBox.label}>
                Sub-category two
              </InputLabel>
              <Select
                name="subCategoryTwo"
                multiple
                value={values.subCategoryUidTwo}
                sx={styles.inputSelectBox.select}
                onChange={(event) =>
                  setFieldValue('subCategoryTwo', event.target.value)
                }
                input={<OutlinedInput label="Sub-category two" />}
                renderValue={(selected: string[]) => {
                  return selected
                    .map((uid) => {
                      const foundCategory = subCategoriesTwo.find(
                        (subCategory: Category) =>
                          subCategory.categoryUid === uid
                      );
                      return foundCategory ? foundCategory.categoryName : '';
                    })
                    .join(', ');
                }}
              >
                {subCategoriesTwo.map((subCategory: Category) => (
                  <MenuItem
                    key={subCategory.categoryUid}
                    value={subCategory.categoryUid}
                  >
                    <Checkbox
                      checked={values.subCategoryUidTwo.includes(
                        subCategory.categoryUid
                      )}
                    />
                    <ListItemText primary={subCategory.categoryName} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                name="expiryDate"
                label="Product Expiry"
                value={values.expiryDate}
                onChange={(date: Date | null) => {
                  setFieldValue('expiryDate', date);
                }}
                slotProps={{ textField: { variant: 'outlined' } }}
                sx={{ marginTop: '1rem' }}
              />
            </LocalizationProvider>

            <Box display="flex" mt={2} gap={2}>
              {[0, 1, 2].map((index) => (
                <Box key={index} position="relative">
                  {imagePreviews[index] ? (
                    <Box
                      position="relative"
                      width="80px"
                      height="80px"
                      sx={{
                        border: '1px solid #2c2c2c',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <img
                        src={imagePreviews[index] as string}
                        alt={`Selected ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                      <Tooltip title="Delete Image">
                        <IconButton
                          onClick={() =>
                            handleRemoveImage(index, setFieldValue)
                          }
                          sx={{
                            position: 'absolute',
                            bottom: 48,
                            right: 4,
                          }}
                        >
                          <CancelIcon sx={{ fontSize: 20, color: 'red' }} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        width: '80px',
                        height: '80px',
                        border: '2px dashed #2c2c2c',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <label htmlFor={`image-upload-${index}`}>
                        <input
                          accept="image/*"
                          type="file"
                          id={`image-upload-${index}`}
                          style={{ display: 'none' }}
                          onChange={(e) =>
                            handleImageChange(e, index, setFieldValue)
                          }
                        />
                        <AddPhotoAlternate
                          sx={{ fontSize: 40, color: '#2c2c2c' }}
                        />
                      </label>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
          <TextField
            fullWidth
            multiline
            name="productDescription"
            label="Product Description"
            value={values.productDescription}
            onChange={handleChange}
            error={
              touched.productDescription && Boolean(errors.productDescription)
            }
            helperText={touched.productDescription && errors.productDescription}
            sx={{ ...styles.productDescriptionInputBox }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginLeft: '60%',
              marginTop: '1rem',
            }}
          >
            <Button
              variant="contained"
              onClick={() => setShowAddProductModal(false)}
              sx={globalStyle.deleteModalCancelButton}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={globalStyle.deleteModalConfirmButton}
              onClick={() => handleSubmit(values)}
            >
              Add Product
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default AddProduct;
