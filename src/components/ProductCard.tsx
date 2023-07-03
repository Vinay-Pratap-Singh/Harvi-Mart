import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import DisplayWishlists from "./Modals/DisplayWishlists";

const ProductCard = ({ product }: any) => {
  const navigate = useNavigate();
  const {
    isOpen: displayWishlistIsOpen,
    onOpen: displayWishlistOnOpen,
    onClose: displayWishlistOnClose,
  } = useDisclosure();

  return (
    <VStack
      key={product?._id}
      w={60}
      p={2}
      rounded={"md"}
      shadow={"md"}
      pos={"relative"}
    >
      <Box
        pos={"absolute"}
        right={2}
        cursor={"pointer"}
        color={"gray.300"}
        _hover={{ color: "#f92a2a" }}
        transition={"all 0.2s ease-in-out"}
      >
        <DisplayWishlists
          displayWishlistIsOpen={displayWishlistIsOpen}
          displayWishlistOnClose={displayWishlistOnClose}
          displayWishlistOnOpen={displayWishlistOnOpen}
          productID={product?._id}
        />
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
