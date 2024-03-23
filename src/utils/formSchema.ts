import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required('Email is required !'),
  name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required('Full name is required !'),
  password: Yup.string().min(6, "Password must be 6 characters long").required('Password is required !'),
  repeatPassword: Yup.string().oneOf(
    [Yup.ref("password"), undefined],
    "Passwords must match"
  ).required('Config password is required !'),
  gender: Yup.string().required('Gender is required !'),
  region: Yup.string().required('Country is required !'),
  state: Yup.string().required('City is required !'),
});

export const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required('Email is required !'),
    password: Yup.string().min(6, "Password must be 6 characters long").required('Password is required !'),
  });