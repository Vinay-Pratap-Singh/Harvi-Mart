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
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { AiOutlineDelete } from "react-icons/ai";
import {
  calculateAmount,
  createUpdatedCart,
  removeProductFromCart,
} from "../../redux/cartSlice";

interface Iprops {
  removeFromCartIsOpen: boolean;
  removeFromCartOnOpen: () => void;
  removeFromCartOnClose: () => void;
  id: string;
}

const RemoveFromCart: React.FC<Iprops> = ({
  removeFromCartIsOpen,
  removeFromCartOnOpen,
  removeFromCartOnClose,
  id,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  // function to handle delete button action
  const handleDeleteBtn = () => {
    setLoading(true);
    dispatch(removeProductFromCart(id));
    setLoading(false);
    dispatch(createUpdatedCart());
    dispatch(calculateAmount());
    removeFromCartOnClose();
  };

  return (
    <>
      <Tooltip
        hasArrow
        label="Remove product"
        color={"orange.500"}
        bgColor={"white"}
      >
        <Button
          onClick={removeFromCartOnOpen}
          colorScheme="red"
          alignSelf={"flex-end"}
          px={0}
        >
          <AiOutlineDelete fontSize={"20px"} />
        </Button>
      </Tooltip>

      <AlertDialog
        isOpen={removeFromCartIsOpen}
        leastDestructiveRef={cancelRef}
        onClose={removeFromCartOnClose}
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
              <Heading fontSize={"xl"}>Remove product?</Heading>
              <Text fontSize={"sm"}>
                Are you sure you want to remove{" "}
                <Text as={"span"} fontWeight={"bold"}>
                  from your cart?
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
                loadingText="Removing..."
              >
                Delete
              </Button>
              <Button
                ref={cancelRef}
                onClick={removeFromCartOnClose}
                w={"full"}
              >
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default RemoveFromCart;
