import { useLocation } from "react-router-dom";
import Layout from "../../Layout/Layout";
import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { useRef, useState } from "react";
import {
  AiOutlineFilePdf,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import { nanoid } from "@reduxjs/toolkit";
import CustomerReviews from "../../../components/CustomerReviews";
import { BiCloudDownload, BiLoaderCircle } from "react-icons/bi";
import usePdfDownload from "../../../helper/Hooks/usePdfDownload";

const ProductDescription = () => {
  // getting the products details to display
  const { state } = useLocation();
  const [currentImagePreview, setCurrentImagePreview] = useState(0);
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const report = useRef<HTMLDivElement>(null);
  const { generatePDF, pdfData, resetPdfData, isGenerating } = usePdfDownload();

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
          content="Elevate your shopping experience at Harvi Mart's Product Description Page. Explore detailed information about our high-quality products, from stylish fashion pieces to cutting-edge electronics and home essentials. Find the perfect fit for your needs and preferences with comprehensive product descriptions, specifications, and features. Shop confidently with Harvi Mart, where quality and convenience meet. Discover more and make informed choices for your lifestyle."
        />
      </Helmet>

      <VStack
        minH={"100vh"}
        w="full"
        pl={[0, 0, 0, 60]}
        pt={[12, 12, 12, 5]}
        gap={[5, 5, 5, 10]}
      >
        <Heading
          textAlign={["center", "center", "center", "initial"]}
          fontSize={["xl", "xl", "2xl", "3xl"]}
          w={["full", "full", "full", "auto"]}
        >
          Welcome to the{" "}
          <Text as={"span"} color={"primaryColor"}>
            Product Description
          </Text>
        </Heading>

        {/* adding the report download button */}
        <Box
          h={10}
          w={10}
          borderRadius={"full"}
          boxShadow={"md"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          color={"primaryColor"}
          cursor={"pointer"}
          pos={"absolute"}
          top={[0, null, null, 10]}
          right={[2, null, null, 16, 28]}
        >
          {pdfData ? (
            <Tooltip
              hasArrow
              label="Download Report"
              bgColor={"primaryColor"}
              color={"white"}
            >
              <a
                rel="noreferrer"
                href={URL.createObjectURL(pdfData)}
                download="Product Report.pdf"
                onClick={resetPdfData}
              >
                <BiCloudDownload fontSize={28} cursor={"pointer"} />
              </a>
            </Tooltip>
          ) : !isGenerating ? (
            <Tooltip
              hasArrow
              label="Generate Report"
              bgColor={"primaryColor"}
              color={"white"}
            >
              <Text
                as={"span"}
                onClick={() => report.current && generatePDF(report.current)}
              >
                <AiOutlineFilePdf fontSize={28} cursor={"pointer"} />
              </Text>
            </Tooltip>
          ) : (
            <BiLoaderCircle fontSize={28} cursor={"pointer"} />
          )}
        </Box>

        {/* product description */}
        <VStack
          ref={report}
          direction={["column", "column", "column", "row"]}
          w={"full"}
          gap={10}
          p={[0, 0, 5, 5, 10]}
          pos={"relative"}
        >
          <Stack
            direction={["column", "column", "column", "column", "row"]}
            w={"full"}
            gap={10}
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
                fontWeight={"semibold"}
                w={"full"}
                px={[2, 2, 2, 0]}
                alignItems={"self-start"}
              >
                <Heading
                  fontSize={["xl", "xl", "xl", "2xl"]}
                  fontWeight={"bold"}
                >
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
                  <Text
                    color={state.quantity < 10 ? "yellow.400" : "green.400"}
                  >
                    In Stock {state?.quantity} left
                  </Text>
                )}

                {/* for category */}
                <Text fontSize={["sm", "sm", "sm", "initial"]}>
                  Category Name: {state?.category?.name}
                </Text>

                {/* for unit sold */}
                <Text fontSize={["sm", "sm", "sm", "initial"]}>
                  Total units sold : {state?.numOfUnitsSold}
                </Text>
              </VStack>
            </VStack>
          </Stack>

          {/* for customer review */}
          <VStack w={"full"} alignItems={"flex-start"} pb={[2, 2, 2, 0]}>
            <Heading
              fontSize={["xl", "xl", "xl", "2xl"]}
              fontWeight={"bold"}
              mb={5}
            >
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
