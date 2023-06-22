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
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { deleteUserAccount } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

interface Iprops {
  deleteUserIsOpen: boolean;
  deleteUserOnOpen: () => void;
  deleteUserOnClose: () => void;
  id: string;
}

const DeleteUser: React.FC<Iprops> = ({
  deleteUserIsOpen,
  deleteUserOnOpen,
  deleteUserOnClose,
  id,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // function to handle delete button action
  const handleDeleteBtn = async () => {
    setLoading(true);
    const res = await dispatch(deleteUserAccount(id));
    if (res.payload?.success) {
      setLoading(false);
      deleteUserOnClose();
      localStorage.clear();
      navigate("/login");
      return;
    }
    setLoading(false);
  };

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
              <Button
                colorScheme="red"
                onClick={handleDeleteBtn}
                w={"full"}
                isLoading={loading}
                loadingText="Deleting..."
              >
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
