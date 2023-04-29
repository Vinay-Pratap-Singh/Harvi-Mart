import Header from "../../components/Header";
import { ReactNode, FC } from "react";

// defining the type of prop here
type Props = { children: ReactNode };

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
