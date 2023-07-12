import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Link,
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
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUserData } from "../../redux/authSlice";

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [currentAddressIndex, setCurrentAddressIndex] = useState(0);

  // getting the details of user
  const { userDetails } = useSelector((state: RootState) => state.auth);
  const addresses: Iaddress[] = userDetails.addresses;
  const [userData, setUserData] = useState({
    imageURL: userDetails?.avatar?.secure_url
      ? userDetails?.avatar?.secure_url
      : "",
    name: userDetails?.fullName,
  });

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
    (async () => {
      await dispatch(getLoggedInUserData());
    })();
  }, []);

  // for updating the currentIndex
  useEffect(() => {
    setCurrentAddressIndex(0);
  }, [userDetails]);

  return (
    <Layout>
      {" "}
      <VStack p={5} gap={10}>
        <Heading fontSize={"2xl"}>
          Welcome{" "}
          <Text as={"span"} color={"orange.500"}>
            {userDetails?.fullName}
          </Text>{" "}
          to your profile
        </Heading>

        <HStack gap={10} alignItems={"stretch"}>
          {/* for user's personal information */}
          <VStack
            alignSelf={"center"}
            alignContent={"center"}
            shadow={"md"}
            p={3}
            borderRadius={5}
            width={96}
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
              gap={2}
              fontWeight={"semibold"}
            >
              <GridItem>Full Name</GridItem>
              <GridItem>{userDetails?.fullName}</GridItem>
              <GridItem>Email</GridItem>
              <GridItem>{userDetails?.email}</GridItem>
              <GridItem>Phone Number</GridItem>
              <GridItem>{userDetails?.phoneNumber}</GridItem>
              <GridItem>
                <UpdateProfile
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

          {/* for user's address */}
          <VStack
            alignSelf={"stretch"}
            justifyContent={"flex-start"}
            shadow={"md"}
            p={3}
            borderRadius={5}
            width={96}
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
                <VStack w={"full"} fontWeight={"semibold"} textAlign={"center"}>
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
                      addAddressIsOpen={addAddressIsOpen}
                      addAddressOnClose={addAddressOnClose}
                      addAddressOnOpen={addAddressOnOpen}
                    />
                  </Box>
                </VStack>
              ) : (
                <VStack w={"full"}>
                  <Grid
                    templateColumns="repeat(2,1fr)"
                    gap={2}
                    fontWeight={"semibold"}
                    w={"full"}
                  >
                    <GridItem>Full Name</GridItem>
                    <GridItem>{addresses[currentAddressIndex]?.name}</GridItem>
                    <GridItem>Phone Number</GridItem>
                    <GridItem>
                      {addresses[currentAddressIndex]?.phoneNumber}
                    </GridItem>
                    <GridItem>House Number</GridItem>
                    <GridItem>
                      {addresses[currentAddressIndex]?.houseNumber}
                    </GridItem>
                    <GridItem>City</GridItem>
                    <GridItem>{addresses[currentAddressIndex]?.city}</GridItem>
                    <GridItem>State</GridItem>
                    <GridItem>{addresses[currentAddressIndex]?.state}</GridItem>
                    <GridItem>Pin Code</GridItem>
                    <GridItem>
                      {addresses[currentAddressIndex]?.pinCode}
                    </GridItem>
                  </Grid>

                  {/* adding the buttons */}
                  <VStack w={"93%"} pos={"absolute"} bottom={3}>
                    <HStack w={"full"}>
                      <AddAddress
                        addAddressIsOpen={addAddressIsOpen}
                        addAddressOnClose={addAddressOnClose}
                        addAddressOnOpen={addAddressOnOpen}
                      />
                      <UpdateAddress
                        updateAddressIsOpen={updateAddressIsOpen}
                        updateAddressOnClose={updateAddressOnClose}
                        updateAddressOnOpen={updateAddressOnOpen}
                        data={addresses[currentAddressIndex]}
                      />
                      <DeleteAddress
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
        </HStack>
      </VStack>
    </Layout>
  );
};

export default Profile;
