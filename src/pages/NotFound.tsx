import { HStack, Image } from "@chakra-ui/react";
import React from "react";
import notFound from "../assets/notFound.jpg";
import Layout from "./Layout/Layout";
import Footer from "../components/Footer";

const NotFound = () => {
  return (
    <Layout>
      <HStack h={"70vh"} alignItems={"center"} justifyContent={"center"}>
        <Image src={notFound} alt="Not found image" h={"full"} w={"600px"} />
      </HStack>
      <Footer />
    </Layout>
  );
};

export default NotFound;
