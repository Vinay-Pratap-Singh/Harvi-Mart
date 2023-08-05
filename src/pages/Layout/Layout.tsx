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

// defining the type of prop here
type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  // fetching the required data to display
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
    isLoggedIn && dispatch(getAllWishlists());
  }, [dispatch, isLoggedIn]);

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

export default Layout;
