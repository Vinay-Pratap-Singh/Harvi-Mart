import { useLocation } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { ReactNode, FC } from "react";
import { HStack } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar";

// defining the type of prop here
type Props = { children: ReactNode };

const Layout: FC<Props> = ({ children }) => {
  const { pathname } = useLocation();

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
