import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import Layout from "./Layout/Layout";
import { MdShoppingCartCheckout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import CartItem from "../components/CartItem";
import { useState } from "react";
import { applyCoupon } from "../redux/couponSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface Istate {
  totalPrice: number;
  totalDiscount: number;
}

interface Iform {
  couponCode: string;
}

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<Iform>({
    defaultValues: { couponCode: "" },
  });
  const [price, setPrice] = useState<Istate>({
    totalDiscount: 0,
    totalPrice: 0,
  });
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const { cartItems } = useSelector((state: RootState) => state.cart);

  // function to handle apply coupon
  const handleApplyCoupon: SubmitHandler<Iform> = async (data) => {
    if (data.couponCode === "") {
      toast.error("Coupon code is required");
      return;
    }
    const res = await dispatch(
      applyCoupon({
        couponCode: data.couponCode,
        orderTotal: price?.totalPrice - price?.totalDiscount,
      })
    );
    console.log(res.payload);
    if (res?.payload?.success) {
      reset();
      setIsCouponApplied(true);
    }
  };

  return (
    <Layout>
      <HStack p={10} gap={10} minH={"70vh"}>
        {/* for displaying the products */}
        <VStack w={"70%"} alignSelf={"flex-start"} gap={5}>
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

          <form
            onSubmit={handleSubmit(handleApplyCoupon)}
            style={{ width: "100%" }}
          >
            <InputGroup>
              <Input
                type="text"
                placeholder="COUPON10"
                w="full"
                focusBorderColor="primaryColor"
                {...register("couponCode")}
              />
              <InputRightElement w={"fit-content"}>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  loadingText="Applying..."
                >
                  Apply Coupon
                </Button>
              </InputRightElement>
            </InputGroup>
          </form>

          {/* for displaying the coupon code applied */}
          {isCouponApplied && <Text color={"green.500"}>Coupon applied</Text>}

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
