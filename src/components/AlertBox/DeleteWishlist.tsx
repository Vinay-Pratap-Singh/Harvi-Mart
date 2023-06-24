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
import { deleteWishlist, getAllWishlists } from "../../redux/wishlistSlice";

interface Iprops {
  deleteWishlistIsOpen: boolean;
  deleteWishlistOnOpen: () => void;
  deleteWishlistOnClose: () => void;
  id: string;
}

const DeleteWishlist: React.FC<Iprops> = ({
  deleteWishlistIsOpen,
  deleteWishlistOnOpen,
  deleteWishlistOnClose,
  id,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  // function to handle delete button action
  const handleDeleteBtn = async () => {
    setLoading(true);
    const res = await dispatch(deleteWishlist(id));
    if (res.payload?.success) {
      await dispatch(getAllWishlists());
      setLoading(false);
      deleteWishlistOnClose();
      return;
    }
    setLoading(false);
  };

  return (
    <>
      <Tooltip
        hasArrow
        label="Delete wishlist"
        color={"orange.500"}
        bgColor={"white"}
      >
        <Box onClick={deleteWishlistOnOpen} _hover={{ color: "red" }} pr={3}>
          <AiOutlineDelete fontSize={"20px"} />
        </Box>
      </Tooltip>

      <AlertDialog
        isOpen={deleteWishlistIsOpen}
        leastDestructiveRef={cancelRef}
        onClose={deleteWishlistOnClose}
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
              <Heading fontSize={"xl"}>Delete Wishlist?</Heading>
              <Text fontSize={"sm"}>
                Are you sure you want to delete{" "}
                <Text as={"span"} fontWeight={"bold"}>
                  your wishlist?
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
              <Button
                ref={cancelRef}
                onClick={deleteWishlistOnClose}
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

export default DeleteWishlist;
