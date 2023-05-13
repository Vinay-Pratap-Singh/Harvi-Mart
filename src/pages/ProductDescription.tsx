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

interface IreviewData {
  title: string;
  rating: number;
  review: string;
}

const ProductDescription = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IreviewData>({
    defaultValues: { rating: 0, review: "", title: "" },
  });
  const [rating, setRating] = useState(0);

  // function to handle form submit
  const handleFormSubmit: SubmitHandler<IreviewData> = (data) => {
    console.log(data);
  };

  // assigning the rating value to react hook form
  useEffect(() => {
    setValue("rating", rating);
  }, [rating]);

  return (
    <HStack gap={10} h={"100vh"} p={10} overflow={"hidden"}>
      {/* left section for image */}
      <Box w={"40%"}>
        <Image src={myProduct} h={96} alt="product image" />
      </Box>

      <VStack overflowY={"scroll"} w={"60%"} h={"full"} gap={10}>
        {/* right section for product details */}
        <VStack
          alignItems={"self-start"}
          alignSelf={"flex-start"}
          w={"60%"}
          fontWeight={"semibold"}
        >
          <Heading fontSize={"2xl"} fontWeight={"bold"}>
            Stylish Shoes
          </Heading>
          <Text>
            Best sports shoes for a stylish look and confortable feel. Made with
            the best carbon material for a long lasting, smoother and
            comfortable feel
          </Text>
          <Text>Category Name : Shoes</Text>
          <Text>Price : 100 &#x20b9; only</Text>
          <Button colorScheme="orange">Buy Now</Button>
        </VStack>

        {/* creating the review section */}
        <VStack alignItems={"flex-start"} w={"full"}>
          {/* for adding the review */}
          <Heading fontSize={"2xl"} fontWeight={"bold"}>
            Give Your Feedback
          </Heading>

          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            style={{ width: "100%", paddingRight: "10px" }}
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
  );
};

export default ProductDescription;
