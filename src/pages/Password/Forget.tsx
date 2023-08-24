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
import myImage from "../../assets/forgetPassword.jpg";
import myImageLogo from "../../assets/forgetPasswordLogo.png";
import { Link as RouterLink } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { forgetPassword } from "../../redux/authSlice";
import { Helmet } from "react-helmet";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useAppDispatch } from "../../helper/Hooks/redux";

// interface for login data
interface IforgetPasswordData {
  email: string;
}

const Forget = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IforgetPasswordData>({
    defaultValues: {
      email: "",
    },
  });
  const dispatch = useAppDispatch();

  // function to get the reset link
  const handleForgetPassword: SubmitHandler<IforgetPasswordData> = async (
    data
  ) => {
    await dispatch(forgetPassword(data.email));
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
        <title>Forget Password</title>
        <meta
          name="description"
          content="Forgot Your Password? No worries! Retrieve access to your Harvi Mart account. Enter your email and receive a secure password reset link. Regain control of your account with ease. Your account security matters at Harvi Mart."
        />
      </Helmet>

      <form onSubmit={handleSubmit(handleForgetPassword)}>
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
            alt="forget page image"
            h={["auto", "auto", "300px", "450px"]}
            w={["98%", "98%", "350px", "auto"]}
          />

          {/* for forget form card */}
          <VStack
            boxShadow={"md"}
            h={["auto", "auto", "full"]}
            w={["90%", "full", "23rem"]}
            p={[2, 2, 5]}
            gap={1}
            borderRadius={"5px"}
          >
            <Heading display={"flex"} gap={2} size={"lg"} fontSize={"2xl"}>
              Forget Password <Text color="orange.500">:(</Text>
            </Heading>

            {/* logo image for forget password */}
            <Image h={32} src={myImageLogo} />

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

            {/* submit button */}
            <Button
              type="submit"
              isLoading={isSubmitting}
              loadingText="Sending Link..."
              w={"full"}
              colorScheme="orange"
            >
              Get Reset Link
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

export default Forget;
