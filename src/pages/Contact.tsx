import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import myImage from "../assets/contactPage.jpg";
import { Link as RouterLink } from "react-router-dom";
import { BiArrowBack, BiUser } from "react-icons/bi";
import { Helmet } from "react-helmet";
import Layout from "./Layout/Layout";
import { HiOutlineMail } from "react-icons/hi";

const Contact = () => {
  return (
    <Layout>
      {/* adding the dynamic meta data */}
      <Helmet>
        <title>Contact Us</title>
        <meta
          name="description"
          content="Get in touch with Harvi Mart - We're here to assist you! Whether you have questions, feedback, or good wishes, our friendly team is ready to help. Contact us for a seamless shopping experience and excellent customer support. We value your input and look forward to hearing from you."
        />
      </Helmet>

      <Box
        my={5}
        minH={["auto", "auto", "auto", "70vh"]}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <form name="contact" method="post" data-netlify="true">
          {/* for netlify bot */}
          <input type="hidden" name="form-name" value="contact" />

          <HStack
            gap={[4, 8]}
            w={"full"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={["column", "column", "row"]}
            pb={[5, 5, 0]}
          >
            <Image
              src={myImage}
              alt="contact us page image"
              h={["auto", "auto", "300px", "300px", "450px"]}
              w={["98%", "98%", "350px", "420px", "auto"]}
            />

            {/* for contact form card */}
            <VStack
              boxShadow={"md"}
              h={["auto", "auto", "full"]}
              w={["90%", "full", "23rem"]}
              p={[2, 2, 5]}
              gap={1}
              borderRadius={"5px"}
            >
              <Heading display={"flex"} gap={2} size={"lg"} fontSize={"2xl"}>
                Contact Us <Text color="orange.500">:)</Text>
              </Heading>

              {/* for name */}
              {/* <label className="contact-form-label">
                Your Full Name
                <input
                  className="contact-form-input"
                  type="text"
                  placeholder="Vinay Pratap Singh"
                  required
                  minLength={5}
                />
              </label> */}

              {/* for email */}
              {/* <label className="contact-form-label">
                Your Email
                <input
                  className="contact-form-input"
                  type="email"
                  placeholder="test@gmail.com"
                  required
                  pattern="/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/"
                />
              </label> */}

              {/* for message */}
              {/* <label className="contact-form-label">
                Message
                <textarea
                  className="contact-form-textarea"
                  placeholder="Enter your message..."
                  required
                  minLength={20}
                />
              </label> */}

              {/* for name */}
              <FormControl>
                <FormLabel fontSize={"sm"} htmlFor="name">
                  Your Full Name
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    fontSize={"xl"}
                    color={"orange.500"}
                    children={<BiUser />}
                  />
                  <Input
                    type="text"
                    focusBorderColor="primaryColor"
                    placeholder="Vinay Pratap Singh Harvi"
                    required
                    minLength={3}
                    name="name"
                    id="name"
                  />
                </InputGroup>
              </FormControl>

              {/* for email */}
              <FormControl>
                <FormLabel fontSize={"sm"} htmlFor="email">
                  Your Email
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    fontSize={"xl"}
                    color={"orange.500"}
                    children={<HiOutlineMail />}
                  />
                  <Input
                    type="email"
                    focusBorderColor="primaryColor"
                    placeholder="test@gmail.com"
                    required
                    pattern="/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/"
                    name="email"
                    id="email"
                  />
                </InputGroup>
              </FormControl>

              {/* for message */}
              <FormControl pos={"relative"}>
                <FormLabel fontSize={"sm"} htmlFor="message">
                  Message
                </FormLabel>
                <Textarea
                  height={24}
                  focusBorderColor="primaryColor"
                  resize={"none"}
                  placeholder="Enter your message..."
                  required
                  minLength={20}
                  name="message"
                  id="message"
                />
              </FormControl>

              {/* submit button */}
              <Button type="submit" w={"full"} colorScheme="orange">
                Send Message
              </Button>

              {/* go to homepage */}
              <Link
                as={RouterLink}
                to={"/"}
                fontWeight={500}
                color={"orange.500"}
                fontSize={"sm"}
              >
                <HStack>
                  <BiArrowBack />
                  <Text>Back to Home Page</Text>
                </HStack>
              </Link>
            </VStack>
          </HStack>
        </form>
      </Box>
    </Layout>
  );
};

export default Contact;
