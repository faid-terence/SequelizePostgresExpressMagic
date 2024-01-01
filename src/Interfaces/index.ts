export interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: [];
}
export interface RoleAttributes {
  id: number;
  Name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
