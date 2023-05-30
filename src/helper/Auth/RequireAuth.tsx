import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const RequireAuth = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  return <div>RequireAuth</div>;
};

export default RequireAuth;
