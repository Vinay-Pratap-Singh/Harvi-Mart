import ProductCard from "../../components/ProductCard";
import {
  HStack,
  Heading,
  Image,
  Radio,
  RadioGroup,
  SkeletonText,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Layout from "../Layout/Layout";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import ProductShimmer from "../../shimmer/ProductShimmer";
import noProductFound from "../../assets/noProductFound.jpg";
import { AiOutlineClear } from "react-icons/ai";
import { Iproduct } from "../../helper/interfaces";
import { Helmet } from "react-helmet";

const Products = () => {
  const {
    products,
    searchedText,
    isLoading: isProductLoading,
  } = useSelector((state: RootState) => state.product);
  const { categories, isLoading: isCategoryLoading } = useSelector(
    (state: RootState) => state.category
  );
  const [productToBeDisplayed, setProductToBeDisplayed] = useState(products);
  const [categoryValue, setCategoryValue] = useState("");
  const [priceValue, setPriceValue] = useState("");

  // function to clear all the filters
  const clearFilters = () => {
    setCategoryValue("");
    setPriceValue("");
    setProductToBeDisplayed(products);
  };

  // for invoking the filters
  useEffect(() => {
    if (priceValue === "" && categoryValue === "") {
      setProductToBeDisplayed(products);
    } else if (priceValue === "" && categoryValue !== "") {
      const newData =
        products &&
        products.filter((product: any) => {
          return (
            product?.category?.name?.toLowerCase() ===
            categoryValue?.toLowerCase()
          );
        });
      setProductToBeDisplayed(newData);
    } else if (priceValue !== "" && categoryValue === "") {
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
    } else {
      const price = priceValue.split(",");
      const priceMin = price[0];
      const priceMax = price[1];

      // when max price is not defined
      if (priceMax === " ") {
        const newData =
          products &&
          products.filter((product: any) => {
            if (product?.discountedPrice) {
              return (
                product?.discountedPrice > Number(priceMin) &&
                product?.category?.name?.toLowerCase() ===
                  categoryValue?.toLowerCase()
              );
            } else {
              return (
                product?.originalPrice > Number(priceMin) &&
                product?.category?.name?.toLowerCase() ===
                  categoryValue?.toLowerCase()
              );
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
              product?.discountedPrice < Number(priceMax) &&
              product?.category?.name?.toLowerCase() ===
                categoryValue?.toLowerCase()
            );
          } else {
            return (
              product?.originalPrice > Number(priceMin) &&
              product?.originalPrice < Number(priceMax) &&
              product?.category?.name?.toLowerCase() ===
                categoryValue?.toLowerCase()
            );
          }
        });
      setProductToBeDisplayed(newData);
    }
  }, [priceValue, categoryValue, products]);

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
      {/* adding the dynamic meta data */}
      <Helmet>
        <title>Products</title>
        <meta
          name="description"
          content="Discover an extensive range of top-quality products at Harvi Mart's Products page. Explore and filter by price or category to find the perfect electronics, clothing, fashion, and more. Enjoy a seamless shopping experience as you explore our diverse collection. Start shopping smart at Harvi Mart today."
        />
      </Helmet>

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
            {isCategoryLoading ? (
              <SkeletonText
                mt="4"
                noOfLines={4}
                spacing="5"
                skeletonHeight="2"
                pr={2}
              />
            ) : (
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
                          <Text fontWeight={"semibold"}> {category?.name}</Text>
                        </Radio>
                      );
                    })}
                </Stack>
              </RadioGroup>
            )}
          </Stack>

          {/* for filter by price */}
          <Stack alignSelf={"flex-start"} spacing={2} pl={2} pb={2} w={"full"}>
            <Heading as={"h2"} fontSize={"md"} fontWeight={"semibold"}>
              By Price
            </Heading>
            {isCategoryLoading ? (
              <SkeletonText
                mt="4"
                noOfLines={4}
                spacing="5"
                skeletonHeight="2"
                pr={2}
              />
            ) : (
              <RadioGroup onChange={setPriceValue} value={priceValue}>
                <Stack direction="column" spacing={1}>
                  <Radio
                    price-min="0"
                    price-max="300"
                    colorScheme="orange"
                    size="sm"
                    value="0,300"
                  >
                    <Text fontWeight={"semibold"}>Under &#x20b9;300</Text>
                  </Radio>
                  <Radio
                    price-min="300"
                    price-max="500"
                    colorScheme="orange"
                    size="sm"
                    value="300,500"
                  >
                    <Text fontWeight={"semibold"}>
                      &#x20b9;300 - &#x20b9;500
                    </Text>
                  </Radio>
                  <Radio
                    price-min="500"
                    price-max="1000"
                    colorScheme="orange"
                    size="sm"
                    value="500,1000"
                  >
                    <Text fontWeight={"semibold"}>
                      &#x20b9;500 - &#x20b9;1000
                    </Text>
                  </Radio>
                  <Radio
                    price-min="1000"
                    price-max="1500"
                    colorScheme="orange"
                    size="sm"
                    value="1000,1500"
                  >
                    <Text fontWeight={"semibold"}>
                      &#x20b9;1000 - &#x20b9;1500
                    </Text>
                  </Radio>
                  <Radio
                    price-min="1500"
                    price-max=""
                    colorScheme="orange"
                    size="sm"
                    value="1500, "
                  >
                    <Text fontWeight={"semibold"}>Over &#x20b9;1500</Text>
                  </Radio>
                </Stack>
              </RadioGroup>
            )}
          </Stack>
        </VStack>

        {/* for displaying the product card */}
        <VStack w={"full"} alignSelf={"baseline"} gap={5}>
          {/* displaying the clear filter option */}
          {!isProductLoading && (categoryValue !== "" || priceValue !== "") && (
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
            gap={5}
            flexWrap={"wrap"}
          >
            {/* rendering the products and shimmer based on product data */}
            {isProductLoading ? (
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
              productToBeDisplayed.map((product: Iproduct) => {
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