import { Helmet } from "react-helmet";
import Layout from "../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getAllOrders } from "../../redux/orderSlice";
import { useEffect } from "react";
import { Heading, Text, VStack } from "@chakra-ui/react";

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

      <VStack w={"full"} pl={60} pt={5}>
        <Heading fontSize={"3xl"}>
          Welcome to the{" "}
          <Text as={"span"} color={"primaryColor"}>
            Order Page
          </Text>{" "}
        </Heading>
      </VStack>
    </Layout>
  );
};

export default Order;
