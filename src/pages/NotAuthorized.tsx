import { HStack, Image } from "@chakra-ui/react";
import Layout from "./Layout/Layout";
import notAuthorized from "../assets/notAuthorized.jpg";
import { Helmet } from "react-helmet";

const NotAuthorized = () => {
  return (
    <Layout>
      {/* adding the dynamic meta data */}
      <Helmet>
        <title>Not Authorized</title>
        <meta
          name="description"
          content="Access Denied! You do not have the required role to view this page. Explore other amazing products and offers at Harvi Mart. Our vast collection has something special for every shopper. Sign up or log in to unlock exclusive privileges and enjoy a seamless shopping experience."
        />
      </Helmet>

      <HStack
        w={"full"}
        h={"70vh"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Image
          src={notAuthorized}
          alt="Not authorized image"
          h={"full"}
          w={"400px"}
        />
      </HStack>
    </Layout>
  );
};

export default NotAuthorized;
