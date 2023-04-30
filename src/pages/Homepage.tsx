import {
  Button,
  HStack,
  Heading,
  Image,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import Layout from "./Layout/Layout";
import Footer from "../components/Footer";
import homepageImage from "../assets/homepage.jpg";

const Homepage = () => {
  return (
    <Layout>
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

          <Button colorScheme="orange">Browse Collection</Button>
        </VStack>
      </HStack>
      <Footer />
    </Layout>
  );
};

export default Homepage;
