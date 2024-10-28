export interface LoginProps {
  onLogin(status: boolean): void;
}
export interface LoginResponseModel {
  token: string | null;
}
export interface SubmitLoginForm {
  setSubmitting: (isSubmitting: boolean) => void;
}
export interface AddFormProps {
  onClose: () => void;
}

export interface LoginRequestModel {
  email: string;
  password: string;
}
export enum UserRoles {
  Admin = 1,
  Support = 2,
  Marketing = 3,
}
export interface UserDetailsModal {
  userName: string;
  emailId: string;
  roleId: UserRoles;
  kioskName: string | null;
  phoneNumber: string;
  city: string;
  validityDays: number | null;
  userUId: string;
  salesCenters: { [key: string]: string };
}
export enum Country {
  India = 1,
}
export interface AddUserRequest {
  userName: string;
  password: string;
  emailId: string;
  roleId: string;
  kioskName: string;
  phoneNumber: string;
  city: string;
  validityDays: string;
  salesCenters: { [key: string]: string };
}
export interface AddSalesCenterRequest {
  salesCenterName: string;
  countryId: number;
  city: string;
}
export interface AddKioskRequest {
  kioskName: string;
  salesCenter: { item1: string, item2: string };
}

export enum CategoryTypes {
  ParentCategory = 1,
  SubCategory1 = 2,
  SubCategory2 = 3,
}
export interface Category {
  categoryUid: string;
  categoryName: string;
  parentCategoryUid: string | null;
  subCategories?: Category[];
}

export interface UpdateCategoryType {
  categoryUid: string;
  categoryName: string;
}
export enum City {
  NewDelhi = 0,
  Mumbai = 1,
  Bengaluru = 2,
  Kolkata = 3,
  Chennai = 4,
  Hyderabad = 5,
  Pune = 6,
  Ahmedabad = 7,
  Jaipur = 8,
  Chandigarh = 9,
}

export interface SalesCenter {
  salesCenterUid: string;
  salesCenterName: string;
  countryId: number;
  city: string;
}
export interface Kiosk {
  kioskName: string;
  salesCenter: { [key: string]: string };
}

export interface ProductDataModal {
  skuCode: string;
  productName: string;
  productDescription: string;
  price: number;
  weight: number;
  loyaltyPoints: number;
  productExpiry: string;
  images: string[];
  category: Category;
}
export interface ProductRequestModal {
  skuCode: string;
  productName: string;
  productDescription: string;
  price: number;
  weight: number;
  loyaltyPoints: number;
  productExpiry: string;
  images: ImageObject[];
  categories: string[];
}

export interface ImageObject {
  fileName: string;
  mimeType: string;
  base64Encoded: string;
  hash: null;
  toBeDeleted: boolean;
  isNew: boolean;
}
