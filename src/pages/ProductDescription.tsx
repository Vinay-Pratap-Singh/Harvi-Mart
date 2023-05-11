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
  VStack,
} from "@chakra-ui/react";
import myProduct from "../assets/CategoryImages/shoes.png";
import { useForm } from "react-hook-form";
import { MdOutlineRateReview } from "react-icons/md";

interface IreviewData {
  title: string;
  rating: number;
  review: string;
}

const ProductDescription = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IreviewData>({
    defaultValues: { rating: 0, review: "", title: "" },
  });

  return (
    <VStack m={10}>
      <HStack gap={10}>
        {/* left section for image */}
        <Box w={"40%"}>
          <Image src={myProduct} h={96} alt="product image" />
        </Box>

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
      </HStack>
    </VStack>
  );
};

export default ProductDescription;
