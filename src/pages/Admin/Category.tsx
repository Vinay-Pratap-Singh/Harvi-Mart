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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getAllCategories } from "../../redux/categorySlice";

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

  const dispatch = useDispatch<AppDispatch>();

  // for loading categories data on page render
  useEffect(() => {
    (async () => {
      await dispatch(getAllCategories());
      console.log("inside the useEffect");
    })();
  }, []);

  return (
    <Layout>
      <HStack w={"full"} gap={8}>
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
          <Heading fontSize={"2xl"}>Category Page</Heading>
          <Box pos="absolute" top={3} right={5}>
            <AddCategory
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
              categories.map((category: any, index) => {
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
    </Layout>
  );
};

export default Category;
