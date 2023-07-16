import {
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
import { useState, useEffect } from "react";
import RemoveFromCart from "./AlertBox/RemoveFromCart";

interface Iprops {
  cartItem: any;
  price: { totalPrice: number; totalDiscount: number };
  setPrice: React.Dispatch<
    React.SetStateAction<{
      totalPrice: number;
      totalDiscount: number;
    }>
  >;
}

const CartItem = ({ cartItem, setPrice }: Iprops) => {
  const [noOfItem, setNoOfItem] = useState(1);
  const {
    isOpen: removeFromCartIsOpen,
    onOpen: removeFromCartOnOpen,
    onClose: removeFromCartOnClose,
  } = useDisclosure();

  // function to increase the product count
  const increaseProductCount = () => {
    if (noOfItem > 9) {
      return;
    }
    setNoOfItem(noOfItem + 1);
    setPrice((prev) => {
      return {
        ...prev,
        totalPrice: cartItem?.discountedPrice
          ? prev.totalPrice + cartItem?.discountedPrice
          : prev.totalPrice + cartItem?.originalPrice,
        totalDiscount: cartItem?.discountedPrice
          ? prev.totalDiscount +
            (cartItem?.originalPrice - cartItem?.discountedPrice)
          : prev.totalDiscount,
      };
    });
  };

  // function to decrease the product count
  const decreaseProductCount = () => {
    if (noOfItem === 1) {
      return;
    }
    setNoOfItem(noOfItem - 1);
    setPrice((prev) => {
      return {
        ...prev,
        totalPrice: cartItem?.discountedPrice
          ? prev.totalPrice - cartItem?.discountedPrice
          : prev.totalPrice - cartItem?.originalPrice,
        totalDiscount: cartItem?.discountedPrice
          ? prev.totalDiscount +
            (cartItem?.originalPrice - cartItem?.discountedPrice)
          : prev.totalDiscount,
      };
    });
  };

  // handle price on first render
  useEffect(() => {
    setPrice((prev) => {
      return {
        ...prev,
        totalPrice: cartItem?.discountedPrice
          ? prev.totalPrice + noOfItem * cartItem?.discountedPrice
          : prev.totalPrice + noOfItem * cartItem?.originalPrice,
        totalDiscount: cartItem?.discountedPrice
          ? prev.totalDiscount +
            (cartItem?.originalPrice - cartItem?.discountedPrice)
          : prev.totalDiscount,
      };
    });
  }, []);

  return (
    <HStack
      key={cartItem?._id}
      p={2}
      boxShadow={"md"}
      w={"full"}
      justifyContent={"space-between"}
    >
      <HStack>
        <Image
          src={cartItem?.images[0]?.image?.secure_url}
          h={32}
          alt="product image"
        />

        <VStack alignSelf={"flex-start"}>
          <Heading fontSize={"md"} fontWeight={"bold"} alignSelf={"flex-start"}>
            {cartItem?.title}
          </Heading>
          <Text fontWeight={"medium"} noOfLines={3} alignSelf={"flex-start"}>
            {cartItem?.description}
          </Text>
          {cartItem?.discountedPrice ? (
            <HStack alignSelf={"flex-start"}>
              <Text fontWeight={"semibold"}>
                &#x20b9;{cartItem?.discountedPrice}
              </Text>
              <Text fontSize={"xs"} fontWeight={"semibold"}>
                <s>&#x20b9;{cartItem?.originalPrice}</s>
              </Text>
            </HStack>
          ) : (
            <Text
              fontSize={"sm"}
              fontWeight={"semibold"}
              alignSelf={"flex-start"}
            >
              &#x20b9;{cartItem?.originalPrice}
            </Text>
          )}
        </VStack>
      </HStack>

      <VStack>
        {/* adding button to remove from cart */}
        <RemoveFromCart
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
        <Text fontWeight={"semibold"}>
          Total :{" "}
          {cartItem?.discountedPrice
            ? cartItem?.discountedPrice * noOfItem
            : cartItem?.originalPrice * noOfItem}{" "}
          &#x20b9;
        </Text>
      </VStack>
    </HStack>
  );
};

export default CartItem;
