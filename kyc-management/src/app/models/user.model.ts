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

  
  export enum Role {
    ADMIN = 'ROLE_ADMIN',
    USER = 'ROLE_USER'
  }
  
