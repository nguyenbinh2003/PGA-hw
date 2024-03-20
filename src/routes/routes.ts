import HomePage from "../pages/homePage/HomePage"
import LoginGage from "../pages/auth/loginPage/LoginPage"
import ErrorPage from "../pages/errorPage/ErrorPage"

export const publicRoutes = [
    { path: '/', component: HomePage },
    { path: '/error', component: ErrorPage },
    { path: '/login', component: LoginGage },
]
