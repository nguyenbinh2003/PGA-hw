import HomePage from "../pages/homePage/HomePage";
import LoginGage from "../pages/auth/loginPage/LoginPage";
import ErrorPage from "../pages/errorPage/ErrorPage";
import RegisterPage from "../pages/auth/registerPage/RegisterPage";

export const publicRoutes = [
  { path: "/login", component: LoginGage },
  { path: "/error", component: ErrorPage },
  { path: "/sign-up", component: RegisterPage },
];

export const privateRoutes = [{ path: "/", component: HomePage }];
