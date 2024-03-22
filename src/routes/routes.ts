import HomePage from "../pages/homePage/HomePage"
import LoginGage from "../pages/auth/loginPage/LoginPage"
import ErrorPage from "../pages/errorPage/ErrorPage"
import RegisterPage from "../pages/auth/registerPage/RegisterPage"

export const publicRoutes = [
    { path: '/', component: HomePage },
    { path: '/error', component: ErrorPage },
    { path: '/login', component: LoginGage },
    { path: '/sign-up', component: RegisterPage },
]
