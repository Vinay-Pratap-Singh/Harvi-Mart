import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiUser } from "react-icons/bi";

interface IupdateProfile {
  fullName: string;
  userImage: File;
}

interface Iprops {
  updateProfileIsOpen: boolean;
  updateProfileOnOpen: () => void;
  updateProfileOnClose: () => void;
}

const UpdateProfile: React.FC<Iprops> = ({
  updateProfileIsOpen,
  updateProfileOnClose,
  updateProfileOnOpen,
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
        onClick={updateProfileOnOpen}
        colorScheme="orange"
        color={"white"}
        w={"full"}
      >
        Update Profile
      </Button>

      <form onSubmit={handleSubmit(handleUpdate)}>
        <Modal
          size={"xs"}
          isOpen={updateProfileIsOpen}
          onClose={updateProfileOnClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign={"center"} fontWeight={"bold"}>
              Update your profile details
            </ModalHeader>

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
                    focusBorderColor="primaryColor"
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
