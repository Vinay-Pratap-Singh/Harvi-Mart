import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import paymentSuccess from "../assets/paymentSuccess.jpg";
import { AiFillCheckCircle } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import { BiArrowBack } from "react-icons/bi";

const PaymentSuccess = () => {
  return (
    <HStack gap={14} m={10} alignItems={"center"} justifyContent={"center"}>
      {/* adding the dynamic meta data */}
      <Helmet>
        <title>Order Successfull</title>
        <meta
          name="description"
          content="Thank you for your order! We appreciate your trust in Harvi Mart. Your purchase has been successfully confirmed, and your items are on their way to you. Experience exceptional service and handpicked products designed to bring joy to your shopping journey. Explore our diverse range and discover more treasures for your unique style. Happy shopping with us!"
        />
      </Helmet>

      <VStack
        boxShadow={"md"}
        h={"full"}
        w={"23rem"}
        p={5}
        gap={1}
        borderRadius={"5px"}
      >
        <Box color={"green.500"} fontSize={"6xl"}>
          <AiFillCheckCircle />
        </Box>
        <Heading
          display={"flex"}
          gap={2}
          size={"lg"}
          fontSize={"2xl"}
          fontWeight={"semibold"}
        >
          Payment Successfull{" "}
          <Text as={"span"} color="orange.500">
            :)
          </Text>
        </Heading>
        <Text display={"flex"} gap={2} fontSize={"lg"} fontWeight={"medium"}>
          Thanks for your order
        </Text>
        <Text fontSize={"sm"} fontWeight={"medium"}>
          Thank you for choosing us! We are absolutely thrilled to have you as a
          valued customer and want to express our heartfelt gratitude for your
          recent purchase. Your order is now on its way, carefully packed with
          love and attention to ensure it reaches you in perfect condition.
        </Text>
        {/* Back to homepage button */}
        <Link as={RouterLink} to={"/"} w={"full"}>
          <Button
            type="button"
            w={"full"}
            colorScheme="orange"
            display={"flex"}
            alignItems={"center"}
            gap={2}
            mt={2}
          >
            <BiArrowBack /> Back to Homepage
          </Button>
        </Link>
      </VStack>

      <Image h={"450px"} src={paymentSuccess} alt="Payment Successfull" />
    </HStack>
  );
};

export default PaymentSuccess;
