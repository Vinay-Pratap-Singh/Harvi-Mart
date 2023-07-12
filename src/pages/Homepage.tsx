import {
  Button,
  HStack,
  Heading,
  Image,
  Link,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import Layout from "./Layout/Layout";
import homepageImage from "../assets/homepage.jpg";
import CategoryCard from "../components/CategoryCard";
import { Link as RouterLink } from "react-router-dom";

const Homepage = () => {
  // category items details
  const categories = [
    {
      imageURL: "jeans",
      categoryName: "Jeans",
      categoryDescription:
        "We have the best collection of the jeans from top brands",
    },
    {
      imageURL: "tshirt",
      categoryName: "T-shirts",
      categoryDescription:
        "We have the best collection of the t-shirts from top brands",
    },
    {
      imageURL: "shoes",
      categoryName: "Shoes",
      categoryDescription:
        "We have the best collection of the shoes from top brands",
    },
  ];

  return (
    <Layout>
      {/* main section of the homepage */}
      <HStack gap={10} m={10}>
        {/* adding home page image */}
        <Image w={"50%"} src={homepageImage} alt="home page image" />

        {/* for describing the speciality */}
        <VStack w={"50%"} alignItems={"flex-start"}>
          <Heading fontSize={"2xl"}>
            Elevate Your Style with{" "}
            <Text as={"span"} color="orange.500">
              Harvi Mart
            </Text>
          </Heading>
          <Heading fontSize={"lg"}>
            Your One-Stop Shop for Trendy Clothing
          </Heading>
          <Text fontSize={"sm"} fontWeight={"semibold"}>
            Elevate your wardrobe with Harvi Mart - your destination for{" "}
            <Text as={"span"} color={"orange.500"}>
              trendy clothing
            </Text>
            . Our collection is{" "}
            <Text as={"span"} color={"orange.500"}>
              curated by fashion experts
            </Text>{" "}
            to ensure that you stay ahead of the curve. Discover the latest
            styles for men and women, from casual wear to formal attire
          </Text>
          <UnorderedList fontSize={"sm"} pl={4} fontWeight={"semibold"}>
            <ListItem>Free shipping on all orders</ListItem>
            <ListItem>Hassle-free returns</ListItem>
            <ListItem>Exclusive discounts and deals</ListItem>
            <ListItem>Wide range of sizes available</ListItem>
            <ListItem>24/7 customer support</ListItem>
          </UnorderedList>

          <Link as={RouterLink} to={"/products"}>
            <Button colorScheme="orange">Browse Collection</Button>
          </Link>
        </VStack>
      </HStack>

      {/* for categories section */}
      <VStack my={10} gap={5}>
        <Heading fontSize={"2xl"}>Our Trendy Clothing Category</Heading>

        {/* adding the categories cards */}
        <HStack flexWrap={"wrap"} gap={5}>
          {categories.map((element, index) => {
            return (
              <CategoryCard
                key={index}
                categoryDescription={element.categoryDescription}
                categoryName={element.categoryName}
                imageURL={element.imageURL}
              />
            );
          })}
        </HStack>
      </VStack>
    </Layout>
  );
};

export default Homepage;
