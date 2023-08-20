import { useLocation } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { Helmet } from "react-helmet";
import {
  Box,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { BiCloudDownload, BiLoaderCircle } from "react-icons/bi";
import { AiOutlineFilePdf } from "react-icons/ai";
import usePdfDownload from "../../../helper/Hooks/usePdfDownload";
import { useRef } from "react";

const OrderDescription = () => {
  // getting the order details to display
  const { state } = useLocation();
  const report = useRef<HTMLDivElement>(null);
  const { generatePDF, pdfData, resetPdfData, isGenerating } = usePdfDownload();

  return (
    <Layout>
      {/* adding the dynamic meta data */}
      <Helmet>
        <title>Order Description</title>
        <meta
          name="description"
          content="Effortless Order Management on Harvi Mart's Admin Order Page. Take control of your eCommerce operations with ease using our Admin Order Description Page. Access comprehensive order details, including product information, quantities, customer details, and order status. Efficiently track and manage each order, ensuring a seamless fulfillment process. With Harvi Mart's intuitive admin tools, you can enhance your order management capabilities and provide top-notch service to your customers. Simplify your admin tasks and optimize your eCommerce operations today!"
        />
      </Helmet>

      <VStack
        minH={"100vh"}
        w={"full"}
        pl={[0, 0, 0, 60]}
        pt={[12, 12, 12, 5]}
        gap={[5, 5, 5, 10]}
      >
        <Heading
          textAlign={["center", "center", "center", "initial"]}
          fontSize={["lg", "lg", "xl", "3xl"]}
          w={["full", "full", "full", "auto"]}
        >
          Welcome to the{" "}
          <Text as={"span"} color={"primaryColor"}>
            Order Description
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

        {/* order description */}
        <VStack
          w={"full"}
          gap={10}
          pos={"relative"}
          p={[5, 5, 5, 10]}
          ref={report}
        >
          {/* for displaying the purchased products */}
          <HStack
            alignItems={"center"}
            gap={10}
            flexWrap={"wrap"}
            alignSelf={"flex-start"}
          >
            {state?.products.length &&
              state?.products.map((product: any) => {
                return (
                  <Box
                    key={product?._id}
                    w={60}
                    shadow={"md"}
                    rounded={"md"}
                    p={4}
                    alignSelf={"stretch"}
                  >
                    <Image
                      key={product?.product?.images?.[0]?._id}
                      src={product?.product?.images?.[0]?.image?.secure_url}
                      alt="product image"
                    />
                    <Heading noOfLines={1} fontSize={"md"}>
                      {product?.product?.title}
                    </Heading>
                    <Text
                      noOfLines={2}
                      fontSize={"sm"}
                      py={1}
                      fontWeight={"medium"}
                    >
                      {product?.product?.description}
                    </Text>

                    <Box fontSize={"sm"} fontWeight={"medium"}>
                      Paid Amount : Rs {product?.price} <br /> Quantity :{" "}
                      {product?.quantity}
                    </Box>
                  </Box>
                );
              })}
          </HStack>

          {/* for order summary */}
          <VStack gap={5}>
            <Heading fontSize={["lg", "lg", "xl", "2xl"]}>
              Complete Order Summary
            </Heading>
            <Stack
              direction={["column", "column", "column", "row"]}
              gap={[5, 5, 5, 5, 10]}
              alignItems={"center"}
            >
              {/* for user details */}
              <VStack
                fontWeight={"medium"}
                fontSize={"sm"}
                shadow={"md"}
                rounded={"md"}
                w={["full", "full", "full", "350px", "400px"]}
                p={5}
              >
                <Heading fontSize={"xl"}>User Details</Heading>
                <Grid templateColumns="repeat(2,1fr)" gap={1}>
                  <GridItem>User Name</GridItem>
                  <GridItem>{state?.user?.fullName}</GridItem>
                  <GridItem>Email</GridItem>
                  <GridItem>{state?.user?.email}</GridItem>
                  <GridItem>Phone number</GridItem>
                  <GridItem>{state?.user?.phoneNumber}</GridItem>
                  <GridItem>Address</GridItem>
                  <GridItem>
                    <Text>{state?.address?.name}</Text>
                    <Text>
                      {"House no. " +
                        state?.address?.houseNumber +
                        " pincode " +
                        state?.address?.pinCode +
                        " , " +
                        state?.address?.city +
                        " " +
                        state?.address?.state}
                    </Text>
                    <Text>{"Phone number " + state?.address?.phoneNumber}</Text>
                  </GridItem>
                </Grid>
              </VStack>

              {/* for order details */}
              <VStack
                fontWeight={"medium"}
                fontSize={"sm"}
                shadow={"md"}
                rounded={"md"}
                w={["full", "full", "full", "350px", "400px"]}
                p={5}
                alignSelf={"stretch"}
              >
                <Heading fontSize={"xl"}>Order Details</Heading>
                <Grid
                  templateColumns="repeat(2,1fr)"
                  gap={1}
                  justifyContent={"space-between"}
                  w={"full"}
                >
                  <GridItem w={"full"}>Order status</GridItem>
                  <GridItem>{state?.orderStatus}</GridItem>
                  <GridItem>Payment method</GridItem>
                  <GridItem>{state?.paymentMethod}</GridItem>
                  <GridItem>Payment status</GridItem>
                  <GridItem>{state?.paymentStatus}</GridItem>
                  <GridItem>Total amount</GridItem>
                  <GridItem>Rs {state?.total}</GridItem>
                </Grid>
              </VStack>
            </Stack>
          </VStack>
        </VStack>
      </VStack>
    </Layout>
  );
};

export default OrderDescription;
