import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../helper/Hooks/redux";
import { getLoggedInUserOrders } from "../../redux/orderSlice";
import Layout from "../Layout/Layout";
import {
  Box,
  HStack,
  Heading,
  Image,
  ListItem,
  Skeleton,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import noProductInCart from "../../assets/noProductInCart.jpg";
import { IordersData } from "../../helper/interfaces";

const Order = () => {
  const dispatch = useAppDispatch();
  const { orders, isLoading } = useAppSelector((state) => state.order);
  useEffect(() => {
    dispatch(getLoggedInUserOrders());
  }, []);

  return (
    <Layout>
      {/* adding the dynamic meta data */}
      <Helmet>
        <title>Orders</title>
        <meta
          name="description"
          content="View and track your orders at Harvi Mart - Your one-stop shop for quality products. Easily monitor your purchase history and delivery status. Shop with confidence!"
        />
      </Helmet>

      <Box minH={"70vh"}>
        {isLoading ? (
          <HStack
            flexWrap={"wrap"}
            alignItems={"center"}
            justifyContent={"center"}
            m={[3, 3, 5, 10]}
            gap={5}
          >
            {Array.from({ length: 6 }, (_, index) => {
              return (
                <Skeleton
                  key={index}
                  w={["full", "full", "80"]}
                  h={["40", "40", "60"]}
                />
              );
            })}
          </HStack>
        ) : (
          <HStack
            flexWrap={"wrap"}
            alignItems={"center"}
            justifyContent={"center"}
            m={[3, 3, 5, 10]}
            gap={5}
          >
            {orders.length ? (
              orders.map((order: IordersData) => {
                return (
                  <VStack
                    key={order?._id}
                    boxShadow={"md"}
                    p="3"
                    rounded={"md"}
                    w={["full", "full", "80"]}
                    alignSelf={"stretch"}
                  >
                    {/* for listing purchased product in one order */}
                    <UnorderedList listStyleType={"none"}>
                      {order?.products.length &&
                        order?.products?.map((product) => {
                          return (
                            <ListItem key={product?._id}>
                              <Heading fontSize={"md"}>
                                {product?.product?.title}
                              </Heading>
                              <HStack
                                mt={1}
                                fontSize={"sm"}
                                justifyContent={"space-between"}
                              >
                                <Text>Quantity: {product?.quantity}</Text>
                                <Text>Price: {product?.price}</Text>
                              </HStack>
                            </ListItem>
                          );
                        })}
                    </UnorderedList>

                    {/* for extra details */}
                    <VStack fontSize={"sm"} fontWeight={"semibold"} spacing={0}>
                      <Text>Payment method: {order?.paymentMethod}</Text>
                      <Text>Total Amount: {order?.total}</Text>
                    </VStack>
                  </VStack>
                );
              })
            ) : (
              <VStack gap={5}>
                <Text fontWeight={"semibold"} fontSize={["sm", "sm", "md"]}>
                  "Oops! no order found, please do some shopping :)
                </Text>
                <Image w={"25rem"} src={noProductInCart} />
              </VStack>
            )}
          </HStack>
        )}
      </Box>
    </Layout>
  );
};

export default Order;
