import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
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
import { deleteProduct, getAllProducts } from "../../redux/productSlice";

interface Iprops {
  deleteProductIsOpen: boolean;
  deleteProductOnOpen: () => void;
  deleteProductOnClose: () => void;
  id: string;
}

const DeleteProduct: React.FC<Iprops> = ({
  deleteProductIsOpen,
  deleteProductOnOpen,
  deleteProductOnClose,
  id,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  // function to handle delete button action
  const handleDeleteBtn = async () => {
    setLoading(true);
    const res = await dispatch(deleteProduct(id));
    if (res.payload?.success) {
      await dispatch(getAllProducts());
      setLoading(false);
      deleteProductOnClose();
      return;
    }
    setLoading(false);
  };
  return (
    <>
      <Tooltip
        hasArrow
        label="Delete Product"
        color={"orange.500"}
        bgColor={"white"}
      >
        <Button
          onClick={deleteProductOnOpen}
          p={1}
          size={"md"}
          colorScheme="red"
        >
          <AiOutlineDelete fontSize={"20px"} />
        </Button>
      </Tooltip>

      <AlertDialog
        isOpen={deleteProductIsOpen}
        leastDestructiveRef={cancelRef}
        onClose={deleteProductOnClose}
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
              <Heading fontSize={"xl"}>Delete Product?</Heading>
              <Text fontSize={"sm"}>
                Are you sure you want to delete{" "}
                <Text as={"span"} fontWeight={"bold"}>
                  your product?
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
              <Button ref={cancelRef} onClick={deleteProductOnClose} w={"full"}>
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteProduct;
