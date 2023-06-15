import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }: any) => {
  const navigate = useNavigate();

  return (
    <VStack w={60} p={2} rounded={"md"} shadow={"md"} pos={"relative"}>
      <Box pos={"absolute"} right={2} cursor={"pointer"}>
        <AiFillHeart fontSize={"25px"} />
      </Box>
      <Image h={40} src={product?.images[0]?.image?.secure_url} />
      <Heading fontSize={"md"} fontWeight={"semibold"}>
        {product?.title}
      </Heading>
      {product?.discountedPrice ? (
        <HStack>
          <Text fontWeight={"semibold"} fontSize={"md"}>
            &#x20b9;{product?.discountedPrice}
          </Text>
          <Text fontSize={"sm"} fontWeight={"semibold"}>
            <s>&#x20b9;{product?.originalPrice}</s>
          </Text>
        </HStack>
      ) : (
        <Text fontSize={"sm"} fontWeight={"semibold"}>
          &#x20b9;{product?.originalPrice}
        </Text>
      )}
      <Text fontSize={"sm"} noOfLines={2}>
        {product?.description}
      </Text>

      {/* button for description page */}
      <Button
        w={"full"}
        colorScheme="orange"
        onClick={() =>
          navigate(`/product/detail/${product?._id}`, { state: { ...product } })
        }
      >
        More Details
      </Button>
    </VStack>
  );
};

export default ProductCard;
