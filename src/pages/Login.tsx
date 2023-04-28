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
  VStack,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import myImage from "../assets/signup.jpg";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { BiLock } from "react-icons/bi";

// interface for login data
interface IloginData {
  email: string;
  password: string;
}

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IloginData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // function to login the user
  const handleLogin: SubmitHandler<IloginData> = (data) => {
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
      <form onSubmit={handleSubmit(handleLogin)}>
        <HStack gap={8} w={"full"}>
          <Image src={myImage} alt="login page image" h={"450px"} />

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
