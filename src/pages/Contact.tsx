import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
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
import { useForm, SubmitHandler } from "react-hook-form";
import myImage from "../assets/contactPage.jpg";
import { Link as RouterLink } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { BiArrowBack, BiUser } from "react-icons/bi";
import { Helmet } from "react-helmet";

// interface for contact data
interface IcontactData {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IcontactData>({
    defaultValues: { name: "", email: "", message: "" },
  });

  // function to contact the admin
  const handleContact: SubmitHandler<IcontactData> = (data) => {
    console.log(data);
  };

  return (
    <Box
      w={"100vw"}
      h={"100vh"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {/* adding the dynamic meta data */}
      <Helmet>
        <title>Contact Us</title>
        <meta
          name="description"
          content="Get in touch with Harvi Mart - We're here to assist you! Whether you have questions, feedback, or good wishes, our friendly team is ready to help. Contact us for a seamless shopping experience and excellent customer support. We value your input and look forward to hearing from you."
        />
      </Helmet>

      <form onSubmit={handleSubmit(handleContact)}>
        <HStack gap={8} w={"full"}>
          <Image src={myImage} alt="login page image" h={"450px"} w={"60%"} />

          {/* for login form card */}
          <VStack
            boxShadow={"md"}
            h={"full"}
            w={"23rem"}
            p={5}
            gap={1}
            borderRadius={"5px"}
          >
            <Heading display={"flex"} gap={2} size={"lg"} fontSize={"2xl"}>
              Contact Us <Text color="orange.500">:)</Text>
            </Heading>

            {/* for name */}
            <FormControl isInvalid={Boolean(errors?.name)}>
              <FormLabel fontSize={"sm"}>Your Full Name</FormLabel>
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
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Please enter your full name",
                    },
                    minLength: {
                      value: 3,
                      message: "Please enter a valid name",
                    },
                  })}
                />
              </InputGroup>

              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>

            {/* for email */}
            <FormControl isInvalid={Boolean(errors?.email)}>
              <FormLabel fontSize={"sm"}>Your Email</FormLabel>
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
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Please enter your email id",
                    },
                    pattern: {
                      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
              </InputGroup>

              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            {/* for message */}
            <FormControl pos={"relative"} isInvalid={Boolean(errors?.message)}>
              <FormLabel fontSize={"sm"}>Message</FormLabel>

              <Textarea
                height={24}
                focusBorderColor="primaryColor"
                resize={"none"}
                placeholder="Enter your message..."
                {...register("message", {
                  required: {
                    value: true,
                    message: "Please enter your message",
                  },
                })}
              />

              <FormErrorMessage>
                {errors.message && errors.message.message}
              </FormErrorMessage>
            </FormControl>

            {/* submit button */}
            <Button
              type="submit"
              isLoading={isSubmitting}
              loadingText="Sending..."
              w={"full"}
              colorScheme="orange"
            >
              Send Message
            </Button>

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
  );
};

export default Contact;
