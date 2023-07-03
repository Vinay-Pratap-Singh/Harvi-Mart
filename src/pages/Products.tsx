import ProductCard from "../components/ProductCard";
import {
  Box,
  HStack,
  Heading,
  Image,
  ListItem,
  Radio,
  RadioGroup,
  Stack,
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
import { AiOutlineClear } from "react-icons/ai";

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, searchedText, isLoading } = useSelector(
    (state: RootState) => state.product
  );
  const { categories } = useSelector((state: RootState) => state.category);
  const [productToBeDisplayed, setProductToBeDisplayed] = useState(products);
  const [categoryValue, setCategoryValue] = useState("");
  const [priceValue, setPriceValue] = useState("");

  // function to handle filter by category name
  const filterByCategoryName = () => {
    const newData =
      products &&
      products.filter((product: any) => {
        return (
          product?.category?.name?.toLowerCase() ===
          categoryValue?.toLowerCase()
        );
      });
    setProductToBeDisplayed(newData);
  };

  // function to handle filter by price
  const filterByPrice = () => {
    const price = priceValue.split(",");
    const priceMin = price[0];
    const priceMax = price[1];

    // when max price is not defined
    if (priceMax === " ") {
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

  // function to clear all the filters
  const clearFilters = () => {
    setCategoryValue("");
    setPriceValue("");
    setProductToBeDisplayed(products);
  };

  // for invoking the filters
  useEffect(() => {
    if (categoryValue) {
      filterByCategoryName();
    } else if (priceValue) {
      filterByPrice();
    }
  }, [priceValue, categoryValue]);

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
        <VStack alignSelf={"flex-start"} width={80} boxShadow={"md"} gap={3}>
          <Heading as={"h1"} fontSize={"lg"} fontWeight={"semibold"}>
            Filter Product
          </Heading>
          {/* for filter by category */}
          <Stack
            w="full"
            alignSelf={"flex-start"}
            spacing={2}
            pl={2}
            pb={3}
            borderBottom={"1px solid #e5e5e5"}
          >
            <Heading as={"h2"} fontSize={"md"} fontWeight={"semibold"}>
              By Category
            </Heading>
            <RadioGroup onChange={setCategoryValue} value={categoryValue}>
              <Stack direction="column" spacing={1}>
                {categories.length !== 0 &&
                  categories.map((category: any) => {
                    return (
                      <Radio
                        key={category?._id}
                        value={category?.name}
                        colorScheme="orange"
                        size="sm"
                      >
                        {category?.name}
                      </Radio>
                    );
                  })}
              </Stack>
            </RadioGroup>
          </Stack>

          {/* for filter by price */}
          <Stack alignSelf={"flex-start"} spacing={2} pl={2}>
            <Heading as={"h2"} fontSize={"md"} fontWeight={"semibold"}>
              By Price
            </Heading>
            <RadioGroup onChange={setPriceValue} value={priceValue}>
              <Stack direction="column" spacing={1}>
                <Radio
                  price-min="0"
                  price-max="300"
                  colorScheme="orange"
                  size="sm"
                  value="0,300"
                >
                  Under &#x20b9;300
                </Radio>
                <Radio
                  price-min="300"
                  price-max="500"
                  colorScheme="orange"
                  size="sm"
                  value="300,500"
                >
                  &#x20b9;300 - &#x20b9;500
                </Radio>
                <Radio
                  price-min="500"
                  price-max="1000"
                  colorScheme="orange"
                  size="sm"
                  value="500,1000"
                >
                  &#x20b9;500 - &#x20b9;1000
                </Radio>
                <Radio
                  price-min="1000"
                  price-max="1500"
                  colorScheme="orange"
                  size="sm"
                  value="1000,1500"
                >
                  &#x20b9;1000 - &#x20b9;1500
                </Radio>
                <Radio
                  price-min="1500"
                  price-max=""
                  colorScheme="orange"
                  size="sm"
                  value="1500, "
                >
                  Over &#x20b9;1500
                </Radio>
              </Stack>
            </RadioGroup>
            <UnorderedList listStyleType={"none"} px={2} pb={2}>
              {/* <ListItem
                cursor={"pointer"}
                _hover={{ color: "#DD6B20" }}
                onClick={filterByPrice}
                price-min="0"
                price-max="300"
              >
                Under &#x20b9;300
              </ListItem> */}
              {/* <ListItem
                cursor={"pointer"}
                _hover={{ color: "#DD6B20" }}
                onClick={filterByPrice}
                price-min="300"
                price-max="500"
              >
                &#x20b9;300 - &#x20b9;500
              </ListItem> */}
              {/* <ListItem
                cursor={"pointer"}
                _hover={{ color: "#DD6B20" }}
                onClick={filterByPrice}
                price-min="500"
                price-max="1000"
              >
                &#x20b9;500 - &#x20b9;1000
              </ListItem> */}
              {/* <ListItem
                cursor={"pointer"}
                _hover={{ color: "#DD6B20" }}
                onClick={filterByPrice}
                price-min="1000"
                price-max="1500"
              >
                &#x20b9;1000 - &#x20b9;1500
              </ListItem> */}
              {/* <ListItem
                cursor={"pointer"}
                _hover={{ color: "#DD6B20" }}
                onClick={filterByPrice}
                price-min="1500"
                price-max=""
              >
                &#x20b9;Over &#x20b9;1500
              </ListItem> */}
              {/* <ListItem
                cursor={"pointer"}
                _hover={{ color: "#DD6B20" }}
                onClick={filterByPrice}
                price-min="clear"
                price-max="clear"
              >
                Clear
              </ListItem> */}
            </UnorderedList>
          </Stack>
        </VStack>

        {/* for displaying the product card */}
        <VStack w={"full"} alignSelf={"baseline"} gap={5}>
          {/* displaying the clear filter option */}
          {!isLoading && (categoryValue !== "" || priceValue !== "") && (
            <Heading
              alignSelf={"flex-start"}
              fontSize={16}
              fontWeight={"semibold"}
              ml={5}
              display={"flex"}
              alignItems={"center"}
              gap={1}
              cursor={"pointer"}
              _hover={{ color: "primaryColor" }}
              onClick={clearFilters}
            >
              <AiOutlineClear /> Clear Filter
            </Heading>
          )}

          <HStack
            w={"full"}
            alignSelf={"baseline"}
            justifyContent={"center"}
            gap={10}
            flexWrap={"wrap"}
          >
            {/* rendering the products and shimmer based on product data */}
            {isLoading ? (
              [...Array(7)].map((_, i) => {
                return <ProductShimmer key={i} />;
              })
            ) : productToBeDisplayed.length === 0 ? (
              <VStack w={"full"}>
                <Image
                  src={noProductFound}
                  alt="No Product Found"
                  w={"300px"}
                />
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
        </VStack>
      </HStack>
    </Layout>
  );
};

export default Products;
