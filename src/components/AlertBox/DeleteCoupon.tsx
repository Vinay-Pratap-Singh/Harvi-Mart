import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { deleteCoupon, getAllCoupons } from "../../redux/couponSlice";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Heading,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";

interface Iprops {
  deleteCouponIsOpen: boolean;
  deleteCouponOnOpen: () => void;
  deleteCouponOnClose: () => void;
  id: string;
}
const DeleteCoupon: React.FC<Iprops> = ({
  deleteCouponIsOpen,
  deleteCouponOnOpen,
  deleteCouponOnClose,
  id,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  // function to handle delete button action
  const handleDeleteBtn = async () => {
    setLoading(true);
    const res = await dispatch(deleteCoupon(id));
    if (res.payload?.success) {
      await dispatch(getAllCoupons());
      setLoading(false);
      deleteCouponOnClose();
      return;
    }
    setLoading(false);
  };
  return (
    <>
      <Tooltip
        hasArrow
        label="Delete Coupon"
        color={"orange.500"}
        bgColor={"white"}
      >
        <Button
          onClick={deleteCouponOnOpen}
          p={1}
          size={"sm"}
          colorScheme="red"
        >
          <AiOutlineDelete fontSize={"20px"} />
        </Button>
      </Tooltip>

      <AlertDialog
        isOpen={deleteCouponIsOpen}
        leastDestructiveRef={cancelRef}
        onClose={deleteCouponOnClose}
        size={"xs"}
      >
        <AlertDialogOverlay>
          <AlertDialogContent p={0}>
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              bgColor={"red.100"}
              margin={5}
              mb={0}
              borderRadius={"lg"}
            >
              <Box
                padding={5}
                bgColor={"red.400"}
                color={"white"}
                borderRadius={"full"}
              >
                <AiOutlineDelete size={"60px"} />
              </Box>
            </AlertDialogHeader>

            <AlertDialogBody fontWeight={"semibold"}>
              <Heading fontSize={"xl"}>Delete Coupon?</Heading>
              <Text fontSize={"sm"}>
                Are you sure you want to delete{" "}
                <Text as={"span"} fontWeight={"bold"}>
                  your coupon?
                </Text>
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter
              display={"flex"}
              flexDirection={"column"}
              gap={2}
            >
              <Button
                colorScheme="red"
                onClick={handleDeleteBtn}
                w={"full"}
                isLoading={loading}
                loadingText="Deleting..."
              >
                Delete
              </Button>
              <Button ref={cancelRef} onClick={deleteCouponOnClose} w={"full"}>
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteCoupon;
