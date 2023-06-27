import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  VStack,
} from "@chakra-ui/react";
import Layout from "./Layout/Layout";
import { MdShoppingCartCheckout } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CartItem from "../components/CartItem";
import { useState } from "react";

interface Istate {
  totalPrice: number;
  totalDiscount: number;
}

const Cart = () => {
  const [price, setPrice] = useState<Istate>({
    totalDiscount: 0,
    totalPrice: 0,
  });
  const { cartItems } = useSelector((state: RootState) => state.cart);
  console.log(cartItems);

  return (
    <Layout>
      <HStack p={10} gap={10} minH={"70vh"}>
        {/* for displaying the products */}
        <VStack w={"70%"} alignSelf={"flex-start"}>
          {!cartItems?.length ? (
            <Text fontWeight={"semibold"}>
              "Oops! there is no product in cart
            </Text>
          ) : (
            cartItems.map((cartItem: any) => {
              return (
                <CartItem
                  key={cartItem?._id}
                  cartItem={cartItem}
                  price={price}
                  setPrice={setPrice}
                />
              );
            })
          )}
        </VStack>

        {/* for displaying the checkout */}
        <VStack w="30%" alignSelf={"flex-start"} gap={2}>
          <VStack w="full" fontWeight={"medium"}>
            <HStack w="full" justifyContent={"space-between"}>
              <Text>Price</Text>
              <Text>&#x20b9; {price?.totalPrice}</Text>
            </HStack>
            <HStack w="full" justifyContent={"space-between"}>
              <Text>Discount</Text>
              <Text>&#x20b9; {price?.totalDiscount}</Text>
            </HStack>
            <HStack
              w="full"
              justifyContent={"space-between"}
              borderTop={"1px solid gray"}
              borderBottom={"1px solid gray"}
              py={1}
            >
              <Text>Total Amount</Text>
              <Text>&#x20b9; {price?.totalPrice - price?.totalDiscount}</Text>
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
