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
import {
  deleteReview,
  getIndividualProductReview,
} from "../../redux/reviewSlice";
import { useAppDispatch } from "../../helper/Hooks/redux";

interface Iprops {
  deleteReviewIsOpen: boolean;
  deleteReviewOnOpen: () => void;
  deleteReviewOnClose: () => void;
  reviewID: string;
  productID: string;
}

const DeleteReview: React.FC<Iprops> = ({
  deleteReviewIsOpen,
  deleteReviewOnOpen,
  deleteReviewOnClose,
  reviewID,
  productID,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  // function to handle delete button action
  const handleDeleteBtn = async () => {
    setLoading(true);
    const res = await dispatch(deleteReview(reviewID));
    if (res.payload?.success) {
      await dispatch(getIndividualProductReview(productID));
      setLoading(false);
      deleteReviewOnClose();
      return;
    }
    setLoading(false);
  };

  return (
    <>
      <Tooltip
        hasArrow
        label="Delete Your Review"
        color={"orange.500"}
        bgColor={"white"}
      >
        <Button
          onClick={deleteReviewOnOpen}
          p={1}
          size={"xs"}
          colorScheme="red"
        >
          <AiOutlineDelete fontSize={"20px"} />
        </Button>
      </Tooltip>

      <AlertDialog
        isOpen={deleteReviewIsOpen}
        leastDestructiveRef={cancelRef}
        onClose={deleteReviewOnClose}
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
              <Heading fontSize={"xl"}>Delete Review?</Heading>
              <Text fontSize={"sm"}>
                Are you sure you want to delete{" "}
                <Text as={"span"} fontWeight={"bold"}>
                  this review?
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
              <Button ref={cancelRef} onClick={deleteReviewOnClose} w={"full"}>
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteReview;
