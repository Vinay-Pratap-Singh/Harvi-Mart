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
import { deleteCategory } from "../../redux/categorySlice";
import { AiOutlineDelete } from "react-icons/ai";
import { useAppDispatch } from "../../helper/Hooks/redux";

interface Iprops {
  deleteCategoryIsOpen: boolean;
  deleteCategoryOnOpen: () => void;
  deleteCategoryOnClose: () => void;
  id: string;
}

const DeleteCategory: React.FC<Iprops> = ({
  deleteCategoryIsOpen,
  deleteCategoryOnOpen,
  deleteCategoryOnClose,
  id,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  // function to handle delete button action
  const handleDeleteBtn = async () => {
    setLoading(true);
    const res = await dispatch(deleteCategory(id));
    if (res?.payload?.success) {
      setLoading(false);
      deleteCategoryOnClose();
      return;
    }
    setLoading(false);
  };

  return (
    <>
      <Tooltip
        hasArrow
        label="Delete Category"
        color={"orange.500"}
        bgColor={"white"}
      >
        <Button
          onClick={deleteCategoryOnOpen}
          p={1}
          size={"sm"}
          colorScheme="red"
        >
          <AiOutlineDelete fontSize={"20px"} />
        </Button>
      </Tooltip>

      <AlertDialog
        isOpen={deleteCategoryIsOpen}
        leastDestructiveRef={cancelRef}
        onClose={deleteCategoryOnClose}
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
              <Heading fontSize={"xl"}>Delete Category?</Heading>
              <Text fontSize={"sm"}>
                Are you sure you want to delete{" "}
                <Text as={"span"} fontWeight={"bold"}>
                  your category?
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
                onClick={deleteCategoryOnClose}
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

export default DeleteCategory;
