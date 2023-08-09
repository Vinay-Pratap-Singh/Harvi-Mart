import { Helmet } from "react-helmet";
import Layout from "../Layout/Layout";
import {
  Box,
  Button,
  Heading,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import DeleteUser from "../../components/AlertBox/DeleteUser";
import { IuserSliceData } from "../../helper/interfaces";
import { AiOutlineUser } from "react-icons/ai";

const Users = () => {
  const { isLoading, users } = useSelector((state: RootState) => state.user);
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Layout>
      {/* adding the dynamic meta data */}
      <Helmet>
        <title>Users</title>
        <meta
          name="description"
          content="Effortlessly manage your users with our intuitive admin page. Access and view user details, edit profiles, and keep everything organized in one place. Simplify user management and streamline your workflow today."
        />
      </Helmet>

      <VStack w={"full"} pl={60} pt={5} gap={10}>
        <Heading fontSize={"3xl"}>
          Welcome to the{" "}
          <Text as={"span"} color={"primaryColor"}>
            Users Page
          </Text>{" "}
        </Heading>

        {/* for displaying the users table */}
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th isNumeric textAlign={"center"}>
                  S. No.
                </Th>
                <Th>Profile</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone No.</Th>
                <Th>isActive</Th>
                <Th>Role</Th>
                <Th>Login Count</Th>
                <Th pr={2}>Actions</Th>
              </Tr>
            </Thead>

            {/* adding the table body */}
            <Tbody fontSize={"14.5px"} fontWeight={"semibold"}>
              {users.length === 0 ? (
                <Tr textAlign={"center"}>
                  <Td colSpan={9}>Oops! There is no products</Td>
                </Tr>
              ) : (
                users.map((user: IuserSliceData, index: number) => {
                  return (
                    <Tr key={user._id}>
                      <Td
                        p="1"
                        textAlign={"center"}
                        verticalAlign={"text-center"}
                      >
                        {index < 9 ? `0${index + 1}` : index + 1}
                      </Td>
                      <Td
                        p="1"
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        h={"full"}
                      >
                        {user?.avatar?.secure_url ? (
                          <Image
                            src={user?.avatar?.secure_url}
                            h={10}
                            w={10}
                            rounded={"full"}
                            shadow={"sm"}
                          />
                        ) : (
                          <Box h={10} w={10} rounded={"full"} shadow={"sm"}>
                            <AiOutlineUser width={"full"} height={"full"} />
                          </Box>
                        )}
                      </Td>
                      <Td p="1" verticalAlign={"text-center"}>
                        {user?.fullName}
                      </Td>
                      <Td p="1" verticalAlign={"text-center"}>
                        {user?.email}
                      </Td>
                      <Td
                        p="1"
                        textAlign={"center"}
                        verticalAlign={"text-center"}
                      >
                        {user?.phoneNumber}
                      </Td>
                      <Td
                        p="1"
                        textAlign={"center"}
                        verticalAlign={"text-center"}
                      >
                        {user?.isActive ? "Active" : "Inactive"}
                      </Td>
                      <Td
                        p="1"
                        textAlign={"center"}
                        verticalAlign={"text-center"}
                      >
                        {user?.role === Number(process.env.REACT_APP_ADMIN_ROLE)
                          ? "Admin"
                          : "User"}
                      </Td>
                      <Td
                        p="1"
                        textAlign={"center"}
                        verticalAlign={"text-center"}
                      >
                        {user?.loginCount}
                      </Td>
                      <Td p="1" textAlign={"center"}>
                        <DeleteUser
                          key={user?._id}
                          deleteUserIsOpen={isOpen}
                          deleteUserOnClose={onClose}
                          deleteUserOnOpen={onOpen}
                          id={user?._id}
                          role="admin"
                        />
                      </Td>
                    </Tr>
                  );
                })
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </Layout>
  );
};

export default Users;