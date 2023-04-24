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
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import myImage from "../assets/signup.jpg";

// interface for login
interface IloginData {
  email: string;
  password: string;
}

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitted },
  } = useForm<IloginData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

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
        <HStack gap={3} w={"full"}>
          <Image src={myImage} h={"450px"} />

          {/* for login form card */}
          <VStack
            boxShadow={"0 0 5px gray"}
            h={"100%"}
            w={80}
            p={5}
            borderRadius={"5px"}
          >
            <Heading size={"lg"} alignSelf={"flex-start"}>
              Welcome Back !
            </Heading>

            {/* for email */}
            <FormControl>
              <FormLabel>Your Registered Email</FormLabel>
              <Input
                type="email"
                placeholder="test@gmail.com"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Please fill your email id",
                  },
                  pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            {/* for password */}
            <FormControl>
              <FormLabel>Your Password</FormLabel>
              <Input
                type="password"
                placeholder="Test@123"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Please enter your password",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            {/* submit button */}
            <Button type="submit" w={"full"}>
              Submit
            </Button>

            <HStack>
              <Text>Don't have an account</Text>
              <Link>Create Account</Link>
            </HStack>
          </VStack>
        </HStack>
      </form>
    </Box>
  );
};

export default Login;
