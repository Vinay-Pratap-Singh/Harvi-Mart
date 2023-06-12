import ProductCard from "../components/ProductCard";
import { HStack } from "@chakra-ui/react";
import Layout from "./Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { getAllProducts } from "../redux/productSlice";

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, searchedText } = useSelector(
    (state: RootState) => state.product
  );
  const [productToBeDisplayed, setProductToBeDisplayed] = useState(products);

  // getting the products
  useEffect(() => {
    (async () => {
      await dispatch(getAllProducts());
    })();
  }, [dispatch]);

  // for handling user product search
  useEffect(() => {
    if (searchedText === "") {
      setProductToBeDisplayed(products);
    } else {
      const newData =
        products &&
        products.filter((product: any) => {
          return product?.title.includes(searchedText);
        });
      setProductToBeDisplayed(newData);
    }
  }, [searchedText, products]);

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
        {productToBeDisplayed.length === 0
          ? "Oops! No product available"
          : productToBeDisplayed.map((product: any) => {
              return <ProductCard key={product._id} product={product} />;
            })}
        <ProductCard />
      </HStack>
    </Layout>
  );
};

export default Products;
