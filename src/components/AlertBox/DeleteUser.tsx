import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";

interface Iprops {
  deleteUserIsOpen: boolean;
  deleteUserOnOpen: () => void;
  deleteUserOnClose: () => void;
}

const DeleteUser: React.FC<Iprops> = ({
  deleteUserIsOpen,
  deleteUserOnOpen,
  deleteUserOnClose,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Button
        onClick={deleteUserOnOpen}
        w={"full"}
        colorScheme="red"
        color={"white"}
        size={"md"}
        fontSize={"15px"}
      >
        Delete Account
      </Button>

      <AlertDialog
        isOpen={deleteUserIsOpen}
        leastDestructiveRef={cancelRef}
        onClose={deleteUserOnClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent p={0}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Account
            </AlertDialogHeader>

            <AlertDialogBody fontWeight={"semibold"}>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={deleteUserOnClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={deleteUserOnClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteUser;
