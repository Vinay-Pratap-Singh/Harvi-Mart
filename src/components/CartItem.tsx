import {
  Box,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import RemoveFromCart from "./AlertBox/RemoveFromCart";
import { IupdateCartItem } from "../helper/interfaces";
import { calculateAmount, manageProductCount } from "../redux/cartSlice";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "../helper/Hooks/redux";

interface Iprops {
  cartItem: IupdateCartItem;
}

const CartItem = ({ cartItem }: Iprops) => {
  const dispatch = useAppDispatch();
  const noOfItem = cartItem?.userSelectedQuantity || 1;
  const totalProductCount = cartItem?.quantity;
  const {
    isOpen: removeFromCartIsOpen,
    onOpen: removeFromCartOnOpen,
    onClose: removeFromCartOnClose,
  } = useDisclosure();

  // function to increase the product count
  const increaseProductCount = () => {
    if (totalProductCount === noOfItem) {
      toast.error("Sorry, we do not have enough products");
    } else if (noOfItem > 9) {
      toast.error("Out of product limit for one purchase");
    } else {
      dispatch(manageProductCount({ id: cartItem?._id, value: 1 }));
      dispatch(calculateAmount());
    }
  };

  // function to decrease the product count
  const decreaseProductCount = () => {
    if (noOfItem === 1) {
      toast.error("Minimum one product is required");
      return;
    }
    dispatch(manageProductCount({ id: cartItem?._id, value: -1 }));
    dispatch(calculateAmount());
  };

  return (
    <Box key={cartItem?._id} p={2} boxShadow={"md"} w={"full"} rounded={"md"}>
      <HStack justifyContent={"space-between"}>
        <HStack>
          <Image
            src={cartItem?.images[0]?.image?.secure_url}
            h={32}
            alt="product image"
          />

          <VStack
            alignSelf={"flex-start"}
            display={["none", "none", "none", "block"]}
          >
            <Heading
              fontSize={"md"}
              fontWeight={"bold"}
              alignSelf={"flex-start"}
            >
              {cartItem?.title}
            </Heading>
            <Text fontWeight={"medium"} noOfLines={3} alignSelf={"flex-start"}>
              {cartItem?.description}
            </Text>
            {cartItem?.discountedPrice &&
            !(
              Number(cartItem?.discountedPrice) ===
              Number(cartItem?.originalPrice)
            ) ? (
              <HStack w={"full"} flexWrap={"wrap"}>
                <Text fontWeight={"semibold"} fontSize={["sm", "sm", "md"]}>
                  Rs {cartItem?.discountedPrice}
                </Text>
                <Text
                  fontSize={["11px", "11px", "xs"]}
                  color={"gray.500"}
                  alignSelf={"flex-end"}
                  fontWeight={"semibold"}
                >
                  <s>Rs {cartItem?.originalPrice}</s>
                </Text>
                {Number(
                  (
                    ((cartItem?.originalPrice - cartItem.discountedPrice) /
                      cartItem?.originalPrice) *
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
                      ((cartItem?.originalPrice - cartItem.discountedPrice) /
                        cartItem?.originalPrice) *
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
                Rs {cartItem?.originalPrice}
              </Text>
            )}
          </VStack>
        </HStack>

        <VStack>
          {/* adding button to remove from cart */}
          <RemoveFromCart
            key={cartItem?._id}
            id={cartItem?._id}
            removeFromCartIsOpen={removeFromCartIsOpen}
            removeFromCartOnClose={removeFromCartOnClose}
            removeFromCartOnOpen={removeFromCartOnOpen}
          />

          <InputGroup>
            <InputLeftAddon
              fontWeight={"bold"}
              fontSize={20}
              cursor={"pointer"}
              _hover={{ color: "primaryColor" }}
              children="-"
              onClick={decreaseProductCount}
            />
            <Input
              type="number"
              placeholder="1"
              value={noOfItem}
              readOnly
              textAlign={"center"}
              fontWeight={"bold"}
              w={14}
            />
            <InputRightAddon
              fontWeight={"bold"}
              fontSize={20}
              cursor={"pointer"}
              _hover={{ color: "primaryColor" }}
              children="+"
              onClick={increaseProductCount}
            />
          </InputGroup>
          <Text
            fontWeight={"semibold"}
            fontSize={["sm", "sm", "md", "initial"]}
          >
            Total :{" Rs "}
            {cartItem?.discountedPrice
              ? cartItem?.discountedPrice * noOfItem
              : cartItem?.originalPrice * noOfItem}{" "}
          </Text>
        </VStack>
      </HStack>

      {/* product description for mobile view */}
      <VStack
        alignSelf={"flex-start"}
        display={["block", "block", "block", "none"]}
        mt={2}
      >
        <Heading fontSize={"md"} fontWeight={"bold"} alignSelf={"flex-start"}>
          {cartItem?.title}
        </Heading>
        <Text
          fontWeight={"medium"}
          noOfLines={3}
          alignSelf={"flex-start"}
          fontSize={"sm"}
        >
          {cartItem?.description}
        </Text>
        {cartItem?.discountedPrice &&
        !(
          Number(cartItem?.discountedPrice) === Number(cartItem?.originalPrice)
        ) ? (
          <HStack w={"full"} flexWrap={"wrap"}>
            <Text fontWeight={"semibold"} fontSize={["sm", "sm", "md"]}>
              Rs {cartItem?.discountedPrice}
            </Text>
            <Text
              fontSize={["11px", "11px", "xs"]}
              color={"gray.500"}
              alignSelf={"flex-end"}
              fontWeight={"semibold"}
            >
              <s>Rs {cartItem?.originalPrice}</s>
            </Text>
            {Number(
              (
                ((cartItem?.originalPrice - cartItem.discountedPrice) /
                  cartItem?.originalPrice) *
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
                  ((cartItem?.originalPrice - cartItem.discountedPrice) /
                    cartItem?.originalPrice) *
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
            Rs {cartItem?.originalPrice}
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default CartItem;
