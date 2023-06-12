import { Box, Button, Heading, Image, Text, VStack } from "@chakra-ui/react";
import productImage from "../assets/CategoryImages/shoes.png";
import { AiFillHeart } from "react-icons/ai";

const ProductCard = ({ product }: any) => {
  console.log(product);

  const productDetail = {
    title: "Stylish Shoes",
    description: "Best sports shoe for a stylish look and confortable feel",
    originalPrice: 100,
    productImage: productImage,
    category: "shoes",
  };
  return (
    <VStack w={60} p={2} rounded={"md"} shadow={"md"} pos={"relative"}>
      <Box pos={"absolute"} right={2} cursor={"pointer"}>
        <AiFillHeart fontSize={"25px"} />
      </Box>
      <Image h={40} src={productDetail.productImage} />
      <Heading fontSize={"xl"}>{productDetail.title}</Heading>
      <Text fontWeight={"bold"}>
        {productDetail.originalPrice} &#x20b9; only
      </Text>
      <Button w={"full"} colorScheme="orange">
        Product Details
      </Button>{" "}
    </VStack>
  );
};

export default ProductCard;
