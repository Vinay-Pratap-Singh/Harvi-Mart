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
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import DeleteCategory from "../../components/AlertBox/DeleteCategory";
import UpdateCategory from "../../components/Modals/UpdateCategory";
import Layout from "../Layout/Layout";
import AddCategory from "../../components/Modals/AddCategory";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Helmet } from "react-helmet";
import { nanoid } from "@reduxjs/toolkit";

const Category = () => {
  const { categories } = useSelector((state: RootState) => state.category);
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

      <VStack w={"full"} h="100vh" gap={5} pl={[0, 0, 0, 60]} pt={5}>
        <Heading fontSize={"3xl"}>
          Welcome to the{" "}
          <Text as={"span"} color={"primaryColor"}>
            Category Page
          </Text>{" "}
        </Heading>
        <HStack gap={8}>
          <Image
            w={"550px"}
            src={categoryPageImg}
            alt="category page main image"
          />

          {/* for category card to perform CRUD */}
          <VStack
            w={96}
            h={"450px"}
            boxShadow={"md"}
            p={5}
            borderRadius={"5px"}
            pos="relative"
            gap={3}
          >
            <Heading fontSize={"2xl"}>My Categories</Heading>
            <Box pos="absolute" top={3} right={5}>
              <AddCategory
                key={nanoid()}
                addCategoryIsOpen={addCategoryIsOpen}
                addCategoryOnClose={addCategoryOnClose}
                addCategoryOnOpen={addCategoryOnOpen}
              />
            </Box>

            <Accordion
              allowToggle
              w={"full"}
              // minH={"full"}
              overflowY={"scroll"}
              px={1}
            >
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
        </HStack>
      </VStack>
    </Layout>
  );
};

export default Category;
