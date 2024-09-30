export interface UserDetails {
  name: string;
  email: string;
  address?: string;
}
export interface User extends UserDetails {
  id: string;
}
