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
} from "@chakra-ui/react";
import { useState } from "react";

interface Iprop {
  cartItem: any;
}

const CartItem = ({ cartItem }: Iprop) => {
  const [noOfItem, setNoOfItem] = useState(1);
  return (
    <HStack
      pb={2}
      borderBottom={"1px solid gray"}
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
        <InputGroup>
          <InputLeftAddon
            fontWeight={"bold"}
            fontSize={20}
            cursor={"pointer"}
            _hover={{ color: "primaryColor" }}
            children="-"
            onClick={() => noOfItem > 1 && setNoOfItem(noOfItem - 1)}
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
            onClick={() => noOfItem < 10 && setNoOfItem(noOfItem + 1)}
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
