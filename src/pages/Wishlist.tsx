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
} from "@chakra-ui/react";
import Layout from "./Layout/Layout";
import wishlistImg from "../assets/wishlist.jpg";
import { AiOutlineDelete, AiOutlineShoppingCart } from "react-icons/ai";
import productImage from "../assets/CategoryImages/t-shirt.png";

const Wishlist = () => {
  const wishListItem = [{}];
  return (
    <Layout>
      <HStack gap={10} m={10} overflow={"hidden"} h="73vh">
        <Image src={wishlistImg} alt={"wishlist image"} h={"450px"} />
        {/* right side for wishlist */}
        <VStack
          w={"full"}
          alignSelf={"flex-start"}
          py={5}
          overflowY={"scroll"}
          h="full"
        >
          <Heading fontSize={"2xl"} fontWeight={"bold"}>
            Your Wishlist
          </Heading>

          {/* displaying all the wishlist with their items */}
          <Accordion allowToggle w={"full"}>
            <AccordionItem>
              <h2>
                <AccordionButton fontWeight={"bold"}>
                  <Box as="span" flex="1" textAlign="left">
                    First Wishlist
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <HStack>
                  <Image h={28} src={productImage} alt="Product Image" />
                  {/* for product details */}
                  <HStack gap={2}>
                    <VStack alignSelf={"flex-start"}>
                      <Heading
                        fontSize={"md"}
                        fontWeight={"bold"}
                        alignSelf={"flex-start"}
                      >
                        Product Title
                      </Heading>
                      <Text fontWeight={"medium"} noOfLines={3}>
                        Product Description Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Magnam facilis maiores
                        laudantium, velit asperiores, consectetur aut deserunt
                        vero ducimus sequi quidem odio est voluptatum! Voluptate
                        ex recusandae totam eaque laudantium.
                      </Text>
                      <Text alignSelf={"flex-start"} fontWeight={"medium"}>
                        Price : 100 &#x20b9; only
                      </Text>
                    </VStack>

                    {/*for product details  */}
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
              <AccordionPanel pb={4}>
                <HStack>
                  <Image h={28} src={productImage} alt="Product Image" />
                  {/* for product details */}
                  <HStack gap={2}>
                    <VStack alignSelf={"flex-start"}>
                      <Heading
                        fontSize={"md"}
                        fontWeight={"bold"}
                        alignSelf={"flex-start"}
                      >
                        Product Title
                      </Heading>
                      <Text fontWeight={"medium"} noOfLines={3}>
                        Product Description Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Magnam facilis maiores
                        laudantium, velit asperiores, consectetur aut deserunt
                        vero ducimus sequi quidem odio est voluptatum! Voluptate
                        ex recusandae totam eaque laudantium.
                      </Text>
                      <Text alignSelf={"flex-start"} fontWeight={"medium"}>
                        Price : 100 &#x20b9; only
                      </Text>
                    </VStack>

                    {/*for product details  */}
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
              <AccordionPanel pb={4}>
                <HStack>
                  <Image h={28} src={productImage} alt="Product Image" />
                  {/* for product details */}
                  <HStack gap={2}>
                    <VStack alignSelf={"flex-start"}>
                      <Heading
                        fontSize={"md"}
                        fontWeight={"bold"}
                        alignSelf={"flex-start"}
                      >
                        Product Title
                      </Heading>
                      <Text fontWeight={"medium"} noOfLines={3}>
                        Product Description Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Magnam facilis maiores
                        laudantium, velit asperiores, consectetur aut deserunt
                        vero ducimus sequi quidem odio est voluptatum! Voluptate
                        ex recusandae totam eaque laudantium.
                      </Text>
                      <Text alignSelf={"flex-start"} fontWeight={"medium"}>
                        Price : 100 &#x20b9; only
                      </Text>
                    </VStack>

                    {/*for product details  */}
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
            </AccordionItem>

            {/* second item */}
            <AccordionItem>
              <h2>
                <AccordionButton fontWeight={"bold"}>
                  <Box as="span" flex="1" textAlign="left">
                    Second Wishlist
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <HStack>
                  <Image h={28} src={productImage} alt="Product Image" />
                  {/* for product details */}
                  <HStack gap={2}>
                    <VStack alignSelf={"flex-start"}>
                      <Heading
                        fontSize={"md"}
                        fontWeight={"bold"}
                        alignSelf={"flex-start"}
                      >
                        Product Title
                      </Heading>
                      <Text fontWeight={"medium"} noOfLines={3}>
                        Product Description Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Magnam facilis maiores
                        laudantium, velit asperiores, consectetur aut deserunt
                        vero ducimus sequi quidem odio est voluptatum! Voluptate
                        ex recusandae totam eaque laudantium.
                      </Text>
                      <Text alignSelf={"flex-start"} fontWeight={"medium"}>
                        Price : 100 &#x20b9; only
                      </Text>
                    </VStack>

                    {/*for product details  */}
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
              <AccordionPanel pb={4}>
                <HStack>
                  <Image h={28} src={productImage} alt="Product Image" />
                  {/* for product details */}
                  <HStack gap={2}>
                    <VStack alignSelf={"flex-start"}>
                      <Heading
                        fontSize={"md"}
                        fontWeight={"bold"}
                        alignSelf={"flex-start"}
                      >
                        Product Title
                      </Heading>
                      <Text fontWeight={"medium"} noOfLines={3}>
                        Product Description Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Magnam facilis maiores
                        laudantium, velit asperiores, consectetur aut deserunt
                        vero ducimus sequi quidem odio est voluptatum! Voluptate
                        ex recusandae totam eaque laudantium.
                      </Text>
                      <Text alignSelf={"flex-start"} fontWeight={"medium"}>
                        Price : 100 &#x20b9; only
                      </Text>
                    </VStack>

                    {/*for product details  */}
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
              <AccordionPanel pb={4}>
                <HStack>
                  <Image h={28} src={productImage} alt="Product Image" />
                  {/* for product details */}
                  <HStack gap={2}>
                    <VStack alignSelf={"flex-start"}>
                      <Heading
                        fontSize={"md"}
                        fontWeight={"bold"}
                        alignSelf={"flex-start"}
                      >
                        Product Title
                      </Heading>
                      <Text fontWeight={"medium"} noOfLines={3}>
                        Product Description Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Magnam facilis maiores
                        laudantium, velit asperiores, consectetur aut deserunt
                        vero ducimus sequi quidem odio est voluptatum! Voluptate
                        ex recusandae totam eaque laudantium.
                      </Text>
                      <Text alignSelf={"flex-start"} fontWeight={"medium"}>
                        Price : 100 &#x20b9; only
                      </Text>
                    </VStack>

                    {/*for product details  */}
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
            </AccordionItem>
          </Accordion>
        </VStack>
      </HStack>
    </Layout>
  );
};

export default Wishlist;
