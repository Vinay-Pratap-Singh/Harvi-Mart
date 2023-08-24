import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdOutlineRateReview } from "react-icons/md";
import StarReview from "../../components/StarReview";
import { useEffect, useRef, useState } from "react";
import CustomerReviews from "../../components/CustomerReviews";
import Layout from "../Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { Iproduct, IproductReview } from "../../helper/interfaces";
import {
  createProductReview,
  getIndividualProductReview,
} from "../../redux/reviewSlice";
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { addProductToCart } from "../../redux/cartSlice";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";
import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../helper/Hooks/redux";

const ProductDescription = () => {
  const { state } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IproductReview>({
    defaultValues: {
      title: "",
      rating: 0,
      review: "",
      reviewedFor: state?._id,
    },
  });

  const [rating, setRating] = useState(0);
  const { cartItems } = useAppSelector((state) => state.cart);
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const [currentImagePreview, setCurrentImagePreview] = useState(0);
  const slideContainerRef = useRef<HTMLDivElement>(null);

  // function to handle buy now
  const handleBuyNow = (product: Iproduct) => {
    // checking for the item already in cart or not
    let isInCart = false;
    if (cartItems.length !== 0) {
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i]?._id === product?._id) {
          isInCart = true;
          break;
        }
      }
    }
    if (!isInCart) {
      (async () => {
        await dispatch(addProductToCart(product));
      })();
    }

    // sending the user to the cart page
    navigate("/cart");
  };

  // function to add the product into cart
  const addToCart = (product: Iproduct) => {
    // checking for the item already in cart or not
    if (cartItems.length) {
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i]?._id === product?._id) {
          toast.error("Product is already in the cart");
          return;
        }
      }
    }
    dispatch(addProductToCart(product));
  };

  // function to handle review form submit
  const handleFormSubmit: SubmitHandler<IproductReview> = async (data) => {
    const res = await dispatch(createProductReview(data));
    if (res?.payload?.success) {
      reset();
      setRating(0);
      await dispatch(getIndividualProductReview(data.reviewedFor));
    } else {
      const { rating, review, reviewedFor, title } = watch();
      reset({ rating, review, reviewedFor, title });
    }
  };

  // function to scroll container left
  const handleLeftSlider = () => {
    if (slideContainerRef.current) {
      slideContainerRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  // function to scroll container right
  const handleRightSlider = () => {
    if (slideContainerRef.current) {
      slideContainerRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  // assigning the rating value to react hook form
  useEffect(() => {
    setValue("rating", rating);
  }, [rating]);

  // moving the window to top on mounting
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <Layout>
      {/* adding the dynamic meta data */}
      <Helmet>
        <title>Product : {state?.title}</title>
        <meta
          name="description"
          content="Delve into the details of the finest products at Harvi Mart. Explore comprehensive product descriptions, reviews, ratings, prices, and availability. Find everything you need to make an informed decision and shop confidently. Your ultimate source for quality products is just a click away."
        />
      </Helmet>

      <Stack
        direction={["column", "column", "column", "row"]}
        w={"full"}
        gap={10}
        p={[0, 0, 5, 10]}
        pos={"relative"}
      >
        {/* left section for image */}
        <VStack w={"full"} alignSelf={"baseline"} gap={5}>
          <Image
            src={state?.images[currentImagePreview]?.image?.secure_url}
            maxH={80}
            alt="product image"
          />

          <Box
            pos={"relative"}
            w={["95%", "95%", "95%", "full"]}
            px={[2, 2, 5]}
            py={2}
            shadow={"md"}
          >
            {/* for multiple products image */}
            <HStack
              minW={"full"}
              overflowX="scroll"
              alignItems={"left"}
              justifyContent={"left"}
              ref={slideContainerRef}
              sx={{
                "::-webkit-scrollbar": {
                  display: "none",
                },
              }}
              p={2}
            >
              {state?.images.length &&
                state?.images.map(
                  (
                    image: {
                      image: { public_id: string; secure_url: string };
                      id: string;
                    },
                    index: number
                  ) => {
                    return (
                      <Box
                        key={image.id}
                        w={28}
                        h={28}
                        flexShrink={0}
                        borderRadius={5}
                        cursor={"pointer"}
                        justifyContent={"center"}
                        _hover={{
                          color: "primaryColor",
                        }}
                        shadow={currentImagePreview === index ? "md" : ""}
                        transition={"all 0.2s ease-in-out"}
                        onClick={() => {
                          setCurrentImagePreview(index);
                        }}
                      >
                        <Image key={nanoid()} src={image?.image?.secure_url} />
                      </Box>
                    );
                  }
                )}
            </HStack>

            {/* left slider button */}
            <Button
              borderRadius={"full"}
              p="0"
              pos="absolute"
              bottom={12}
              left={[0, 0, 1]}
              zIndex={10}
              size={"sm"}
              onClick={handleLeftSlider}
            >
              <AiOutlineLeft fontSize={"20px"} />
            </Button>

            {/* right slider button */}
            <Button
              borderRadius={"full"}
              p="0"
              pos="absolute"
              bottom={12}
              right={[0, 0, 1]}
              zIndex={10}
              size={"sm"}
              onClick={handleRightSlider}
            >
              <AiOutlineRight fontSize={"20px"} />
            </Button>
          </Box>
        </VStack>

        {/* right section for product details */}
        <VStack
          w={"full"}
          gap={[2, 2, 5, 10]}
          px={[2, 2, 2, 0]}
          alignItems={["center", "center", "center", "initial"]}
          justifyContent={["center", "center", "center", "initial"]}
        >
          {/* for product details */}
          <VStack
            alignItems={"self-start"}
            alignSelf={"flex-start"}
            w={"full"}
            fontWeight={"semibold"}
          >
            <Heading fontSize={["xl", "xl", "xl", "2xl"]} fontWeight={"bold"}>
              {state?.title}
            </Heading>
            <Text fontSize={["sm", "sm", "sm", "initial"]}>
              {state?.description}
            </Text>

            {/* adding the pricing section */}
            {state?.discountedPrice ? (
              <HStack fontWeight={"semibold"}>
                <Text as={"p"} fontSize={["xl", "xl", "xl", "2xl"]}>
                  Rs {state?.discountedPrice}
                </Text>
                <Text fontSize={"xs"} color={"gray.500"}>
                  M.R.P : <s>Rs {state?.originalPrice}</s>
                </Text>
                <Text
                  fontSize={"sm"}
                  color={"primaryColor"}
                  fontWeight={"bold"}
                >
                  (
                  {(
                    ((state?.originalPrice - state.discountedPrice) /
                      state?.originalPrice) *
                    100
                  ).toFixed(0)}
                  % Off)
                </Text>{" "}
              </HStack>
            ) : (
              <Text
                as={"p"}
                fontSize={["xl", "xl", "xl", "2xl"]}
                fontWeight={"semibold"}
              >
                Rs {state?.originalPrice}
              </Text>
            )}

            {/* handling the stocks */}
            {!state?.inStock ? (
              <Text color={"red.400"}>Out of Stock</Text>
            ) : (
              <Text color={"green.400"}>In Stock</Text>
            )}
            {state?.quantity <= 10 && state?.inStock && (
              <Text>Hurry up! only {state?.quantity} left</Text>
            )}
            <HStack>
              <Button
                disabled={!isLoggedIn}
                colorScheme="orange"
                onClick={() =>
                  isLoggedIn
                    ? handleBuyNow(state)
                    : toast.error("Please login to continue")
                }
              >
                Buy Now
              </Button>
              <Button
                disabled={!isLoggedIn}
                _hover={{ color: "primaryColor" }}
                onClick={() =>
                  isLoggedIn
                    ? addToCart(state)
                    : toast.error("Please login to continue")
                }
              >
                <AiOutlineShoppingCart size={22} />
              </Button>
            </HStack>
          </VStack>

          {/* for customer review */}
          <VStack w={"full"} alignItems={"flex-start"}>
            <Heading fontSize={"2xl"} fontWeight={"bold"} mb={[2, 2, 2, 5]}>
              Customer Reviews
            </Heading>
            <CustomerReviews key={nanoid()} productID={state?._id} />
          </VStack>

          {/* creating the product review section */}
          <VStack alignItems={"flex-start"} w={"full"}>
            {/* for adding the review */}
            <Box>
              <Heading fontSize={"2xl"} fontWeight={"bold"}>
                Review this product
              </Heading>
              <Text>Share your thoughts with other customers</Text>
            </Box>

            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              style={{ width: "100%" }}
            >
              <VStack mb={[2, 2, 2, 0]}>
                {/* for review title */}
                <FormControl isInvalid={Boolean(errors?.title)}>
                  <FormLabel fontSize={"sm"}>Title</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      fontSize={"xl"}
                      color={"orange.500"}
                      children={<MdOutlineRateReview />}
                    />
                    <Input
                      type="text"
                      focusBorderColor="primaryColor"
                      placeholder="Loved the product"
                      {...register("title", {
                        required: {
                          value: true,
                          message: "Please enter review title",
                        },
                        minLength: {
                          value: 10,
                          message: "Title should have at least 10 characters",
                        },
                      })}
                    />
                  </InputGroup>

                  <FormErrorMessage>
                    {errors.title && errors.title.message}
                  </FormErrorMessage>
                </FormControl>

                {/* for review description */}
                <FormControl isInvalid={Boolean(errors?.review)}>
                  <FormLabel fontSize={"sm"}>Description</FormLabel>
                  <InputGroup>
                    <Textarea
                      focusBorderColor="primaryColor"
                      resize={"none"}
                      h={40}
                      placeholder="Good product in this price range"
                      {...register("review", {
                        required: {
                          value: true,
                          message: "Please enter review description",
                        },
                      })}
                    />
                  </InputGroup>

                  <FormErrorMessage>
                    {errors.review && errors.review.message}
                  </FormErrorMessage>
                </FormControl>

                {/* adding the star component for review */}
                <FormControl alignSelf={"flex-start"} alignItems={"flex-start"}>
                  <FormLabel fontSize={"sm"}>Rating</FormLabel>
                  <StarReview onChange={setRating} />
                </FormControl>

                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  loadingText="Adding review..."
                  colorScheme="orange"
                  size={["md", "md", "lg", "lg"]}
                >
                  Submit Review
                </Button>
              </VStack>
            </form>
          </VStack>
        </VStack>
      </Stack>
    </Layout>
  );
};

export default ProductDescription;
