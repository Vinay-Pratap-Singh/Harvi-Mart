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
import { BsFillEyeFill, BsFillEyeSlashFill, BsPhone } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { BiLock, BiUser } from "react-icons/bi";

// interface for signup data
interface IsignupData {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

const Signup = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IsignupData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // function to login the user
  const handleSignup: SubmitHandler<IsignupData> = (data) => {
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
      <form onSubmit={handleSubmit(handleSignup)}>
        <HStack gap={8} w={"full"}>
          <Image src={myImage} alt="login page image" h={"450px"} />

          {/* for login form card */}
          <VStack
            boxShadow={"md"}
            h={"full"}
            w={"23rem"}
            px={5}
            py={2}
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
