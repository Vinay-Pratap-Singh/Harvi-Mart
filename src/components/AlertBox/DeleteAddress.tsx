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
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { deleteAddress } from "../../redux/addressSlice";
import { useAppDispatch } from "../../helper/Hooks/redux";

interface Iprops {
  deleteAddressIsOpen: boolean;
  deleteAddressOnOpen: () => void;
  deleteAddressOnClose: () => void;
  id: string;
}

const DeleteAddress: React.FC<Iprops> = ({
  deleteAddressIsOpen,
  deleteAddressOnOpen,
  deleteAddressOnClose,
  id,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  // function to handle delete button action
  const handleDeleteBtn = async () => {
    setLoading(true);
    const res = await dispatch(deleteAddress(id));
    if (res.payload?.success) {
      setLoading(false);
      deleteAddressOnClose();
      return;
    }
    setLoading(false);
  };

  return (
    <>
      <Button
        onClick={deleteAddressOnOpen}
        w={"full"}
        colorScheme="red"
        color={"white"}
        fontSize={"15px"}
      >
        Delete
      </Button>

      <AlertDialog
        isOpen={deleteAddressIsOpen}
        leastDestructiveRef={cancelRef}
        onClose={deleteAddressOnClose}
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
              <Heading fontSize={"xl"}>Delete Address?</Heading>
              <Text fontSize={"sm"}>
                Are you sure you want to delete{" "}
                <Text as={"span"} fontWeight={"bold"}>
                  your address?
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
              <Button ref={cancelRef} onClick={deleteAddressOnClose} w={"full"}>
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteAddress;
