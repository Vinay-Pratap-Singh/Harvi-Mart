import ProductCard from "../components/ProductCard";
import {
  Box,
  HStack,
  Heading,
  Image,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import Layout from "./Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { getAllProducts } from "../redux/productSlice";
import ProductShimmer from "../shimmer/ProductShimmer";
import { getAllCategories } from "../redux/categorySlice";
import noProductFound from "../assets/noProductFound.jpg";

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, searchedText, isLoading } = useSelector(
    (state: RootState) => state.product
  );
  const { categories } = useSelector((state: RootState) => state.category);
  const [productToBeDisplayed, setProductToBeDisplayed] = useState(products);

  // function to handle filter by category name
  const filterByCategoryName = (event: React.MouseEvent<HTMLElement>) => {
    const element = event.target as HTMLLIElement;
    event.stopPropagation();
    // checking for the clear button click
    if (element.innerText === "Clear") {
      setProductToBeDisplayed(products);
      return;
    }
    const newData =
      products &&
      products.filter((product: any) => {
        return product?.category?.name === element.innerText;
      });
    setProductToBeDisplayed(newData);
  };

  // function to handle filter by price
  const filterByPrice = (event: React.MouseEvent<HTMLElement>) => {
    const element = event.target as HTMLLIElement;
    event.stopPropagation();
    const priceMin = element.getAttribute("price-min");
    const priceMax = element.getAttribute("price-max");
    // checking for the clear button click
    if (priceMin === "clear" && priceMax === "clear") {
      setProductToBeDisplayed(products);
      return;
    }
    // when max price is not defined
    if (priceMax === "") {
      const newData =
        products &&
        products.filter((product: any) => {
          if (product?.discountedPrice) {
            return product?.discountedPrice > Number(priceMin);
          } else {
            return product?.originalPrice > Number(priceMin);
          }
        });
      setProductToBeDisplayed(newData);
      return;
    }
    // when both max and min price are there
    const newData =
      products &&
      products.filter((product: any) => {
        if (product?.discountedPrice) {
          return (
            product?.discountedPrice > Number(priceMin) &&
            product?.discountedPrice < Number(priceMax)
          );
        } else {
          return (
            product?.originalPrice > Number(priceMin) &&
            product?.originalPrice < Number(priceMax)
          );
        }
      });
    setProductToBeDisplayed(newData);
  };

  // getting the products and categories
  useEffect(() => {
    (async () => {
      await dispatch(getAllProducts());
      await dispatch(getAllCategories());
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
          return product?.title.toLowerCase().includes(searchedText);
        });
      setProductToBeDisplayed(newData);
    }
  }, [searchedText, products]);

  return (
    <Layout>
      <HStack ml={10} my={5} minH={"70vh"}>
        {/* for displaying the filter options */}
        <VStack alignSelf={"flex-start"} width={80} boxShadow={"md"}>
          <Heading as={"h1"} fontSize={"lg"} fontWeight={"semibold"} mb={2}>
            Filter Product
          </Heading>
          {/* for filter by category */}
          <Heading
            as={"h2"}
            fontSize={"md"}
            fontWeight={"semibold"}
            alignSelf={"flex-start"}
            px={2}
          >
            By Category
          </Heading>
          <UnorderedList
            alignSelf={"flex-start"}
            listStyleType={"none"}
            px={2}
            pb={2}
          >
            {categories &&
              categories.map((category: any) => {
                return (
                  <ListItem
                    key={category?._id}
                    cursor={"pointer"}
                    _hover={{ color: "#DD6B20" }}
                    onClick={filterByCategoryName}
                  >
                    {category?.name}
                  </ListItem>
                );
              })}
            <ListItem
              cursor={"pointer"}
              _hover={{ color: "#DD6B20" }}
              onClick={filterByCategoryName}
            >
              Clear
            </ListItem>
          </UnorderedList>

          {/* for filter by price */}
          <Heading
            as={"h2"}
            fontSize={"md"}
            fontWeight={"semibold"}
            alignSelf={"flex-start"}
            px={2}
          >
            By Price
          </Heading>
          <UnorderedList
            alignSelf={"flex-start"}
            listStyleType={"none"}
            px={2}
            pb={2}
          >
            <ListItem
              cursor={"pointer"}
              _hover={{ color: "#DD6B20" }}
              onClick={filterByPrice}
              price-min="0"
              price-max="300"
            >
              Under &#x20b9;300
            </ListItem>
            <ListItem
              cursor={"pointer"}
              _hover={{ color: "#DD6B20" }}
              onClick={filterByPrice}
              price-min="300"
              price-max="500"
            >
              &#x20b9;300 - &#x20b9;500
            </ListItem>
            <ListItem
              cursor={"pointer"}
              _hover={{ color: "#DD6B20" }}
              onClick={filterByPrice}
              price-min="500"
              price-max="1000"
            >
              &#x20b9;500 - &#x20b9;1000
            </ListItem>
            <ListItem
              cursor={"pointer"}
              _hover={{ color: "#DD6B20" }}
              onClick={filterByPrice}
              price-min="1000"
              price-max="1500"
            >
              &#x20b9;1000 - &#x20b9;1500
            </ListItem>
            <ListItem
              cursor={"pointer"}
              _hover={{ color: "#DD6B20" }}
              onClick={filterByPrice}
              price-min="1500"
              price-max=""
            >
              &#x20b9;Over &#x20b9;1500
            </ListItem>
            <ListItem
              cursor={"pointer"}
              _hover={{ color: "#DD6B20" }}
              onClick={filterByPrice}
              price-min="clear"
              price-max="clear"
            >
              Clear
            </ListItem>
          </UnorderedList>
        </VStack>

        {/* for displaying the product card */}
        <HStack
          w={"full"}
          alignSelf={"baseline"}
          justifyContent={"center"}
          gap={10}
          flexWrap={"wrap"}
        >
          {isLoading ? (
            [...Array(7)].map((_, i) => {
              return <ProductShimmer key={i} />;
            })
          ) : productToBeDisplayed.length === 0 ? (
            <VStack w={"full"}>
              <Image src={noProductFound} alt="No Product Found" w={"300px"} />
              <Heading
                fontSize={"xl"}
                fontWeight={"semibold"}
                display={"flex"}
                gap={1}
              >
                Oops! No products found <Text color="orange.500">:(</Text>
              </Heading>
            </VStack>
          ) : (
            productToBeDisplayed.map((product: any) => {
              return <ProductCard key={product._id} product={product} />;
            })
          )}
        </HStack>
      </HStack>
    </Layout>
  );
};

export default Products;
