import {
  Box,
  Button,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Tooltip,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import Layout from "./Layout/Layout";
import { MdOutlineLocalOffer, MdShoppingCartCheckout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import CartItem from "../components/CartItem";
import { useEffect, useId, useState } from "react";
import { applyCoupon } from "../redux/couponSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import noProductInCart from "../assets/noProductInCart.jpg";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
  Iaddress,
  IcheckoutData,
  IcheckoutProduct,
  IupdateCartItem,
} from "../helper/interfaces";
import {
  calculateAmount,
  createUpdatedCart,
  handleCheckout,
} from "../redux/cartSlice";
import { Helmet } from "react-helmet";
import AddAddress from "../components/Modals/AddAddress";

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

  const [couponData, setCouponData] = useState({
    couponCode: "",
    isCouponApplied: false,
    discountedTotal: 0,
  });
  const [selectedAddress, setSelectedAddress] = useState("");
  const { updatedCartItems } = useSelector((state: RootState) => state.cart);
  const { userDetails } = useSelector((state: RootState) => state.auth);
  const addresses: Iaddress[] = userDetails.addresses;
  const { totalPrice, totalDiscount } = useSelector(
    (state: RootState) => state.cart
  );

  const {
    isOpen: addAddressIsOpen,
    onClose: addAddressOnClose,
    onOpen: addAddressOnOpen,
  } = useDisclosure();
  const randomID = useId();

  // function to handle apply coupon
  const handleApplyCoupon: SubmitHandler<Iform> = async (data) => {
    if (data.couponCode === "") {
      toast.error("Coupon code is required");
      return;
    }
    const res = await dispatch(
      applyCoupon({
        couponCode: data.couponCode,
        orderTotal: totalPrice - totalDiscount,
      })
    );
    console.log(res.payload);
    if (res?.payload?.success) {
      setCouponData({
        couponCode: data.couponCode,
        discountedTotal: res?.payload?.discountedTotal,
        isCouponApplied: true,
      });
      reset();
    }
  };

  // function to handle checkout
  const handleCheckoutBtn = async () => {
    // checking for the address
    if (!selectedAddress) {
      toast.error("Please select an address");
      return;
    }
    const products: IcheckoutProduct[] = [];
    updatedCartItems.forEach((item) => {
      const product: IcheckoutProduct = {
        price: item?.discountedPrice
          ? item?.discountedPrice
          : item?.originalPrice,
        product: item?._id,
        quantity: item?.userSelectedQuantity,
      };
      products.push(product);
    });
    const data: IcheckoutData = {
      address: "",
      coupon: couponData.couponCode,
      paymentMethod: "COD",
      phoneNumber: "9874563210",
      products,
      total: totalPrice,
    };
    const res = await dispatch(handleCheckout(data));
    console.log(res.payload);
  };

  // using useEffect to calculate the price and discount on component loading
  useEffect(() => {
    dispatch(createUpdatedCart());
    dispatch(calculateAmount());
  }, []);

  return (
    <Layout>
      {/* adding the dynamic meta data */}
      <Helmet>
        <title>Cart</title>
        <meta
          name="description"
          content="Your Cart Awaits! View and manage your selected products at Harvi Mart. Easily checkout and turn your wishlist into reality. Secure your purchases and enjoy a seamless shopping experience. Shop smart with Harvi Mart's convenient Cart page."
        />
      </Helmet>

      <HStack p={10} gap={10} minH={"70vh"}>
        {/* for displaying the products */}
        <VStack
          w={updatedCartItems.length > 0 ? "70%" : "100%"}
          alignSelf={"flex-start"}
          gap={5}
        >
          {!updatedCartItems?.length ? (
            <VStack gap={5}>
              <Text fontWeight={"semibold"}>
                "Oops! there is no product in cart
              </Text>
              <Image w={"25rem"} src={noProductInCart} />
            </VStack>
          ) : (
            updatedCartItems.map((cartItem: IupdateCartItem) => {
              return <CartItem key={cartItem?._id} cartItem={cartItem} />;
            })
          )}
        </VStack>

        {/* for displaying the checkout */}
        {updatedCartItems.length > 0 && (
          <VStack w="30%" alignSelf={"flex-start"} gap={2}>
            <VStack w="full" fontWeight={"medium"}>
              <HStack w="full" justifyContent={"space-between"}>
                <Text>Price</Text>
                <Text>&#x20b9; {totalPrice}</Text>
              </HStack>
              <HStack w="full" justifyContent={"space-between"}>
                <Text>Discount</Text>
                <Text>
                  &#x20b9;{" "}
                  {couponData.isCouponApplied
                    ? totalDiscount + (totalPrice - couponData.discountedTotal)
                    : totalDiscount}
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
                    ? totalPrice -
                      totalDiscount -
                      (totalPrice - couponData.discountedTotal)
                    : totalPrice - totalDiscount}
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
                      couponCode: "",
                      isCouponApplied: false,
                      discountedTotal: 0,
                    })
                  }
                >
                  <AiOutlineCloseCircle />
                </Box>
              </Box>
            )}

            {/* displaying the address */}
            {addresses.length ? (
              <>
                <RadioGroup
                  alignSelf={"flex-start"}
                  onChange={setSelectedAddress}
                  value={selectedAddress}
                  w={"full"}
                >
                  <Stack
                    direction="column"
                    spacing={1}
                    pos={"relative"}
                    w={"full"}
                  >
                    {addresses.map((address: Iaddress, index: number) => {
                      return (
                        <Radio size="sm" value={address._id}>
                          <Tooltip
                            hasArrow
                            bg={"gray.100"}
                            color={"gray.600"}
                            p={3}
                            label={
                              <>
                                <Text>{address.name}</Text>
                                <Text>
                                  {"House no. " +
                                    address.houseNumber +
                                    " pincode " +
                                    address.pinCode +
                                    " , " +
                                    address.city +
                                    " " +
                                    address.state}
                                </Text>
                                <Text>
                                  {"Phone number " + address.phoneNumber}
                                </Text>
                              </>
                            }
                          >
                            <Text>
                              {address.name +
                                " house no. " +
                                address.houseNumber}
                            </Text>
                          </Tooltip>
                        </Radio>
                      );
                    })}
                  </Stack>
                </RadioGroup>
                <AddAddress
                  key={randomID}
                  addAddressIsOpen={addAddressIsOpen}
                  addAddressOnClose={addAddressOnClose}
                  addAddressOnOpen={addAddressOnOpen}
                  title="Add new address"
                />
              </>
            ) : (
              <AddAddress
                key={randomID}
                addAddressIsOpen={addAddressIsOpen}
                addAddressOnClose={addAddressOnClose}
                addAddressOnOpen={addAddressOnOpen}
                title="Add new address"
              />
            )}

            <Button
              w="full"
              colorScheme="orange"
              leftIcon={<MdShoppingCartCheckout size={20} />}
            >
              Checkout
            </Button>
          </VStack>
        )}
      </HStack>
    </Layout>
  );
};

export default Cart;
