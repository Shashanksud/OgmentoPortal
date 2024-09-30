export interface UserDetails {
  name: string;
  email: string;
  address?: string;
}
export interface User extends UserDetails {
  id: string;
}

export interface UserDetailsModal {
  name: string;
  email: string;
  role: string;
  salesCenter: string;
  kiosk: string;
}
