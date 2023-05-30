import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface Iprops {
  allowedRoles: number[];
}

const RequireAuth = ({ allowedRoles }: Iprops) => {
  const { isLoggedIn, userDetails } = useSelector(
    (state: RootState) => state.auth
  );
  const location = useLocation();
  const userRole = userDetails?.role;

  return isLoggedIn &&
    allowedRoles?.find((role: number) => userRole === role) ? (
    <Outlet />
  ) : isLoggedIn ? (
    <Navigate to={"/not-authorized"} state={{ from: location }} replace />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
