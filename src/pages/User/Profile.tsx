import {
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
import DeleteUser from "../../components/Modals/DeleteUser";
import DeleteAddress from "../../components/Modals/DeleteAddress";
import UpdateAddress from "../../components/Modals/UpdateAddress";
import { useState } from "react";

// defining the type of address
interface Iaddress {
  fullName: string;
  phoneNumber: string;
  houseNumber: string;
  city: string;
  state: string;
  pinCode: string;
}

const Profile = () => {
  const fullName = "Vinay Pratap Singh";
  const userImage = "";
  const email = "test@gmail.com";
  const phoneNumber = 9087654321;
  const [currentAddressIndex, setCurrentAddressIndex] = useState(0);

  // for managing the modals state
  const {
    isOpen: updateProfileIsOpen,
    onOpen: updateProfileOnOpen,
    onClose: updateProfileOnClose,
  } = useDisclosure();
  const {
    isOpen: deleteUserIsOpen,
    onOpen: deleteUserOnOpen,
    onClose: deleteUserOnClose,
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

  const addresses: Iaddress[] = [
    {
      fullName: "Vinay",
      phoneNumber: "9999999999",
      houseNumber: "123-45",
      city: "gorakhpur",
      state: "UP",
      pinCode: "273209",
    },
    {
      fullName: "Harvi",
      phoneNumber: "1234567890",
      houseNumber: "123-45",
      city: "Ayodhya",
      state: "UP",
      pinCode: "213456",
    },
    {
      fullName: "Vinay Pratap Singh",
      phoneNumber: "1234567890",
      houseNumber: "123-45",
      city: "Ayodhya",
      state: "UP",
      pinCode: "213456",
    },
  ];

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

  return (
    <VStack h={"100vh"} overflow={"hidden"} p={10} gap={5}>
      <Heading fontSize={"2xl"}>
        Welcome{" "}
        <Text as={"span"} color={"orange.500"}>
          {fullName}
        </Text>{" "}
        to your profile
      </Heading>

      <HStack gap={10} alignItems={"stretch"} h={"330px"}>
        {/* for user's personal information */}
        <VStack
          alignSelf={"center"}
          alignContent={"center"}
          shadow={"md"}
          p={3}
          borderRadius={5}
        >
          <Heading fontSize={"xl"}>Personal Details</Heading>
          {userImage ? (
            <Image
              h={40}
              w={40}
              borderRadius={"full"}
              src={userImage}
              alt="user image"
            />
          ) : (
            <BiUser fontSize={80} />
          )}

          <Grid templateColumns="repeat(2,1fr)" gap={2} fontWeight={"semibold"}>
            <GridItem>Full Name</GridItem>
            <GridItem>{fullName}</GridItem>
            <GridItem>Email</GridItem>
            <GridItem>{email}</GridItem>
            <GridItem>Phone Number</GridItem>
            <GridItem>{phoneNumber}</GridItem>
            <GridItem>
              <UpdateProfile
                updateProfileIsOpen={updateProfileIsOpen}
                updateProfileOnClose={updateProfileOnClose}
                updateProfileOnOpen={updateProfileOnOpen}
              />
            </GridItem>
            <GridItem>
              <Link as={RouterLink} to={"/auth/reset/change-password"}>
                <Button colorScheme="yellow" color={"white"}>
                  Change Password
                </Button>
              </Link>
            </GridItem>
            <GridItem colSpan={2}>
              <DeleteUser
                deleteUserIsOpen={deleteUserIsOpen}
                deleteUserOnClose={deleteUserOnClose}
                deleteUserOnOpen={deleteUserOnOpen}
              />
            </GridItem>
          </Grid>
        </VStack>

        {/* for user's address */}
        <VStack
          alignSelf={"stretch"}
          justifyContent={"center"}
          shadow={"md"}
          p={3}
          borderRadius={5}
        >
          <HStack w={"full"} justifyContent={"space-between"}>
            <Button
              disabled={currentAddressIndex === 0}
              onClick={getPreviousAddress}
            >
              <GrFormPrevious />
            </Button>
            <Heading fontSize={"xl"}>Your Addresses</Heading>
            <Button
              disabled={addresses.length === currentAddressIndex + 1}
              onClick={getNextAddress}
            >
              <GrFormNext />
            </Button>
          </HStack>

          <HStack gap={5}>
            {addresses.length === 0 ? (
              <Text fontWeight={"semibold"}>Oops! No address found</Text>
            ) : (
              <Grid
                templateColumns="repeat(2,1fr)"
                gap={2}
                fontWeight={"semibold"}
              >
                <GridItem>Full Name</GridItem>
                <GridItem>{addresses[currentAddressIndex]?.fullName}</GridItem>
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
                <GridItem>{addresses[currentAddressIndex]?.pinCode}</GridItem>
                <GridItem>
                  <UpdateAddress
                    updateAddressIsOpen={updateAddressIsOpen}
                    updateAddressOnClose={updateAddressOnClose}
                    updateAddressOnOpen={updateAddressOnOpen}
                    data={addresses[currentAddressIndex]}
                  />
                </GridItem>
                <GridItem>
                  <DeleteAddress
                    deleteAddressIsOpen={deleteAddressIsOpen}
                    deleteAddressOnClose={deleteAddressOnClose}
                    deleteAddressOnOpen={deleteAddressOnOpen}
                  />
                </GridItem>
              </Grid>
            )}
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default Profile;
