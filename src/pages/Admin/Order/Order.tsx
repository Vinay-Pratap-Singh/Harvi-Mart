import { Helmet } from "react-helmet";
import Layout from "../../Layout/Layout";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  Box,
  Button,
  HStack,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { IordersData } from "../../../helper/interfaces";
import { MdOutlineDescription } from "react-icons/md";
import CancelOrderByAdmin from "../../../components/AlertBox/CancelOrderByAdmin";
import { BiCloudDownload, BiLoaderCircle } from "react-icons/bi";
import { AiOutlineFilePdf } from "react-icons/ai";
import usePdfDownload from "../../../helper/Hooks/usePdfDownload";
import { useRef } from "react";
import TableShimmer from "../../../shimmer/TableShimmer";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const { orders, isLoading } = useSelector((state: RootState) => state.order);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const report = useRef<HTMLDivElement>(null);
  const { generatePDF, pdfData, resetPdfData, isGenerating } = usePdfDownload();
  const navigate = useNavigate();

  return (
    <Layout>
      {/* adding the dynamic meta data */}
      <Helmet>
        <title>Orders</title>
        <meta
          name="description"
          content="Welcome to the Order Admin Page of Harvi Mart! Manage and track all your customer orders efficiently. With our user-friendly interface, you can easily view, update, and process orders, ensuring smooth order fulfillment. Stay on top of your business with real-time order status, shipping details, and customer information. Simplify your order management process and deliver exceptional customer service. Join Harvi Mart today and take control of your orders like never before!"
        />
      </Helmet>

      <VStack
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
            Order Page
          </Text>{" "}
        </Heading>

        {/* adding the report download button */}
        <Box
          h={10}
          w={10}
          borderRadius={"full"}
          boxShadow={"md"}
          display={["none", "none", "none", "flex"]}
          alignItems={"center"}
          justifyContent={"center"}
          color={"primaryColor"}
          cursor={"pointer"}
          pos={"absolute"}
          top={[null, null, null, 10]}
          right={[null, null, null, 16, 28]}
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
                download="Order Report.pdf"
                onClick={resetPdfData}
              >
                <BiCloudDownload fontSize={28} />
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
                <AiOutlineFilePdf fontSize={28} />
              </Text>
            </Tooltip>
          ) : (
            <BiLoaderCircle fontSize={28} />
          )}
        </Box>

        {/* for displaying the orders table */}
        <TableContainer ref={report}>
          <Table>
            <Thead>
              <Tr>
                <Th isNumeric textAlign={"center"}>
                  S. No.
                </Th>
                <Th>Ordered By</Th>
                <Th>Email</Th>
                <Th>Phone No.</Th>
                <Th>Purchase Amount</Th>
                <Th>Order Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>

            {/* adding the table body */}
            <Tbody fontSize={"14.5px"} fontWeight={"semibold"}>
              {isLoading ? (
                <Tr>
                  <Td>
                    <TableShimmer />
                  </Td>
                  <Td>
                    <TableShimmer />
                  </Td>
                  <Td>
                    <TableShimmer />
                  </Td>
                  <Td>
                    <TableShimmer />
                  </Td>
                  <Td>
                    <TableShimmer />
                  </Td>
                  <Td>
                    <TableShimmer />
                  </Td>
                  <Td>
                    <TableShimmer />
                  </Td>
                </Tr>
              ) : orders.length === 0 ? (
                <Tr textAlign={"center"}>
                  <Td colSpan={9}>Oops! There is no products</Td>
                </Tr>
              ) : (
                orders.map((order: IordersData, index: number) => {
                  return (
                    <Tr key={order._id}>
                      <Td p="1" textAlign={"center"} verticalAlign={"text-top"}>
                        {index < 9 ? `0${index + 1}` : index + 1}
                      </Td>
                      <Td p="1" textAlign={"center"} verticalAlign={"text-top"}>
                        {order?.user?.fullName}
                      </Td>
                      <Td p="1" verticalAlign={"text-top"}>
                        {order?.user?.email}
                      </Td>
                      <Td p="1" textAlign={"center"} verticalAlign={"text-top"}>
                        {order?.phoneNumber}
                      </Td>
                      <Td p="1" textAlign={"center"} verticalAlign={"text-top"}>
                        &#x20b9;{order?.total}
                      </Td>
                      <Td p="1" textAlign={"center"} verticalAlign={"text-top"}>
                        {order?.orderStatus}
                      </Td>
                      <Td p="1" textAlign={"center"} verticalAlign={"text-top"}>
                        <HStack gap={1} pr={2}>
                          <Tooltip
                            hasArrow
                            label="More order details"
                            color={"orange.500"}
                            bgColor={"white"}
                            placement={"top"}
                          >
                            <Button
                              _hover={{ color: "#e06464" }}
                              fontSize={"xl"}
                              onClick={() =>
                                navigate(`/admin/orders/${order?._id}`, {
                                  state: { ...order },
                                })
                              }
                            >
                              <MdOutlineDescription />
                            </Button>
                          </Tooltip>
                          {/* to cancel the order */}
                          {order?.orderStatus === "ORDERED" && (
                            <CancelOrderByAdmin
                              key={order?._id}
                              isOpen={isOpen}
                              onClose={onClose}
                              onOpen={onOpen}
                              orderID={order?._id}
                            />
                          )}
                        </HStack>
                      </Td>
                    </Tr>
                  );
                })
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </Layout>
  );
};

export default Order;
