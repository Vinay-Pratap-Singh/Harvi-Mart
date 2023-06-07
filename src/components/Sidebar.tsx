import {
  HStack,
  Link,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";
import { Link as RouterLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <VStack
      h={"100vh"}
      pos={"fixed"}
      left={0}
      zIndex={20}
      alignItems={"flex-start"}
      w={60}
      shadow={"md"}
    >
      {/* adding the logo */}
      <Link as={RouterLink} to={"/"} _hover={{ textDecoration: "none" }}>
        <HStack
          fontSize={24}
          fontWeight={"bold"}
          color={"orange.500"}
          m={2}
          mt={5}
        >
          <AiOutlineShoppingCart fontSize={32} />
          <Text>Harvi Mart</Text>
        </HStack>
      </Link>

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
            to="/admin/overview"
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
            to="/admin/order"
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
    </VStack>
  );
};

export default Sidebar;
