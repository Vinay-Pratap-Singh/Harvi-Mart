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
import DeleteCategory from "../../components/Modals/DeleteCategory";

const Category = () => {
  const myCategories = ["shoes", "shirt", "t-shirt"];
  const {
    isOpen: deleteCategoryIsOpen,
    onOpen: deleteCategoryOnOpen,
    onClose: deleteCategoryOnClose,
  } = useDisclosure();
  return (
    <HStack h={"100vh"} w={"full"}>
      <Image h={"450px"} src={categoryPageImg} alt="category page main image" />

      {/* for category card to perform CRUD */}
      <VStack w={96} minH={96} boxShadow={"md"} p={5} borderRadius={"5px"}>
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
                    <Tooltip
                      hasArrow
                      label="Edit Category"
                      color={"orange.500"}
                      bgColor={"white"}
                    >
                      <Button p={1} size={"sm"}>
                        <GrEdit />{" "}
                      </Button>
                    </Tooltip>
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
