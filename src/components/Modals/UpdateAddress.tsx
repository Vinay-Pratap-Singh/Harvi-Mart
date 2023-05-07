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
import { BsHouseCheck, BsPhone } from "react-icons/bs";
import { FaCity } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { TbBuildingEstate } from "react-icons/tb";

interface IupdateAddress {
  fullName: string;
  phoneNumber: string;
  houseNumber: string;
  city: string;
  state: string;
  pinCode: string;
}

interface Iprops {
  updateAddressIsOpen: boolean;
  updateAddressOnOpen: () => void;
  updateAddressOnClose: () => void;
  data: IupdateAddress;
}

const UpdateAddress: React.FC<Iprops> = ({
  updateAddressIsOpen,
  updateAddressOnClose,
  updateAddressOnOpen,
  data,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IupdateAddress>({
    defaultValues: {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      houseNumber: data.houseNumber,
      city: data.city,
      state: data.state,
      pinCode: data.pinCode,
    },
  });

  // function to login the user
  const handleUpdate: SubmitHandler<IupdateAddress> = (data) => {};

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
          isCentered
          size={"md"}
          isOpen={updateAddressIsOpen}
          onClose={updateAddressOnClose}
        >
          <ModalOverlay />
          <ModalContent m={0}>
            <ModalHeader textAlign={"center"} fontWeight={"bold"}>
              Update Your Address
            </ModalHeader>

            <ModalBody>
              {/* for fullName */}
              <FormControl isInvalid={Boolean(errors?.fullName)}>
                <FormLabel fontSize={"sm"}>Your Full Name</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    fontSize={"xl"}
                    color={"orange.500"}
                    children={<BiUser />}
                  />
                  <Input
                    type="text"
                    focusBorderColor="primaryColor"
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
                    focusBorderColor="primaryColor"
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

              {/* for houseNumber */}
              <FormControl isInvalid={Boolean(errors?.houseNumber)}>
                <FormLabel fontSize={"sm"}>Your House Number</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    fontSize={"xl"}
                    color={"orange.500"}
                    children={<BsHouseCheck />}
                  />
                  <Input
                    type="text"
                    focusBorderColor="primaryColor"
                    placeholder="123 (A)"
                    {...register("houseNumber", {
                      required: {
                        value: true,
                        message: "Please enter your house number",
                      },
                      minLength: {
                        value: 2,
                        message: "Enter a proper house number",
                      },
                    })}
                  />
                </InputGroup>

                <FormErrorMessage>
                  {errors.houseNumber && errors.houseNumber.message}
                </FormErrorMessage>
              </FormControl>

              {/* for city */}
              <FormControl isInvalid={Boolean(errors?.city)}>
                <FormLabel fontSize={"sm"}>Your City Name</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    fontSize={"xl"}
                    color={"orange.500"}
                    children={<FaCity />}
                  />
                  <Input
                    type="text"
                    focusBorderColor="primaryColor"
                    placeholder="9087654321"
                    {...register("city", {
                      required: {
                        value: true,
                        message: "Please enter your city name",
                      },
                      minLength: {
                        value: 3,
                        message: "Enter a proper city name",
                      },
                    })}
                  />
                </InputGroup>

                <FormErrorMessage>
                  {errors.city && errors.city.message}
                </FormErrorMessage>
              </FormControl>

              {/* for state */}
              <FormControl isInvalid={Boolean(errors?.state)}>
                <FormLabel fontSize={"sm"}>Your State Name</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    fontSize={"xl"}
                    color={"orange.500"}
                    children={<TbBuildingEstate />}
                  />
                  <Input
                    type="text"
                    focusBorderColor="primaryColor"
                    placeholder="Uttar Pradesh"
                    {...register("state", {
                      required: {
                        value: true,
                        message: "Please enter your state name",
                      },
                      minLength: {
                        value: 3,
                        message: "Enter a valid state name",
                      },
                    })}
                  />
                </InputGroup>

                <FormErrorMessage>
                  {errors.state && errors.state.message}
                </FormErrorMessage>
              </FormControl>

              {/* for pin code */}
              <FormControl isInvalid={Boolean(errors?.pinCode)}>
                <FormLabel fontSize={"sm"}>Your Pin Code</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    fontSize={"xl"}
                    color={"orange.500"}
                    children={<GrLocation />}
                  />
                  <Input
                    type="text"
                    focusBorderColor="primaryColor"
                    placeholder="9087654321"
                    {...register("pinCode", {
                      required: {
                        value: true,
                        message: "Please enter your pin code",
                      },
                      maxLength: {
                        value: 6,
                        message: "Pin code should be of 6 character",
                      },
                      minLength: {
                        value: 6,
                        message: "Pin code should be of 6 character",
                      },
                    })}
                  />
                </InputGroup>

                <FormErrorMessage>
                  {errors.pinCode && errors.pinCode.message}
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
