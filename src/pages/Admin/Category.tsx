import { GrEdit } from "react-icons/gr";
import categoryPageImg from "../../assets/categoryPageImg.jpg";
import {
  Button,
  ButtonGroup,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  ListItem,
  Tooltip,
  UnorderedList,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import DeleteCategory from "../../components/AlertBox/DeleteCategory";
import UpdateCategory from "../../components/Modals/UpdateCategory";

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

  return (
    <HStack h={"100vh"} w={"full"} gap={8}>
      <Image h={"450px"} src={categoryPageImg} alt="category page main image" />

      {/* for category card to perform CRUD */}
      <VStack w={96} h={96} boxShadow={"md"} p={5} borderRadius={"5px"}>
        <Heading fontSize={"2xl"}>Category Page</Heading>
        <InputGroup>
          <Input
            type="text"
            placeholder="Enter the category name"
            focusBorderColor="primaryColor"
            fontWeight={"semibold"}
          />
          <InputRightElement>
            <Tooltip
              label="Add New Category"
              hasArrow
              color={"orange.500"}
              bgColor={"white"}
            >
              <Button
                p={2}
                colorScheme="orange"
                color={"white"}
                fontSize={"2xl"}
              >
                +
              </Button>
            </Tooltip>
          </InputRightElement>
        </InputGroup>

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
  );
};

export default Category;
