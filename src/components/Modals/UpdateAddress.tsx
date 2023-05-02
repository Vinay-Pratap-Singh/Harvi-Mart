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
import { BsPhone } from "react-icons/bs";

interface IupdateProfile {
  phoneNumber: string;
}

interface Iprops {
  updateAddressIsOpen: boolean;
  updateAddressOnOpen: () => void;
  updateAddressOnClose: () => void;
}

const UpdateAddress: React.FC<Iprops> = ({
  updateAddressIsOpen,
  updateAddressOnClose,
  updateAddressOnOpen,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IupdateProfile>({
    defaultValues: {
      phoneNumber: "",
    },
  });

  // function to login the user
  const handleUpdate: SubmitHandler<IupdateProfile> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Button
        onClick={updateAddressOnOpen}
        colorScheme="orange"
        color={"white"}
      >
        Update Address
      </Button>

      <form onSubmit={handleSubmit(handleUpdate)}>
        <Modal
          size={"xs"}
          isOpen={updateAddressIsOpen}
          onClose={updateAddressOnClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign={"center"}>
              Update your phone number
            </ModalHeader>

            <ModalBody>
              {/* for phoneNumber */}
              <FormControl isInvalid={Boolean(errors?.phoneNumber)}>
                <FormLabel fontSize={"sm"}>New Phone Number</FormLabel>
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
            </ModalBody>
            <ModalFooter>
              <Button
                isLoading={isSubmitting}
                loadingText="Updating..."
                type="submit"
                w={"full"}
                colorScheme="orange"
              >
                Update Address
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </form>
    </>
  );
};

export default UpdateAddress;
