import ProductCard from "../components/ProductCard";
import { HStack, ListItem, UnorderedList, VStack } from "@chakra-ui/react";
import Layout from "./Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { getAllProducts } from "../redux/productSlice";
import ProductShimmer from "../shimmer/ProductShimmer";

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, searchedText, isLoading } = useSelector(
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
      <VStack>
        {/* for displaying the filter option */}
        <HStack>
          <UnorderedList>
            <ListItem>
              By Price
              <UnorderedList></UnorderedList>
            </ListItem>
          </UnorderedList>
        </HStack>

        {/* for displaying the product card */}
        <HStack
          minH={"70vh"}
          p={10}
          alignSelf={"baseline"}
          justifyContent={"center"}
          gap={10}
          flexWrap={"wrap"}
        >
          {isLoading
            ? [...Array(7)].map((_, i) => {
                return <ProductShimmer key={i} />;
              })
            : productToBeDisplayed.length === 0
            ? "Oops! No product available"
            : productToBeDisplayed.map((product: any) => {
                return <ProductCard key={product._id} product={product} />;
              })}
        </HStack>
      </VStack>
    </Layout>
  );
};

export default Products;
