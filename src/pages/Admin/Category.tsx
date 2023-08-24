import categoryPageImg from "../../assets/categoryPageImg.jpg";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import DeleteCategory from "../../components/AlertBox/DeleteCategory";
import UpdateCategory from "../../components/Modals/UpdateCategory";
import Layout from "../Layout/Layout";
import AddCategory from "../../components/Modals/AddCategory";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { nanoid } from "@reduxjs/toolkit";
import { useAppSelector } from "../../helper/Hooks/redux";

const Category = () => {
  const { categories } = useAppSelector((state) => state.category);
  // for managing the update category data
  const [updateCategoryData, setUpdateCategoryData] = useState<{
    id: string;
    name: string;
    description: string;
  }>({ id: "", name: "", description: "" });
  // for managing the delete category
  const [deleteCategoryID, setDeleteCategoryID] = useState("");

  // for managing the modals and alert boxes
  const {
    isOpen: deleteCategoryIsOpen,
    onOpen: deleteCategoryOnOpen,
    onClose: deleteCategoryOnClose,
  } = useDisclosure();
  const {
    isOpen: updateCategoryIsOpen,
    onOpen: updateCategoryOnOpen,
    onClose: updateCategoryOnClose,
  } = useDisclosure();
  const {
    isOpen: addCategoryIsOpen,
    onOpen: addCategoryOnOpen,
    onClose: addCategoryOnClose,
  } = useDisclosure();

  return (
    <Layout>
      {/* adding the dynamic meta data */}
      <Helmet>
        <title>Categories</title>
        <meta
          name="description"
          content="Effortlessly Manage Product Categories - Harvi Mart's Category page empowers administrators to organize and update product categories with ease. Streamline your inventory and enhance user experience. Stay in control of your product catalog with Harvi Mart's intuitive Category management."
        />
      </Helmet>

      <VStack
        w={"full"}
        h={["auto", "auto", "auto", "100vh"]}
        gap={5}
        pl={[0, 0, 0, 60]}
        pt={[12, 12, 12, 5]}
      >
        <Heading
          textAlign={["center", "center", "center", "initial"]}
          fontSize={["xl", "xl", "2xl", "3xl"]}
          w={["full", "full", "full", "auto"]}
        >
          Welcome to the{" "}
          <Text as={"span"} color={"primaryColor"}>
            Category Page
          </Text>{" "}
        </Heading>

        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          gap={[2, 2, 2, 2, 8]}
          direction={["column", "column", "column", "column", "row"]}
          pb={[5, 5, 5, 5, 0]}
        >
          <Image
            w={["90%", "90%", "90%", "90%", "550px"]}
            src={categoryPageImg}
            alt="category page main image"
          />

          {/* for category card to perform CRUD */}
          <VStack
            w={["90%", "90%", "90%", "90%", 96]}
            h={[
              "fit-content",
              "fit-content",
              "fit-content",
              "fit-content",
              "450px",
            ]}
            boxShadow={"md"}
            p={[2, 2, 2, 2, 5]}
            borderRadius={"5px"}
            pos="relative"
            gap={3}
          >
            <Heading fontSize={["lg", "lg", "xl", "2xl"]}>
              My Categories
            </Heading>
            <Box pos="absolute" top={[1, 1, 1, 1, 3]} right={5}>
              <AddCategory
                key={nanoid()}
                addCategoryIsOpen={addCategoryIsOpen}
                addCategoryOnClose={addCategoryOnClose}
                addCategoryOnOpen={addCategoryOnOpen}
              />
            </Box>

            <Accordion allowToggle w={"full"} overflowY={"scroll"} px={1}>
              {categories &&
                categories.map((category: any, index: number) => {
                  return (
                    <AccordionItem key={category?._id}>
                      <h2>
                        <AccordionButton fontWeight={"semibold"}>
                          <Box as="span" flex="1" textAlign="left">
                            {index + 1 > 9 ? index + 1 : "0" + (index + 1)}{" "}
                            {category?.name}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <HStack justifyContent={"space-between"}>
                          <VStack>
                            <Heading
                              alignSelf={"flex-start"}
                              fontSize={"lg"}
                              fontWeight={"semibold"}
                            >
                              {category?.name}
                            </Heading>
                            <Text alignSelf={"flex-start"} fontSize={"md"}>
                              {category.description
                                ? category.description
                                : "No Description Available"}
                            </Text>
                          </VStack>

                          <VStack>
                            <Box
                              onClick={() =>
                                setUpdateCategoryData({
                                  id: category?._id,
                                  name: category?.name,
                                  description: category?.description,
                                })
                              }
                            >
                              <UpdateCategory
                                key={category?._id}
                                updateCategoryIsOpen={updateCategoryIsOpen}
                                updateCategoryOnClose={updateCategoryOnClose}
                                updateCategoryOnOpen={updateCategoryOnOpen}
                                data={{ ...updateCategoryData }}
                              />
                            </Box>
                            <Box
                              onClick={() => setDeleteCategoryID(category?._id)}
                            >
                              <DeleteCategory
                                key={category?._id}
                                deleteCategoryIsOpen={deleteCategoryIsOpen}
                                deleteCategoryOnClose={deleteCategoryOnClose}
                                deleteCategoryOnOpen={deleteCategoryOnOpen}
                                id={deleteCategoryID}
                              />
                            </Box>
                          </VStack>
                        </HStack>
                      </AccordionPanel>
                    </AccordionItem>
                  );
                })}
            </Accordion>
          </VStack>
        </Stack>
      </VStack>
    </Layout>
  );
};

export default Category;
