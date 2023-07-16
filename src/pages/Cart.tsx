import {
  Box,
  Button,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import Layout from "./Layout/Layout";
import { MdOutlineLocalOffer, MdShoppingCartCheckout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import CartItem from "../components/CartItem";
import { useState } from "react";
import { applyCoupon } from "../redux/couponSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import noProductInCart from "../assets/noProductInCart.jpg";
import { AiOutlineCloseCircle } from "react-icons/ai";

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
  const [couponData, setCouponData] = useState({
    isCouponApplied: false,
    discountedTotal: 0,
  });
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
      setCouponData({
        discountedTotal: res?.payload?.discountedTotal,
        isCouponApplied: true,
      });
    }
  };

  return (
    <Layout>
      <HStack p={10} gap={10} minH={"70vh"}>
        {/* for displaying the products */}
        <VStack w={"70%"} alignSelf={"flex-start"} gap={5}>
          {!cartItems?.length ? (
            <VStack gap={5}>
              <Text fontWeight={"semibold"}>
                "Oops! there is no product in cart
              </Text>
              <Image w={"25rem"} src={noProductInCart} />
            </VStack>
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
              <Text>
                &#x20b9;{" "}
                {couponData.isCouponApplied
                  ? price?.totalDiscount +
                    (price?.totalPrice - couponData.discountedTotal)
                  : price?.totalDiscount}
              </Text>
            </HStack>
            <HStack
              w="full"
              justifyContent={"space-between"}
              borderTop={"1px solid gray"}
              borderBottom={"1px solid gray"}
              py={1}
            >
              <Text>Total Amount</Text>
              <Text>
                &#x20b9;{" "}
                {couponData.isCouponApplied
                  ? price?.totalPrice -
                    price?.totalDiscount -
                    (price?.totalPrice - couponData.discountedTotal)
                  : price?.totalPrice - price?.totalDiscount}
              </Text>
            </HStack>
          </VStack>

          <form
            onSubmit={handleSubmit(handleApplyCoupon)}
            style={{ width: "100%" }}
          >
            <InputGroup>
              <InputLeftAddon children={<MdOutlineLocalOffer />} />
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
                  Apply
                </Button>
              </InputRightElement>
            </InputGroup>
          </form>

          {/* for displaying the coupon code applied */}
          {couponData.isCouponApplied && (
            <Box
              w={"full"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              color={"green.500"}
            >
              <Text fontSize={"sm"}>Coupon applied successfully </Text>
              <Box
                cursor={"pointer"}
                onClick={() =>
                  setCouponData({
                    isCouponApplied: false,
                    discountedTotal: 0,
                  })
                }
              >
                <AiOutlineCloseCircle />
              </Box>
            </Box>
          )}

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
