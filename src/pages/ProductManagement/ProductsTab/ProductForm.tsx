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
import { format, parse } from 'date-fns';
import {
  categoryEndpoint,
  deletePictureEndpoint,
  productDataEndpoint,
} from '@/utils/Urls';
import {
  deleteData,
  getData,
  postData,
  updateData,
} from '@/services/axiosWrapper/fetch';
import { Box } from '@mui/system';
import { AddPhotoAlternate } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  CustomDatePicker,
  CustomInput,
  CustomSelect,
  globalStyles,
} from '@/GlobalStyles/globalStyles';
import {
  AddProductRequestModal,
  Category,
  ImageObject,
  ProductFormInitialValueModal,
  // ProductDataModal,
  ProductUpdateRequestModal,
} from '@/Interfaces/Modals/modals';
import { ProductFormProps } from '@/Interfaces/Props/props';
import { productFormStyles } from './productStyles';

const validationSchema = Yup.object({
  productName: Yup.string().required('Product name is required'),
  skuCode: Yup.string().required('SKU Code is required'),
  price: Yup.number()
    .typeError('Price must be a number')
    .required('Price is required')
    .positive('Price must be positive'),
  loyaltyPoint: Yup.number()
    .typeError('Loyalty point must be a number')
    .required('Loyalty point is required')
    .min(0, 'Loyalty point must be 0 or greater'),
  weight: Yup.number()
    .typeError('Weight must be a number')
    .required('Weight is required')
    .min(0, 'Weight must be 0 or greater'),
  parentCategoryUid: Yup.string().required('Category is required'),
  subCategoryUidOne: Yup.array()
    .of(Yup.string())
    .min(1, 'At least one subcategory must be selected'),
  expiryDate: Yup.date().required('Expiry date is required'),
  productDescription: Yup.string().required('Product description is required'),
  images: Yup.array()
    .of(Yup.string().nullable())
    .min(1, 'Please upload at least one image')
    .test(
      'at-least-one-image',
      'Please upload at least one image',
      (images) => images && images.some((image) => image !== null)
    )
    .required('Images are required'),
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

function ProductForm(props: ProductFormProps) {
  const { setShowAddProductModal, refetchTrigger, productData } = props;

  const theme = useTheme();
  const formStyles = productFormStyles(theme);
  const globalStyle = globalStyles(theme);
  const customInput = CustomInput(theme);
  const customSelect = CustomSelect(theme);
  const customDatePicker = CustomDatePicker(theme);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategoriesOne, setSubCategoriesOne] = useState<Category[]>([]);
  const [subCategoriesTwo, setSubCategoriesTwo] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [activeSubCategoryOne, setActiveSubCategoryOne] = useState<string[]>(
    []
  );
  const createImageSrc = (image: ImageObject | undefined) => {
    return image === undefined
      ? null
      : `data:${image?.mimeType};base64,${image?.base64Encoded}`;
  };

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [indexOfDeleteImg, setIndexOfDeleteImg] = useState<number | null>(null);
  interface Fn {
    (field: string, value: unknown): void;
  }
  const [setFieldValueOfImg, setSetFieldValueOfImg] = useState<Fn | null>(null);

  const initialValues: ProductFormInitialValueModal = {
    productName: productData?.productName || '',
    skuCode: productData?.skuCode || '',
    price: productData?.price ?? '',
    loyaltyPoint: productData?.loyaltyPoints ?? '',
    weight: productData?.weight ?? '',
    parentCategoryUid: '',
    subCategoryUidOne: [],
    subCategoryUidTwo: [],
    expiryDate: productData?.expiryDate
      ? parse(productData.expiryDate, 'yyyy-MM-dd', new Date())
      : null,
    productDescription: productData?.productDescription || '',
    images: productData?.images || [],
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
  ] as (string | null)[]);

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
            hash: null,
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
    ind: number | null,
    setFieldValue: (field: string, value: unknown) => void
  ) => {
    if (ind !== null) {
      setImagePreviews((prev) => {
        if (prev[ind]) {
          URL.revokeObjectURL(prev[ind] as string);
        }
        const updatedPreviews = prev.map((item, index) =>
          index === ind ? null : item
        );
        return updatedPreviews;
      });

      setFieldValue(`images[${ind}]`, null);
    }
  };

  function getInitialValues(): typeof initialValues {
    if (productData) {
      initialValues.parentCategoryUid = productData.category.categoryUid;
      initialValues.subCategoryUidOne =
        productData.category.subCategories?.map(
          (subCat) => subCat.categoryUid
        ) ?? [];
      initialValues.subCategoryUidTwo =
        productData.category.subCategories?.flatMap(
          (subCat) =>
            subCat.subCategories?.flatMap((subCat1) => subCat1.categoryUid) ??
            []
        ) ?? [];
    }
    return initialValues;
  }

  const handleSubmit = async (values: ProductFormInitialValueModal) => {
    if (productData) {
      const updateRequestData: ProductUpdateRequestModal = {
        skuCode: values.skuCode,
        productName: values.productName,
        productDescription: values.productDescription,
        price: Number(values.price),
        weight: Number(values.weight),
        loyaltyPoints: Number(values.loyaltyPoint),
        expiryDate: format(values.expiryDate ?? new Date(), 'yyyy-MM-dd'),
        categories: [
          values.parentCategoryUid,
          ...values.subCategoryUidOne,
          ...values.subCategoryUidTwo,
        ],
        images: values.images,
      };
      await updateData(productDataEndpoint, updateRequestData)
        .then(() => {
          setShowAddProductModal(false);
          refetchTrigger();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const addProductData: AddProductRequestModal = {
        skuCode: values.skuCode,
        productName: values.productName,
        productDescription: values.productDescription,
        price: Number(values.price),
        weight: Number(values.weight),
        loyaltyPoints: Number(values.loyaltyPoint),
        expiryDate: format(values.expiryDate ?? new Date(), 'yyyy-MM-dd'),
        categories: [
          values.parentCategoryUid,
          ...values.subCategoryUidOne,
          ...values.subCategoryUidTwo,
        ],
        images: values.images,
      };
      await postData(productDataEndpoint, addProductData)
        .then(() => {
          setShowAddProductModal(false);
          refetchTrigger();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const deleteProductImage = async (hash: string) => {
    if (indexOfDeleteImg !== null && setFieldValueOfImg) {
      try {
        await deleteData(deletePictureEndpoint, hash);
        handleRemoveImage(indexOfDeleteImg, setFieldValueOfImg);
        setIndexOfDeleteImg(null);
        console.log('Picture deleted successfully');
      } catch (err) {
        console.error('Error occurred:', err);
      }
    }
  };
  useEffect(() => {
    if (productData?.images) {
      setImagePreviews(
        [0, 1, 2].map((index) =>
          productData.images[index]
            ? createImageSrc(productData.images[index])
            : null
        )
      );
    }
  }, [productData?.images]);

  if (loading) {
    return (
      <Box sx={formStyles.loaderContainer}>
        <CircularProgress />
        <Typography variant="body2" sx={formStyles.loaderText}>
          Loading, please wait...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={formStyles.errorContainer}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Formik
      initialValues={getInitialValues()}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, setFieldValue }) => (
        <Form>
          <Box sx={formStyles.formContainer}>
            <TextField
              fullWidth
              name="productName"
              label="Product Name"
              value={values.productName}
              onChange={handleChange}
              error={touched.productName && Boolean(errors.productName)}
              helperText={touched.productName && errors.productName}
              sx={{ ...customInput.light }}
            />

            <TextField
              fullWidth
              name="skuCode"
              label="SKU Code"
              value={values.skuCode}
              onChange={handleChange}
              error={touched.skuCode && Boolean(errors.skuCode)}
              helperText={touched.skuCode && errors.skuCode}
              sx={{ ...customInput.light }}
              disabled={!!productData}
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
              sx={{ ...customInput.light }}
            />

            <TextField
              fullWidth
              name="loyaltyPoint"
              label="Loyalty Point"
              type="number"
              value={values.loyaltyPoint}
              onChange={handleChange}
              sx={{ ...customInput.light }}
              error={touched.loyaltyPoint && Boolean(errors.loyaltyPoint)}
              helperText={touched.loyaltyPoint && errors.loyaltyPoint}
            />

            <TextField
              fullWidth
              name="weight"
              label="Weight"
              type="number"
              value={values.weight}
              sx={{ ...customInput.light }}
              onChange={handleChange}
              error={touched.weight && Boolean(errors.weight)}
              helperText={touched.weight && errors.weight}
            />
            <FormControl fullWidth>
              <InputLabel sx={customSelect.light.label}>Category</InputLabel>
              <Select
                name="parentCategoryUid"
                value={values.parentCategoryUid}
                label="Category"
                onChange={(event) => {
                  const selectedCategoryUid = event.target.value;
                  setFieldValue('parentCategoryUid', selectedCategoryUid);
                  setActiveCategory(selectedCategoryUid);
                }}
                error={
                  touched.parentCategoryUid && Boolean(errors.parentCategoryUid)
                }
                sx={customSelect.light.select}
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
              <InputLabel sx={customSelect.light.label}>
                Sub-category one
              </InputLabel>
              <Select
                name="subCategory"
                multiple
                value={values.subCategoryUidOne}
                sx={customSelect.light.select}
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
                      (uid: string) =>
                        subCategoriesOne.find(
                          (subCategory) => subCategory.categoryUid === uid
                        )?.categoryName || ''
                    )
                    .filter(Boolean)
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
              {touched.subCategoryUidOne && errors.subCategoryUidOne && (
                <div style={{ color: 'red' }}>{errors.subCategoryUidOne}</div>
              )}
            </FormControl>

            <FormControl fullWidth>
              <InputLabel sx={customSelect.light.label}>
                Sub-category two
              </InputLabel>
              <Select
                name="subCategoryUidTwo"
                multiple
                value={values.subCategoryUidTwo}
                sx={customSelect.light.select}
                onChange={(event) =>
                  setFieldValue('subCategoryUidTwo', event.target.value)
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
                    .filter(Boolean)
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
                sx={{
                  ...customDatePicker.light.sx,
                  marginTop: '0.26rem',
                }}
                slotProps={{
                  ...customDatePicker.light.slotProps,
                  textField: {
                    error: touched.expiryDate && Boolean(errors.expiryDate),
                    helperText: touched.expiryDate && errors.expiryDate,
                  },
                }}
              />
            </LocalizationProvider>

            <Box display="flex" gap={2.6}>
              {[0, 1, 2].map((index) => {
                const imageSrc = imagePreviews[index];

                return (
                  <Box key={index} position="relative">
                    {imageSrc ? (
                      <Box sx={formStyles.imagePreviewContainer}>
                        <img
                          src={imageSrc as string}
                          alt={`Img ${index + 1}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                        <Tooltip title="Delete Image">
                          <IconButton
                            onClick={() => {
                              const hash = productData?.images?.[index]?.hash;
                              if (productData?.images?.[index]?.base64Encoded) {
                                if (typeof hash === 'string') {
                                  deleteProductImage(hash);
                                  if (setFieldValue) {
                                    setSetFieldValueOfImg(() => setFieldValue);
                                  }
                                  setIndexOfDeleteImg(index);
                                }
                              } else {
                                handleRemoveImage(index, setFieldValue);
                              }
                            }}
                            sx={{
                              position: 'absolute',
                              bottom: 30,
                              left: 30,
                            }}
                          >
                            <CancelIcon sx={{ fontSize: 20, color: 'red' }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    ) : (
                      <Box sx={formStyles.imageFormContainer}>
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
                          <AddPhotoAlternate sx={formStyles.inputFormIcon} />
                        </label>
                      </Box>
                    )}
                  </Box>
                );
              })}
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
            minRows={2}
            sx={formStyles.productDescriptionInputBox}
          />

          <Box sx={formStyles.formFooterContainer}>
            <Box sx={formStyles.formButtonContainer}>
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
              >
                {productData ? 'Update' : 'Add'}
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default ProductForm;
