import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import { useRef } from "react";
import { GrTrash } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { deleteCategory, getAllCategories } from "../../redux/categorySlice";

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
  const dispatch = useDispatch<AppDispatch>();

  // function to handle delete button action
  const handleDeleteBtn = async () => {
    const res = await dispatch(deleteCategory(id));
    if (res.payload?.success) {
      await dispatch(getAllCategories());
      deleteCategoryOnClose();
    }
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
          <GrTrash />{" "}
        </Button>
      </Tooltip>

      <AlertDialog
        isOpen={deleteCategoryIsOpen}
        leastDestructiveRef={cancelRef}
        onClose={deleteCategoryOnClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent p={0}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Category
            </AlertDialogHeader>

            <AlertDialogBody fontWeight={"semibold"}>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={deleteCategoryOnClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteBtn} ml={3}>
                Delete Category
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteCategory;
