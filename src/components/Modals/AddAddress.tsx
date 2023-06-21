import { SubmitHandler, useForm } from "react-hook-form";
import { Iaddress, IcouponData } from "../../helper/interfaces";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tooltip,
} from "@chakra-ui/react";
import { createCoupon, getAllCoupons } from "../../redux/couponSlice";
import { createAddress } from "../../redux/addressSlice";
import { getLoggedInUserData } from "../../redux/authSlice";

interface Iprops {
  addAddressIsOpen: boolean;
  addAddressOnOpen: () => void;
  addAddressOnClose: () => void;
}

const AddAddress: React.FC<Iprops> = ({
  addAddressIsOpen,
  addAddressOnClose,
  addAddressOnOpen,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Iaddress>();

  // function to handle add new address
  const handleCreateAddress: SubmitHandler<Iaddress> = async (data) => {
    const res = await dispatch(createAddress(data));
    if (res.payload?.success) {
      reset();
      await dispatch(getLoggedInUserData());
      addAddressOnClose();
    } else {
      const { city, houseNumber, name, phoneNumber, pinCode, state } = watch();
      reset({ city, houseNumber, name, phoneNumber, pinCode, state });
    }
  };

  return (
    <>
      <Button onClick={addAddressOnOpen} w={"full"}>
        Add new address
      </Button>

      <Modal isOpen={addAddressIsOpen} onClose={addAddressOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"} fontWeight={"bold"}>
            Add new address
          </ModalHeader>

          <form onSubmit={handleSubmit(handleCreateAddress)}>
            <ModalBody>
              <Grid templateColumns="repeat(2,1fr)" rowGap={2} columnGap={5}>
                {/* for full user name */}
                <GridItem>
                  <FormControl isInvalid={Boolean(errors?.name)}>
                    <FormLabel fontSize={"sm"}>Full Name</FormLabel>

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

                    <FormErrorMessage>
                      {errors.name && errors.name.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>

                {/* for phoneNumber */}
                <GridItem>
                  <FormControl isInvalid={Boolean(errors?.phoneNumber)}>
                    <FormLabel fontSize={"sm"}>Phone Number</FormLabel>

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

                    <FormErrorMessage>
                      {errors.phoneNumber && errors.phoneNumber.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>

                {/* for houseNumber */}
                <GridItem>
                  <FormControl isInvalid={Boolean(errors?.houseNumber)}>
                    <FormLabel fontSize={"sm"}>House Number</FormLabel>

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

                    <FormErrorMessage>
                      {errors.houseNumber && errors.houseNumber?.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>

                {/* for city name */}
                <GridItem>
                  <FormControl isInvalid={Boolean(errors?.city)}>
                    <FormLabel fontSize={"sm"}>City Name</FormLabel>

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

                    <FormErrorMessage>
                      {errors.city && errors.city.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>

                {/* for state name */}
                <GridItem>
                  <FormControl isInvalid={Boolean(errors?.state)}>
                    <FormLabel fontSize={"sm"}>State Name</FormLabel>

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

                    <FormErrorMessage>
                      {errors.state && errors.state.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>

                {/* for pin code */}
                <GridItem>
                  <FormControl isInvalid={Boolean(errors?.pinCode)}>
                    <FormLabel fontSize={"sm"}>Pin Code</FormLabel>

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
                loadingText="Adding address..."
                type="submit"
                w={"full"}
                colorScheme="orange"
              >
                Add New Address
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddAddress;
