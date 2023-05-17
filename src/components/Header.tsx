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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { logout } from "../redux/authSlice";
import { useState } from "react";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, userDetails } = useSelector(
    (state: RootState) => state.auth
  );
  const userProfileImage = userDetails?.avatar?.secure_url || "";
  const totalWishlistItem = 0;

  // for handling the button loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // function to handle the user logout
  const handleLogout = async () => {
    setIsSubmitting(true);
    await dispatch(logout());
    setIsSubmitting(false);
  };

  return (
    <HStack
      justifyContent={"space-between"}
      alignItems={"center"}
      px={10}
      h={"12vh"}
    >
      {/* adding the logo */}
      <Link as={RouterLink} to={"/"} _hover={{ textDecoration: "none" }}>
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
        {/* wishlist */}
        <ListItem pos={"relative"}>
          <Link
            as={RouterLink}
            to={"/wishlist"}
            display={"flex"}
            alignItems={"center"}
            gap={2}
          >
            <AiFillHeart color="#DD6B20" fontSize={"20px"} />
            Wishlist
            <Text
              as={"span"}
              bgColor={"orange.500"}
              color={"white"}
              fontWeight={"bold"}
              fontSize={"sm"}
              pos={"absolute"}
              right={-4}
              top={-4}
              py={"1px"}
              px={"7px"}
              borderRadius={"full"}
            >
              {totalWishlistItem}
            </Text>
          </Link>
        </ListItem>

        {/* cart */}
        <ListItem pos={"relative"}>
          <Link
            as={RouterLink}
            to={"/cart"}
            display={"flex"}
            alignItems={"center"}
            gap={2}
          >
            <AiOutlineShoppingCart fontSize={"20px"} />
            Cart
          </Link>
        </ListItem>

        {!isLoggedIn ? (
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
                      <Image
                        src={userProfileImage}
                        w={40}
                        borderRadius={"full"}
                        m={2}
                        alt="profile picture"
                      />
                    ) : (
                      <BiUserCircle fontSize={"120px"} />
                    )}
                    <Heading fontSize={"xl"}>{userDetails?.fullName}</Heading>
                  </VStack>

                  <UnorderedList listStyleType={"none"} m={0} spacing={2}>
                    <ListItem>
                      <Link
                        as={RouterLink}
                        to="#"
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
                        to="/user/profile"
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
                      <Button
                        w={"full"}
                        colorScheme="red"
                        isLoading={isSubmitting}
                        loadingText="Logging Out..."
                        spinnerPlacement="start"
                        onClick={handleLogout}
                      >
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
