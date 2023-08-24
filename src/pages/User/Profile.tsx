import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { BiUser } from "react-icons/bi";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { Link as RouterLink } from "react-router-dom";
import UpdateProfile from "../../components/Modals/UpdateProfile";
import DeleteAddress from "../../components/AlertBox/DeleteAddress";
import UpdateAddress from "../../components/Modals/UpdateAddress";
import { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import { Iaddress } from "../../helper/interfaces";
import AddAddress from "../../components/Modals/AddAddress";
import { getLoggedInUserData } from "../../redux/authSlice";
import UserProfileShimmer from "../../shimmer/UserProfileShimmer";
import AddressShimmer from "../../shimmer/AddressShimmer";
import { Helmet } from "react-helmet";
import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../helper/Hooks/redux";

const Profile = () => {
  const dispatch = useAppDispatch();
  const [currentAddressIndex, setCurrentAddressIndex] = useState(0);

  // getting the details of user
  const { userDetails, loading } = useAppSelector((state) => state.auth);
  const addresses: Iaddress[] = userDetails.addresses;
  const userData: { imageURL: string; name: string } = {
    imageURL: userDetails?.avatar?.secure_url
      ? userDetails?.avatar?.secure_url
      : "",
    name: userDetails?.fullName,
  };

  // for managing the modals state
  const {
    isOpen: updateProfileIsOpen,
    onOpen: updateProfileOnOpen,
    onClose: updateProfileOnClose,
  } = useDisclosure();
  const {
    isOpen: deleteAddressIsOpen,
    onOpen: deleteAddressOnOpen,
    onClose: deleteAddressOnClose,
  } = useDisclosure();
  const {
    isOpen: updateAddressIsOpen,
    onOpen: updateAddressOnOpen,
    onClose: updateAddressOnClose,
  } = useDisclosure();
  const {
    isOpen: addAddressIsOpen,
    onOpen: addAddressOnOpen,
    onClose: addAddressOnClose,
  } = useDisclosure();

  // function to get previous address
  const getPreviousAddress = () => {
    if (currentAddressIndex !== 0) {
      setCurrentAddressIndex(currentAddressIndex - 1);
      return;
    }
    return;
  };

  // function to get next address
  const getNextAddress = () => {
    if (currentAddressIndex + 1 < addresses.length) {
      setCurrentAddressIndex(currentAddressIndex + 1);
      return;
    }
    return;
  };

  // for fetching the addresses
  useEffect(() => {
    if (!addresses.length || !addresses[0]._id) {
      dispatch(getLoggedInUserData());
    }
  }, [addresses, dispatch]);

  // for updating the currentIndex
  useEffect(() => {
    setCurrentAddressIndex(0);
  }, [userDetails]);

  return (
    <Layout>
      {/* adding the dynamic meta data */}
      <Helmet>
        <title>Profile</title>
        <meta
          name="description"
          content="Your Personal Profile at Harvi Mart - Your one-stop hub for account details, saved addresses, and personalized information. Access and manage your account settings effortlessly. Experience seamless user control and enjoy a tailor-made shopping experience. Your preferences matter at Harvi Mart."
        />
      </Helmet>

      <VStack
        p={5}
        gap={[3, 3, 5, 10]}
        minH={"70vh"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Heading
          fontSize={["lg", "lg", "2xl"]}
          textAlign={["center", "center", "initial"]}
        >
          Welcome{" "}
          <Text as={"span"} color={"orange.500"}>
            {userDetails?.fullName}
          </Text>{" "}
          to your profile
        </Heading>

        <Stack
          direction={["column", "column", "column", "row"]}
          gap={[4, 4, 8, 10]}
          alignItems={"stretch"}
        >
          {/* for user's personal information */}
          {loading ? (
            <UserProfileShimmer />
          ) : (
            <VStack
              alignSelf={"center"}
              alignContent={"center"}
              shadow={"md"}
              p={3}
              borderRadius={5}
              width={["full", "full", 96]}
            >
              <Heading fontSize={"xl"}>Personal Details</Heading>
              {userDetails?.avatar?.secure_url ? (
                <Image
                  h={32}
                  w={32}
                  borderRadius={"full"}
                  src={userDetails?.avatar?.secure_url}
                  alt="user profile image"
                />
              ) : (
                <BiUser fontSize={80} />
              )}

              <Grid
                templateColumns="repeat(2,1fr)"
                columnGap={2}
                rowGap={[1, 1, 2]}
                fontWeight={"semibold"}
                fontSize={["sm", "sm", "initial"]}
              >
                <GridItem>Full Name</GridItem>
                <GridItem>{userDetails?.fullName}</GridItem>
                <GridItem>Email</GridItem>
                <GridItem>{userDetails?.email}</GridItem>
                <GridItem>Phone Number</GridItem>
                <GridItem>{userDetails?.phoneNumber}</GridItem>
                <GridItem>
                  <UpdateProfile
                    key={nanoid()}
                    updateProfileIsOpen={updateProfileIsOpen}
                    updateProfileOnClose={updateProfileOnClose}
                    updateProfileOnOpen={updateProfileOnOpen}
                    data={{
                      ...userData,
                    }}
                  />
                </GridItem>
                <GridItem>
                  <Link as={RouterLink} to={"/auth/reset/change-password"}>
                    <Button colorScheme="gray" fontSize={"15px"} w={"full"}>
                      Change Password
                    </Button>
                  </Link>
                </GridItem>
              </Grid>
            </VStack>
          )}

          {/* for user's address */}
          {loading ? (
            <AddressShimmer />
          ) : (
            <VStack
              alignSelf={"stretch"}
              justifyContent={"flex-start"}
              shadow={"md"}
              p={3}
              borderRadius={5}
              width={["full", "full", 96]}
              pos={"relative"}
            >
              <HStack w={"full"} justifyContent={"space-between"}>
                <Button
                  disabled={currentAddressIndex === 0}
                  size={"sm"}
                  p={0}
                  onClick={getPreviousAddress}
                >
                  <GrFormPrevious size={"25px"} />
                </Button>
                <Heading fontSize={"xl"}>Your Addresses</Heading>
                <Button
                  disabled={addresses.length === currentAddressIndex + 1}
                  size={"sm"}
                  p={0}
                  onClick={getNextAddress}
                >
                  <GrFormNext size={"25px"} />
                </Button>
              </HStack>

              <HStack w={"full"} gap={5}>
                {addresses.length === 0 ? (
                  <VStack
                    w={"full"}
                    fontWeight={"semibold"}
                    textAlign={"center"}
                  >
                    <HStack>
                      <Text>Oops! No address found</Text>
                      <Text
                        as={"span"}
                        color={"primaryColor"}
                        fontWeight={"bold"}
                      >
                        :(
                      </Text>
                    </HStack>
                    <Box w={"93%"} pos={"absolute"} bottom={3}>
                      <AddAddress
                        key={nanoid()}
                        addAddressIsOpen={addAddressIsOpen}
                        addAddressOnClose={addAddressOnClose}
                        addAddressOnOpen={addAddressOnOpen}
                        title="Add"
                      />
                    </Box>
                  </VStack>
                ) : (
                  <VStack w={"full"}>
                    <Grid
                      templateColumns="repeat(2,1fr)"
                      w={"full"}
                      columnGap={2}
                      rowGap={[1, 1, 2]}
                      fontWeight={"semibold"}
                      fontSize={["sm", "sm", "initial"]}
                    >
                      <GridItem>Full Name</GridItem>
                      <GridItem>
                        {addresses[currentAddressIndex]?.name}
                      </GridItem>
                      <GridItem>Phone Number</GridItem>
                      <GridItem>
                        {addresses[currentAddressIndex]?.phoneNumber}
                      </GridItem>
                      <GridItem>House Number</GridItem>
                      <GridItem>
                        {addresses[currentAddressIndex]?.houseNumber}
                      </GridItem>
                      <GridItem>City</GridItem>
                      <GridItem>
                        {addresses[currentAddressIndex]?.city}
                      </GridItem>
                      <GridItem>State</GridItem>
                      <GridItem>
                        {addresses[currentAddressIndex]?.state}
                      </GridItem>
                      <GridItem>Pin Code</GridItem>
                      <GridItem>
                        {addresses[currentAddressIndex]?.pinCode}
                      </GridItem>
                    </Grid>

                    {/* adding the buttons */}
                    <VStack
                      w={["full", "full", "full", "93%"]}
                      pos={["initial", "initial", "initial", "absolute"]}
                      bottom={3}
                    >
                      <HStack w={"full"}>
                        <AddAddress
                          addAddressIsOpen={addAddressIsOpen}
                          addAddressOnClose={addAddressOnClose}
                          addAddressOnOpen={addAddressOnOpen}
                          title="Add"
                          key={nanoid()}
                        />
                        <UpdateAddress
                          key={addresses[currentAddressIndex]?._id + "-updates"}
                          updateAddressIsOpen={updateAddressIsOpen}
                          updateAddressOnClose={updateAddressOnClose}
                          updateAddressOnOpen={updateAddressOnOpen}
                          data={addresses[currentAddressIndex]}
                        />
                        <DeleteAddress
                          key={addresses[currentAddressIndex]?._id + "-deletes"}
                          deleteAddressIsOpen={deleteAddressIsOpen}
                          deleteAddressOnClose={deleteAddressOnClose}
                          deleteAddressOnOpen={deleteAddressOnOpen}
                          id={addresses[currentAddressIndex]?._id ?? ""}
                        />
                      </HStack>
                    </VStack>
                  </VStack>
                )}
              </HStack>
            </VStack>
          )}
        </Stack>
      </VStack>
    </Layout>
  );
};

export default Profile;
