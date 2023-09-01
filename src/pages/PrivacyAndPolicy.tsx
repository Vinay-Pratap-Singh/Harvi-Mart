import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Image,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import Layout from "./Layout/Layout";
import privacyAndPolicy from "../assets/privacyAndPolicy.png";

const PrivacyAndPolicy = () => {
  return (
    <Layout>
      {/* adding the dynamic meta data */}
      <Helmet>
        <title>Term and Condition</title>
        <meta
          name="description"
          content="Discover Harvi Mart's Privacy Policy | Learn How We Safeguard Your Data | Strong Encryption, User Verification, and Data Security | Your Privacy Matters to Us"
        />
      </Helmet>

      <VStack w={"full"} minH={"70vh"} gap={5}>
        <Heading
          textAlign={["center", "center", "center", "initial"]}
          fontSize={["xl", "xl", "2xl", "3xl"]}
          w={["full", "full", "full", "auto"]}
        >
          Welcome to the{" "}
          <Text as={"span"} color={"primaryColor"}>
            Privacy and Policy Page
          </Text>
        </Heading>

        <Stack
          w={"full"}
          direction={["column", "column", "column", "row"]}
          gap={5}
          py={5}
          px={"5"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Image src={privacyAndPolicy} alt="privacy and policy" h={"350px"} />

          {/* adding the accordion for disclaimers detail */}
          <Accordion
            allowToggle
            w={["full", "full", "full", "500px"]}
            boxShadow={"md"}
            alignSelf={"flex-start"}
          >
            <AccordionItem>
              <Heading as={"h2"}>
                <AccordionButton fontWeight={"semibold"}>
                  <Box as="span" flex="1" textAlign="left">
                    Account Information
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Heading>
              <AccordionPanel pb={4} color={"gray.600"}>
                When you create an account on Harvi Mart, we may collect the
                following information:
                <UnorderedList>
                  <ListItem>Name</ListItem>
                  <ListItem>Email</ListItem>
                  <ListItem>Phone number</ListItem>
                  <ListItem>Password (Encrypted)</ListItem>
                </UnorderedList>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <Heading as={"h2"}>
                <AccordionButton fontWeight={"semibold"}>
                  <Box as="span" flex="1" textAlign="left">
                    Dummy Payment Information
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Heading>
              <AccordionPanel pb={4} color={"gray.600"}>
                As part of our educational practice, we may collect dummy
                payment information for testing purposes. Please note that this
                information is for simulation only and is not used for actual
                transactions.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <Heading as={"h2"}>
                <AccordionButton fontWeight={"semibold"}>
                  <Box as="span" flex="1" textAlign="left">
                    Data Usage
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Heading>
              <AccordionPanel pb={4} color={"gray.600"}>
                Your account information is used solely for authentication and
                account management purposes. We implement strong encryption to
                ensure the security of your password and personal details.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <Heading as={"h2"}>
                <AccordionButton fontWeight={"semibold"}>
                  <Box as="span" flex="1" textAlign="left">
                    Data Security
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Heading>
              <AccordionPanel pb={4} color={"gray.600"}>
                We take data security seriously. Our measures include strong
                encryption, user verification, and regular security assessments
                to protect your information.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <Heading as={"h2"}>
                <AccordionButton fontWeight={"semibold"}>
                  <Box as="span" flex="1" textAlign="left">
                    Data Sharing
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Heading>
              <AccordionPanel pb={4} color={"gray.600"}>
                We do not sell, rent, or share your personal information with
                third parties for any commercial purposes. Your data is strictly
                used for educational and practice purposes within the Harvi Mart
                project.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <Heading as={"h2"}>
                <AccordionButton fontWeight={"semibold"}>
                  <Box as="span" flex="1" textAlign="left">
                    Cookies and Tracking
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Heading>
              <AccordionPanel pb={4} color={"gray.600"}>
                Harvi Mart may use cookies and similar technologies to enhance
                your user experience. You can adjust your browser settings to
                manage or disable cookies.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <Heading as={"h2"}>
                <AccordionButton fontWeight={"semibold"}>
                  <Box as="span" flex="1" textAlign="left">
                    Changes to Privacy Policy
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Heading>
              <AccordionPanel pb={4} color={"gray.600"}>
                We reserve the right to update or modify this Privacy Policy as
                needed. Any changes will be posted on this page. Continued use
                of the website implies acceptance of these modifications.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Stack>
      </VStack>
    </Layout>
  );
};

export default PrivacyAndPolicy;
