import categoryPageImg from "../../assets/categoryPageImg.jpg";
import {
  Box,
  ButtonGroup,
  HStack,
  Heading,
  Image,
  ListItem,
  UnorderedList,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import DeleteCategory from "../../components/AlertBox/DeleteCategory";
import UpdateCategory from "../../components/Modals/UpdateCategory";
import Layout from "../Layout/Layout";
import Footer from "../../components/Footer";
import AddCategory from "../../components/Modals/AddCategory";

const Category = () => {
  const myCategories = [
    "shoes",
    "shirt",
    "t-shirt",
    "shoes",
    "shirt",
    "t-shirt",
    "shoes",
    "shirt",
    "t-shirt",
  ];
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
      {" "}
      <HStack w={"full"} gap={8}>
        <Image
          h={"450px"}
          src={categoryPageImg}
          alt="category page main image"
        />

        {/* for category card to perform CRUD */}
        <VStack
          w={96}
          h={96}
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

          <UnorderedList
            alignSelf={"flex-start"}
            fontWeight={"semibold"}
            w={"full"}
            overflowY={"scroll"}
            px={1}
          >
            {myCategories &&
              myCategories.map((category, index) => {
                return (
                  <ListItem
                    key={index}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    mb={2}
                  >
                    {category}
                    <ButtonGroup>
                      <UpdateCategory
                        updateCategoryIsOpen={updateCategoryIsOpen}
                        updateCategoryOnClose={updateCategoryOnClose}
                        updateCategoryOnOpen={updateCategoryOnOpen}
                      />
                      <DeleteCategory
                        deleteCategoryIsOpen={deleteCategoryIsOpen}
                        deleteCategoryOnClose={deleteCategoryOnClose}
                        deleteCategoryOnOpen={deleteCategoryOnOpen}
                      />
                    </ButtonGroup>
                  </ListItem>
                );
              })}
          </UnorderedList>
        </VStack>
      </HStack>
      {/* adding the footer */}
      <Footer />
    </Layout>
  );
};

export default Category;
