import HomePage from "@/src/pages/homePage/HomePage";
import LoginGage from "@/src/pages/auth/loginPage/LoginPage";
import ErrorPage from "@/src/pages/errorPage/ErrorPage";
import RegisterPage from "@/src/pages/auth/registerPage/RegisterPage";
import TodoPage from "@/src/pages/todoPage/TodoPage";
import DetailPage from "@/src/pages/detailPage/DetailPage";
import TablePage from "@/src/pages/tablePage/TablePage";

export const publicRoutes = [
  { path: "/login", component: LoginGage },
  { path: "/error", component: ErrorPage },
  { path: "/sign-up", component: RegisterPage },
];

export const privateRoutes = [
  { path: "/", component: HomePage },
  { path: "/todo", component: TodoPage },
  { path: "/table", component: TablePage },
  { path: "/detail", component: DetailPage },
];
