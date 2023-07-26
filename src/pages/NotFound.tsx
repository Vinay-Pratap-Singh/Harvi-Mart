import { HStack, Image } from "@chakra-ui/react";
import notFound from "../assets/notFound.jpg";
import Layout from "./Layout/Layout";
import { Helmet } from "react-helmet";

const NotFound = () => {
  return (
    <Layout>
      {/* adding the dynamic meta data */}
      <Helmet>
        <title>Not Found</title>
        <meta
          name="description"
          content="Oops! The page you are looking for isn't here. Explore other fantastic products and offers at Harvi Mart. Our vast collection has something special just for you. Start your shopping journey with Harvi Mart today."
        />
      </Helmet>

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
