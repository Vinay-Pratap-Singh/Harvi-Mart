import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Forget from "../pages/Password/Forget";
import Reset from "../pages/Password/Reset";
import Profile from "../pages/User/Profile";
import Category from "../pages/Admin/Category";
import Contact from "../pages/Contact";
import Products from "../pages/Product/Products";
import ProductDescription from "../pages/Product/ProductDescription";
import Wishlist from "../pages/Wishlist";
import Cart from "../pages/Cart";
import NotFound from "../pages/NotFound";
import RequireAuth from "../helper/Auth/RequireAuth";
import NotRequireAuth from "../helper/Auth/NotRequireAuth";
import NotAuthorized from "../pages/NotAuthorized";
import Coupon from "../pages/Admin/Coupon";
import Dashboard from "../pages/Admin/Dashboard";
import Product from "../pages/Admin/Product/Product";
import AddProduct from "../pages/Admin/Product/ProductOperation";
import PaymentSuccess from "../pages/PaymentSuccess";
import Order from "../pages/Admin/Order/Order";
import AdminProductDescription from "../pages/Admin/Product/ProductDescription";
import Users from "../pages/Admin/Users";
import OrderDescription from "../pages/Admin/Order/OrderDescription";
import TermAndCondition from "../pages/TermAndCondition";
import PrivacyAndPolicy from "../pages/PrivacyAndPolicy";

const router = createBrowserRouter([
  // accessible for everyone without login
  {
    path: "/",
    element: <Homepage />,
    errorElement: <NotFound />,
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
    path: "/product/detail/:id",
    element: <ProductDescription />,
  },
  { path: "/not-authorized", element: <NotAuthorized /> },
  {
    path: "/password/forget",
    element: <Forget />,
  },
  {
    path: "/auth/reset/:token",
    element: <Reset />,
  },

  // for admin and normal user access
  {
    element: (
      <RequireAuth
        allowedRoles={[
          Number(process.env.REACT_APP_ADMIN_ROLE),
          Number(process.env.REACT_APP_USER_ROLE),
        ]}
      />
    ),
    children: [
      {
        path: "/user/profile",
        element: <Profile />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      { path: "/payment/success", element: <PaymentSuccess /> },
    ],
  },

  // for admin user only
  {
    element: (
      <RequireAuth allowedRoles={[Number(process.env.REACT_APP_ADMIN_ROLE)]} />
    ),
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/users",
        element: <Users />,
      },
      {
        path: "/admin/category",
        element: <Category />,
      },
      {
        path: "/admin/coupon",
        element: <Coupon />,
      },
      {
        path: "/admin/product",
        element: <Product />,
      },
      {
        path: "/admin/product/operation/:operationID",
        element: <AddProduct />,
      },
      {
        path: "/admin/product/:productID",
        element: <AdminProductDescription />,
      },
      {
        path: "/admin/orders",
        element: <Order />,
      },
      {
        path: "/admin/orders/:orderID",
        element: <OrderDescription />,
      },
    ],
  },

  // not require auth from user
  {
    element: <NotRequireAuth />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/terms",
        element: <TermAndCondition />,
      },
      {
        path: "/privacy",
        element: <PrivacyAndPolicy />,
      },
    ],
  },
]);

export default router;
