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
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { useState, useMemo } from "react";
import { MdAdminPanelSettings } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import { setSearchedText } from "../redux/productSlice";
import { Iwishlist } from "../helper/interfaces";
import { useAppDispatch, useAppSelector } from "../helper/Hooks/redux";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, userDetails } = useAppSelector((state) => state.auth);
  const userProfileImage: string = userDetails?.avatar?.secure_url || "";
  const userRole = userDetails?.role;
  const { wishlists } = useAppSelector((state) => state.wishlist);
  const totalWishlistItem = useMemo(() => {
    let item = 0;
    wishlists.forEach((wishlist: Iwishlist) => {
      item += wishlist.products.length;
    });
    return item;
  }, [wishlists]);

  // for handling the button loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // for search bar input
  const { handleSubmit, register } = useForm<{ searchedText: string }>({
    defaultValues: {
      searchedText: "",
    },
  });

  // for handling the search button submit
  const handleSearchProduct: SubmitHandler<{ searchedText: string }> = (
    data
  ) => {
    dispatch(setSearchedText(data.searchedText));
    // sending the user to products page to see the searched product
    navigate("/products");
  };

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
      px={[5, 10]}
      h={"12vh"}
    >
      {/* adding the logo */}
      <Link as={RouterLink} to={"/"} _hover={{ textDecoration: "none" }}>
        <HStack fontSize={24} fontWeight={"bold"} color={"orange.500"}>
          <AiOutlineShoppingCart fontSize={32} />
          <Text display={["none", "none", "none", "block"]}>Harvi Mart</Text>
        </HStack>
      </Link>

      {/* adding the search bar */}
      <HStack>
        <form onSubmit={handleSubmit(handleSearchProduct)}>
          <InputGroup>
            <Input
              w={["auto", "auto", 96]}
              focusBorderColor="primaryColor"
              placeholder="Looking for something specific? "
              {...register("searchedText")}
            />
            <InputRightElement
              children={
                <Button p={0} colorScheme="white" fontSize={"2xl"}>
                  <BiSearch color="#e06464" />
                </Button>
              }
            />
          </InputGroup>
        </form>
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
        {isLoggedIn && (
          <ListItem
            pos={"relative"}
            display={["none", "none", "none", "block"]}
          >
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
        )}

        {/* cart */}
        {isLoggedIn && (
          <ListItem
            pos={"relative"}
            display={["none", "none", "none", "block"]}
          >
            <Link
              as={RouterLink}
              to={"/cart"}
              display={"flex"}
              alignItems={"center"}
              gap={2}
            >
              <AiOutlineShoppingCart fontSize={"20px"} />
              Cart
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
                {JSON.parse(localStorage.getItem("cartItems") || "[]").length}
              </Text>
            </Link>
          </ListItem>
        )}

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
                  <Text display={["none", "block"]}>Account</Text>
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
                        to="/user/order"
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

                    <ListItem
                      pos={"relative"}
                      display={["block", "block", "block", "none"]}
                    >
                      <Link
                        as={RouterLink}
                        to={"/wishlist"}
                        display={"flex"}
                        alignItems={"center"}
                        gap={2}
                      >
                        <AiFillHeart fontSize={"20px"} />
                        Wishlist
                        <Text
                          as={"span"}
                          bgColor={"orange.500"}
                          color={"white"}
                          fontWeight={"bold"}
                          fontSize={"sm"}
                          py={"1px"}
                          px={"7px"}
                          borderRadius={"full"}
                        >
                          {totalWishlistItem}
                        </Text>
                      </Link>
                    </ListItem>

                    <ListItem
                      pos={"relative"}
                      display={["block", "block", "block", "none"]}
                    >
                      <Link
                        as={RouterLink}
                        to={"/cart"}
                        display={"flex"}
                        alignItems={"center"}
                        gap={2}
                      >
                        <AiOutlineShoppingCart fontSize={"20px"} />
                        Cart
                        <Text
                          as={"span"}
                          bgColor={"orange.500"}
                          color={"white"}
                          fontWeight={"bold"}
                          fontSize={"sm"}
                          py={"1px"}
                          px={"7px"}
                          borderRadius={"full"}
                        >
                          {
                            JSON.parse(
                              localStorage.getItem("cartItems") || "[]"
                            ).length
                          }
                        </Text>
                      </Link>
                    </ListItem>

                    {/* adding the item for admin panel for admin user */}
                    {userRole === Number(process.env.REACT_APP_ADMIN_ROLE) && (
                      <ListItem>
                        <Link
                          as={RouterLink}
                          to="/admin/dashboard"
                          display="flex"
                          alignItems={"center"}
                          gap={2}
                        >
                          <MdAdminPanelSettings fontSize={20} />
                          <Text fontSize={"md"} fontWeight={500}>
                            Admin Panel
                          </Text>
                        </Link>
                      </ListItem>
                    )}

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
