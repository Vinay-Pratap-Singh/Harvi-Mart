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
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import myImage from "../assets/signup.jpg";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill, BsPhone } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { BiLock, BiUser } from "react-icons/bi";
import { IsignupData } from "../helper/interfaces";
import { createAccount } from "../redux/authSlice";
import { Helmet } from "react-helmet";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useAppDispatch } from "../helper/Hooks/redux";

const Signup = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IsignupData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // function to create new user account
  const handleSignup: SubmitHandler<IsignupData> = async (data) => {
    const res = await dispatch(createAccount(data));
    if (res.payload?.success) {
      // sending the user to homepage
      navigate("/");
    } else {
      const { email, password, fullName, phoneNumber } = watch();
      reset({ email, password, fullName, phoneNumber });
    }
  };

  return (
    <Box
      w={"100vw"}
      h={["auto", "auto", "auto", "100vh"]}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {/* adding the dynamic meta data */}
      <Helmet>
        <title>Signup</title>
        <meta
          name="description"
          content="Unlock a world of endless possibilities at Harvi Mart - Your go-to e-commerce destination. Join us today for a seamless signup experience and access a wide selection of products, including electronics, clothing, fashion, and more. Enjoy exclusive offers and hassle-free shopping with your free Harvi Mart account."
        />
      </Helmet>

      <form onSubmit={handleSubmit(handleSignup)}>
        <HStack
          gap={[0, 0, 4, 8]}
          w={"full"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={["column", "column", "row"]}
          pb={[5, 5, 0]}
          my={[0, 0, 5, 0]}
        >
          <Image
            src={myImage}
            alt="signup page image"
            h={["auto", "auto", "300px", "450px"]}
            w={["98%", "98%", "350px", "auto"]}
          />

          {/* for signup form card */}
          <VStack
            boxShadow={"md"}
            h={["auto", "auto", "auto", "full"]}
            w={["90%", "full", "23rem"]}
            p={[2, 2, 5]}
            gap={1}
            borderRadius={"5px"}
          >
            <Heading display={"flex"} gap={2} size={"lg"} fontSize={"2xl"}>
              Begin Your Journey <Text color="orange.500">:)</Text>
            </Heading>

            {/* for fullName */}
            <FormControl isInvalid={Boolean(errors?.fullName)}>
              <FormLabel fontSize={"sm"}>Your Name</FormLabel>
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
                  {...register("fullName", {
                    required: {
                      value: true,
                      message: "Please enter your full name",
                    },
                    minLength: {
                      value: 5,
                      message: "Minimum length should be 5 characters",
                    },
                  })}
                />
              </InputGroup>

              <FormErrorMessage>
                {errors.fullName && errors.fullName.message}
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

            {/* for password */}
            <FormControl pos={"relative"} isInvalid={Boolean(errors?.password)}>
              <FormLabel fontSize={"sm"}>Your Password</FormLabel>
              <InputGroup>
                <InputLeftElement
                  fontSize={"xl"}
                  color={"orange.500"}
                  children={<BiLock />}
                />
                <Input
                  type={isPasswordVisible ? "text" : "password"}
                  focusBorderColor="primaryColor"
                  placeholder="Test@123"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Please enter your password",
                    },
                    pattern: {
                      value:
                        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
                      message: "Password strength is weak",
                    },
                  })}
                />
              </InputGroup>

              <Box
                pos={"absolute"}
                right={3}
                top={"41px"}
                cursor={"pointer"}
                color={"#FF735C"}
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
              </Box>
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            {/* for phoneNumber */}
            <FormControl isInvalid={Boolean(errors?.phoneNumber)}>
              <FormLabel fontSize={"sm"}>Your Phone Number</FormLabel>
              <InputGroup>
                <InputLeftElement
                  fontSize={"xl"}
                  color={"orange.500"}
                  children={<BsPhone />}
                />
                <Input
                  type="text"
                  focusBorderColor="primaryColor"
                  placeholder="9087654321"
                  {...register("phoneNumber", {
                    required: {
                      value: true,
                      message: "Please enter your phone number",
                    },
                    pattern: {
                      value: /^[6-9]\d{9}$/gi,
                      message: "Please enter a valid phone number",
                    },
                  })}
                />
              </InputGroup>

              <FormErrorMessage>
                {errors.phoneNumber && errors.phoneNumber.message}
              </FormErrorMessage>
            </FormControl>

            {/* submit button */}
            <Button
              type="submit"
              isLoading={isSubmitting}
              loadingText="Creating..."
              w={"full"}
              colorScheme="orange"
            >
              Create Account
            </Button>

            <HStack fontWeight={"500"} fontSize={"sm"}>
              <Link as={RouterLink} to="/">
                <Tooltip
                  label="Back to homepage"
                  hasArrow
                  bgColor={"white"}
                  color={"primaryColor"}
                >
                  <Box _hover={{ color: "primaryColor" }}>
                    <AiOutlineArrowLeft />
                  </Box>
                </Tooltip>
              </Link>
              <Text>Already have an account ?</Text>
              <Link as={RouterLink} to={"/login"} color={"orange.500"}>
                Login
              </Link>
            </HStack>
          </VStack>
        </HStack>
      </form>
    </Box>
  );
};

export default Signup;
