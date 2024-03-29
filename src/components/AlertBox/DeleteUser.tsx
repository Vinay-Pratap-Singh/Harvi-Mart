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
import { AiOutlineDelete } from "react-icons/ai";
import { deleteUserAccount } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../helper/Hooks/redux";

interface Iprops {
  deleteUserIsOpen: boolean;
  deleteUserOnOpen: () => void;
  deleteUserOnClose: () => void;
  id: string;
  role: string;
}

const DeleteUser: React.FC<Iprops> = ({
  deleteUserIsOpen,
  deleteUserOnOpen,
  deleteUserOnClose,
  id,
  role,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
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
      <Tooltip
        hasArrow
        label="Delete Account"
        color={"orange.500"}
        bgColor={"white"}
      >
        <Button
          onClick={deleteUserOnOpen}
          w={role === "user" ? "full" : "fit-content"}
          colorScheme="red"
          color={"white"}
          size={"md"}
          fontSize={"15px"}
        >
          {role === "user" ? (
            "Delete Account"
          ) : (
            <AiOutlineDelete fontSize={"20px"} />
          )}
        </Button>
      </Tooltip>

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
