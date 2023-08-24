import {
  Box,
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
import { useAppSelector } from "../helper/Hooks/redux";

interface Iprop {
  product: Iproduct;
}

const ProductCard = ({ product }: Iprop) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const {
    isOpen: displayWishlistIsOpen,
    onOpen: displayWishlistOnOpen,
    onClose: displayWishlistOnClose,
  } = useDisclosure();

  return (
    <VStack
      key={product?._id}
      w={[44, 44, 60]}
      p={2}
      flexShrink={0}
      rounded={"md"}
      border={"1px solid #f2f2f2"}
      transition={"all 0.1s ease-in-out"}
      _hover={{
        boxShadow: "0 0 10px gray",
        border: "none",
        transform: "translateY(-5px)",
      }}
      pos={"relative"}
      alignSelf={"stretch"}
      cursor={"pointer"}
    >
      {isLoggedIn && (
        <Box
          pos={"absolute"}
          zIndex={20}
          right={2}
          cursor={"pointer"}
          color={"gray.300"}
          _hover={{ color: "#f92a2a" }}
          transition={"all 0.2s ease-in-out"}
        >
          <DisplayWishlists
            key={product?._id}
            displayWishlistIsOpen={displayWishlistIsOpen}
            displayWishlistOnClose={displayWishlistOnClose}
            displayWishlistOnOpen={displayWishlistOnOpen}
            productID={product?._id}
          />
        </Box>
      )}

      <Image
        h={[32, 32, 40]}
        mb={2}
        src={product?.images?.[0]?.image?.secure_url}
      />
      <Box
        w={"full"}
        onClick={() =>
          navigate(`/product/detail/${product?._id}`, { state: { ...product } })
        }
      >
        <Heading
          fontSize={["sm", "sm", "md"]}
          fontWeight={"semibold"}
          noOfLines={1}
        >
          {product?.title}
        </Heading>
        {product?.discountedPrice &&
        !(
          Number(product?.discountedPrice) === Number(product?.originalPrice)
        ) ? (
          <HStack w={"full"} flexWrap={"wrap"}>
            <Text fontWeight={"semibold"} fontSize={["sm", "sm", "md"]}>
              Rs {product?.discountedPrice}
            </Text>
            <Text
              fontSize={["11px", "11px", "xs"]}
              color={"gray.500"}
              alignSelf={"flex-end"}
              fontWeight={"semibold"}
            >
              <s>Rs {product?.originalPrice}</s>
            </Text>
            {Number(
              (
                ((product?.originalPrice - product.discountedPrice) /
                  product?.originalPrice) *
                100
              ).toFixed(0)
            ) && (
              <Text
                fontWeight={"semibold"}
                fontSize={["xs", "xs", "sm"]}
                color={"primaryColor"}
              >
                (
                {(
                  ((product?.originalPrice - product.discountedPrice) /
                    product?.originalPrice) *
                  100
                ).toFixed(0)}
                % Off)
              </Text>
            )}
          </HStack>
        ) : (
          <Text
            fontWeight={"semibold"}
            fontSize={["sm", "sm", "md"]}
            w={"full"}
            textAlign={"left"}
          >
            Rs {product?.originalPrice}
          </Text>
        )}
        <Text
          fontSize={["xs", "xs", "sm"]}
          fontWeight={"medium"}
          noOfLines={2}
          w={"full"}
          textAlign={"left"}
        >
          {product?.description}
        </Text>
      </Box>
    </VStack>
  );
};

export default ProductCard;
