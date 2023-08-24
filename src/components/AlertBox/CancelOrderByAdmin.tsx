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
import { useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { cancelOrderByAdmin } from "../../redux/orderSlice";
import { useAppDispatch } from "../../helper/Hooks/redux";

interface Iprops {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  orderID: string;
}

const CancelOrderByAdmin: React.FC<Iprops> = ({
  isOpen,
  onOpen,
  onClose,
  orderID,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  // function to handle cancel button action
  const handleCancelBtn = async () => {
    setLoading(true);
    const res = await dispatch(cancelOrderByAdmin(orderID));
    if (res.payload?.success) {
      setLoading(false);
      onClose();
      return;
    }
    setLoading(false);
  };

  return (
    <>
      <Tooltip
        hasArrow
        label="Cancel Order"
        color={"orange.500"}
        bgColor={"white"}
      >
        <Button onClick={onOpen} colorScheme="red">
          <AiOutlineDelete fontSize={"20px"} />
        </Button>
      </Tooltip>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
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
              <Heading fontSize={"xl"}>Cancel Order?</Heading>
              <Text fontSize={"sm"}>
                Are you sure you want to cancel{" "}
                <Text as={"span"} fontWeight={"bold"}>
                  the order?
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
                onClick={handleCancelBtn}
                w={"full"}
                isLoading={loading}
                loadingText="Canceling..."
              >
                Cancel Order
              </Button>
              <Button ref={cancelRef} onClick={onClose} w={"full"}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default CancelOrderByAdmin;
