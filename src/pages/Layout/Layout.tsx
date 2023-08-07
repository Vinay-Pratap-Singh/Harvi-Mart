import { useLocation } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { ReactNode, useEffect } from "react";
import { HStack } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/productSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { getAllCategories } from "../../redux/categorySlice";
import { getAllWishlists } from "../../redux/wishlistSlice";
import React from "react";
import { getAllCoupons } from "../../redux/couponSlice";
import { getAllOrders } from "../../redux/orderSlice";
import { getAllUsersData } from "../../redux/userSlice";

// defining the type of prop here
type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { isProductLoaded } = useSelector((state: RootState) => state.product);
  const { isCategoriesLoaded } = useSelector(
    (state: RootState) => state.category
  );
  const { isWishlistLoaded } = useSelector(
    (state: RootState) => state.wishlist
  );
  const { isCouponLoaded } = useSelector((state: RootState) => state.coupon);
  const { isOrdersLoaded } = useSelector((state: RootState) => state.order);
  const { isUsersLoaded } = useSelector((state: RootState) => state.user);

  // fetching the required data to display
  useEffect(() => {
    !isProductLoaded && dispatch(getAllProducts());
    !isCategoriesLoaded && dispatch(getAllCategories());
    !isWishlistLoaded && isLoggedIn && dispatch(getAllWishlists());

    if (pathname.startsWith("/admin")) {
      !isCouponLoaded && dispatch(getAllCoupons());
      !isOrdersLoaded && dispatch(getAllOrders());
      !isUsersLoaded && dispatch(getAllUsersData());
    }
  }, [
    dispatch,
    isLoggedIn,
    isProductLoaded,
    isCategoriesLoaded,
    isWishlistLoaded,
    isCouponLoaded,
    isOrdersLoaded,
    isUsersLoaded,
    pathname,
  ]);

  return (
    <>
      {pathname.startsWith("/admin") ? (
        <HStack>
          <Sidebar />
          {children}
        </HStack>
      ) : (
        <>
          <Header />
          {children}
          <Footer />
        </>
      )}
    </>
  );
};

export default React.memo(Layout);
