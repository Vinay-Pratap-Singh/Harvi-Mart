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

interface Iprops {
  deleteCategoryIsOpen: boolean;
  deleteCategoryOnOpen: () => void;
  deleteCategoryOnClose: () => void;
}

const DeleteCategory: React.FC<Iprops> = ({
  deleteCategoryIsOpen,
  deleteCategoryOnOpen,
  deleteCategoryOnClose,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
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
              <Button colorScheme="red" onClick={deleteCategoryOnClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteCategory;
