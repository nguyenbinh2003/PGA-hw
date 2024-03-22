export interface ILogin {
  email: string;
  password: string;
  toggle: boolean;
  checked: [];
}

export interface IRegister {
  email: string;
  fullName: string;
  password: string;
  repeatPassword: string;
  gender: string;
  region: string;
  state: string;
}
