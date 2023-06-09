import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  VStack,
} from "@chakra-ui/react";
import Layout from "../../Layout/Layout";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { MdOutlineDescription, MdOutlineModeEdit } from "react-icons/md";
import { BsTrash3 } from "react-icons/bs";
import { Link as RouterLink } from "react-router-dom";
import { useEffect } from "react";
import { getAllProducts } from "../../../redux/productSlice";
import { getAllCategories } from "../../../redux/categorySlice";

const Product = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.category);
  const { products } = useSelector((state: RootState) => state.product);

  // for getting the products data on page load
  useEffect(() => {
    (async () => {
      await dispatch(getAllProducts());
      await dispatch(getAllCategories());
    })();
  }, []);

  return (
    <Layout>
      <VStack minH={"100vh"} w="full" pt={5} pl={60}>
        <Heading fontSize={"3xl"}>
          Welcome to the{" "}
          <Text as={"span"} color={"primaryColor"}>
            Product Page
          </Text>{" "}
        </Heading>

        {/* creating the table for displaying the products details */}
        <VStack w="full" p={5}>
          {/* for search and add product button */}
          <HStack justifyContent={"space-between"} w="full">
            <form>
              <InputGroup w="80">
                <Input
                  type="text"
                  placeholder="Search product"
                  focusBorderColor="primaryColor"
                />
                <InputRightElement>
                  <Button
                    p="0"
                    bg="transparent"
                    _hover={{ bg: "transparent" }}
                    type="submit"
                  >
                    <AiOutlineSearch size={24} color="#e06464" />
                  </Button>
                </InputRightElement>
              </InputGroup>
            </form>

            {/* button to add new product */}
            <Link as={RouterLink} to={"/admin/product/add"}>
              <Button colorScheme="orange">Add Product</Button>
            </Link>
          </HStack>

          {/* for displaying the product table */}
          <TableContainer w="full" overflow="hidden">
            <Table>
              <Thead>
                <Tr>
                  <Th isNumeric textAlign={"center"}>
                    S. No.
                  </Th>
                  <Th textAlign={"center"}>Title</Th>
                  <Th textAlign={"center"}>Description</Th>
                  <Th isNumeric>Price</Th>
                  <Th px={0} textAlign={"center"}>
                    {categories.length === 0 ? (
                      <Select
                        focusBorderColor="primaryColor"
                        fontSize={"14px"}
                        fontWeight={"semibold"}
                        px={0}
                      >
                        <option value={"null"}>
                          {"No Category".toUpperCase()}
                        </option>
                      </Select>
                    ) : (
                      <Select
                        focusBorderColor="primaryColor"
                        fontSize={"14px"}
                        fontWeight={"semibold"}
                        px={0}
                      >
                        <option value="all">All</option>
                        {categories.map((category: any) => {
                          return (
                            <option key={category?._id} value={category?.name}>
                              {category?.name}
                            </option>
                          );
                        })}
                      </Select>
                    )}
                  </Th>
                  <Th isNumeric textAlign={"center"}>
                    Quantity
                  </Th>
                  <Th textAlign={"center"}>Actions</Th>
                </Tr>
              </Thead>

              {/* adding the table body */}
              <Tbody fontSize={"14.5px"}>
                {products.length === 0 ? (
                  <Tr>
                    <Td colSpan={7}>Oops! There is no products</Td>
                  </Tr>
                ) : (
                  products.map((product: any, index) => {
                    return (
                      <Tr key={product?._id}>
                        <Td
                          p="1"
                          textAlign={"center"}
                          verticalAlign={"text-top"}
                        >
                          {index < 10 ? `0${index + 1}` : index + 1}
                        </Td>
                        <Td p="1" verticalAlign={"text-top"}>
                          <Box w="32" whiteSpace={"normal"}>
                            {product?.title}
                          </Box>
                        </Td>
                        <Td p="1" verticalAlign={"text-top"}>
                          <Box w="60" whiteSpace={"normal"}>
                            {product?.description}
                          </Box>
                        </Td>
                        <Td
                          p="1"
                          textAlign={"center"}
                          verticalAlign={"text-top"}
                        >
                          {product?.originalPrice} Rs
                        </Td>
                        <Td p="1" verticalAlign={"text-top"}>
                          {product.category
                            ? product?.category?.name
                            : "Not Available"}
                        </Td>
                        <Td
                          p="1"
                          textAlign={"center"}
                          verticalAlign={"text-top"}
                        >
                          {product.quantity
                            ? product?.quantity
                            : "Not Available"}
                        </Td>
                        <Td p="1" verticalAlign={"text-top"}>
                          <ButtonGroup>
                            <Tooltip
                              hasArrow
                              label="More Product Detail"
                              color={"orange.500"}
                              bgColor={"white"}
                              placement={"top"}
                            >
                              <Button
                                p="0"
                                _hover={{ color: "#e06464" }}
                                fontSize={"xl"}
                              >
                                <MdOutlineDescription />
                              </Button>
                            </Tooltip>
                            <Tooltip
                              hasArrow
                              label="Edit Product"
                              color={"orange.500"}
                              bgColor={"white"}
                              placement={"top"}
                            >
                              <Button
                                p="0"
                                _hover={{ color: "#e06464" }}
                                fontSize={"xl"}
                              >
                                <MdOutlineModeEdit />
                              </Button>
                            </Tooltip>
                            <Tooltip
                              hasArrow
                              label="Delete Product"
                              color={"orange.500"}
                              bgColor={"white"}
                              placement={"top"}
                            >
                              <Button
                                p="0"
                                _hover={{ color: "#e06464" }}
                                fontSize={"xl"}
                              >
                                <BsTrash3 />
                              </Button>
                            </Tooltip>
                          </ButtonGroup>
                        </Td>
                      </Tr>
                    );
                  })
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
      </VStack>
    </Layout>
  );
};

export default Product;
