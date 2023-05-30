import {
  Button,
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
import Layout from "./Layout/Layout";
import productImage from "../assets/CategoryImages/shoes.png";
import { useState } from "react";
import { MdShoppingCartCheckout } from "react-icons/md";

const Cart = () => {
  const [noOfItem, setNoOfItem] = useState(1);

  return (
    <Layout>
      <HStack p={10} gap={10} minH={"70vh"}>
        {/* for displaying the products */}
        <VStack w={"70%"} alignSelf={"flex-start"}>
          <HStack pb={2} borderBottom={"1px solid gray"}>
            <Image src={productImage} h={32} alt="product image" />

            <VStack alignSelf={"flex-start"}>
              <Heading
                fontSize={"md"}
                fontWeight={"bold"}
                alignSelf={"flex-start"}
              >
                Product Title
              </Heading>
              <Text fontWeight={"medium"} noOfLines={3}>
                Product Description Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Magnam facilis maiores laudantium, velit
                asperiores, consectetur aut deserunt vero ducimus sequi quidem
                odio est voluptatum! Voluptate ex recusandae totam eaque
                laudantium.
              </Text>
              <Text alignSelf={"flex-start"} fontWeight={"medium"}>
                Price : 100 &#x20b9; only
              </Text>
            </VStack>

            <VStack>
              <InputGroup>
                <InputLeftAddon
                  fontWeight={"bold"}
                  fontSize={20}
                  cursor={"pointer"}
                  _hover={{ color: "primaryColor" }}
                  children="+"
                  onClick={() => noOfItem < 10 && setNoOfItem(noOfItem + 1)}
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
                  children="-"
                  onClick={() => noOfItem > 0 && setNoOfItem(noOfItem - 1)}
                />
              </InputGroup>
              <Text fontWeight={"semibold"}>Total : 500 &#x20b9;</Text>
            </VStack>
          </HStack>
        </VStack>

        {/* for displaying the checkout */}
        <VStack w="30%" alignSelf={"flex-start"} gap={2}>
          <VStack w="full" fontWeight={"medium"}>
            <HStack w="full" justifyContent={"space-between"}>
              <Text>Price</Text>
              <Text>&#x20b9; 500</Text>
            </HStack>
            <HStack w="full" justifyContent={"space-between"}>
              <Text>Discount</Text>
              <Text>&#x20b9; 100</Text>
            </HStack>
            <HStack
              w="full"
              justifyContent={"space-between"}
              borderTop={"1px solid gray"}
              borderBottom={"1px solid gray"}
              py={1}
            >
              <Text>Total Amount</Text>
              <Text>&#x20b9; 400</Text>
            </HStack>
          </VStack>

          <InputGroup>
            <Input
              type="text"
              placeholder="COUPON10"
              w="full"
              focusBorderColor="primaryColor"
            />
            <InputRightAddon
              fontWeight={"semibold"}
              children="Apply Coupon"
              cursor="pointer"
            />
          </InputGroup>

          <Button
            w="full"
            colorScheme="orange"
            leftIcon={<MdShoppingCartCheckout size={20} />}
          >
            Checkout
          </Button>
        </VStack>
      </HStack>
    </Layout>
  );
};

export default Cart;
