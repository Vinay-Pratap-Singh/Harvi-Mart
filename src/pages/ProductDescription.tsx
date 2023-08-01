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
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdOutlineRateReview } from "react-icons/md";
import StarReview from "../components/StarReview";
import { useEffect, useRef, useState } from "react";
import UserReview from "../components/CustomerReviews";
import Layout from "./Layout/Layout";
import { useLocation } from "react-router-dom";
import { Iproduct, IproductReview } from "../helper/interfaces";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductReview,
  getIndividualProductReview,
} from "../redux/reviewSlice";
import { AppDispatch, RootState } from "../redux/store";
import {
  AiOutlineClose,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { addProductToCart } from "../redux/cartSlice";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";
import { BiImageAdd } from "react-icons/bi";

const ProductDescription = () => {
  const { state } = useLocation();
  const dispatch = useDispatch<AppDispatch>();

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
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const [currentImagePreview, setCurrentImagePreview] = useState(0);
  const slideContainerRef = useRef<HTMLDivElement>(null);

  // function to handle buy now
  const handleBuyNow = () => {};

  // function to add the product into cart
  const addToCart = (product: Iproduct) => {
    // checking for the item already in cart or not
    if (cartItems.length !== 0) {
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

      <HStack w={"full"} gap={10} p={10} pos={"relative"}>
        {/* left section for image */}
        <VStack w={"100%"} alignSelf={"baseline"}>
          <Image
            src={state?.images[currentImagePreview]?.image?.secure_url}
            maxH={80}
            alt="product image"
          />

          <Box pos={"relative"}>
            {/* for multiple products image */}
            <HStack
              w={"full"}
              overflowX="scroll"
              alignItems={"left"}
              justifyContent={"left"}
              ref={slideContainerRef}
              mt={5}
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
                        w={28}
                        h={28}
                        flexShrink={0}
                        shadow={"md"}
                        borderRadius={5}
                        cursor={"pointer"}
                        justifyContent={"center"}
                        _hover={{ color: "primaryColor" }}
                        onMouseEnter={() => {
                          setCurrentImagePreview(index);
                        }}
                      >
                        <Image
                          key={Date.now() + index}
                          src={image?.image?.secure_url}
                        />
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
              left={0}
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
              right={0}
              zIndex={10}
              size={"sm"}
              onClick={handleRightSlider}
            >
              <AiOutlineRight fontSize={"20px"} />
            </Button>
          </Box>
        </VStack>

        {/* right section for product details */}
        <VStack w={"full"} gap={10}>
          {/* for product details */}
          <VStack
            alignItems={"self-start"}
            alignSelf={"flex-start"}
            w={"full"}
            fontWeight={"semibold"}
          >
            <Heading fontSize={"2xl"} fontWeight={"bold"}>
              {state?.title}
            </Heading>
            <Text>{state?.description}</Text>

            {/* adding the pricing section */}
            {state?.discountedPrice ? (
              <VStack>
                <HStack fontWeight={"semibold"}>
                  <Text as={"span"} fontSize={"lg"}>
                    &#x20b9;
                  </Text>
                  <Text as={"p"} fontSize={"2xl"}>
                    {state?.discountedPrice}
                  </Text>
                </HStack>
                <Text fontSize={"xs"} color={"gray.500"}>
                  M.R.P : <s>&#x20b9;{state?.originalPrice}</s>
                </Text>
              </VStack>
            ) : (
              <HStack fontWeight={"semibold"}>
                <Text as={"span"} fontSize={"lg"}>
                  &#x20b9;
                </Text>
                <Text as={"p"} fontSize={"2xl"}>
                  {state?.originalPrice}
                </Text>
              </HStack>
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
              <Button colorScheme="orange" onClick={handleBuyNow}>
                Buy Now
              </Button>
              <Button
                _hover={{ color: "primaryColor" }}
                onClick={() => addToCart(state)}
              >
                <AiOutlineShoppingCart size={22} />
              </Button>
            </HStack>
          </VStack>

          {/* for customer review */}
          <VStack w={"full"} alignItems={"flex-start"}>
            <Heading fontSize={"2xl"} fontWeight={"bold"} mb={5}>
              Customer Reviews
            </Heading>
            <UserReview productID={state?._id} />
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
              <VStack>
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
                >
                  Submit Review
                </Button>
              </VStack>
            </form>
          </VStack>
        </VStack>
      </HStack>
    </Layout>
  );
};

export default ProductDescription;
