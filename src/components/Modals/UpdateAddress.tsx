import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
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
import { TbBuildingEstate } from "react-icons/tb";
import { Iaddress } from "../../helper/interfaces";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useEffect } from "react";
import { updateAddress } from "../../redux/addressSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getLoggedInUserData } from "../../redux/authSlice";

interface Iprops {
  updateAddressIsOpen: boolean;
  updateAddressOnOpen: () => void;
  updateAddressOnClose: () => void;
  data: Iaddress;
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
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Iaddress>({
    defaultValues: {
      _id: data?._id,
      name: data?.name,
      phoneNumber: data?.phoneNumber,
      houseNumber: data?.houseNumber,
      city: data?.city,
      state: data?.state,
      pinCode: data?.pinCode,
    },
  });
  const dispatch = useDispatch<AppDispatch>();

  // function to login the user
  const handleUpdate: SubmitHandler<Iaddress> = async (data) => {
    const res = await dispatch(updateAddress(data));
    if (res.payload?.success) {
      reset();
      await dispatch(getLoggedInUserData());
      updateAddressOnClose();
    } else {
      const { _id, name, city, houseNumber, phoneNumber, pinCode, state } =
        watch();
      reset({ _id, name, city, houseNumber, phoneNumber, pinCode, state });
    }
  };

  // for setting the value on change
  useEffect(() => {
    reset({
      _id: data?._id,
      city: data?.city,
      houseNumber: data?.houseNumber,
      name: data?.name,
      phoneNumber: data?.phoneNumber,
      pinCode: data?.pinCode,
      state: data?.state,
    });
  }, [data]);

  return (
    <>
      <Button
        onClick={updateAddressOnOpen}
        colorScheme="orange"
        color={"white"}
        fontSize={"15px"}
        w={"full"}
      >
        Update Address
      </Button>

      <Modal
        isCentered
        size={"lg"}
        isOpen={updateAddressIsOpen}
        onClose={updateAddressOnClose}
      >
        <ModalOverlay />
        <ModalContent m={0}>
          <ModalHeader textAlign={"center"} fontWeight={"bold"}>
            Update Your Address
          </ModalHeader>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <ModalBody>
              <Grid templateColumns="repeat(2,1fr)" rowGap={2} columnGap={5}>
                {/* for full user name */}
                <GridItem>
                  <FormControl isInvalid={Boolean(errors?.name)}>
                    <FormLabel fontSize={"sm"}>Full Name</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        fontSize={"xl"}
                        color={"orange.500"}
                        children={<BiUser />}
                      />
                      <Input
                        type="text"
                        placeholder="Vinay Pratap Singh"
                        focusBorderColor="primaryColor"
                        {...register("name", {
                          required: {
                            value: true,
                            message: "Please enter your full name",
                          },
                          minLength: {
                            value: 5,
                            message: "Name should be atleast of 5 characters",
                          },
                        })}
                      />
                    </InputGroup>

                    <FormErrorMessage>
                      {errors.name && errors.name.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>

                {/* for phoneNumber */}
                <GridItem>
                  <FormControl isInvalid={Boolean(errors?.phoneNumber)}>
                    <FormLabel fontSize={"sm"}>Phone Number</FormLabel>
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
                </GridItem>

                {/* for houseNumber */}
                <GridItem>
                  <FormControl isInvalid={Boolean(errors?.houseNumber)}>
                    <FormLabel fontSize={"sm"}>House Number</FormLabel>

                    <InputGroup>
                      <InputLeftElement
                        fontSize={"xl"}
                        color={"orange.500"}
                        children={<BsHouseCheck />}
                      />
                      <Input
                        type="text"
                        focusBorderColor="primaryColor"
                        placeholder="123-45"
                        {...register("houseNumber", {
                          required: {
                            value: true,
                            message: "Please enter your house number",
                          },
                          minLength: {
                            value: 3,
                            message: "Please enter a valid house number",
                          },
                        })}
                      />
                    </InputGroup>

                    <FormErrorMessage>
                      {errors.houseNumber && errors.houseNumber?.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>

                {/* for city name */}
                <GridItem>
                  <FormControl isInvalid={Boolean(errors?.city)}>
                    <FormLabel fontSize={"sm"}>City Name</FormLabel>

                    <InputGroup>
                      <InputLeftElement
                        fontSize={"xl"}
                        color={"orange.500"}
                        children={<FaCity />}
                      />
                      <Input
                        type="text"
                        placeholder="Gorakhpur"
                        focusBorderColor="primaryColor"
                        {...register("city", {
                          required: {
                            value: true,
                            message: "Please enter your city name",
                          },
                          minLength: {
                            value: 3,
                            message:
                              "City name should be of atleast 3 characters",
                          },
                        })}
                      />
                    </InputGroup>

                    <FormErrorMessage>
                      {errors.city && errors.city.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>

                {/* for state name */}
                <GridItem>
                  <FormControl isInvalid={Boolean(errors?.state)}>
                    <FormLabel fontSize={"sm"}>State Name</FormLabel>

                    <InputGroup>
                      <InputLeftElement
                        fontSize={"xl"}
                        color={"orange.500"}
                        children={<TbBuildingEstate />}
                      />
                      <Input
                        type="text"
                        placeholder="U.P"
                        focusBorderColor="primaryColor"
                        {...register("state", {
                          required: {
                            value: true,
                            message: "Please enter your state name",
                          },
                          minLength: {
                            value: 2,
                            message:
                              "State name should be of atleast 3 characters",
                          },
                        })}
                      />
                    </InputGroup>

                    <FormErrorMessage>
                      {errors.state && errors.state.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>

                {/* for pin code */}
                <GridItem>
                  <FormControl isInvalid={Boolean(errors?.pinCode)}>
                    <FormLabel fontSize={"sm"}>Pin Code</FormLabel>

                    <InputGroup>
                      <InputLeftElement
                        fontSize={"xl"}
                        color={"orange.500"}
                        children={<HiOutlineLocationMarker />}
                      />
                      <Input
                        type="text"
                        focusBorderColor="primaryColor"
                        placeholder="908078"
                        {...register("pinCode", {
                          required: {
                            value: true,
                            message: "Please enter your pincode",
                          },
                          minLength: {
                            value: 6,
                            message: "Please enter a valid pincode",
                          },
                          maxLength: {
                            value: 6,
                            message: "Please enter a valid pincode",
                          },
                        })}
                      />
                    </InputGroup>

                    <FormErrorMessage>
                      {errors.pinCode && errors.pinCode?.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
              </Grid>
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
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateAddress;
