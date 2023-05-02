import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiUser } from "react-icons/bi";

interface IupdateProfile {
  fullName: string;
  userImage: File;
}

interface Iprops {
  isUpdateProfileIsOpen: boolean;
  isUpdateProfileOnOpen: () => void;
  isUpdateProfileOnClose: () => void;
}

const UpdateProfile: React.FC<Iprops> = ({
  isUpdateProfileIsOpen,
  isUpdateProfileOnClose,
  isUpdateProfileOnOpen,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IupdateProfile>({
    defaultValues: {
      fullName: "",
    },
  });

  // function to login the user
  const handleUpdate: SubmitHandler<IupdateProfile> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Button
        onClick={isUpdateProfileOnOpen}
        colorScheme="orange"
        color={"white"}
      >
        Update Profile
      </Button>

      <form onSubmit={handleSubmit(handleUpdate)}>
        <Modal
          size={"xs"}
          isOpen={isUpdateProfileIsOpen}
          onClose={isUpdateProfileOnClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update your profile details</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              {/* for image input */}
              <FormControl
                isInvalid={Boolean(errors?.userImage)}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <FormLabel alignSelf={"center"} cursor="pointer">
                  <BiUser fontSize={80} />
                </FormLabel>
                <Input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  display="none"
                  {...register("userImage")}
                />
              </FormControl>

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
            </ModalBody>
            <ModalFooter>
              <Button
                isLoading={isSubmitting}
                loadingText="Updating..."
                type="submit"
                w={"full"}
                colorScheme="orange"
              >
                Update Profile
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </form>
    </>
  );
};

export default UpdateProfile;
