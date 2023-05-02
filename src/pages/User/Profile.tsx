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
import { Link as RouterLink } from "react-router-dom";
import UpdateProfile from "../../components/Modals/UpdateProfile";

// defining the type of address
interface Iaddress {
  name: string;
  phoneNumber: number;
  houseNumber: string;
  city: string;
  state: string;
  pinCode: number;
}

const Profile = () => {
  const fullName = "Vinay Pratap Singh";
  const userImage = "";
  const email = "test@gmail.com";
  const phoneNumber = 9087654321;
  const {
    isOpen: isUpdateProfileIsOpen,
    onOpen: isUpdateProfileOnOpen,
    onClose: isUpdateProfileOnClose,
  } = useDisclosure();

  const addresses: Iaddress[] = [
    {
      name: "Vinay",
      phoneNumber: 9999999999,
      houseNumber: "123-45",
      city: "gorakhpur",
      state: "UP",
      pinCode: 273209,
    },
    {
      name: "Harvi",
      phoneNumber: 1234567890,
      houseNumber: "123-45",
      city: "Ayodhya",
      state: "UP",
      pinCode: 213456,
    },
  ];

  return (
    <VStack h={"100vh"} overflow={"hidden"} p={10} gap={5}>
      <Heading fontSize={"2xl"}>
        Welcome{" "}
        <Text as={"span"} color={"orange.500"}>
          {fullName}
        </Text>{" "}
        to your profile
      </Heading>

      <HStack gap={10}>
        {/* for user's personal information */}
        <VStack alignSelf={"flex-start"} shadow={"md"} p={3} borderRadius={5}>
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
                isUpdateProfileIsOpen={isUpdateProfileIsOpen}
                isUpdateProfileOnClose={isUpdateProfileOnClose}
                isUpdateProfileOnOpen={isUpdateProfileOnOpen}
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
              <Button w={"full"} colorScheme="red" color={"white"}>
                Delete Account
              </Button>
            </GridItem>
          </Grid>
        </VStack>

        {/* for user's address */}
        <VStack
          overflowX={"scroll"}
          minW={96}
          alignSelf={"flex-start"}
          shadow={"md"}
          p={3}
          borderRadius={5}
        >
          <Heading fontSize={"xl"}>Your Address</Heading>
          <HStack gap={5}>
            {addresses.length === 0 ? (
              <Text fontWeight={"semibold"}>Oops! No address found</Text>
            ) : (
              addresses.map((element, index) => {
                return (
                  <Grid
                    key={index}
                    templateColumns="repeat(2,1fr)"
                    gap={2}
                    fontWeight={"semibold"}
                  >
                    <GridItem>Full Name</GridItem>
                    <GridItem>{element.name}</GridItem>
                    <GridItem>Phone Number</GridItem>
                    <GridItem>{element.phoneNumber}</GridItem>
                    <GridItem>House Number</GridItem>
                    <GridItem>{element.houseNumber}</GridItem>
                    <GridItem>City</GridItem>
                    <GridItem>{element.city}</GridItem>
                    <GridItem>State</GridItem>
                    <GridItem>{element.state}</GridItem>
                    <GridItem>Pin Code</GridItem>
                    <GridItem>{element.pinCode}</GridItem>
                    <GridItem>
                      <Button colorScheme="orange">Update Address</Button>
                    </GridItem>
                    <GridItem>
                      <Button colorScheme="red">Delete Address</Button>
                    </GridItem>
                  </Grid>
                );
              })
            )}
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default Profile;
