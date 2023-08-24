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
import { removeFromWishlist } from "../../redux/wishlistSlice";
import { useAppDispatch } from "../../helper/Hooks/redux";

interface Iprops {
  removeFromWishlistIsOpen: boolean;
  removeFromWishlistOnOpen: () => void;
  removeFromWishlistOnClose: () => void;
  id: { wishlistID: string; productID: string };
}

const RemoveFromWishlist: React.FC<Iprops> = ({
  removeFromWishlistIsOpen,
  removeFromWishlistOnOpen,
  removeFromWishlistOnClose,
  id,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  // function to handle delete button action
  const handleDeleteBtn = async () => {
    setLoading(true);
    const res = await dispatch(removeFromWishlist(id));
    if (res.payload?.success) {
      setLoading(false);
      removeFromWishlistOnClose();
      return;
    }
    setLoading(false);
  };

  return (
    <>
      <Tooltip
        hasArrow
        label="Remove product"
        color={"orange.500"}
        bgColor={"white"}
      >
        <Button onClick={removeFromWishlistOnOpen} colorScheme="red">
          <AiOutlineDelete fontSize={"20px"} />
        </Button>
      </Tooltip>

      <AlertDialog
        isOpen={removeFromWishlistIsOpen}
        leastDestructiveRef={cancelRef}
        onClose={removeFromWishlistOnClose}
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
                  from your wishlist?
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
                onClick={removeFromWishlistOnClose}
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

export default RemoveFromWishlist;
