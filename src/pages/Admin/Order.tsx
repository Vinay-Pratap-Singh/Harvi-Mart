import { Helmet } from "react-helmet";
import Layout from "../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getAllOrders } from "../../redux/orderSlice";
import { useEffect } from "react";
import {
  Button,
  Heading,
  Select,
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
} from "@chakra-ui/react";
import { IordersData } from "../../helper/interfaces";
import { MdOutlineDescription } from "react-icons/md";

const Order = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, orders } = useSelector((state: RootState) => state.order);

  // fetching the orders data
  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

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

                <Th>
                  <Select placeholder="Select option">
                    <option value="all">Payment Status</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                </Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>

            {/* adding the table body */}
            <Tbody fontSize={"14.5px"} fontWeight={"semibold"}>
              {orders.length === 0 ? (
                <Tr>
                  <Td colSpan={9}>Oops! There is no products</Td>
                </Tr>
              ) : (
                orders.map((order: IordersData, index) => {
                  return (
                    <Tr key={order._id}>
                      <Td p="1" textAlign={"center"} verticalAlign={"text-top"}>
                        {index < 10 ? `0${index + 1}` : index + 1}
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
                        {order?.orderStatus}
                      </Td>
                      <Td p="1" textAlign={"center"} verticalAlign={"text-top"}>
                        <Tooltip
                          hasArrow
                          label="More order details"
                          color={"orange.500"}
                          bgColor={"white"}
                          placement={"top"}
                        >
                          <Button
                            p="0"
                            _hover={{ color: "#e06464" }}
                            fontSize={"xl"}
                          >
                            <MdOutlineDescription />
                          </Button>
                        </Tooltip>
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
