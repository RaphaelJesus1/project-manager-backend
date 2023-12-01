export interface NewUser {
  name: string;
  email: string;
  password: string;
}

export interface User extends NewUser {
  id: number;
}
