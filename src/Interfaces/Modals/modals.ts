export interface UserDetailsModal {
  userName: string;
  emailId: string;
  userRole: string;
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

export interface SalesCenter {
  item1: string;
  item2: string;
  salesCenter: string;
  salesCenterName: string;
  country: Country;
  countryId: number;
  city: string;
}
export interface Kiosk {
  item1: string;
  item2: string;
  kioskName: string;
  salesCenter: SalesCenter;
  country: string;
}
export enum CategoryTypes {
  ParentCategory = 1,
  SubCategory1 = 2,
  SubCategory2 = 3,
}
