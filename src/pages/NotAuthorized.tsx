import { HStack, Image } from "@chakra-ui/react";
import Layout from "./Layout/Layout";
import notAuthorized from "../assets/notAuthorized.jpg";

const NotAuthorized = () => {
  return (
    <Layout>
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
