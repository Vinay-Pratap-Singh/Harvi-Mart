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
import { Iproduct } from "../helper/interfaces";

interface Iprop {
  product: Iproduct;
}

const ProductCard = ({ product }: Iprop) => {
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
      flexShrink={0}
      rounded={"md"}
      border={"1px solid #f2f2f2"}
      transition={"all 0.1s ease-in-out"}
      _hover={{
        boxShadow: "0 0 10px gray",
        border: "none",
        transform: "translateY(-10px)",
      }}
      pos={"relative"}
      alignSelf={"stretch"}
      cursor={"pointer"}
      onClick={() =>
        navigate(`/product/detail/${product?._id}`, { state: { ...product } })
      }
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

      <Image h={40} src={product?.images?.[0]?.image?.secure_url} />
      <Heading fontSize={"md"} fontWeight={"semibold"} noOfLines={1}>
        {product?.title}
      </Heading>
      {product?.discountedPrice ? (
        <HStack w={"full"}>
          <Text fontWeight={"semibold"} fontSize={"md"}>
            &#x20b9;{product?.discountedPrice}
          </Text>
          <Text
            fontSize={"xs"}
            color={"gray.500"}
            alignSelf={"flex-end"}
            fontWeight={"semibold"}
          >
            <s>&#x20b9;{product?.originalPrice}</s>
          </Text>
          <Text fontWeight={"semibold"} fontSize={"sm"} color={"primaryColor"}>
            (
            {(
              ((product?.originalPrice - product.discountedPrice) /
                product?.originalPrice) *
              100
            ).toFixed(0)}
            % Off)
          </Text>
        </HStack>
      ) : (
        <Text
          fontSize={"sm"}
          fontWeight={"semibold"}
          w={"full"}
          textAlign={"left"}
        >
          &#x20b9;{product?.originalPrice}
        </Text>
      )}
      <Text fontSize={"sm"} noOfLines={2} w={"full"} textAlign={"left"}>
        {product?.description}
      </Text>
    </VStack>
  );
};

export default ProductCard;
