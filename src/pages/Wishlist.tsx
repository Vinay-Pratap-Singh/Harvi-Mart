import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Text,
  Tooltip,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import Layout from "./Layout/Layout";
import wishlistImg from "../assets/wishlist.jpg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import AddWishlist from "../components/Modals/AddWishlist";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { getAllWishlists, removeFromWishlist } from "../redux/wishlistSlice";
import DeleteWishlist from "../components/AlertBox/DeleteWishlist";
import RemoveFromWishlist from "../components/AlertBox/RemoveFromWishlist";
import { addProductToCart } from "../redux/cartSlice";
import { toast } from "react-hot-toast";

const Wishlist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { wishlists } = useSelector((state: RootState) => state.wishlist);
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const [deleteWishlistID, setDeleteWishlistID] = useState("");
  const [idToDelete, setIdToDelete] = useState({
    wishlistID: "",
    productID: "",
  });

  const {
    isOpen: addWishlistIsOpen,
    onOpen: addWishlistOnOpen,
    onClose: addWishlistOnClose,
  } = useDisclosure();
  const {
    isOpen: deleteWishlistIsOpen,
    onOpen: deleteWishlistOnOpen,
    onClose: deleteWishlistOnClose,
  } = useDisclosure();
  const {
    isOpen: removeFromWishlistIsOpen,
    onOpen: removeFromWishlistOnOpen,
    onClose: removeFromWishlistOnClose,
  } = useDisclosure();
  // function to move item to the cart
  const moveToCart = async (wishlistID: string, product: any) => {
    // checking for the item already in cart or not
    if (cartItems.length !== 0) {
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i]?._id === product?._id) {
          toast.error("Product is already in the cart");
          return;
        }
      }
    }
    dispatch(addProductToCart(product));
    // removing the item from wishlist
    const id = { wishlistID, productID: product?._id };
    await dispatch(removeFromWishlist(id));
  };

  // loading the wishlist data
  useEffect(() => {
    (async () => {
      await dispatch(getAllWishlists());
    })();
  }, []);

  return (
    <Layout>
      <HStack gap={10} p={5} overflow={"hidden"} h="70vh">
        <Image src={wishlistImg} alt={"wishlist image"} h={"450px"} />
        {/* right side for wishlist */}
        <VStack
          w={"full"}
          alignSelf={"flex-start"}
          py={5}
          overflowY={"scroll"}
          h="full"
        >
          <HStack w={"full"} justifyContent={"space-between"} pr={5}>
            <Heading fontSize={"2xl"} fontWeight={"bold"}>
              Your Wishlist
            </Heading>
            <Box w={"fit-content"}>
              <AddWishlist
                addWishlistIsOpen={addWishlistIsOpen}
                addWishlistOnClose={addWishlistOnClose}
                addWishlistOnOpen={addWishlistOnOpen}
              />
            </Box>
          </HStack>

          {/* displaying all the wishlist with their items */}
          <Accordion allowToggle w={"full"}>
            {wishlists.length === 0 ? (
              <Text>Oops! No wishlist found</Text>
            ) : (
              wishlists.map((wishlist: any) => {
                return (
                  <AccordionItem key={wishlist?._id}>
                    <h2>
                      <AccordionButton fontWeight={"semibold"}>
                        <Box as="span" flex="1" textAlign="left">
                          {wishlist?.name}
                        </Box>
                        <Box onClick={() => setDeleteWishlistID(wishlist?._id)}>
                          <DeleteWishlist
                            deleteWishlistIsOpen={deleteWishlistIsOpen}
                            deleteWishlistOnClose={deleteWishlistOnClose}
                            deleteWishlistOnOpen={deleteWishlistOnOpen}
                            id={deleteWishlistID}
                          />
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    {wishlist?.products.length === 0 ? (
                      <AccordionPanel pb={4}>
                        Oops! No products are there
                      </AccordionPanel>
                    ) : (
                      wishlist?.products.map((product: any) => {
                        return (
                          <AccordionPanel key={product?._id} pb={4}>
                            <HStack>
                              <Image
                                h={28}
                                src={product?.images[0]?.image?.secure_url}
                                alt="Product Image"
                              />
                              {/* for product details */}
                              <HStack
                                w={"full"}
                                gap={2}
                                justifyContent={"space-between"}
                              >
                                <VStack alignSelf={"flex-start"}>
                                  <Heading
                                    fontSize={"md"}
                                    fontWeight={"bold"}
                                    alignSelf={"flex-start"}
                                  >
                                    {product?.title}
                                  </Heading>
                                  <Text
                                    fontWeight={"medium"}
                                    noOfLines={3}
                                    alignSelf={"flex-start"}
                                  >
                                    {product?.description}
                                  </Text>

                                  {product?.discountedPrice ? (
                                    <HStack alignSelf={"flex-start"}>
                                      <Text fontWeight={"semibold"}>
                                        &#x20b9;{product?.discountedPrice}
                                      </Text>
                                      <Text
                                        fontSize={"xs"}
                                        fontWeight={"semibold"}
                                      >
                                        <s>&#x20b9;{product?.originalPrice}</s>
                                      </Text>
                                    </HStack>
                                  ) : (
                                    <Text
                                      fontSize={"sm"}
                                      fontWeight={"semibold"}
                                      alignSelf={"flex-start"}
                                    >
                                      &#x20b9;{product?.originalPrice}
                                    </Text>
                                  )}
                                </VStack>

                                {/*for product buttons  */}
                                <VStack alignItems={"flex-start"}>
                                  <Tooltip
                                    hasArrow
                                    label="Add to Shopping Cart"
                                    placement="top"
                                    bg="primaryColor"
                                  >
                                    <Button
                                      _hover={{ color: "primaryColor" }}
                                      onClick={() =>
                                        moveToCart(wishlist?._id, product)
                                      }
                                    >
                                      <AiOutlineShoppingCart size={22} />
                                    </Button>
                                  </Tooltip>

                                  <Box
                                    onClick={() =>
                                      setIdToDelete({
                                        wishlistID: wishlist?._id,
                                        productID: product?._id,
                                      })
                                    }
                                  >
                                    <RemoveFromWishlist
                                      removeFromWishlistIsOpen={
                                        removeFromWishlistIsOpen
                                      }
                                      removeFromWishlistOnClose={
                                        removeFromWishlistOnClose
                                      }
                                      removeFromWishlistOnOpen={
                                        removeFromWishlistOnOpen
                                      }
                                      id={idToDelete}
                                    />
                                  </Box>
                                </VStack>
                              </HStack>
                            </HStack>
                          </AccordionPanel>
                        );
                      })
                    )}
                  </AccordionItem>
                );
              })
            )}
          </Accordion>
        </VStack>
      </HStack>
    </Layout>
  );
};

export default Wishlist;
