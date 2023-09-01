import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  Heading,
  Image,
  Link,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Helmet } from "react-helmet";
import Layout from "./Layout/Layout";
import { Link as RouterLink } from "react-router-dom";
import DisclaimerImage from "../assets/disclaimer.jpg";

const Disclaimer = () => {
  return (
    <Layout>
      {/* adding the dynamic meta data */}
      <Helmet>
        <title>Harvi Mart</title>
        <meta
          name="description"
          content="Welcome to Harvi Mart - Your Ultimate Shopping Destination. Discover a world of top-quality products, from electronics and fashion to home decor. Explore our website and start your shopping journey with confidence. Click to browse our extensive collection and find the perfect items that match your style and preferences."
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
            Disclaimer Page
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
          <Image src={DisclaimerImage} alt="disclaimer" h={"350px"} />

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
                    Educational and Practice Purposes
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Heading>
              <AccordionPanel pb={4} fontWeight={"medium"} color={"gray.500"}>
                Harvimart is a project created for educational and practice
                purposes. The products displayed on this website, except for the
                images from Freepik, have been added by the site owner for
                demonstration purposes only. These products are not real, and no
                actual transactions or deliveries will take place.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <Heading as={"h2"}>
                <AccordionButton fontWeight={"semibold"}>
                  <Box as="span" flex="1" textAlign="left">
                    Dummy Payments
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Heading>
              <AccordionPanel pb={4} fontWeight={"medium"} color={"gray.500"}>
                Users have the option to make dummy payments for the products as
                a part of the testing process. These payments are for simulation
                purposes only and will not result in any actual charges or
                product deliveries.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <Heading as={"h2"}>
                <AccordionButton fontWeight={"semibold"}>
                  <Box as="span" flex="1" textAlign="left">
                    Product Images
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Heading>
              <AccordionPanel pb={4} fontWeight={"medium"} color={"gray.500"}>
                All images used on this website, except those from{" "}
                <Link as={RouterLink} to={"https://www.freepik.com/"}>
                  Freepik
                </Link>
                , are for illustrative purposes and do not represent real
                products. Any resemblance to actual products is purely
                coincidental.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <Heading as={"h2"}>
                <AccordionButton fontWeight={"semibold"}>
                  <Box as="span" flex="1" textAlign="left">
                    No Legal Obligation
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Heading>
              <AccordionPanel pb={4} fontWeight={"medium"} color={"gray.500"}>
                Harvimart does not have any legal obligation to fulfill orders
                or deliver products displayed on the website, as they are solely
                for educational and practice purposes.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <Heading as={"h2"}>
                <AccordionButton fontWeight={"semibold"}>
                  <Box as="span" flex="1" textAlign="left">
                    Updates to Disclaimer
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Heading>
              <AccordionPanel pb={4} fontWeight={"medium"} color={"gray.500"}>
                Harvimart reserves the right to update or modify this disclaimer
                as needed. Users are encouraged to check this page periodically
                for any changes. Continued use of the website implies acceptance
                of any modifications.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Stack>
      </VStack>
    </Layout>
  );
};

export default Disclaimer;
