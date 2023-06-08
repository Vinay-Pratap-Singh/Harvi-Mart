import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import Layout from "../../Layout/Layout";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiImageAdd } from "react-icons/bi";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

// interface for the product data
interface IproductData {
  productImage: File;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  category: string;
  quantity: number;
  inStock: string;
}

const AddProduct = () => {
  // for product image preview
  const [productImgPreview, setProductImgPreview] = useState("");

  // getting the categories data
  const { categories } = useSelector((state: RootState) => state.category);

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IproductData>({
    defaultValues: {
      inStock: "true",
    },
  });

  // function to get the url from the file
  const getPreviewURL = (event: ChangeEvent) => {
    const imageFile = (event.target as HTMLInputElement)?.files?.[0];
    if (imageFile) {
      setValue("productImage", imageFile);
      const imageURL = URL.createObjectURL(imageFile);
      setProductImgPreview(imageURL);
    }
  };

  // function to handle form submit
  const handleFormSubmit: SubmitHandler<IproductData> = async (data) => {
    console.log(data);
  };

  return (
    <Layout>
      <VStack minH={"100vh"} w="full" pt={5} pl={60}>
        <Heading fontSize={"3xl"}>
          Welcome to the{" "}
          <Text as={"span"} color={"primaryColor"}>
            Add Product Page
          </Text>{" "}
        </Heading>

        {/* adding the form to take user input to create a product */}
        <Stack py={5} maxW={"90%"}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Grid templateColumns={"repeat(2,1fr)"} gap={5}>
              <GridItem m={"auto"}>
                {/* for product image */}
                <FormControl>
                  <FormLabel
                    htmlFor="userProfileImage"
                    shadow={"md"}
                    borderRadius={"full"}
                    p={2}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    h={80}
                    w={80}
                    cursor={"pointer"}
                  >
                    {productImgPreview ? (
                      <Image
                        h={"full"}
                        w={"full"}
                        src={productImgPreview}
                        alt="Product Image"
                        borderRadius={"full"}
                      />
                    ) : (
                      <BiImageAdd fontSize={60} />
                    )}
                  </FormLabel>
                  <Input
                    id="userProfileImage"
                    type="file"
                    multiple={false}
                    accept="image/*"
                    display={"none"}
                    onChange={getPreviewURL}
                    required
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                {/* for product title / name */}
                <FormControl isInvalid={Boolean(errors?.title)} mb={3}>
                  <FormLabel fontSize={"sm"}>Product Title</FormLabel>
                  <Input
                    type="text"
                    focusBorderColor="primaryColor"
                    placeholder="Cotton T-Shirt"
                    {...register("title", {
                      required: {
                        value: true,
                        message: "Please enter the product name",
                      },
                      minLength: {
                        value: 5,
                        message:
                          "Product name should have atleast 5 characters",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.title && errors.title.message}
                  </FormErrorMessage>
                </FormControl>

                <HStack mb={3}>
                  {/* for product original price */}
                  <FormControl isInvalid={Boolean(errors?.originalPrice)}>
                    <FormLabel fontSize={"sm"}>Original Price</FormLabel>
                    <Input
                      type="number"
                      focusBorderColor="primaryColor"
                      placeholder="499"
                      {...register("originalPrice", {
                        required: {
                          value: true,
                          message: "Please enter the product's original price",
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.originalPrice && errors.originalPrice.message}
                    </FormErrorMessage>
                  </FormControl>
                  {/* for product discounted price */}
                  <FormControl isInvalid={Boolean(errors?.discountedPrice)}>
                    <FormLabel fontSize={"sm"}>Discounted Price</FormLabel>
                    <Input
                      type="number"
                      focusBorderColor="primaryColor"
                      placeholder="399"
                      {...register("discountedPrice", {
                        required: {
                          value: true,
                          message:
                            "Please enter the product's discounted price",
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.discountedPrice && errors.discountedPrice.message}
                    </FormErrorMessage>
                  </FormControl>
                </HStack>

                <HStack mb={3}>
                  {/* for product inStock */}
                  <FormControl isInvalid={Boolean(errors?.inStock)}>
                    <FormLabel fontSize={"sm"}>In Stock</FormLabel>
                    <Select
                      focusBorderColor="primaryColor"
                      {...register("inStock", {
                        required: {
                          value: true,
                          message: "Please select an option",
                        },
                      })}
                    >
                      <option defaultValue={"true"} value={"true"}>
                        Yes
                      </option>
                      <option value={"false"}>No</option>
                    </Select>
                    <FormErrorMessage>
                      {errors.inStock && errors.inStock.message}
                    </FormErrorMessage>
                  </FormControl>

                  {/* for product category */}
                  <FormControl isInvalid={Boolean(errors?.category)}>
                    <FormLabel fontSize={"sm"}>Product Category</FormLabel>
                    <Select
                      focusBorderColor="primaryColor"
                      {...register("category", {
                        required: {
                          value: true,
                          message: "Please select a category",
                        },
                      })}
                    >
                      <option value={"none"}>Choose Category</option>
                      {categories &&
                        categories.map((category: any) => {
                          return (
                            <option key={category?._id} value={category?.name}>
                              {category?.name}
                            </option>
                          );
                        })}
                    </Select>
                    <FormErrorMessage>
                      {errors.category && errors.category.message}
                    </FormErrorMessage>
                  </FormControl>
                </HStack>

                {/* for product quantity */}
                <FormControl isInvalid={Boolean(errors?.quantity)}>
                  <FormLabel fontSize={"sm"}>Product Quantity</FormLabel>
                  <Input
                    type="number"
                    focusBorderColor="primaryColor"
                    placeholder="5"
                    {...register("quantity", {
                      required: {
                        value: true,
                        message: "Please enter the product quantity",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.quantity && errors.quantity.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                {/* for product description */}
                <FormControl isInvalid={Boolean(errors?.description)}>
                  <FormLabel fontSize={"sm"}>Product Description</FormLabel>
                  <Textarea
                    resize={"none"}
                    h={40}
                    placeholder="Enter the product description"
                    focusBorderColor="primaryColor"
                    {...register("description", {
                      required: {
                        value: true,
                        message: "Please enter the product description",
                      },
                      minLength: {
                        value: 18,
                        message:
                          "Product description should have atleast 18 characters",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.description && errors.description.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem colSpan={2} mx={"auto"}>
                {" "}
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  loadingText="Adding..."
                  w={"fit-content"}
                  colorScheme="orange"
                >
                  Add Product
                </Button>
              </GridItem>
            </Grid>
          </form>
        </Stack>
      </VStack>
    </Layout>
  );
};

export default AddProduct;
