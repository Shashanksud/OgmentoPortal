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
export interface SalesCenter {
  item1: string;
  item2: string;
}
export interface Kiosk {
  kioskName: string;
  salesCenter: SalesCenter;
}
