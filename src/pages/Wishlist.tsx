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
  Stack,
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
import { useState } from "react";
import { removeFromWishlist } from "../redux/wishlistSlice";
import DeleteWishlist from "../components/AlertBox/DeleteWishlist";
import RemoveFromWishlist from "../components/AlertBox/RemoveFromWishlist";
import { addProductToCart } from "../redux/cartSlice";
import { toast } from "react-hot-toast";
import { Iproduct, Iwishlist } from "../helper/interfaces";
import { Helmet } from "react-helmet";
import { nanoid } from "@reduxjs/toolkit";

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
  const moveToCart = async (wishlistID: string, product: Iproduct) => {
    // checking for the item already in cart or not
    if (cartItems.length !== 0) {
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i]?._id === product?._id) {
          toast.error("Product is already in the cart");
          return;
        }
      }
    }
    if (!product.inStock) {
      toast.error("Sorry! Product is out of stock");
      return;
    }
    dispatch(addProductToCart(product));
    // removing the item from wishlist
    const id = { wishlistID, productID: product?._id };
    await dispatch(removeFromWishlist(id));
  };

  return (
    <Layout>
      {/* adding the dynamic meta data */}
      <Helmet>
        <title>Wishlist</title>
        <meta
          name="description"
          content="Discover the wishlist feature at Harvi Mart - Your ultimate shopping destination. Save your favorite products and plan your perfect shopping spree with ease. Move items to your cart or remove them from the wishlist anytime. Shop smart and enjoy a personalized shopping experience at Harvi Mart."
        />
      </Helmet>

      <Stack
        gap={[5, 5, 5, 10]}
        flexDirection={["column", "column", "column", "row"]}
        p={5}
        h={["auto", "auto", "auto", "70vh"]}
        overflow={"hidden"}
      >
        <Image src={wishlistImg} alt={"wishlist image"} h={"auto"} />
        {/* right side for wishlist */}
        <VStack w={"full"} alignSelf={"flex-start"} py={5} h="full" ml={0}>
          <HStack w={"full"} justifyContent={"space-between"} pr={5}>
            <Heading fontSize={"2xl"} fontWeight={"bold"}>
              Your Wishlist
            </Heading>
            <Box w={"fit-content"}>
              <AddWishlist
                key={nanoid()}
                addWishlistIsOpen={addWishlistIsOpen}
                addWishlistOnClose={addWishlistOnClose}
                addWishlistOnOpen={addWishlistOnOpen}
              />
            </Box>
          </HStack>

          {/* displaying all the wishlist with their items */}
          <Accordion allowToggle w={"full"}>
            {wishlists.length === 0 ? (
              <Text fontSize={["sm", "sm", "md"]}>Oops! No wishlist found</Text>
            ) : (
              wishlists.map((wishlist: Iwishlist) => {
                return (
                  <AccordionItem key={wishlist?._id}>
                    <h2>
                      <AccordionButton fontWeight={"semibold"}>
                        <Box as="span" flex="1" textAlign="left">
                          {wishlist?.name}
                        </Box>
                        <Box onClick={() => setDeleteWishlistID(wishlist?._id)}>
                          <DeleteWishlist
                            key={wishlist?._id}
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
                      <AccordionPanel pb={4} fontSize={["sm", "sm", "md"]}>
                        Oops! No products are there
                      </AccordionPanel>
                    ) : (
                      wishlist?.products.map((product: Iproduct) => {
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
                                    fontWeight={"bold"}
                                    alignSelf={"flex-start"}
                                    fontSize={["sm", "sm", "md"]}
                                  >
                                    {product?.title}
                                  </Heading>
                                  <Text
                                    fontSize={["sm", "sm", "md"]}
                                    fontWeight={"medium"}
                                    noOfLines={3}
                                    alignSelf={"flex-start"}
                                  >
                                    {product?.description}
                                  </Text>

                                  {product?.discountedPrice &&
                                  !(
                                    Number(product?.discountedPrice) ===
                                    Number(product?.originalPrice)
                                  ) ? (
                                    <HStack w={"full"} flexWrap={"wrap"}>
                                      <Text
                                        fontWeight={"semibold"}
                                        fontSize={["sm", "sm", "md"]}
                                      >
                                        Rs {product?.discountedPrice}
                                      </Text>
                                      <Text
                                        fontSize={["11px", "11px", "xs"]}
                                        color={"gray.500"}
                                        alignSelf={"flex-end"}
                                        fontWeight={"semibold"}
                                      >
                                        <s>Rs {product?.originalPrice}</s>
                                      </Text>
                                      {Number(
                                        (
                                          ((product?.originalPrice -
                                            product.discountedPrice) /
                                            product?.originalPrice) *
                                          100
                                        ).toFixed(0)
                                      ) && (
                                        <Text
                                          fontWeight={"semibold"}
                                          fontSize={["xs", "xs", "sm"]}
                                          color={"primaryColor"}
                                        >
                                          (
                                          {(
                                            ((product?.originalPrice -
                                              product.discountedPrice) /
                                              product?.originalPrice) *
                                            100
                                          ).toFixed(0)}
                                          % Off)
                                        </Text>
                                      )}
                                    </HStack>
                                  ) : (
                                    <Text
                                      fontWeight={"semibold"}
                                      fontSize={["sm", "sm", "md"]}
                                      w={"full"}
                                      textAlign={"left"}
                                    >
                                      Rs {product?.originalPrice}
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
                                      key={nanoid()}
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
      </Stack>
    </Layout>
  );
};

export default Wishlist;
