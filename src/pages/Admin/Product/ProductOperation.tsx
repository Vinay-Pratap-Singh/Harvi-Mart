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
import { ChangeEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { addNewProduct, updateProduct } from "../../../redux/productSlice";
import { IproductData } from "../../../helper/interfaces";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const ProductOperation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { operationID } = useParams();
  const { state } = useLocation();

  // for product image preview
  const [productImgPreview, setProductImgPreview] = useState(
    (state && state.imageURL) || ""
  );
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
    defaultValues:
      operationID === "add"
        ? {
            inStock: "true",
          }
        : {
            id: state?.id,
            category: state?.category,
            description: state?.description,
            inStock: state?.inStock,
            originalPrice: state?.originalPrice,
            quantity: state?.quantity,
            title: state?.title,
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
    if (operationID === "add") {
      const res = await dispatch(addNewProduct(data));
      if (res.payload.success) {
        reset();
      } else {
        const {
          category,
          description,
          inStock,
          originalPrice,
          productImage,
          quantity,
          title,
        } = watch();
        reset({
          category,
          description,
          inStock,
          originalPrice,
          productImage,
          quantity,
          title,
        });
      }
    } else {
      const res = await dispatch(updateProduct(data));
      console.log(res.payload);
      if (res.payload?.success) {
        reset();
        navigate("/admin/product");
      } else {
        const {
          category,
          description,
          inStock,
          originalPrice,
          productImage,
          quantity,
          title,
        } = watch();
        reset({
          category,
          description,
          inStock,
          originalPrice,
          productImage,
          quantity,
          title,
        });
      }
    }
  };

  // for checking valid param
  useEffect(() => {
    if (!operationID) {
      navigate(-1);
    } else if (operationID !== "add" && operationID !== "update") {
      navigate(-1);
    }
  }, [operationID, navigate]);

  return (
    <Layout>
      <VStack minH={"100vh"} w="full" pt={5} pl={60}>
        <Heading fontSize={"3xl"}>
          Welcome to the{" "}
          <Text as={"span"} color={"primaryColor"}>
            {operationID === "add" ? "Add Product Page" : "Update Product Page"}
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
                    {...(operationID === "add" && { required: true })}
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
                      {categories &&
                        categories.map((category: any) => {
                          return (
                            <option key={category?._id} value={category?._id}>
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
                  loadingText={
                    operationID === "add" ? "Adding..." : "Updating..."
                  }
                  w={"fit-content"}
                  colorScheme="orange"
                >
                  {operationID === "add" ? " Add Product" : "Update Product"}
                </Button>
              </GridItem>
            </Grid>
          </form>
        </Stack>
      </VStack>
    </Layout>
  );
};

export default ProductOperation;
