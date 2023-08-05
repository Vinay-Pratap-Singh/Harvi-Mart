import {
  Box,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addProductToWishlist } from "../../redux/wishlistSlice";
import { AiFillHeart, AiOutlineCheck } from "react-icons/ai";
import AddWishlist from "./AddWishlist";
import { Iwishlist } from "../../helper/interfaces";

interface Iprops {
  displayWishlistIsOpen: boolean;
  displayWishlistOnOpen: () => void;
  displayWishlistOnClose: () => void;
  productID: string;
}

const DisplayWishlists: React.FC<Iprops> = ({
  displayWishlistIsOpen,
  displayWishlistOnClose,
  displayWishlistOnOpen,
  productID,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { wishlists } = useSelector((state: RootState) => state.wishlist);
  const {
    isOpen: addWishlistIsOpen,
    onOpen: addWishlistOnOpen,
    onClose: addWishlistOnClose,
  } = useDisclosure();

  // function to handle click
  const handleClick = async (wishlistID: string) => {
    const id = { wishlistID, productID };
    displayWishlistOnClose();
    await dispatch(addProductToWishlist(id));
  };

  return (
    <>
      <Box onClick={displayWishlistOnOpen} w={"fit-content"} fontSize={"xl"}>
        <Tooltip
          hasArrow
          label="Create wishlist"
          color={"orange.500"}
          bgColor={"white"}
        >
          <AiFillHeart fontSize={"25px"} />
        </Tooltip>
      </Box>

      <Modal
        size={"sm"}
        isOpen={displayWishlistIsOpen}
        onClose={displayWishlistOnClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontWeight={"bold"}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Text>Choose wishlist</Text>
            <AddWishlist
              addWishlistIsOpen={addWishlistIsOpen}
              addWishlistOnClose={addWishlistOnClose}
              addWishlistOnOpen={addWishlistOnOpen}
            />
          </ModalHeader>

          <ModalBody>
            {/* for displaying all wishlists name */}
            {wishlists.length === 0 ? (
              <Text>Oops! No wishlist found</Text>
            ) : (
              wishlists.map((wishlist: Iwishlist) => {
                return (
                  <HStack
                    key={wishlist._id}
                    justifyContent={"space-between"}
                    mb={1}
                    p={2}
                    boxShadow={"sm"}
                    _hover={{ backgroundColor: "#f4f4f4" }}
                    cursor={"pointer"}
                    onClick={() => handleClick(wishlist?._id)}
                  >
                    <Heading
                      key={wishlist?._id}
                      fontSize={16}
                      fontWeight={"semibold"}
                    >
                      {wishlist?.name}
                    </Heading>
                    <Box>
                      <AiOutlineCheck />
                    </Box>
                  </HStack>
                );
              })
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DisplayWishlists;
