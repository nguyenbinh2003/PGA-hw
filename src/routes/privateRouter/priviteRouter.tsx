import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRouter = () => {
  const userToken = localStorage.getItem("user_cookie");
  const location = useLocation();
  if (userToken) {
    if (location.pathname === "/login") {
      return <Navigate to="/" replace />;
    }
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRouter;
