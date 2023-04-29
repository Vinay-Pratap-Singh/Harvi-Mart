import {
  Button,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { BiPackage, BiSearch, BiUser, BiUserCircle } from "react-icons/bi";
import {
  AiFillHeart,
  AiOutlineProfile,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";

const Header = () => {
  const isUserLoggedIn = false;
  const userProfileImage = "";

  return (
    <HStack
      justifyContent={"space-between"}
      alignItems={"center"}
      px={10}
      my={4}
    >
      {/* adding the logo */}
      <Link as={RouterLink} to={"/"}>
        <HStack fontSize={24} fontWeight={"bold"} color={"orange.500"}>
          <AiOutlineShoppingCart fontSize={32} />
          <Text>Harvi Mart</Text>
        </HStack>
      </Link>

      {/* adding the search bar */}
      <HStack>
        <InputGroup>
          <Input
            w={96}
            focusBorderColor="primaryColor"
            placeholder="Looking for something specific? "
          />
          <InputRightElement
            children={<BiSearch size={24} color="#e06464" />}
          />
        </InputGroup>
      </HStack>

      {/* creating the menu list */}
      <UnorderedList
        display={"flex"}
        alignItems={"center"}
        listStyleType={"none"}
        gap={10}
        fontWeight={500}
      >
        <ListItem>
          <Link
            as={RouterLink}
            href="#"
            display={"flex"}
            alignItems={"center"}
            gap={2}
          >
            <AiFillHeart color="#e06464" fontSize={"20px"} />
            Wishlist
          </Link>
        </ListItem>

        {!isUserLoggedIn ? (
          <ListItem>
            <Link as={RouterLink} to="/login">
              <Button colorScheme="orange">Login</Button>
            </Link>
          </ListItem>
        ) : (
          <ListItem>
            <Popover>
              <PopoverTrigger>
                <HStack cursor={"pointer"}>
                  <BiUser size={20} />
                  <Text>Account</Text>
                </HStack>
              </PopoverTrigger>

              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <VStack spacing={0} mb={3}>
                    {userProfileImage ? (
                      <Image src={userProfileImage} alt="profile picture" />
                    ) : (
                      <BiUserCircle fontSize={"120px"} />
                    )}
                    <Heading fontSize={"xl"}>Vinay Pratap Singh</Heading>
                  </VStack>

                  <UnorderedList listStyleType={"none"} m={0} spacing={2}>
                    <ListItem>
                      <Link
                        as={RouterLink}
                        href="#"
                        display="flex"
                        alignItems={"center"}
                        gap={2}
                      >
                        <BiPackage fontSize={20} />
                        <Text fontSize={"md"} fontWeight={500}>
                          My Orders
                        </Text>
                      </Link>
                    </ListItem>

                    <ListItem>
                      <Link
                        as={RouterLink}
                        href="#"
                        display="flex"
                        alignItems={"center"}
                        gap={2}
                      >
                        <AiOutlineProfile fontSize={20} />
                        <Text fontSize={"md"} fontWeight={500}>
                          My Profile
                        </Text>
                      </Link>
                    </ListItem>

                    <ListItem>
                      <Button w={"full"} colorScheme="red">
                        Logout
                      </Button>
                    </ListItem>
                  </UnorderedList>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </ListItem>
        )}
      </UnorderedList>
    </HStack>
  );
};

export default Header;
