export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  email: string;
  name: string;
  password: string;
  repeatPassword: string;
  gender: string;
  region: string;
  state: string;
}

export interface IUser {
  avatar: string | null;
  createdAt: string | null;
  description: string | null;
  email: string | null;
  gender: string | null;
  id: number | null;
  name: string | null;
  region: number | null;
  state: number | null;
  updatedAt: string | null;
}
