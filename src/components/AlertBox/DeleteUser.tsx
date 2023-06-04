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
import { useRef } from "react";
import { AiOutlineDelete } from "react-icons/ai";

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
              <Heading fontSize={"xl"}>Delete Account?</Heading>
              <Text fontSize={"sm"}>
                Are you sure you want to delete{" "}
                <Text as={"span"} fontWeight={"bold"}>
                  your account?
                </Text>
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter
              display={"flex"}
              flexDirection={"column"}
              gap={2}
            >
              <Button colorScheme="red" onClick={deleteUserOnClose} w={"full"}>
                Delete
              </Button>
              <Button ref={cancelRef} onClick={deleteUserOnClose} w={"full"}>
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteUser;
