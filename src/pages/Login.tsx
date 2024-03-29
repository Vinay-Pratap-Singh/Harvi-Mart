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
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { BiLock } from "react-icons/bi";
import { IloginData } from "../helper/interfaces";
import { login } from "../redux/authSlice";
import { Helmet } from "react-helmet";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useAppDispatch } from "../helper/Hooks/redux";

const Login = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IloginData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // function to login the user
  const handleLogin: SubmitHandler<IloginData> = async (data) => {
    const res = await dispatch(login(data));
    if (res?.payload?.success) {
      // sending the user to homepage
      navigate("/");
    } else {
      const { email, password } = watch();
      reset({ email, password });
    }
  };

  return (
    <Box
      w={"100vw"}
      h={["auto", "auto", "100vh"]}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {/* adding the dynamic meta data */}
      <Helmet>
        <title>Login</title>
        <meta
          name="description"
          content="Welcome back to Harvi Mart! Access your account and enjoy personalized shopping experiences. Log in securely and explore a vast collection of top-quality products, including electronics, clothing, fashion, and more. Your shopping journey begins with Harvi Mart's seamless login process."
        />
      </Helmet>

      <form onSubmit={handleSubmit(handleLogin)}>
        <HStack
          gap={[0, 0, 4, 8]}
          w={"full"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={["column", "column", "row"]}
          pb={[5, 5, 0]}
        >
          <Image
            src={myImage}
            alt="login page image"
            h={["auto", "auto", "300px", "450px"]}
            w={["98%", "98%", "350px", "auto"]}
          />

          {/* for login form card */}
          <VStack
            boxShadow={"md"}
            h={["auto", "auto", "full"]}
            w={["90%", "full", "23rem"]}
            p={[2, 2, 5]}
            gap={1}
            borderRadius={"5px"}
          >
            <Heading display={"flex"} gap={2} size={"lg"} fontSize={"2xl"}>
              Welcome Back <Text color="orange.500">:)</Text>
            </Heading>

            {/* for email */}
            <FormControl isInvalid={Boolean(errors?.email)}>
              <FormLabel fontSize={"sm"}>Your Registered Email</FormLabel>
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

            {/* submit button */}
            <Button
              type="submit"
              isLoading={isSubmitting}
              loadingText="Verifying..."
              w={"full"}
              colorScheme="orange"
            >
              Login
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
              <Text>Don't have an account ?</Text>
              <Link as={RouterLink} to={"/signup"} color={"orange.500"}>
                Create Account
              </Link>
            </HStack>

            {/* adding the section for forget password */}
            <HStack
              fontWeight={500}
              fontSize={"sm"}
              justifyContent={"space-between"}
              w={"full"}
            >
              <Box h={"0.5px"} bg={"orange.500"} w={"full"}></Box>
              <Text>OR</Text>
              <Box h={"0.5px"} bg={"orange.500"} w={"full"}></Box>
            </HStack>

            <Link
              as={RouterLink}
              to={"/password/forget"}
              fontWeight={500}
              color={"orange.500"}
              fontSize={"sm"}
            >
              Forget Password ?
            </Link>
          </VStack>
        </HStack>
      </form>
    </Box>
  );
};

export default Login;
