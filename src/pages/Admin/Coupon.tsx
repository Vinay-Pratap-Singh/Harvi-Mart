import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { getAllCoupons } from "../../redux/couponSlice";
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

const Coupon = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { coupons } = useSelector((state: RootState) => state.coupon);
  // for managing the update coupon data
  const [updateCouponData, setUpdateCouponData] = useState<{
    id: string;
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

  // for loading coupons data on page render
  useEffect(() => {
    (async () => {
      await dispatch(getAllCoupons());
    })();
  }, []);

  return (
    <Layout>
      <HStack w={"full"} gap={8} justifyContent={"center"}>
        <Image h={"430px"} src={couponImage} alt="coupon page main image" />

        {/* for coupon card to perform CRUD */}
        <VStack
          w={96}
          h={96}
          boxShadow={"md"}
          p={5}
          borderRadius={"5px"}
          pos="relative"
          gap={3}
        >
          <Heading fontSize={"2xl"}>Coupon Page</Heading>
          <Box pos="absolute" top={3} right={5}>
            <AddCoupon
              addCouponIsOpen={addCouponIsOpen}
              addCouponOnClose={addCouponOnClose}
              addCouponOnOpen={addCouponOnOpen}
            />
          </Box>

          <UnorderedList w={"full"}>
            {coupons &&
              coupons.map((coupon) => {
                return (
                  <ListItem
                    key={coupon.id}
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
                              id: coupon?.id!,
                              couponCode: coupon?.couponCode,
                              discount: coupon?.discount,
                            })
                          }
                        >
                          <UpdateCoupon
                            updateCouponIsOpen={updateCouponIsOpen}
                            updateCouponOnClose={updateCouponOnClose}
                            updateCouponOnOpen={updateCouponOnOpen}
                            data={{
                              id: updateCouponData?.id!,
                              couponCode: updateCouponData?.couponCode!,
                              discount: updateCouponData?.discount!,
                            }}
                          />
                        </Box>
                        <Box onClick={() => setDeleteCouponID(coupon?.id!)}>
                          <DeleteCoupon
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
    </Layout>
  );
};

export default Coupon;
