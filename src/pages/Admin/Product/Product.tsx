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
  useDisclosure,
} from "@chakra-ui/react";
import Layout from "../../Layout/Layout";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { MdOutlineDescription, MdOutlineModeEdit } from "react-icons/md";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import DeleteProduct from "../../../components/AlertBox/DeleteProduct";
import { Iproduct, IproductData, Iimage } from "../../../helper/interfaces";
import { SubmitHandler, useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import TableShimmer from "../../../shimmer/TableShimmer";

interface IuserSearchedText {
  searchedText: string;
}

const Product = () => {
  const navigate = useNavigate();
  const { categories, isLoading: isCategoryLoading } = useSelector(
    (state: RootState) => state.category
  );
  const { products, isLoading: isProductLoading } = useSelector(
    (state: RootState) => state.product
  );
  const [productToBeDisplayed, setProductToBeDisplayed] = useState(products);
  // for storing the id of product to be deleleted
  const [productToBeDeleted, setProductToBeDeleted] = useState("");
  const { handleSubmit, register } = useForm<IuserSearchedText>();

  // for managing the modals and alert boxes
  const {
    isOpen: deleteProductIsOpen,
    onOpen: deleteProductOnOpen,
    onClose: deleteProductOnClose,
  } = useDisclosure();

  // for handling the edit button click
  const handleProductEditBtn = (product: Iproduct) => {
    const images: string[] = product.images.map(
      (image: Iimage) => image?.image?.secure_url
    );
    const data: IproductData = {
      id: product?._id,
      category: product?.category?._id,
      description: product?.description,
      inStock: String(product?.inStock),
      originalPrice: product?.originalPrice,
      discountedPrice: product?.discountedPrice,
      productImage: null,
      quantity: product?.quantity,
      title: product?.title,
      imageURL: [...images],
    };
    navigate("/admin/product/operation/update", { state: { ...data } });
  };

  // function for handling the product search
  const handleSearch: SubmitHandler<IuserSearchedText> = (data) => {
    if (!data.searchedText || data.searchedText === "") {
      setProductToBeDisplayed(products);
      return;
    }
    const newProductData = products.filter((product: any) => {
      return (product?.title).includes(data.searchedText);
    });
    setProductToBeDisplayed(newProductData);
  };

  // for handling the search by category
  const searchByCategory = (event: ChangeEvent) => {
    const element = event.target as HTMLSelectElement;
    const value = element.value;
    if (value === "all") {
      setProductToBeDisplayed(products);
      return;
    }
    const newProductData = products.filter((product: any) => {
      return product?.category && (product?.category?.name).includes(value);
    });
    setProductToBeDisplayed(newProductData);
  };

  return (
    <Layout>
      {/* adding the dynamic meta data */}
      <Helmet>
        <title>Products</title>
        <meta
          name="description"
          content="Discover Harvi Mart's Diverse Product Catalog - Explore, update, and manage all products effortlessly with our intuitive admin interface. Showcase a wide range of top-quality items to delight your customers. Keep your product offerings fresh and exciting with Harvi Mart's dynamic Product page."
        />
      </Helmet>

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
            <form onSubmit={handleSubmit(handleSearch)}>
              <InputGroup w="80">
                <Input
                  type="text"
                  placeholder="Search product"
                  focusBorderColor="primaryColor"
                  {...register("searchedText")}
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
            <Link as={RouterLink} to={"/admin/product/operation/add"}>
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
                        onChange={searchByCategory}
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
              <Tbody fontSize={"14.5px"} fontWeight={"semibold"}>
                {isCategoryLoading || isProductLoading ? (
                  <Tr>
                    <Td>
                      <TableShimmer />
                    </Td>
                    <Td>
                      <TableShimmer />
                    </Td>
                    <Td>
                      <TableShimmer />
                    </Td>
                    <Td>
                      <TableShimmer />
                    </Td>
                    <Td>
                      <TableShimmer />
                    </Td>
                    <Td>
                      <TableShimmer />
                    </Td>
                    <Td>
                      <TableShimmer />
                    </Td>
                  </Tr>
                ) : productToBeDisplayed.length === 0 ? (
                  <Tr>
                    <Td colSpan={7}>Oops! There is no products</Td>
                  </Tr>
                ) : (
                  productToBeDisplayed.map(
                    (product: Iproduct, index: number) => {
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
                            <Box w="32" whiteSpace={"normal"} noOfLines={2}>
                              {product?.title}
                            </Box>
                          </Td>
                          <Td p="1" verticalAlign={"text-top"}>
                            <Box w="60" whiteSpace={"normal"} noOfLines={2}>
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
                                  onClick={() =>
                                    navigate(`/admin/product/${product?._id}`, {
                                      state: { ...product },
                                    })
                                  }
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
                                  colorScheme="yellow"
                                  onClick={() => {
                                    handleProductEditBtn(product);
                                  }}
                                >
                                  <MdOutlineModeEdit />
                                </Button>
                              </Tooltip>

                              <Box
                                onClick={() =>
                                  setProductToBeDeleted(product?._id)
                                }
                              >
                                <DeleteProduct
                                  deleteProductIsOpen={deleteProductIsOpen}
                                  deleteProductOnClose={deleteProductOnClose}
                                  deleteProductOnOpen={deleteProductOnOpen}
                                  id={productToBeDeleted}
                                />
                              </Box>
                            </ButtonGroup>
                          </Td>
                        </Tr>
                      );
                    }
                  )
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
