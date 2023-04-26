import {
  Button,
  HStack,
  Heading,
  Image,
  Link,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { BiPackage, BiUser, BiUserCircle } from "react-icons/bi";
import { AiOutlineProfile } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  const isUserLoggedIn = true;
  const userProfileImage = "";
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack justifyContent={"space-between"} alignItems={"center"} px={10}>
      {/* adding the logo */}
      <Image w="28" src={logo} />

      {/* creating the menu list */}
      <UnorderedList
        display={"flex"}
        alignItems={"center"}
        listStyleType={"none"}
        gap={10}
        fontWeight={500}
      >
        <ListItem>
          <Link as={RouterLink} href="#">
            Home
          </Link>
        </ListItem>

        <ListItem>
          <Link as={RouterLink} href="#">
            About
          </Link>
        </ListItem>

        <ListItem>
          <Link as={RouterLink} href="#">
            Contact
          </Link>
        </ListItem>

        <ListItem>
          <Link as={RouterLink} href="#">
            Wishlist
          </Link>
        </ListItem>

        {!isUserLoggedIn ? (
          <ListItem>
            <Button>Login</Button>
          </ListItem>
        ) : (
          <ListItem>
            <BiUser onClick={onOpen} size={20} cursor={"pointer"} />
            <Modal isOpen={isOpen} onClose={onClose} size={"sm"}>
              <ModalOverlay
                bg="blackAlpha.300"
                backdropFilter="blur(2px) hue-rotate(90deg)"
              />
              <ModalContent p={0}>
                <ModalCloseButton />
                <ModalBody p={3}>
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
                      <Button colorScheme="red">Logout</Button>
                    </ListItem>
                  </UnorderedList>
                </ModalBody>
              </ModalContent>
            </Modal>
          </ListItem>
        )}
      </UnorderedList>
    </HStack>
  );
};

export default Header;
