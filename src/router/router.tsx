import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Forget from "../pages/Password/Forget";
import Reset from "../pages/Password/Reset";
import Profile from "../pages/User/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/password/forget",
    element: <Forget />,
  },
  {
    path: "/auth/reset/:token",
    element: <Reset />,
  },
  {
    path: "/user/profile",
    element: <Profile />,
  },
]);

export default router;
