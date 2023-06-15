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
import myProduct from "../assets/CategoryImages/shoes.png";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdOutlineRateReview } from "react-icons/md";
import StarReview from "../components/StarReview";
import { useEffect, useState } from "react";
import UserReview from "../components/CustomerReviews";
import Layout from "./Layout/Layout";
import { useLocation } from "react-router-dom";

interface IreviewData {
  title: string;
  rating: number;
  review: string;
}

const ProductDescription = () => {
  const { state } = useLocation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IreviewData>({
    defaultValues: { rating: 0, review: "", title: "" },
  });
  const [rating, setRating] = useState(0);

  // function to handle buy now
  const handleBuyNow = () => {};

  // function to handle form submit
  const handleFormSubmit: SubmitHandler<IreviewData> = (data) => {
    console.log(data);
  };

  // assigning the rating value to react hook form
  useEffect(() => {
    setValue("rating", rating);
  }, [rating]);

  return (
    <Layout>
      <HStack gap={10} p={10} pos={"relative"}>
        {/* left section for image */}
        <Box w={96} pos={"fixed"} left={10} top={20}>
          <Image
            src={state?.images[0]?.image?.secure_url}
            h={96}
            alt="product image"
          />
        </Box>

        {/* right section for product details */}
        <VStack w={"full"} gap={10} pl={"450px"}>
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
            <Button colorScheme="orange" onClick={handleBuyNow}>
              Buy Now
            </Button>
          </VStack>

          {/* for customer review */}
          <VStack w={"full"} alignItems={"flex-start"}>
            <Heading fontSize={"2xl"} fontWeight={"bold"}>
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
                      placeholder="Fantastic Product"
                      {...register("title", {
                        required: {
                          value: true,
                          message: "Please enter review title",
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
                      placeholder="This was one of my best purchase i had done till now."
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

                <Button colorScheme="orange" type="submit">
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
