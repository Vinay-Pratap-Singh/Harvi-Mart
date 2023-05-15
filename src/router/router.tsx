import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Forget from "../pages/Password/Forget";
import Reset from "../pages/Password/Reset";
import Profile from "../pages/User/Profile";
import Category from "../pages/Admin/Category";
import Contact from "../pages/Contact";
import Products from "../pages/Products";
import ProductDescription from "../pages/ProductDescription";
import Wishlist from "../pages/Wishlist";
import Cart from "../pages/Cart";

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
  {
    path: "/admin/category",
    element: <Category />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/product/detail",
    element: <ProductDescription />,
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
]);

export default router;
