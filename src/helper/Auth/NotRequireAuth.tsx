import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../Hooks/redux";

const NotRequireAuth = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  return isLoggedIn ? <Navigate to={"/"} replace /> : <Outlet />;
};

export default NotRequireAuth;
