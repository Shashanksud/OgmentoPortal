import {
  Kiosk,
  ProductDataModal,
  SalesCenter,
  AdvertisementFormData,
  UserDetailsModal,
} from '../Modals/modals';

export interface LoginRequestModel {
  email: string;
  password: string;
}
export interface LoginProps {
  onLogin(status: boolean): void;
}
export interface LoginResponseModel {
  token: string | null;
}
export interface SubmitLoginForm {
  setSubmitting: (isSubmitting: boolean) => void;
}
export interface NavbarProps {
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed(value: boolean): void;
  userDetail: UserDetailsModal;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export interface SalesCenterFormProps {
  onClose: () => void;
  sale: SalesCenter | null;
  setIsEdit?: (isEdit: boolean) => void;
  onRefetchTrigger?: () => void;
}
export interface SalesCenterTabProps {
  onClose: () => void;
}

export interface KioskFormProps {
  onClose: () => void;
  kiosk: Kiosk | null;
  isEdit?: () => void;
  setIsEdit?: (isEdit: boolean) => void;
  onRefetchTrigger?: () => void;
}
export interface KioskFormOpenProps {
  onClose: () => void;
}

export interface UserFormProps {
  onClose: () => void;
  user: UserDetailsModal | null;
  setIsEdit?: (isEdit: boolean) => void;
  onRefetchTrigger?: () => void;
}
export interface UserFormOpenProps {
  onClose: () => void;
}
export interface ProductFormProps {
  setShowAddProductModal(showAddProductModal: boolean): void;
  refetchTrigger: () => void;
  productData: ProductDataModal | null;
}

export interface PrivateRoutesProp {
  isAuthenticated: boolean;
  children: JSX.Element;
}
export interface SignageFormProp {
  user: AdvertisementFormData | null;
  setIsEdit?: (isEdit: boolean) => void;
  onRefetchTrigger?: () => void;
}
