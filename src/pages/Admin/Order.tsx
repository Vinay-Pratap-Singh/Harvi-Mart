import { Helmet } from "react-helmet";
import Layout from "../Layout/Layout";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
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
import { IordersData } from "../../helper/interfaces";
import { MdOutlineDescription } from "react-icons/md";
import CancelOrderByAdmin from "../../components/AlertBox/CancelOrderByAdmin";

const Order = () => {
  const { orders } = useSelector((state: RootState) => state.order);
  const { isOpen, onClose, onOpen } = useDisclosure();
  console.log(orders);
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

      <VStack w={"full"} pl={60} pt={5} gap={10}>
        <Heading fontSize={"3xl"}>
          Welcome to the{" "}
          <Text as={"span"} color={"primaryColor"}>
            Order Page
          </Text>{" "}
        </Heading>

        {/* for displaying the orders table */}
        <TableContainer>
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
                <Th>Payment Method</Th>
                <Th>Payment Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>

            {/* adding the table body */}
            <Tbody fontSize={"14.5px"} fontWeight={"semibold"}>
              {orders.length === 0 ? (
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
                        {order?.paymentMethod}
                      </Td>
                      <Td p="1" textAlign={"center"} verticalAlign={"text-top"}>
                        {order?.paymentStatus}
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
                            >
                              <MdOutlineDescription />
                            </Button>
                          </Tooltip>
                          {/* to cancel the order */}
                          <CancelOrderByAdmin
                            key={order?._id}
                            isOpen={isOpen}
                            onClose={onClose}
                            onOpen={onOpen}
                            orderID={order?._id}
                          />
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
