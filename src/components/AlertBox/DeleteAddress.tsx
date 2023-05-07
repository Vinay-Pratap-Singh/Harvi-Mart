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
  deleteAddressIsOpen: boolean;
  deleteAddressOnOpen: () => void;
  deleteAddressOnClose: () => void;
}

const DeleteAddress: React.FC<Iprops> = ({
  deleteAddressIsOpen,
  deleteAddressOnOpen,
  deleteAddressOnClose,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Button
        onClick={deleteAddressOnOpen}
        w={"full"}
        colorScheme="red"
        color={"white"}
      >
        Delete Address
      </Button>

      <AlertDialog
        isOpen={deleteAddressIsOpen}
        leastDestructiveRef={cancelRef}
        onClose={deleteAddressOnClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent p={0}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Address
            </AlertDialogHeader>

            <AlertDialogBody fontWeight={"semibold"}>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={deleteAddressOnClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={deleteAddressOnClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteAddress;
