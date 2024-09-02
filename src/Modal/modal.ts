export interface Product {
  id: string;
  productName: string;
  productDescription: string;
}
export interface UserDetails {
  name: string;
  email: string;
  address?: string;
}
export interface User extends UserDetails {
  id: string;
}
