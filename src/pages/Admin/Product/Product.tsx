import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import Layout from "../../Layout/Layout";
import { AiFillCaretDown, AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { MdOutlineDescription, MdOutlineModeEdit } from "react-icons/md";
import { BsTrash3 } from "react-icons/bs";

const Product = () => {
  const { categories } = useSelector((state: RootState) => state.category);
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
            <Button colorScheme="orange">Add Product</Button>
          </HStack>

          {/* for displaying the product table */}
          <TableContainer w="full" overflow="hidden">
            <Table>
              <Thead>
                <Tr>
                  <Th isNumeric>S. No.</Th>
                  <Th>Title</Th>
                  <Th>Description</Th>
                  <Th isNumeric>Price</Th>
                  <Th px={0}>
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
                  <Th isNumeric>Quantity</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>

              {/* adding the table body */}
              <Tbody fontSize={"15px"}>
                <Tr>
                  <Td p="1" textAlign={"center"}>
                    01
                  </Td>
                  <Td p="1">Running Shoes</Td>
                  <Td p="1">
                    <Box
                      w="60"
                      // wordBreak="break-all"
                      // textOverflow="ellipsis"
                      whiteSpace={"normal"}
                    >
                      Vinay you are a good boy.Vinay you are a good boy.Vinay
                      you are a good boy.Vinay you are a good boy.Vinay you are
                      a good boy.Vinay you are a good boy.
                    </Box>
                  </Td>
                  <Td p="1" textAlign={"center"}>
                    599 Rs
                  </Td>
                  <Td p="1">Shoes</Td>
                  <Td p="1" textAlign={"center"}>
                    10
                  </Td>
                  <Td p="1">
                    <ButtonGroup>
                      <Button p="0">
                        <MdOutlineDescription />
                      </Button>
                      <Button p="0">
                        <MdOutlineModeEdit />
                      </Button>
                      <Button p="0">
                        <BsTrash3 />
                      </Button>
                    </ButtonGroup>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
      </VStack>
    </Layout>
  );
};

export default Product;
