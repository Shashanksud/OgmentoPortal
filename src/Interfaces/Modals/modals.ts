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
  userUid: string;
  salesCenters: { [key: string]: string };
}

export interface UserDetailsForm {
  name: string;
  email: string;
  role: UserRoles | '';
  password: string;
  validityDays: number | string | null;
  city: string;
  userUid: string;
  salesCenterId: string;
  phoneNumber: string;
  salesCenters: { [key: string]: string } | null;
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

export interface UpdateUserRequest {
  userUId: string;
  userName: string;
  password: string;
  emailId: string;
  phoneNumber: string;
  validityDays: string;
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

export interface AddSalesCenterRequest {
  salesCenterName: string;
  countryId: number;
  city: string;
}

export interface Kiosk {
  kioskName: string;
  salesCenter: { [key: string]: string };
}
export interface AddKioskRequest {
  kioskName: string;
  salesCenter: { item1: string, item2: string };
}
export interface UpdateKioskRequest {
  kioskName: string;
  salesCenter: { item1: string, item2: string };
}

export interface ImageObject {
  fileName: string;
  mimeType: string;
  base64Encoded: string;
  hash: string | null;
}
export interface ProductDataModal {
  skuCode: string;
  productName: string;
  productDescription: string;
  price: number;
  weight: number;
  loyaltyPoints: number;
  expiryDate: string | null;
  images: ImageObject[];
  category: Category;
}

export interface AddProductRequestModal {
  skuCode: string;
  productName: string;
  productDescription: string;
  price: number;
  weight: number;
  expiryDate: string;
  loyaltyPoints: number;
  images: ImageObject[];
  categories: string[];
}

export interface ProductUpdateRequestModal {
  expiryDate: string;
  loyaltyPoints: number;
  price: number;
  productDescription: string;
  productName: string;
  skuCode: string;
  weight: number;
  images: ImageObject[];
  categories: string[];
}

export interface ProductFormInitialValueModal {
  productName: string;
  skuCode: string;
  price: number | '';
  loyaltyPoint: number | '';
  weight: number | '';
  parentCategoryUid: string;
  subCategoryUidOne: string[];
  subCategoryUidTwo: string[];
  expiryDate: Date | null;
  productDescription: string;
  images: ImageObject[];
}

interface AdSchedule {
  day: number;
  startTime: string;
  endTime: string;
}

export interface AdvertisementFormData extends SignageBase {
  salesCenterUid: string[];
  kioskName: string[];
}

interface SignageBase {
  isActive: boolean;
  fileName: string;
  adSchedules: AdSchedule[];
  isAlwaysOn: boolean;
}

export interface AdverisementDetails extends SignageBase {
  signageUid: string;
  hash: string;
  kioskNames: string;
  salesCenters: string;
}
export interface AdvertisementModal extends SignageBase {
  kioskNames: string[];
}

// planogram interface

interface PlanogramProductModal {
  productName: string;
  skuCode: string;
  quantity: number;
  maxQuantity: number;
  scannable: boolean;
}

interface Belt {
  product: PlanogramProductModal;
  beltId: number;
  beltIsActive: boolean;
}

export interface Tray {
  trayId: number;
  trayIsActive: boolean;
  belts: Belt[];
}

interface Machine {
  machineId: number;
  trays: Tray[];
}

interface PlanogramSalesCenter {
  item1: string;
  item2: string;
}

interface Location {
  kioskName: string;
  salesCenter: PlanogramSalesCenter;
}

export interface PlanogramDataModal {
  location: Location;
  machines: Machine[];
}
