import { useLocation } from "react-router-dom";
import Layout from "../../Layout/Layout";
import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { nanoid } from "@reduxjs/toolkit";
import CustomerReviews from "../../../components/CustomerReviews";

const ProductDescription = () => {
  // getting the products details to display
  const { state } = useLocation();
  const [currentImagePreview, setCurrentImagePreview] = useState(0);
  const slideContainerRef = useRef<HTMLDivElement>(null);

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
  return (
    <Layout>
      {/* adding the dynamic meta data */}
      <Helmet>
        <title>Product Description</title>
        <meta
          name="description"
          content="Effortlessly Add and Update Products - Harvi Mart's Product Operation page offers seamless product management for administrators. Add new items or update existing ones with ease. Stay in control of your inventory and keep your product offerings up-to-date. Streamline your e-commerce operations with Harvi Mart's user-friendly Product Operation."
        />
      </Helmet>

      <VStack minH={"100vh"} w="full" pt={5} pl={60}>
        <Heading fontSize={"3xl"}>
          Welcome to the{" "}
          <Text as={"span"} color={"primaryColor"}>
            Product Description
          </Text>
        </Heading>

        <VStack w={"full"} gap={10} p={10}>
          <HStack w={"full"} gap={10} pos={"relative"}>
            {/* left section for image */}
            <VStack w={"full"} alignSelf={"baseline"} gap={5}>
              <Image
                src={state?.images[currentImagePreview]?.image?.secure_url}
                maxH={80}
                alt="product image"
              />

              <Box pos={"relative"} w={"full"} px={5} py={2} shadow={"md"}>
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
                            <Image
                              key={nanoid()}
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
                  left={1}
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
                  right={1}
                  zIndex={10}
                  size={"sm"}
                  onClick={handleRightSlider}
                >
                  <AiOutlineRight fontSize={"20px"} />
                </Button>
              </Box>
            </VStack>

            {/* right section for product details */}
            <VStack w={"full"} gap={10} alignSelf={"flex-start"}>
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
                  <HStack fontWeight={"semibold"}>
                    <Text as={"p"} fontSize={"2xl"}>
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
                  <Text as={"p"} fontSize={"2xl"} fontWeight={"semibold"}>
                    Rs {state?.originalPrice}
                  </Text>
                )}

                {/* handling the stocks */}
                {!state?.inStock ? (
                  <Text color={"red.400"}>Out of Stock</Text>
                ) : (
                  <Text
                    color={state.quantity < 10 ? "yellow.400" : "green.400"}
                  >
                    In Stock {state?.quantity} left
                  </Text>
                )}

                {/* for category */}
                <Text>Category Name: {state?.category?.name}</Text>

                {/* for unit sold */}
                <Text>Total units sold : {state?.numOfUnitsSold}</Text>
              </VStack>
            </VStack>
          </HStack>

          {/* for customer review */}
          <VStack w={"full"} alignItems={"flex-start"}>
            <Heading fontSize={"2xl"} fontWeight={"bold"} mb={5}>
              Customer Reviews
            </Heading>
            <CustomerReviews key={nanoid()} productID={state?._id} />
          </VStack>
        </VStack>
      </VStack>
    </Layout>
  );
};

export default ProductDescription;