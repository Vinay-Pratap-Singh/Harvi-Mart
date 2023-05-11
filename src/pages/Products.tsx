import ProductCard from "../components/ProductCard";
import { HStack } from "@chakra-ui/react";
import Layout from "./Layout/Layout";
import Footer from "../components/Footer";

const Products = () => {
  return (
    <Layout>
      <HStack
        minH={"70vh"}
        p={10}
        alignSelf={"baseline"}
        justifyContent={"center"}
        gap={10}
        flexWrap={"wrap"}
      >
        <ProductCard />
      </HStack>
      <Footer />
    </Layout>
  );
};

export default Products;
