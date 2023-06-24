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
import { AiOutlineDelete, AiOutlineShoppingCart } from "react-icons/ai";
import productImage from "../assets/CategoryImages/t-shirt.png";
import AddWishlist from "../components/Modals/AddWishlist";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { getAllWishlists } from "../redux/wishlistSlice";

const Wishlist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { wishlists } = useSelector((state: RootState) => state.wishlist);
  console.log(wishlists);

  const {
    isOpen: addWishlistIsOpen,
    onOpen: addWishlistOnOpen,
    onClose: addWishlistOnClose,
  } = useDisclosure();

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
                                    <Button _hover={{ color: "primaryColor" }}>
                                      <AiOutlineShoppingCart size={22} />
                                    </Button>
                                  </Tooltip>

                                  <Tooltip
                                    hasArrow
                                    label="Remove from Wishlist"
                                    placement="top"
                                    bg="primaryColor"
                                  >
                                    <Button _hover={{ color: "primaryColor" }}>
                                      <AiOutlineDelete size={22} />
                                    </Button>
                                  </Tooltip>
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
