export interface User {
  id?: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  roles: Role[];  // This should be an array of Role enums
}

  export interface Admin{
    username: string;
  password: string;
  firstName: string;
  lastName: string;
  }
  export enum Role {
    ADMIN = 'ADMIN',
    CUSTOMER = 'CUSTOMER'
  }
  
