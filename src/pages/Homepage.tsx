import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Link,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import Layout from "./Layout/Layout";
import homepageImage from "../assets/homepage.jpg";
import { Link as RouterLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ProductCard from "../components/ProductCard";
import { Iproduct } from "../helper/interfaces";
import { useRef } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import ProductShimmer from "../shimmer/ProductShimmer";

const Homepage = () => {
  const { products, isLoading } = useSelector(
    (state: RootState) => state.product
  );
  const productToBeDisplayed =
    products.length > 10 ? products.slice(0, 10) : products;

  const slideContainerRef = useRef<HTMLDivElement>(null);

  // function to scroll container left
  const handleLeftSlider = () => {
    if (slideContainerRef.current) {
      slideContainerRef.current.scrollBy({
        left: -400,
        behavior: "smooth",
      });
    }
  };

  // function to scroll container right
  const handleRightSlider = () => {
    if (slideContainerRef.current) {
      slideContainerRef.current.scrollBy({
        left: 400,
        behavior: "smooth",
      });
    }
  };

  return (
    <Layout>
      {/* adding the dynamic meta data */}
      <Helmet>
        <title>Harvi Mart</title>
        <meta
          name="description"
          content="Welcome to Harvi Mart - Your Ultimate Shopping Destination. Discover a world of top-quality products, from electronics and fashion to home decor. Explore our website and start your shopping journey with confidence. Click to browse our extensive collection and find the perfect items that match your style and preferences."
        />
      </Helmet>

      {/* main section of the homepage */}
      <Stack
        direction={["column", "column", "column", "row"]}
        gap={[5, 5, 5, 10]}
        m={[5, 5, 5, 10]}
      >
        {/* adding home page image */}
        <Image
          w={["full", "full", "full", "50%"]}
          src={homepageImage}
          alt="home page image"
        />

        {/* for describing the speciality */}
        <VStack w={["full", "full", "full", "50%"]} alignItems={"flex-start"}>
          <Heading fontSize={"2xl"}>
            Elevate Your Choice with{" "}
            <Text as={"span"} color="orange.500">
              Harvi Mart
            </Text>
          </Heading>

          <Heading fontSize={"lg"}>Your one-stop shop for your need</Heading>
          <Text fontSize={"sm"} fontWeight={"semibold"}>
            Discover a world of trendy clothing, cutting-edge electronics, fresh
            groceries, and more at Harvi Mart. Curated by experts, our{" "}
            <Text as={"span"} color={"orange.500"}>
              one-stop-shop
            </Text>{" "}
            offers a seamless shopping experience, bringing convenience and
            elegance to your doorstep. Join the Harvi Mart community and embrace
            a lifestyle that celebrates your unique preferences and passions.
            Elevate your style with limitless choices today.
          </Text>
          <UnorderedList fontSize={"sm"} pl={4} fontWeight={"semibold"}>
            <ListItem>Free shipping on all orders</ListItem>
            <ListItem>Hassle-free returns</ListItem>
            <ListItem>Exclusive discounts and deals</ListItem>
            <ListItem>Wide range of products available</ListItem>
            <ListItem>24/7 customer support</ListItem>
          </UnorderedList>

          <Link as={RouterLink} to={"/products"}>
            <Button size={["sm", "sm", "md", "lg"]} colorScheme="orange">
              Browse Collection
            </Button>
          </Link>
        </VStack>
      </Stack>

      {/* for products section */}
      <VStack my={[5, 5, 10]} gap={[0, 0, 0, 5]}>
        <Heading fontSize={"2xl"}>Our Trendy Products</Heading>

        {/* adding the products cards */}
        <Box w={"full"} pos={"relative"} px={5}>
          <HStack
            overflowX="scroll"
            alignItems={"left"}
            justifyContent={"left"}
            ref={slideContainerRef}
            scrollBehavior={"smooth"}
            gap={5}
            py={5}
            sx={{
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {isLoading ? (
              [...Array(7)].map((_, i) => {
                return <ProductShimmer key={i} />;
              })
            ) : productToBeDisplayed.length ? (
              productToBeDisplayed.map((product: Iproduct) => {
                return <ProductCard key={product._id} product={product} />;
              })
            ) : (
              <Text
                w={"full"}
                textAlign={"center"}
                fontWeight={"semibold"}
                fontSize={"md"}
              >
                No products found
              </Text>
            )}
          </HStack>
          {/* adding the left and right buttons */}

          <Button
            borderRadius={"full"}
            p="0"
            pos="absolute"
            top={"50%"}
            transform={"translateY(-50%)"}
            left={2}
            zIndex={10}
            size={"sm"}
            onClick={handleLeftSlider}
          >
            <AiOutlineLeft fontSize={"20px"} />
          </Button>

          <Button
            borderRadius={"full"}
            p="0"
            pos="absolute"
            top={"50%"}
            transform={"translateY(-50%)"}
            right={2}
            zIndex={10}
            size={"sm"}
            onClick={handleRightSlider}
          >
            <AiOutlineRight fontSize={"20px"} />
          </Button>
        </Box>
      </VStack>
    </Layout>
  );
};

export default Homepage;
