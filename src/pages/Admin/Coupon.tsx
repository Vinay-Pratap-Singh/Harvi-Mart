import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState } from "react";
import Layout from "../Layout/Layout";
import {
  Box,
  HStack,
  Heading,
  Image,
  ListItem,
  Text,
  UnorderedList,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import couponImage from "../../assets/coupon.jpg";
import AddCoupon from "../../components/Modals/AddCoupon";
import UpdateCoupon from "../../components/Modals/UpdateCoupon";
import DeleteCoupon from "../../components/AlertBox/DeleteCoupon";
import { Helmet } from "react-helmet";
import { nanoid } from "@reduxjs/toolkit";

const Coupon = () => {
  const { coupons } = useSelector((state: RootState) => state.coupon);

  // for managing the update coupon data
  const [updateCouponData, setUpdateCouponData] = useState<{
    _id: string;
    discount: number;
    couponCode: string;
  }>();
  // for managing the delete coupon
  const [deleteCouponID, setDeleteCouponID] = useState("");

  // for managing the modals and alert boxes
  const {
    isOpen: deleteCouponIsOpen,
    onOpen: deleteCouponOnOpen,
    onClose: deleteCouponOnClose,
  } = useDisclosure();
  const {
    isOpen: updateCouponIsOpen,
    onOpen: updateCouponOnOpen,
    onClose: updateCouponOnClose,
  } = useDisclosure();
  const {
    isOpen: addCouponIsOpen,
    onOpen: addCouponOnOpen,
    onClose: addCouponOnClose,
  } = useDisclosure();

  return (
    <Layout>
      {/* adding the dynamic meta data */}
      <Helmet>
        <title>Coupons</title>
        <meta
          name="description"
          content="Manage Coupons with Ease - Harvi Mart's Admin Dashboard lets you create, edit, and delete coupons effortlessly. Boost sales with exclusive discounts and promotions. Unlock growth opportunities and increase customer engagement. Stay in control with Harvi Mart's Coupons management."
        />
      </Helmet>

      <VStack w={"full"} h="100vh" pl={60} gap={5} pt={5}>
        <Heading fontSize={"3xl"}>
          Welcome to the{" "}
          <Text as={"span"} color={"primaryColor"}>
            Coupon Page
          </Text>{" "}
        </Heading>
        <HStack gap={8} justifyContent={"center"}>
          <Image h={"400px"} src={couponImage} alt="coupon page main image" />

          {/* for coupon card to perform CRUD */}
          <VStack
            w={96}
            h={"450px"}
            boxShadow={"md"}
            p={5}
            borderRadius={"5px"}
            pos="relative"
            gap={3}
          >
            <Heading fontSize={"2xl"}>My Coupons</Heading>
            <Box pos="absolute" top={3} right={5}>
              <AddCoupon
                key={nanoid()}
                addCouponIsOpen={addCouponIsOpen}
                addCouponOnClose={addCouponOnClose}
                addCouponOnOpen={addCouponOnOpen}
              />
            </Box>

            <UnorderedList w={"full"} overflowY={"scroll"} pr={1} pb={2}>
              {coupons &&
                coupons.map((coupon: any) => {
                  return (
                    <ListItem
                      key={coupon._id}
                      listStyleType={"none"}
                      shadow={"sm"}
                      borderRadius={"5px"}
                      padding={1}
                    >
                      <HStack justifyContent={"space-between"}>
                        <Box fontSize={"14px"} fontWeight={"semibold"}>
                          <Text>Code : {coupon.couponCode}</Text>
                          <Text>Discount : {coupon.discount}</Text>
                        </Box>
                        <VStack>
                          <Box
                            onClick={() =>
                              setUpdateCouponData({
                                _id: coupon?._id,
                                couponCode: coupon?.couponCode,
                                discount: coupon?.discount,
                              })
                            }
                          >
                            <UpdateCoupon
                              key={coupon._id}
                              updateCouponIsOpen={updateCouponIsOpen}
                              updateCouponOnClose={updateCouponOnClose}
                              updateCouponOnOpen={updateCouponOnOpen}
                              data={{
                                _id: updateCouponData?._id,
                                couponCode: updateCouponData?.couponCode!,
                                discount: updateCouponData?.discount!,
                              }}
                            />
                          </Box>
                          <Box onClick={() => setDeleteCouponID(coupon?._id)}>
                            <DeleteCoupon
                              key={coupon._id}
                              deleteCouponIsOpen={deleteCouponIsOpen}
                              deleteCouponOnClose={deleteCouponOnClose}
                              deleteCouponOnOpen={deleteCouponOnOpen}
                              id={deleteCouponID}
                            />
                          </Box>
                        </VStack>
                      </HStack>
                    </ListItem>
                  );
                })}
            </UnorderedList>
          </VStack>
        </HStack>
      </VStack>
    </Layout>
  );
};

export default Coupon;
