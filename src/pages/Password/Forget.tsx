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
import myImage from "../../assets/forgetPassword.jpg";
import myImageLogo from "../../assets/forgetPasswordLogo.png";
import { Link as RouterLink } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { forgetPassword } from "../../redux/authSlice";

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
  const dispatch = useDispatch<AppDispatch>();

  // function to get the reset link
  const handleForgetPassword: SubmitHandler<IforgetPasswordData> = async (
    data
  ) => {
    await dispatch(forgetPassword(data.email));
  };

  return (
    <Box
      w={"100vw"}
      h={"100vh"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <form onSubmit={handleSubmit(handleForgetPassword)}>
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
