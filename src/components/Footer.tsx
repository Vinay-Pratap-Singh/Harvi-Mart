import {
  HStack,
  Link,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { BsGithub, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { GrContact } from "react-icons/gr";
import { GiNewspaper } from "react-icons/gi";
import { FiExternalLink } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  return (
    <VStack px={10} mb={5} fontWeight={"semibold"}>
      <HStack w={"full"} justifyContent={"space-between"}>
        <Text display={"flex"} alignItems={"center"} gap={1}>
          All rights reserved by{" "}
          <Link
            as={RouterLink}
            to={"https://harvi.me/"}
            target="_blank"
            rel="noreferrer"
            color={"orange.500"}
            fontWeight={"bold"}
            display={"flex"}
            alignItems={"center"}
            gap={1}
          >
            Harvi
            <FiExternalLink />
          </Link>
        </Text>

        {/* adding pages navigation */}
        <UnorderedList
          display={"flex"}
          alignContent={"center"}
          gap={10}
          listStyleType={"none"}
        >
          <ListItem>
            <Link
              as={RouterLink}
              to={"#"}
              display={"flex"}
              alignItems={"center"}
              gap={1}
              _hover={{ color: "primaryColor" }}
            >
              <GiNewspaper fontSize={20} /> <Text>Terms & Conditions</Text>
            </Link>
          </ListItem>
          <ListItem>
            <Link
              as={RouterLink}
              to={"#"}
              display={"flex"}
              alignItems={"center"}
              gap={1}
              _hover={{ color: "primaryColor" }}
            >
              <MdOutlinePrivacyTip fontSize={20} /> <Text>Privacy Policy</Text>
            </Link>
          </ListItem>
          <ListItem>
            <Link
              as={RouterLink}
              to={"#"}
              display={"flex"}
              alignItems={"center"}
              gap={1}
              _hover={{ color: "primaryColor" }}
            >
              <GrContact fontSize={20} /> <Text>Contact Us</Text>
            </Link>
          </ListItem>
        </UnorderedList>

        {/* adding the social links */}
        <UnorderedList
          display={"flex"}
          alignContent={"center"}
          gap={5}
          listStyleType={"none"}
          fontSize={22}
        >
          <ListItem
            _hover={{ color: "primaryColor" }}
            transition={"all 0.15s ease-in-out"}
          >
            <Link as={RouterLink} to={"https://github.com/Vinay-Pratap-Singh"}>
              <BsGithub />
            </Link>
          </ListItem>

          <ListItem
            _hover={{ color: "primaryColor" }}
            transition={"all 0.15s ease-in-out"}
          >
            <Link
              as={RouterLink}
              to={
                "https://www.linkedin.com/in/vinay-pratap-singh-harvi-4b265a212/"
              }
            >
              <BsLinkedin />
            </Link>
          </ListItem>

          <ListItem
            _hover={{ color: "primaryColor" }}
            transition={"all 0.15s ease-in-out"}
          >
            <Link
              as={RouterLink}
              to={"https://www.instagram.com/itsmevinayhere/"}
            >
              <BsInstagram />
            </Link>
          </ListItem>

          <ListItem
            _hover={{ color: "primaryColor" }}
            transition={"all 0.15s ease-in-out"}
          >
            <Link as={RouterLink} to={"https://twitter.com/harvi2001"}>
              <BsTwitter />
            </Link>
          </ListItem>
        </UnorderedList>
      </HStack>
      <Text>Made with ❤️ by Harvi</Text>
    </VStack>
  );
};

export default Footer;
