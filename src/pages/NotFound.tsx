import { HStack, Image } from "@chakra-ui/react";
import notFound from "../assets/notFound.jpg";
import Layout from "./Layout/Layout";

const NotFound = () => {
  return (
    <Layout>
      <HStack
        w={"full"}
        h={"70vh"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Image src={notFound} alt="Not found image" h={"full"} w={"600px"} />
      </HStack>
    </Layout>
  );
};

export default NotFound;
