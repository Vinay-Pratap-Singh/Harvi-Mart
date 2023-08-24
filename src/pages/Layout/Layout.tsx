import { useLocation } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { ReactNode, useEffect } from "react";
import { HStack } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar";
import { getAllProducts } from "../../redux/productSlice";
import { getAllCategories } from "../../redux/categorySlice";
import { getAllWishlists } from "../../redux/wishlistSlice";
import React from "react";
import { getAllCoupons } from "../../redux/couponSlice";
import { getAllOrders } from "../../redux/orderSlice";
import { getAllUsersData } from "../../redux/userSlice";
import { getAllReviews } from "../../redux/reviewSlice";
import { useAppDispatch, useAppSelector } from "../../helper/Hooks/redux";

// defining the type of prop here
type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { isProductLoaded } = useAppSelector((state) => state.product);
  const { isCategoriesLoaded } = useAppSelector((state) => state.category);
  const { isWishlistLoaded } = useAppSelector((state) => state.wishlist);
  const { isCouponLoaded } = useAppSelector((state) => state.coupon);
  const { isOrdersLoaded } = useAppSelector((state) => state.order);
  const { isUsersLoaded } = useAppSelector((state) => state.user);
  const { isReviewLoaded } = useAppSelector((state) => state.review);

  // fetching the required data to display
  useEffect(() => {
    !isProductLoaded && dispatch(getAllProducts());
    !isCategoriesLoaded && dispatch(getAllCategories());
    !isWishlistLoaded && isLoggedIn && dispatch(getAllWishlists());

    if (pathname.startsWith("/admin")) {
      !isCouponLoaded && dispatch(getAllCoupons());
      !isOrdersLoaded && dispatch(getAllOrders());
      !isUsersLoaded && dispatch(getAllUsersData());
      !isReviewLoaded && dispatch(getAllReviews());
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
    isReviewLoaded,
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
