import { HStack, Image } from "@chakra-ui/react";
import Layout from "./Layout/Layout";
import Footer from "../components/Footer";
import notAuthorized from "../assets/notAuthorized.jpg";

const NotAuthorized = () => {
  return (
    <Layout>
      <HStack h={"70vh"} alignItems={"center"} justifyContent={"center"}>
        <Image
          src={notAuthorized}
          alt="Not authorized image"
          h={"full"}
          w={"400px"}
        />
      </HStack>
      <Footer />
    </Layout>
  );
};

export default NotAuthorized;
