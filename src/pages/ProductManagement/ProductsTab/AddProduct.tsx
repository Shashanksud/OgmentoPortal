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
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Category } from '@/Interfaces/Modals/modals';
import { categoryEndpoint } from '@/utils/Urls';
import { getData } from '@/services/axiosWrapper/fetch';
import { Box } from '@mui/system';
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
  expiryDate: Yup.date().nullable().required('Expiry date is required'),
  productDescription: Yup.string().required('Product description is required'),
});

function AddProduct() {
  const theme = useTheme();
  const styles = productStyles(theme);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategoriesOne, setSubCategoriesOne] = useState<Category[]>([]);
  const [subCategoriesTwo, setSubCategoriesTwo] = useState<Category[]>([]);
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [activeSubCategoryOne, setActiveSubCategoryOne] = useState<string>('');
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
    expiryDate: null,
    productDescription: '',
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
        setActiveSubCategoryOne(subCategoryLevel1[0].categoryUid);
      }
    }
  }, [activeCategory, categories]);

  useEffect(() => {
    if (activeSubCategoryOne && subCategoriesOne.length > 0) {
      const subCategoryLevel2: Category[] =
        subCategoriesOne.find((cat) => cat.categoryUid === activeSubCategoryOne)
          ?.subCategories ?? [];

      setSubCategoriesTwo(subCategoryLevel2);
    }
  }, [activeSubCategoryOne, subCategoriesOne]);

  const handleSubmit = (values: typeof initialValues) => {
    console.log('Form Values:', values);
  };
  console.log(categories);
  console.log(subCategoriesOne);
  console.log(subCategoriesTwo);
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
              gap: '1rem',
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
              margin="normal"
              sx={styles.inputBox.light}
            />

            <TextField
              fullWidth
              name="skuCode"
              label="SKU Code"
              value={values.skuCode}
              onChange={handleChange}
              error={touched.skuCode && Boolean(errors.skuCode)}
              helperText={touched.skuCode && errors.skuCode}
              margin="normal"
              sx={styles.inputBox.light}
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
              margin="normal"
              sx={styles.inputBox.light}
            />

            <TextField
              fullWidth
              name="loyaltyPoint"
              label="Loyalty Point"
              type="number"
              value={values.loyaltyPoint}
              onChange={handleChange}
              sx={styles.inputBox.light}
              error={touched.loyaltyPoint && Boolean(errors.loyaltyPoint)}
              helperText={touched.loyaltyPoint && errors.loyaltyPoint}
              margin="normal"
            />

            <TextField
              fullWidth
              name="weight"
              label="Weight"
              type="number"
              value={values.weight}
              sx={styles.inputBox.light}
              onChange={handleChange}
              error={touched.weight && Boolean(errors.weight)}
              helperText={touched.weight && errors.weight}
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel sx={styles.inputSelectBox.label}>Category</InputLabel>
              <Select
                name="parentCategoryUid"
                value={values.parentCategoryUid}
                onChange={(event) =>
                  setFieldValue('parentCategoryUid', event.target.value)
                }
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

            <FormControl fullWidth margin="normal">
              <InputLabel sx={styles.inputSelectBox.label}>
                Sub-category one
              </InputLabel>
              <Select
                name="subCategory"
                multiple
                value={values.subCategoryUidOne}
                sx={styles.inputSelectBox.select}
                onChange={(event) => {
                  // eslint-disable-next-line no-debugger
                  debugger;
                  setFieldValue('subCategoryUidOne', event.target.value);
                }}
                input={<OutlinedInput label="Sub-category one" />}
                renderValue={(selected) =>
                  selected.length > 0
                    ? selected.join(', ')
                    : 'Select Sub Categories'
                }
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

            <FormControl fullWidth margin="normal">
              <InputLabel sx={styles.inputSelectBox.label}>
                Sub-category two
              </InputLabel>
              <Select
                name="subCategoryTwo"
                multiple
                value={subCategoriesTwo}
                sx={styles.inputSelectBox.select}
                onChange={(event) =>
                  setFieldValue('subCategoryTwo', event.target.value)
                }
                input={<OutlinedInput label="Sub-category two" />}
                renderValue={(selected) =>
                  selected.length > 0
                    ? selected.join(', ')
                    : 'Select Sub Categories two'
                }
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
                label="Product Expiry"
                value={expiryDate}
                onChange={(date: Date | null) => {
                  setExpiryDate(date);
                }}
                slotProps={{ textField: { variant: 'outlined' } }}
              />
            </LocalizationProvider>

            <TextField
              fullWidth
              multiline
              name="productDescription"
              label="Product Description"
              sx={styles.inputBox.light}
              value={values.productDescription}
              onChange={handleChange}
              error={
                touched.productDescription && Boolean(errors.productDescription)
              }
              helperText={
                touched.productDescription && errors.productDescription
              }
              margin="normal"
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Product
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default AddProduct;
