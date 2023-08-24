import {
  Box,
  Button,
  HStack,
  Link,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { useRef } from "react";
import {
  AiOutlineCloseCircle,
  AiOutlineHome,
  AiOutlineMenu,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { IoNewspaperOutline } from "react-icons/io5";
import { Link as RouterLink } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { useAppDispatch, useAppSelector } from "../helper/Hooks/redux";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const sidebar = useRef<HTMLDivElement>(null);
  const menuBtn = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLDivElement>(null);

  // function to handle the sidebar
  const handleSidebar = () => {
    if (sidebar.current) {
      if (sidebar.current.style.display === "none") {
        sidebar.current.style.display = "block";
        if (closeBtn.current) {
          closeBtn.current.style.display = "block";
        }
        if (menuBtn.current) {
          menuBtn.current.style.display = "none";
        }
      } else {
        sidebar.current.style.display = "none";
        if (menuBtn.current) {
          menuBtn.current.style.display = "flex";
        }
        if (closeBtn.current) {
          closeBtn.current.style.display = "none";
        }
      }
    }
  };

  return (
    <>
      {/* adding menu button for small screen */}
      <Box
        ref={menuBtn}
        pos={"fixed"}
        zIndex={200}
        top={2}
        left={2}
        fontSize={20}
        alignSelf={"flex-start"}
        h={10}
        w={10}
        rounded={"full"}
        bgColor={"#fbfcff"}
        display={["flex", "flex", "flex", "none"]}
        alignItems={"center"}
        justifyContent={"center"}
        boxShadow={"sm"}
      >
        <AiOutlineMenu onClick={handleSidebar} />
      </Box>

      <VStack
        ref={sidebar}
        display={["none", "none", "none", "block"]}
        h={["100vh"]}
        pos={["absolute", "absolute", "absolute", "fixed"]}
        left={0}
        top={0}
        zIndex={20}
        w={60}
        bgColor={"#fbfcff"}
        shadow={"md"}
      >
        <HStack pos={"relative"}>
          {/* adding the logo */}
          <Link as={RouterLink} to={"/"} _hover={{ textDecoration: "none" }}>
            <HStack
              fontSize={24}
              fontWeight={"bold"}
              color={"orange.500"}
              my={3}
            >
              <AiOutlineShoppingCart fontSize={32} />
              <Text>Harvi Mart</Text>
            </HStack>
          </Link>

          {/* for close button */}
          <Box
            ref={closeBtn}
            pos={"absolute"}
            display={"none"}
            right={2}
            onClick={handleSidebar}
          >
            <AiOutlineCloseCircle size={20} />
          </Box>
        </HStack>

        {/* creating the list for menu */}
        <VStack
          as={UnorderedList}
          spacing={2}
          listStyleType={"none"}
          alignItems={"flex-start"}
          w={"full"}
        >
          {/* for overview */}
          <ListItem
            w={"full"}
            shadow={"sm"}
            pl={3}
            py={2}
            _hover={{ pl: 5, color: "primaryColor" }}
            transition={"all 0.25s ease-in-out"}
          >
            <Link
              as={RouterLink}
              to="/admin/dashboard"
              display="flex"
              alignItems={"center"}
              gap={2}
              _hover={{ textDecoration: "none" }}
              _focus={{ textDecoration: "none" }}
            >
              <AiOutlineHome fontSize={20} />
              <Text fontSize={"md"} fontWeight={500}>
                Overview
              </Text>
            </Link>
          </ListItem>

          {/* for users */}
          <ListItem
            w={"full"}
            shadow={"sm"}
            pl={3}
            py={2}
            _hover={{ pl: 5, color: "primaryColor" }}
            transition={"all 0.25s ease-in-out"}
          >
            <Link
              as={RouterLink}
              to="/admin/users"
              display="flex"
              alignItems={"center"}
              gap={2}
              _hover={{ textDecoration: "none" }}
              _focus={{ textDecoration: "none" }}
            >
              <FiUsers fontSize={20} />
              <Text fontSize={"md"} fontWeight={500}>
                Users
              </Text>
            </Link>
          </ListItem>

          {/* for orders */}
          <ListItem
            w={"full"}
            shadow={"sm"}
            pl={3}
            py={2}
            _hover={{ pl: 5, color: "primaryColor" }}
            transition={"all 0.25s ease-in-out"}
          >
            <Link
              as={RouterLink}
              to="/admin/orders"
              display="flex"
              alignItems={"center"}
              gap={2}
              _hover={{ textDecoration: "none" }}
              _focus={{ textDecoration: "none" }}
            >
              <IoNewspaperOutline fontSize={20} />
              <Text fontSize={"md"} fontWeight={500}>
                Orders
              </Text>
            </Link>
          </ListItem>

          {/* for products */}
          <ListItem
            w={"full"}
            shadow={"sm"}
            pl={3}
            py={2}
            _hover={{ pl: 5, color: "primaryColor" }}
            transition={"all 0.25s ease-in-out"}
          >
            <Link
              as={RouterLink}
              to="/admin/product"
              display="flex"
              alignItems={"center"}
              gap={2}
              _hover={{ textDecoration: "none" }}
              _focus={{ textDecoration: "none" }}
            >
              <AiOutlineShoppingCart fontSize={20} />
              <Text fontSize={"md"} fontWeight={500}>
                Products
              </Text>
            </Link>
          </ListItem>

          {/* for category */}
          <ListItem
            w={"full"}
            shadow={"sm"}
            pl={3}
            py={2}
            _hover={{ pl: 5, color: "primaryColor" }}
            transition={"all 0.25s ease-in-out"}
          >
            <Link
              as={RouterLink}
              to="/admin/category"
              display="flex"
              alignItems={"center"}
              gap={2}
              _hover={{ textDecoration: "none" }}
              _focus={{ textDecoration: "none" }}
            >
              <BiCategory fontSize={20} />
              <Text fontSize={"md"} fontWeight={500}>
                Categories
              </Text>
            </Link>
          </ListItem>

          {/* for coupons */}
          <ListItem
            w={"full"}
            shadow={"sm"}
            pl={3}
            py={2}
            _hover={{ pl: 5, color: "primaryColor" }}
            transition={"all 0.25s ease-in-out"}
          >
            <Link
              as={RouterLink}
              to="/admin/coupon"
              display="flex"
              alignItems={"center"}
              gap={2}
              _hover={{ textDecoration: "none" }}
              _focus={{ textDecoration: "none" }}
            >
              <FaRegMoneyBillAlt fontSize={20} />
              <Text fontSize={"md"} fontWeight={500}>
                Coupons
              </Text>
            </Link>
          </ListItem>
        </VStack>
        {/* for logout button */}

        <Button
          pos={"absolute"}
          bottom={2}
          left={2}
          right={2}
          colorScheme="orange"
          disabled={loading}
          onClick={() => dispatch(logout())}
        >
          {loading ? "Logging out..." : " Logout"}
        </Button>
      </VStack>
    </>
  );
};

export default Sidebar;
