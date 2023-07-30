import {
  Box,
  Button,
  Flex,
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
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { BiImageAdd } from "react-icons/bi";
import { ChangeEvent, useEffect, useId, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { addNewProduct, updateProduct } from "../../../redux/productSlice";
import { IproductData } from "../../../helper/interfaces";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  AiOutlineClose,
  AiOutlineLeft,
  AiOutlineLeftCircle,
  AiOutlineRight,
  AiOutlineRightCircle,
} from "react-icons/ai";

const ProductOperation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { operationID } = useParams();
  const { state } = useLocation();
  const slideContainerRef = useRef<HTMLDivElement>(null);

  // getting the categories data
  const { categories } = useSelector((state: RootState) => state.category);
  const [totalImages, setTotalImages] = useState<
    { imageFile: File | null; imageUrl: string }[]
  >([]);

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    control,
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
            discountedPrice: state?.discountedPrice,
          },
  });

  const { imageURL, productImage } = watch();

  // function to get the url from the file
  const getPreviewURL = (event: ChangeEvent, index: number) => {
    const imageFile = (event.target as HTMLInputElement)?.files?.[0];
    const { productImage, imageURL } = watch();
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      const newThumbnails = productImage ? [...productImage] : [];
      const urls = imageURL ? [...imageURL] : [];
      newThumbnails[index] = imageFile;
      urls[index] = url;
      setValue("productImage", newThumbnails);
      setValue("imageURL", urls);
    }
  };

  // function to handle form submit
  const handleFormSubmit: SubmitHandler<IproductData> = async (data) => {
    console.log(data);
    // if (operationID === "add") {
    //   const res = await dispatch(addNewProduct(data));
    //   if (res.payload.success) {
    //     reset();
    //     setProductImgPreview("");
    //   } else {
    //     const {
    //       category,
    //       description,
    //       inStock,
    //       originalPrice,
    //       discountedPrice,
    //       productImage,
    //       quantity,
    //       title,
    //     } = watch();
    //     reset({
    //       category,
    //       description,
    //       inStock,
    //       originalPrice,
    //       discountedPrice,
    //       productImage,
    //       quantity,
    //       title,
    //     });
    //   }
    // } else {
    //   const res = await dispatch(updateProduct(data));
    //   if (res.payload?.success) {
    //     reset();
    //     navigate("/admin/product");
    //   } else {
    //     const {
    //       category,
    //       description,
    //       inStock,
    //       originalPrice,
    //       discountedPrice,
    //       productImage,
    //       quantity,
    //       title,
    //     } = watch();
    //     reset({
    //       category,
    //       description,
    //       inStock,
    //       originalPrice,
    //       discountedPrice,
    //       productImage,
    //       quantity,
    //       title,
    //     });
    //   }
    // }
  };

  // function to scroll container left
  const handleLeftSlider = () => {
    if (slideContainerRef.current) {
      slideContainerRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  // function to scroll container right
  const handleRightSlider = () => {
    if (slideContainerRef.current) {
      slideContainerRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
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
      {/* adding the dynamic meta data */}
      <Helmet>
        <title>Product Operation</title>
        <meta
          name="description"
          content="Effortlessly Add and Update Products - Harvi Mart's Product Operation page offers seamless product management for administrators. Add new items or update existing ones with ease. Stay in control of your inventory and keep your product offerings up-to-date. Streamline your e-commerce operations with Harvi Mart's user-friendly Product Operation."
        />
      </Helmet>

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
              <GridItem m={"auto"} w={"500px"} pos={"relative"}>
                {/* for main product image */}
                <FormControl
                  display="flex"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <FormLabel
                    htmlFor="userProductImage"
                    shadow={"md"}
                    borderRadius={"full"}
                    p={2}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    h={80}
                    w={80}
                    cursor={"pointer"}
                    _hover={{ color: "primaryColor" }}
                  >
                    {imageURL && imageURL[0] ? (
                      <Image
                        h={"full"}
                        w={"full"}
                        src={imageURL[0]}
                        alt="Product Image"
                        borderRadius={"full"}
                      />
                    ) : (
                      <BiImageAdd fontSize={60} />
                    )}
                  </FormLabel>
                  <Input
                    id="userProductImage"
                    name="userProductImage"
                    type="file"
                    multiple={false}
                    accept="image/*"
                    display={"none"}
                    // onChange={getPreviewURL}
                    {...(operationID === "add" && { required: true })}
                  />
                </FormControl>

                {/* for multiple products image */}
                <HStack
                  overflowX="scroll"
                  alignItems={"left"}
                  ref={slideContainerRef}
                  mt={5}
                  sx={{
                    "::-webkit-scrollbar": {
                      display: "none",
                    },
                  }}
                >
                  {totalImages.length &&
                    totalImages.map(
                      (
                        image: { imageFile: File | null; imageUrl: string },
                        index
                      ) => {
                        return (
                          <FormControl
                            display="flex"
                            alignItems={"center"}
                            justifyContent={"center"}
                          >
                            <FormLabel
                              htmlFor="userProductImage"
                              shadow={"md"}
                              p={2}
                              display={"flex"}
                              alignItems={"center"}
                              justifyContent={"center"}
                              w={28}
                              h={28}
                              borderRadius={5}
                              cursor={"pointer"}
                              _hover={{ color: "primaryColor" }}
                            >
                              {image.imageUrl ? (
                                <Image
                                  h={"full"}
                                  w={"full"}
                                  src={image.imageUrl}
                                  alt="Product Image"
                                  borderRadius={"full"}
                                />
                              ) : (
                                <BiImageAdd fontSize={40} />
                              )}
                            </FormLabel>
                            <Input
                              id="userProductImage"
                              name="userProductImage"
                              type="file"
                              multiple={false}
                              accept="image/*"
                              display={"none"}
                              // onChange={getPreviewURL}
                              {...(operationID === "add" && { required: true })}
                            />
                            <Button
                              size={"xs"}
                              colorScheme="red"
                              p={0}
                              pos={"absolute"}
                              top={0}
                              right={"11px"}
                            >
                              <AiOutlineClose />
                            </Button>
                          </FormControl>
                        );
                      }
                    )}

                  {/* button to allow adding new image */}
                  <VStack
                    w={28}
                    h={28}
                    flexShrink={0}
                    shadow={"md"}
                    borderRadius={5}
                    cursor={"pointer"}
                    justifyContent={"center"}
                    _hover={{ color: "primaryColor" }}
                    onClick={() =>
                      setTotalImages((prevTotalImages) => [
                        ...prevTotalImages,
                        {
                          imageFile: null,
                          imageUrl: "",
                        },
                      ])
                    }
                  >
                    <BiImageAdd fontSize={40} />
                    <Text fontSize={"sm"} fontWeight={"semibold"}>
                      Add Image
                    </Text>
                  </VStack>
                </HStack>
                {/* left slider button */}
                <Button
                  borderRadius={"full"}
                  p="0"
                  pos="absolute"
                  bottom={12}
                  left={0}
                  zIndex={10}
                  size={"sm"}
                  onClick={handleLeftSlider}
                >
                  <AiOutlineLeft fontSize={"20px"} />
                </Button>

                {/* right slider button */}
                <Button
                  borderRadius={"full"}
                  p="0"
                  pos="absolute"
                  bottom={12}
                  right={0}
                  zIndex={10}
                  size={"sm"}
                  onClick={handleRightSlider}
                >
                  <AiOutlineRight fontSize={"20px"} />
                </Button>
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
