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
import myImage from "../../assets/resetPassword.jpg";
import myImageLogo from "../../assets/forgetPasswordLogo.png";
import { useParams } from "react-router-dom";
import { BiLock } from "react-icons/bi";
import { useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { resetPassword } from "../../redux/authSlice";
import { Helmet } from "react-helmet";

// interface for login data
interface IresetPasswordData {
  password: string;
  confirmPassword: string;
}

const Reset = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IresetPasswordData>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const dispatch = useDispatch<AppDispatch>();

  // getting the token from the url
  const { token } = useParams();

  const [isVisible, setIsVisible] = useState<{
    isPasswordVisible: boolean;
    isConfirmPasswordVisible: boolean;
  }>({
    isPasswordVisible: false,
    isConfirmPasswordVisible: false,
  });

  //   function to handle the visibility changes
  const handleVisibilityChanges = (type: string) => {
    let data;
    if (type === "isPasswordVisible") {
      data = { ...isVisible };
      data.isPasswordVisible = !data.isPasswordVisible;
    } else {
      data = { ...isVisible };
      data.isConfirmPasswordVisible = !data.isConfirmPasswordVisible;
    }

    setIsVisible({ ...data });
  };

  // function to get the rese link
  const handlePasswordReset: SubmitHandler<IresetPasswordData> = async (
    data
  ) => {
    if (token) {
      const res = await dispatch(
        resetPassword({ token, password: data.password })
      );
      if (res.payload) {
        reset();
      }
    }
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
        <title>Reset Password</title>
        <meta
          name="description"
          content="Secure Your Account with Harvi Mart - Reset your password and regain access to your account. Our simple and secure password reset process ensures your account remains protected. Take control of your login credentials and shop confidently at Harvi Mart."
        />
      </Helmet>

      <form onSubmit={handleSubmit(handlePasswordReset)}>
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
              Change Password <Text color="orange.500">:)</Text>
            </Heading>

            {/* logo image for forget password */}
            <Image h={32} src={myImageLogo} />

            {/* for password */}
            <FormControl pos={"relative"} isInvalid={Boolean(errors?.password)}>
              <FormLabel fontSize={"sm"}>New Password</FormLabel>
              <InputGroup>
                <InputLeftElement
                  fontSize={"xl"}
                  color={"orange.500"}
                  children={<BiLock />}
                />
                <Input
                  type={isVisible.isPasswordVisible ? "text" : "password"}
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
                onClick={() => handleVisibilityChanges("isPasswordVisible")}
              >
                {isVisible.isPasswordVisible ? (
                  <BsFillEyeFill />
                ) : (
                  <BsFillEyeSlashFill />
                )}
              </Box>
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            {/* for confirm password */}
            <FormControl pos={"relative"} isInvalid={Boolean(errors?.password)}>
              <FormLabel fontSize={"sm"}>Confirm New Password</FormLabel>
              <InputGroup>
                <InputLeftElement
                  fontSize={"xl"}
                  color={"orange.500"}
                  children={<BiLock />}
                />
                <Input
                  type={
                    isVisible.isConfirmPasswordVisible ? "text" : "password"
                  }
                  focusBorderColor="primaryColor"
                  placeholder="Test@123"
                  {...register("confirmPassword", {
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
                onClick={() =>
                  handleVisibilityChanges("isConfirmPasswordVisible")
                }
              >
                {isVisible.isConfirmPasswordVisible ? (
                  <BsFillEyeFill />
                ) : (
                  <BsFillEyeSlashFill />
                )}
              </Box>
              <FormErrorMessage>
                {errors.confirmPassword && errors.confirmPassword.message}
              </FormErrorMessage>
            </FormControl>

            {/* submit button */}
            <Button
              type="submit"
              isLoading={isSubmitting}
              loadingText="Resetting Password..."
              w={"full"}
              colorScheme="orange"
            >
              Reset Password
            </Button>
          </VStack>
        </HStack>
      </form>
    </Box>
  );
};

export default Reset;
