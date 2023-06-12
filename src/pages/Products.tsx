import ProductCard from "../components/ProductCard";
import { HStack } from "@chakra-ui/react";
import Layout from "./Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { getAllProducts } from "../redux/productSlice";

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.product);

  // getting the products
  useEffect(() => {
    (async () => {
      await dispatch(getAllProducts());
    })();
  }, [dispatch]);

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
        {products.length === 0
          ? "Oops! No product available"
          : products.map((product: any) => {
              return <ProductCard key={product._id} product={product} />;
            })}
        <ProductCard />
      </HStack>
    </Layout>
  );
};

export default Products;
